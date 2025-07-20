document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.getElementById('hamburger');
  const sidebar = document.getElementById('sidebar');
  const closeBtn = document.getElementById('close-sidebar');
  const overlay = document.getElementById('overlay');

  function openSidebar() {
    sidebar.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeSidebar() {
    sidebar.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', openSidebar);
  closeBtn.addEventListener('click', closeSidebar);
  overlay.addEventListener('click', closeSidebar);

  document.addEventListener('click', (e) => {
    const isClickInside = sidebar.contains(e.target) || hamburger.contains(e.target);
    if (!isClickInside) {
      closeSidebar();
    }
  });
});


/* Best Bar JS */
document.addEventListener("DOMContentLoaded", () => {
  const ticker = document.getElementById("best-content");
  const phrase = "VOTED BEST FOOD TRUCK ON THE EASTSIDE 2024 • ";
  let repeated = phrase;
  ticker.textContent = phrase;

  let iterations = 0;
  const maxIterations = 1000;

  while (ticker.offsetWidth < window.innerWidth * 2 && iterations < maxIterations) {
    repeated += phrase;
    ticker.textContent = repeated;
    iterations++;
  }
});

/* Reviews JS */
const tracks = document.querySelectorAll('.reviews-track');

tracks.forEach(track => {
  const direction = track.dataset.direction === 'right' ? 1 : -1;
  const row = track.querySelector('.reviews-row');

  const originalItems = Array.from(row.children);
  const cloneItems = originalItems.map(item => item.cloneNode(true));
  if (direction === 1) {
    cloneItems.reverse();
  }

  requestAnimationFrame(() => {
    const trackWidth = track.offsetWidth;

    while (row.scrollWidth < trackWidth * 2) {
      cloneItems.forEach(clone => {
        const cloneNode = clone.cloneNode(true);
        if (direction === 1) {
          row.insertBefore(cloneNode, row.firstChild);
        } else {
          row.appendChild(cloneNode);
        }
      });
    }

    if (direction === 1) {
      row.style.transform = `translateX(-${row.scrollWidth / 2}px)`;
    }

    let offset = 0;
    let lastTime = null;
    let paused = false;

    track.addEventListener('mouseenter', () => paused = true);
    track.addEventListener('mouseleave', () => paused = false);

    function step(timestamp) {
      if (!lastTime) lastTime = timestamp;
      const delta = timestamp - lastTime;
      lastTime = timestamp;

      if (!paused) {
        offset += delta * 0.065;
        const totalWidth = row.scrollWidth / 2;
        if (offset >= totalWidth) offset = 0;

        if (direction === 1) {
          row.style.transform = `translateX(${-totalWidth + offset}px)`;
        } else {
          row.style.transform = `translateX(${-offset}px)`;
        }
      }

      requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  });
});
