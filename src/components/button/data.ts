// 不同 type 下的按钮样式
export const buttonTypeStyle = {
  primary:
    'text-white bg-zinc-800 dark:bg-zinc-900 hover:bg-zinc-900 dark:hover:bg-zinc-700 active:bg-zinc-800 dark:active:bg-zinc-700',
  main: 'text-white bg-main dark:bg-zinc-900 hover:bg-hover-main dark:hover-zinc-700 active:bg-main dark:active-bg-zinc-700',
  info: 'text-zinc-800 dark:text-zinc-300 bg-zinc-200 dark:bg-zinc-700 hover:bg-zinc-300 dark:hover:bg-zinc-600 active:bg-zinc-200 dark:active:bg-zinc-700',
};

// 不同 type 下的按钮样式
export const buttonSizeStyle = {
  // 文字按钮
  default: {
    button: 'w-8 h-4 text-base',
    icon: '',
  },
  // icon 按钮
  'icon-default': {
    button: 'w-4 h-4',
    icon: 'w-1.5 h-1.5',
  },
  small: {
    button: 'w-7 h-3 text-base',
  },
  'icon-small': {
    button: 'w-3 h-3',
    icon: 'w-1.5 h-1.5',
  },
};
