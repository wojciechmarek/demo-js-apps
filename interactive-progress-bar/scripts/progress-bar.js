const progressInner = document.querySelector('.progress-bar__inner');

window.addEventListener('scroll', () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  const percent = (scrollTop / (scrollHeight - clientHeight)) * 100;

  progressInner.style.width = `${percent}%`;
});