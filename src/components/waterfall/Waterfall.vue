<script setup lang="ts">
import SVGIcon from '@/components/svg-icon/SVGIcon.vue';
import { useWindowSize } from '@vueuse/core';
import { computed, ref, type PropType, watch, nextTick } from 'vue';
import { throttle } from 'lodash-es';

// define props
const props = defineProps({
  // 数据源
  dataSource: {
    type: Array as PropType<any[]>,
    required: true,
  },
  // 唯一标识 key
  itemKey: {
    type: String,
  },
  // 列数
  columnNumber: {
    type: Number,
    default: 2,
  },
  // 列间距
  columnSpacing: {
    type: Number,
    default: 20,
  },
  // 行间距
  rowSpacing: {
    type: Number,
    default: 20,
  },
  // 是否需要进行图片预读取
  imagePreReading: {
    type: Boolean,
    default: true,
  },
});

// ref
const containerRef = ref();
// window size
const { width } = useWindowSize();
// 容器布局
const containerLayout = ref({
  // 容器宽度
  width: 0,
  // 容器高度
  height: 0,
  // 容器左间距
  paddingLeft: 0,
  // 容器右间距
  paddingRight: 0,
});
// 列布局
const columnLayout = ref<{
  width: number;
  height: { [key: number]: number };
}>({
  // 列宽度
  width: 0,
  // 列高度 (key: 列, value:)
  height: {},
});
// 列间距布局
const columnSpacingLayout = computed(() => {
  return {
    // 列间距总数
    spacingTotal: (props.columnNumber - 1) * props.columnSpacing,
  };
});
// item 布局
const itemLayout = ref<
  {
    // item 高度
    height: number;
    // item top
    top: number;
    // item left
    left: number;
  }[]
>([]);

// 初始化容器布局
const initContainerLayout = () => {
  if (!containerRef.value) {
    return;
  }

  const computedStyle = window.getComputedStyle(containerRef.value);
  // 计算容器左间距
  containerLayout.value.paddingLeft = parseFloat(computedStyle.paddingLeft);
  // 计算容器右间距
  containerLayout.value.paddingRight = parseFloat(computedStyle.paddingRight);

  // 计算容器宽度 (width - paddingLeft - paddingRight)
  containerLayout.value.width =
    containerRef.value.getBoundingClientRect().width -
    containerLayout.value.paddingLeft -
    containerLayout.value.paddingRight;
};

// 初始化列布局
const initColumnLayout = () => {
  // 计算列宽 ((containerWidth - spacingTotal) / columnNumber)
  columnLayout.value.width =
    (containerLayout.value.width - columnSpacingLayout.value.spacingTotal) / props.columnNumber;

  // 计算列高 (初始化 0)
  columnLayout.value.height = {};
  for (let i = 0; i < props.columnNumber; i++) {
    columnLayout.value.height[i] = 0;
  }
};

// 初始化 item 高度集合
const initItemLayout = async () => {
  // 所有的元素
  const itemList = [...containerRef.value.querySelectorAll('.waterfall-list-item')] as HTMLDivElement[];

  // 是否需要图片预读取
  if (props.imagePreReading) {
    // 所有的图片地址
    const itemImageSrcList = itemList.map((item: HTMLDivElement) => item.querySelector('img')?.src);
    // 等待所有图片加载完成
    await Promise.all(
      itemImageSrcList.map((item) => {
        return new Promise<null>((resolve) => {
          if (!item) {
            resolve(null);
            return;
          }
          const image = new Image();
          image.src = item;
          image.onload = () => {
            resolve(null);
          };
          image.onerror = () => {
            resolve(null);
          };
        });
      })
    );
  }

  // 计算 height top left
  props.dataSource.forEach((item, index) => {
    if (!itemList[index]) {
      return;
    }

    const newItem = {
      height: itemList[index].getBoundingClientRect().height,
      top: getNextItemTop(),
      left: getNextItemLeft(),
    };

    // 更新指定列的高度
    const minHeightColumn = getMinHeightColumn();
    columnLayout.value.height[minHeightColumn] += newItem.height + props.rowSpacing;

    itemLayout.value[index] = newItem;
  });

  // 更新容器高度
  containerLayout.value.height = getColumnMaxHeight();
};

// 获取列的最小高度
const getColumnMinHeight = () => {
  const heightList = Object.values(columnLayout.value.height);
  const columnMinHeight = Math.min(...heightList);
  return columnMinHeight;
};

// 获取列的最大高度
const getColumnMaxHeight = () => {
  const heightList = Object.values(columnLayout.value.height);
  const columnMinHeight = Math.max(...heightList);
  return columnMinHeight;
};

// 获取最小高度的列
const getMinHeightColumn = () => {
  const columnMinHeight = getColumnMinHeight();
  const column = Object.keys(columnLayout.value.height).find(
    (key) => columnLayout.value.height[parseInt(key)] === columnMinHeight
  );
  return parseInt(column || '');
};

// 返回下一个 item 的 top
const getNextItemTop = () => {
  const columnMinHeight = getColumnMinHeight();
  return columnMinHeight;
};

// 返回下一个 item 的 left
const getNextItemLeft = () => {
  const minHeightColumn = getMinHeightColumn();
  const nextItemLeft =
    minHeightColumn * (columnLayout.value.width + props.columnSpacing) +
    containerLayout.value.paddingLeft;
  return nextItemLeft;
};

// 初始化 layout
const initLayout = async () => {
  if (!containerRef.value) {
    return;
  }

  initContainerLayout();
  // 渲染前的容器宽度
  const renderBeforeContainerWidth = containerLayout.value.width;

  initColumnLayout();

  // 等待 item 渲染完成
  await nextTick();

  await initItemLayout();

  initContainerLayout();
  // 渲染后的容器宽度
  const renderRenderContainerWidth = containerLayout.value.width;

  // 如果不一致，可能受到滚动条影响，重新渲染一次
  if (renderBeforeContainerWidth !== renderRenderContainerWidth) {
    initLayout();
  }
};

// 监听数据
watch(
  () => props.dataSource,
  async () => {
    // 等待 dom 渲染完成
    await nextTick();
    initLayout();
  },
  {
    deep: true,
    immediate: true,
  }
);

// 监听屏幕宽度
watch(
  width,
  throttle(() => {
    initLayout();
  }, 500)
);
</script>

<template>
  <div
    class="waterfall relative"
    ref="containerRef"
    :style="{
      height: containerLayout.height + 'px',
    }"
  >
    <!-- 数据渲染 -->
    <template v-if="columnLayout.width">
      <div
        v-for="(item, index) of dataSource"
        :key="itemKey ? item[itemKey] : index"
        class="waterfall-list-item absolute"
        :style="{
          width: columnLayout.width + 'px',
          left: (itemLayout[index]?.left || 0) + 'px',
          top: (itemLayout[index]?.top || 0) + 'px',
        }"
      >
        <slot name="item" :item="item" :width="columnLayout.width" />
      </div>
    </template>
    <!-- 加载中 -->
    <div v-else class="p-2">
      <SVGIcon class="w-4 h-4 mx-auto animate-spin" name="infinite-load" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import './Waterfall.scss'; ;
</style>
