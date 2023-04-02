type Callback = (_value: any) => void;

// broadcast 实例
let broadcastChannel: BroadcastChannel | undefined = undefined;
if (window.BroadcastChannel) {
  broadcastChannel = new BroadcastChannel('appChannel');
}

// 回调列表
const callbackTemp: {
  [_key in string]: {
    callback: Callback;
    handleMessage: (_e: MessageEvent) => void;
    handleStorage: (_e: StorageEvent) => void;
  }[];
} = {};

// emit
const emit = (key: string, value: any) => {
  if (broadcastChannel) {
    broadcastChannel.postMessage({
      key,
      value,
    });
  } else {
    // 兼容写法, 如果浏览器不支持 broadcast
    // 先移除, 为了每次都能触发 window.onStorage 方法, 因为如果数据相同不会触发 window.onStorage 方法
    localStorage.removeItem('appChannel');
    localStorage.setItem(
      'appChannel',
      JSON.stringify({
        key,
        value,
      })
    );
  }
};

// on
const on = (key: string, callback: Callback) => {
  const handleMessage = (e: MessageEvent) => {
    if (e.data?.key === key) {
      callback(e.data.value);
    }
  };

  const handleStorage = (e: StorageEvent) => {
    if (e.newValue) {
      try {
        const data = JSON.parse(e.newValue as string);
        if (e.key === 'appChannel' && data.key === key) {
          callback(data.value);
        }
      } catch (error) {
        console.log('解析 JSON 失败');
      }
    }
  };

  // 保存 callback 方便后续销毁
  if (!callbackTemp[key]) {
    callbackTemp[key] = [];
  }
  callbackTemp[key].push({
    callback,
    handleMessage,
    handleStorage,
  });

  if (broadcastChannel) {
    broadcastChannel.addEventListener('message', handleMessage);
  } else {
    // 兼容写法, 如果浏览器不支持 broadcast
    window.addEventListener('storage', handleStorage);
  }
};

// off
const off = (key: string, callback: Callback) => {
  if (!callbackTemp[key]) {
    callbackTemp[key] = [];
  }

  callbackTemp[key] = callbackTemp[key].filter((item) => {
    if (item.callback === callback) {
      broadcastChannel?.removeEventListener('message', item.handleMessage);
      window.removeEventListener('storage', item.handleStorage);
      return false;
    }
    return true;
  });
};

export const broadcastEmitter = {
  on,
  emit,
  off,
};
