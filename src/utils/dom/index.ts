const easeInOutQuad = function (t: number, b: number, c: number, d: number) {
  t /= d / 2;
  if (t < 1) return (c / 2) * t * t + b;
  t--;
  return (-c / 2) * (t * (t - 2) - 1) + b;
};

export const scrollTo = ({
  element,
  top,
  left,
  duration,
}: {
  element: HTMLElement;
  top: number;
  left: number;
  duration: number;
}) => {
  const startTop = element.scrollTop;
  const startLeft = element.scrollLeft;
  const changeTop = top - startTop;
  const changeLeft = left - startLeft;
  const startDate = new Date().getTime();

  const animateScroll = function () {
    const currentDate = new Date().getTime();
    const currentTime = currentDate - startDate;
    element.scrollTop = easeInOutQuad(currentTime, startTop, changeTop, duration);
    element.scrollLeft = easeInOutQuad(currentTime, startLeft, changeLeft, duration);

    if (currentTime < duration) {
      requestAnimationFrame(animateScroll);
    } else {
      element.scrollTop = top;
      element.scrollLeft = left;
    }
  };
  animateScroll();
};
