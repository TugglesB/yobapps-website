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
    name: "Blind Opera",
    category: "Games",
    summary: "Your music becomes the world.",
    description:
      "Turn your own music into reactive journeys through glowing tracks, cosmic scenery, and surreal environments.",
    slug: "blind-opera"
  },
  {
    id: 6772285434,
    name: "YOB Toy Camera",
    category: "Photo & Video",
    summary: "Turn ordinary moments into miniature worlds.",
    description:
      "Capture miniature-style scenes with live tilt-shift focus, creative presets, and a collection of photo effects.",
    slug: "yob-toy-camera"
  },
  {
    id: 6762022393,
    name: "Unfortunate Cookie: Misfortune",
    category: "Entertainment",
    summary: "Fortune cookies with a darker sense of humor.",
    description:
      "A playful twist on the traditional fortune cookie, serving up misfortune instead of good luck.",
    slug: "unfortunate-cookie-misfortune"
  },
  {
    id: 6761299619,
    name: "YOB Maker Assistant",
    category: "Productivity",
    summary: "Practical tools for creative makers.",
    description:
      "A helpful companion for organizing and managing the practical side of making things.",
    slug: "yob-maker-assistant"
  },
  {
    id: 6761371407,
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

  gallery.replaceChildren();

  const screenshots = app.screenshots || [];

  screenshots.forEach((url, index) => {
    const img = document.createElement("img");
    img.src = url;
    img.alt = `${app.name} screenshot ${index + 1}`;
    img.loading = "lazy";
    gallery.appendChild(img);
  });

  document.getElementById("screenshot-status").textContent =
    screenshots.length
      ? `${screenshots.length} screenshots · Swipe to explore`
      : "Screenshots unavailable. View the App Store listing for previews.";

  appDialog.showModal();
}

dialogClose.addEventListener("click", () => appDialog.close());

appDialog.addEventListener("click", event => {
  if (event.target === appDialog) {
    appDialog.close();
  }
});

/* Retrieve public app artwork and screenshots from Apple */

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

      app.screenshots = [
        ...(result.screenshotUrls || []),
        ...(result.ipadScreenshotUrls || [])
      ];

      app.longDescription = result.description || app.description;
    }

    renderApps();

  } catch (error) {
    console.warn("Could not load App Store artwork:", error);
  }
}

renderApps();
loadAppStoreData();