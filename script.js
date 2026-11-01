const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");

let stars = [];
let width = 0;
let height = 0;
let animationId = null;

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

function resize() {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);

  width = window.innerWidth;
  height = window.innerHeight;

  canvas.width = Math.round(width * dpr);
  canvas.height = Math.round(height * dpr);

  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  const count = Math.min(180, Math.floor((width * height) / 6500));

  stars = Array.from({ length: count }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    radius: Math.random() * 1.5 + 0.3,
    speed: Math.random() * 0.25 + 0.05,
    opacity: Math.random() * 0.7 + 0.2
  }));
}

function draw() {
  ctx.clearRect(0, 0, width, height);

  for (const star of stars) {
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(190, 215, 255, ${star.opacity})`;
    ctx.fill();

    if (!reducedMotion.matches) {
      star.y += star.speed;

      if (star.y > height) {
        star.y = 0;
        star.x = Math.random() * width;
      }
    }
  }

  if (!reducedMotion.matches) {
    animationId = requestAnimationFrame(draw);
  }
}

function restartAnimation() {
  if (animationId !== null) {
    cancelAnimationFrame(animationId);
    animationId = null;
  }

  draw();
}

window.addEventListener("resize", () => {
  resize();
  restartAnimation();
});

reducedMotion.addEventListener("change", restartAnimation);

document.getElementById("year").textContent = new Date().getFullYear();

resize();
restartAnimation();
/* ========================================
   YOBAPPS APP GALLERY
======================================== */

const apps = [
  {
    id: 6810577410,
    screenshots: [
      "images/blind-opera/screenshot-01.jpg",
      "images/blind-opera/screenshot-02.jpg",
      "images/blind-opera/screenshot-03.jpg",
      "images/blind-opera/screenshot-04.jpg",
      "images/blind-opera/screenshot-05.jpg",
      "images/blind-opera/screenshot-06.jpg",
      "images/blind-opera/screenshot-07.jpg",
      "images/blind-opera/screenshot-08.jpg",
      "images/blind-opera/screenshot-09.jpg",
      "images/blind-opera/screenshot-10.jpg",
      "images/blind-opera/screenshot-11.jpg",
      "images/blind-opera/screenshot-12.jpg",
      "images/blind-opera/screenshot-13.jpg",
      "images/blind-opera/screenshot-14.jpg",
      "images/blind-opera/screenshot-15.jpg",
      "images/blind-opera/screenshot-16.jpg",
      "images/blind-opera/screenshot-17.jpg",
      "images/blind-opera/screenshot-18.jpg",
      "images/blind-opera/screenshot-19.jpg",
      "images/blind-opera/screenshot-20.jpg",
      "images/blind-opera/screenshot-21.jpg"
    ],
    name: "Blind Opera",
    category: "Games",
    summary: "Your music becomes the world.",
    description:
      "Turn your own music into reactive journeys through glowing tracks, cosmic scenery, and surreal environments.",
    slug: "blind-opera"
  },
  {
    id: 6772285434,
    screenshots: [
      "images/yob-toy-camera/screenshot-01.jpg",
      "images/yob-toy-camera/screenshot-02.jpg",
      "images/yob-toy-camera/screenshot-03.jpg",
      "images/yob-toy-camera/screenshot-04.jpg",
      "images/yob-toy-camera/screenshot-05.jpg",
      "images/yob-toy-camera/screenshot-06.jpg",
      "images/yob-toy-camera/screenshot-07.jpg"
    ],
    name: "YOB Toy Camera",
    category: "Photo & Video",
    summary: "Turn ordinary moments into miniature worlds.",
    description:
      "Capture miniature-style scenes with live tilt-shift focus, creative presets, and a collection of photo effects.",
    slug: "yob-toy-camera"
  },
  {
    id: 6762022393,
    screenshots: [
      "images/unfortunate-cookie/screenshot-01.jpg",
      "images/unfortunate-cookie/screenshot-02.jpg",
      "images/unfortunate-cookie/screenshot-03.jpg",
      "images/unfortunate-cookie/screenshot-04.jpg",
      "images/unfortunate-cookie/screenshot-05.jpg",
      "images/unfortunate-cookie/screenshot-06.jpg",
      "images/unfortunate-cookie/screenshot-07.jpg",
      "images/unfortunate-cookie/screenshot-08.jpg",
      "images/unfortunate-cookie/screenshot-09.jpg",
      "images/unfortunate-cookie/screenshot-10.jpg"
    ],
    name: "Unfortunate Cookie: Misfortune",
    category: "Entertainment",
    summary: "Fortune cookies with a darker sense of humor.",
    description:
      "A playful twist on the traditional fortune cookie, serving up misfortune instead of good luck.",
    slug: "unfortunate-cookie-misfortune"
  },
  {
    id: 6761299619,
    screenshots: [
      "images/yob-maker-assistant/screenshot-01.jpg",
      "images/yob-maker-assistant/screenshot-02.jpg",
      "images/yob-maker-assistant/screenshot-03.jpg",
      "images/yob-maker-assistant/screenshot-04.jpg",
      "images/yob-maker-assistant/screenshot-05.jpg",
      "images/yob-maker-assistant/screenshot-06.jpg",
      "images/yob-maker-assistant/screenshot-07.jpg",
      "images/yob-maker-assistant/screenshot-08.jpg",
      "images/yob-maker-assistant/screenshot-09.jpg",
      "images/yob-maker-assistant/screenshot-10.jpg",
      "images/yob-maker-assistant/screenshot-11.jpg",
      "images/yob-maker-assistant/screenshot-12.jpg",
      "images/yob-maker-assistant/screenshot-13.jpg",
      "images/yob-maker-assistant/screenshot-14.jpg"
    ],
    name: "YOB Maker Assistant",
    category: "Productivity",
    summary: "Practical tools for creative makers.",
    description:
      "A helpful companion for organizing and managing the practical side of making things.",
    slug: "yob-maker-assistant"
  },
  {
    id: 6761371407,
    screenshots: [
      "images/yob-craft-calculator/screenshot-01.jpg",
      "images/yob-craft-calculator/screenshot-02.jpg",
      "images/yob-craft-calculator/screenshot-03.jpg",
      "images/yob-craft-calculator/screenshot-04.jpg"
    ],
    name: "YOB Craft Price Calculator",
    category: "Productivity",
    summary: "Price handmade products with confidence.",
    description:
      "Calculate materials, labor, overhead, markup, and profit without complicated spreadsheets.",
    slug: "yob-craft-price-calculator"
  }
];

const appGrid = document.getElementById("app-grid");
const appDialog = document.getElementById("app-dialog");
const dialogClose = document.getElementById("dialog-close");
const screenshotGallery = document.getElementById("screenshot-gallery");
const screenshotPrevious = document.getElementById("screenshot-previous");
const screenshotNext = document.getElementById("screenshot-next");
const screenshotCounter = document.getElementById("screenshot-counter");
let screenshotIndex = 0;
let screenshotAnimationId = null;

function screenshotOffsets() {
  const images = [...screenshotGallery.querySelectorAll("img")];
  return images.map(image => image.offsetLeft - images[0].offsetLeft);
}

function updateScreenshotControls() {
  const offsets = screenshotOffsets();
  screenshotCounter.textContent = `${offsets.length ? screenshotIndex + 1 : 0} / ${offsets.length}`;
  screenshotPrevious.disabled = !offsets.length || screenshotIndex === 0;
  screenshotNext.disabled = !offsets.length || screenshotIndex === offsets.length - 1;
}

function syncScreenshotSelection() {
  if (screenshotAnimationId !== null) return;
  const offsets = screenshotOffsets();
  screenshotIndex = offsets.reduce((nearest, offset, index) =>
    Math.abs(offset - screenshotGallery.scrollLeft) <
    Math.abs(offsets[nearest] - screenshotGallery.scrollLeft) ? index : nearest, 0);
  updateScreenshotControls();
}

function stopScreenshotAnimation() {
  if (screenshotAnimationId !== null) cancelAnimationFrame(screenshotAnimationId);
  screenshotAnimationId = null;
  screenshotGallery.style.removeProperty("scroll-snap-type");
}

function navigateScreenshot(direction) {
  const offsets = screenshotOffsets();
  if (!offsets.length) return;
  screenshotIndex = Math.max(0, Math.min(offsets.length - 1, screenshotIndex + direction));
  updateScreenshotControls();

  if (reducedMotion.matches) {
    stopScreenshotAnimation();
    screenshotGallery.scrollTo({left: offsets[screenshotIndex], behavior: "instant"});
    return;
  }
  // Retarget the running loop without restarting it or queuing native animations.
  if (screenshotAnimationId !== null) return;
  screenshotGallery.style.scrollSnapType = "none";
  let previousTime = null;
  function animate(time) {
    const elapsed = previousTime === null ? 16 : Math.min(time - previousTime, 64);
    previousTime = time;
    const target = screenshotOffsets()[screenshotIndex] || 0;
    const distance = target - screenshotGallery.scrollLeft;
    if (Math.abs(distance) <= 1) {
      screenshotGallery.scrollTo({left: target, behavior: "instant"});
      stopScreenshotAnimation();
      return;
    }
    // A short time constant gives visible progress on every frame, even during bursts.
    screenshotGallery.scrollTo({
      left: screenshotGallery.scrollLeft + distance * (1 - Math.exp(-elapsed / 35)),
      behavior: "instant"
    });
    screenshotAnimationId = requestAnimationFrame(animate);
  }
  screenshotAnimationId = requestAnimationFrame(animate);
}

function layoutScreenshots() {
  if (!appDialog.open) return;
  const images = screenshotGallery.querySelectorAll("img");
  const last = images[images.length - 1];
  const style = getComputedStyle(screenshotGallery);
  // Leave room for even a narrow final screenshot to reach the leading snap point.
  const tail = last ? Math.max(0, screenshotGallery.clientWidth -
    parseFloat(style.paddingLeft) - parseFloat(style.paddingRight) -
    last.getBoundingClientRect().width - parseFloat(style.columnGap)) : 0;
  screenshotGallery.style.setProperty("--screenshot-tail", `${tail}px`);
  const offsets = screenshotOffsets();
  stopScreenshotAnimation();
  screenshotGallery.scrollTo({left: offsets[screenshotIndex] || 0, behavior: "instant"});
  updateScreenshotControls();
}

screenshotPrevious.addEventListener("click", () => navigateScreenshot(-1));
screenshotNext.addEventListener("click", () => navigateScreenshot(1));
screenshotGallery.addEventListener("scroll", syncScreenshotSelection, { passive: true });
screenshotGallery.addEventListener("scrollend", syncScreenshotSelection);
for (const event of ["wheel", "touchstart", "pointerdown"]) {
  screenshotGallery.addEventListener(event, () => {
    stopScreenshotAnimation();
    syncScreenshotSelection();
  }, { passive: true });
}
appDialog.addEventListener("close", stopScreenshotAnimation);
reducedMotion.addEventListener("change", () => {
  if (reducedMotion.matches) layoutScreenshots();
});
const screenshotResizeObserver = new ResizeObserver(layoutScreenshots);
screenshotResizeObserver.observe(screenshotGallery);

appDialog.addEventListener("keydown", event => {
  if (!appDialog.open || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey ||
      event.target.closest("input, textarea, select, [contenteditable]")) return;
  if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
    event.preventDefault();
    navigateScreenshot(event.key === "ArrowLeft" ? -1 : 1);
  }
});

function storeUrl(app) {
  return `https://apps.apple.com/us/app/${app.slug}/id${app.id}`;
}

function fallbackIcon(app) {
  const initials = app.name
    .split(" ")
    .map(word => word[0])
    .slice(0, 2)
    .join("");

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120">
      <defs>
        <linearGradient id="g" x2="1" y2="1">
          <stop stop-color="#2e397b"/>
          <stop offset="1" stop-color="#6e3ea8"/>
        </linearGradient>
      </defs>
      <rect width="120" height="120" rx="24" fill="url(#g)"/>
      <text x="60" y="71" font-family="Arial"
            font-size="38" font-weight="bold"
            fill="white" text-anchor="middle">${initials}</text>
    </svg>
  `;

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

function createAppCard(app) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "app-card";

  const icon = document.createElement("img");
  icon.className = "app-icon";
  icon.src = app.icon || fallbackIcon(app);
  icon.alt = `${app.name} icon`;
  icon.loading = "lazy";
  icon.onerror = () => {
    icon.onerror = null;
    icon.src = fallbackIcon(app);
  };

  const category = document.createElement("span");
  category.className = "app-card-category";
  category.textContent = app.category;

  const title = document.createElement("h4");
  title.textContent = app.name;

  const description = document.createElement("p");
  description.className = "app-card-description";
  description.textContent = app.summary;

  const more = document.createElement("span");
  more.className = "app-card-more";
  more.textContent = "Explore App ↗";

  button.append(icon, category, title, description, more);

  button.addEventListener("click", () => openApp(app));

  return button;
}

function renderApps() {
  appGrid.replaceChildren(...apps.map(createAppCard));
}

function openApp(app) {
  const icon = document.getElementById("app-dialog-icon");
  const gallery = document.getElementById("screenshot-gallery");

  icon.src = app.icon || fallbackIcon(app);
  icon.alt = `${app.name} icon`;
  icon.onerror = () => {
    icon.onerror = null;
    icon.src = fallbackIcon(app);
  };

  document.getElementById("app-dialog-title").textContent = app.name;
  document.getElementById("app-dialog-category").textContent = app.category;

  document.getElementById("app-dialog-description").textContent =
    app.longDescription || app.description;

  document.getElementById("app-dialog-link").href = storeUrl(app);

  screenshotResizeObserver.disconnect();
  stopScreenshotAnimation();
  screenshotIndex = 0;
  gallery.replaceChildren();
  gallery.style.setProperty("--screenshot-tail", "0px");

  const screenshots = app.screenshots || [];

  screenshots.forEach((url, index) => {
    const img = document.createElement("img");
    img.src = url;
    img.alt = `${app.name} screenshot ${index + 1}`;
    img.loading = "lazy";
    gallery.appendChild(img);
    screenshotResizeObserver.observe(img);
  });

  document.getElementById("screenshot-status").textContent =
    screenshots.length
      ? `${screenshots.length} screenshots · Swipe to explore`
      : "Screenshots unavailable. View the App Store listing for previews.";

  appDialog.showModal();
  gallery.scrollTo({left: 0, behavior: "instant"});
  screenshotResizeObserver.observe(gallery);
  layoutScreenshots();
}

dialogClose.addEventListener("click", () => appDialog.close());

appDialog.addEventListener("click", event => {
  if (event.target === appDialog) {
    appDialog.close();
  }
});

/* Local screenshots are listed above; retrieve only artwork and descriptions from Apple. */

async function loadAppStoreData() {
  const ids = apps.map(app => app.id).join(",");

  try {
    const response = await fetch(
      `https://itunes.apple.com/lookup?id=${ids}&country=us&entity=software`
    );

    if (!response.ok) {
      throw new Error("Apple catalog request failed");
    }

    const data = await response.json();

    for (const result of data.results || []) {
      const app = apps.find(item => item.id === result.trackId);

      if (!app) continue;

      app.icon =
        result.artworkUrl512 ||
        result.artworkUrl100 ||
        fallbackIcon(app);

      app.longDescription = result.description || app.description;
    }

    renderApps();

  } catch (error) {
    console.warn("Could not load App Store artwork:", error);
  }
}

renderApps();
loadAppStoreData();