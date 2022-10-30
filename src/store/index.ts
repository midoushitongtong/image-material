import { createPinia } from 'pinia';

const store = createPinia();

store.use((ctx) => {
  ctx.store.$onAction((action) => {
    const prevState = JSON.parse(JSON.stringify(action.store.$state));

    action.after(() => {
      // 打印标题
      console.groupCollapsed(`🍍 action ${action.store.$id} - ${action.name}`);
      // 打印修改前的状态
      console.log(
        '%c[prev state]',
        'font-weight: bold; color: grey;',
        JSON.parse(JSON.stringify(prevState))
      );
      // 打印 action
      console.log('%c[action]', 'font-weight: bold; color: #69B7FF;', {
        type: action.name,
        args: action.args,
      });
      // 打印修改后的状态
      console.log(
        '%c[next state]',
        'font-weight: bold; color: #4caf50;',
        JSON.parse(JSON.stringify(action.store.$state))
      );
      console.groupEnd();
    });
  });
});

export default store;
