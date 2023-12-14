const scrollUp = () => {
  let yPosition = Math.trunc(
    document.documentElement.scrollTop || document.body.scrollTop
  );
  let requestId: number | undefined;
  if (yPosition > 0) {
    requestId = window.requestAnimationFrame(() => scrollUp());
    window.scrollTo(0, yPosition - yPosition / 50);
  }
  if (yPosition < 0 && requestId) {
    window.cancelAnimationFrame(requestId);
  }
};

const scrollDown = () => {
  window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
};

export { scrollUp, scrollDown };
