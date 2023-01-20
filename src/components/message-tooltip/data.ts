// 不同 type 下的 message tooltip 样式
export const messageTooltipTypeStyle = {
  // 成功
  success: {
    icon: 'success',
    fillClass: 'fill-success-300',
    textClass: 'text-success-300',
    containerClass:
      'bg-success-100 border border-solid border-success-200 duration-200 hover:shadow-lg hover:shadow-success-100',
  },
  // 警告
  warn: {
    icon: 'warn',
    fillClass: 'fill-warn-300',
    textClass: 'text-warn-300',
    containerClass:
      'bg-warn-100 border border-solid border-warn-200 duration-200 hover:shadow-lg hover:shadow-warn-100',
  },
  // 错误
  error: {
    icon: 'error',
    fillClass: 'fill-error-300',
    textClass: 'text-error-300',
    containerClass:
      'bg-error-100 border border-solid border-error-200 duration-200 hover:shadow-lg hover:shadow-error-100',
  },
};
