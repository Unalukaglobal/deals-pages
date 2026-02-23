import { DealCardData } from "@/types/deal";

function assignCategory(name: string): string {
  const lower = name.toLowerCase();
  if (lower.includes("drone") || lower.includes("camera") || lower.includes("vlog") || lower.includes("body cam"))
    return "Tecnologia";
  if (lower.includes("creatine") || lower.includes("workout") || lower.includes("sport"))
    return "Deportes";
  if (lower.includes("watch")) return "Accesorios";
  if (lower.includes("controller") || lower.includes("gamepad") || lower.includes("gaming") || lower.includes("game"))
    return "Gaming";
  if (lower.includes("earbuds") || lower.includes("headphone") || lower.includes("audio"))
    return "Audio";
  return "Otros";
}

export const seedDeals: DealCardData[] = [
  {
    id: "0a02f44f-b32a-4db4-9299-469c2783af6e",
    title: "4K Mini Body Camera 128GB - Action Body Cam with Audio & Video",
    productUrl:
      "https://ikigai-tienda-1.myshopify.com/products/4k-mini-body-camera-128gb-action-body-cam-with-audio-video-thumb-hands-free-waterproof-recording-wearable-cameras-pov-worn-portable-personal-camcorder-for-work-travel-pet-walk-swim-1",
    amazonLink:
      "https://www.amazon.com/-/es/Mini-C%C3%A1mara-Corporal-128GB-Impermeable/dp/B0F66YN221/",
    priceLocal: 369,
    priceUsd: 108.37,
    imageUrl:
      "https://nyc3.digitaloceanspaces.com/unalukaglobal/screenshots/agent-deals/0a02f44f-b32a-4db4-9299-469c2783af6e.jpg",
    images: [],
    createdAt: new Date("2026-02-13T01:48:24.255Z"),
    category: "Tecnologia",
  },
  {
    id: "1956967f-47f3-496f-80c9-c38b7421eff1",
    title: "AMP Science Creatine Monohydrate 60 Servings - Pure Unflavored Powder",
    productUrl:
      "https://ikigai-tienda-1.myshopify.com/products/amp-science®-creatine-monohydrate-60-servings-pure-unflavored-creatine-powder-for-strength-muscle-growth-power-recovery-high-intensity-training",
    amazonLink:
      "https://www.amazon.com/dp/B0FSGD8Q7Z/",
    priceLocal: 174.8,
    priceUsd: 51.93,
    imageUrl:
      "https://nyc3.digitaloceanspaces.com/unalukaglobal/screenshots/agent-deals/1956967f-47f3-496f-80c9-c38b7421eff1.jpg",
    images: [],
    createdAt: new Date("2026-02-13T00:14:01.331Z"),
    category: "Deportes",
  },
  {
    id: "33685873-4f36-486d-a1a6-f6d9ea33c35a",
    title: "Casio Men's Vintage A168WA-1 Electro Luminescence Watch",
    productUrl:
      "https://ikigai-tienda-1.myshopify.com/products/casio-mens-vintage-a168wa-1-electro-luminescence-watch",
    amazonLink:
      "https://www.amazon.com/Casio-Vintage-A168WA-1YES-Electro-Luminescence/dp/B000LAKYW8/",
    priceLocal: 166.85,
    priceUsd: 49.29,
    imageUrl:
      "https://nyc3.digitaloceanspaces.com/unalukaglobal/screenshots/agent-deals/33685873-4f36-486d-a1a6-f6d9ea33c35a.jpg",
    images: [],
    createdAt: new Date("2026-02-11T15:51:19.037Z"),
    category: "Accesorios",
  },
  {
    id: "a1c9d03e-0663-4c1d-b81d-2438551c06aa",
    title: "BIRDMAN Micronized Creatine Monohydrate Powder - 80 Servings",
    productUrl:
      "https://ikigai-tienda-1.myshopify.com/products/birdman-micronized-creatine-monohydrate-powder-muscle-recovery-caffeine-free-creatine-pre-workout-vegan-post-workout-gluten-free-sugar-free-80-servings-5-grams-each-0-8lb",
    amazonLink:
      "https://www.amazon.com/BIRDMAN-Micronized-Creatine-Monohydrate-Recovery/dp/B0CQ8W1JGR/",
    priceLocal: 152.56,
    priceUsd: 45.07,
    imageUrl:
      "https://nyc3.digitaloceanspaces.com/unalukaglobal/screenshots/agent-deals/a1c9d03e-0663-4c1d-b81d-2438551c06aa.jpg",
    images: [],
    createdAt: new Date("2026-02-11T15:50:09.161Z"),
    category: "Deportes",
  },
  {
    id: "f8ed57f7-0822-4dd2-88b0-e2acfb9ce45c",
    title: "GameSir G8 Plus Bluetooth Controller for Switch, iOS & Android",
    productUrl:
      "https://ikigai-tienda-1.myshopify.com/products/gamesir-g8-plus-bluetooth-mobile-game-controller-for-switch-ios-android-tablets-wireless-gamepad-with-hall-effect-joysticks-hall-trigger-play-minecraft-genshin-impact-call-of-duty-mobile",
    amazonLink:
      "https://www.amazon.com/-/es/Bluetooth-Controller-iOS-Wireless-Joysticks-Minecraft/dp/B0D8JJRCJN/",
    priceLocal: 407.38,
    priceUsd: 120.35,
    imageUrl:
      "https://nyc3.digitaloceanspaces.com/unalukaglobal/screenshots/agent-deals/f8ed57f7-0822-4dd2-88b0-e2acfb9ce45c.jpg",
    images: [],
    createdAt: new Date("2026-02-11T15:46:39.921Z"),
    category: "Gaming",
  },
  {
    id: "c5d80a7a-f6e7-457b-a809-b943897e05ef",
    title: "Soundcore Sport X20 by Anker - Wireless Earbuds, Noise Cancelling, IP68",
    productUrl:
      "https://ikigai-tienda-1.myshopify.com/products/soundcore-sport-x20-by-anker-true-wireless-workout-earbuds-rotatable-and-extendable-ear-hooks-noise-cancelling-deep-bass-ip68-waterproof-sweatproof-dustproof-48h-play-sport-earbuds-for-gym",
    amazonLink:
      "https://www.amazon.com/-/es/Soundcore-Auriculares-True-Wireless-Entrenamiento-Extensibles/dp/B0CRT6HQ82/",
    priceLocal: 397.26,
    priceUsd: 117.36,
    imageUrl:
      "https://nyc3.digitaloceanspaces.com/unalukaglobal/screenshots/agent-deals/c5d80a7a-f6e7-457b-a809-b943897e05ef.jpg",
    images: [],
    createdAt: new Date("2026-02-11T07:48:19.569Z"),
    category: "Audio",
  },
  {
    id: "945b72b3-d98d-458f-a786-320099be5009",
    title: "Turtle Beach Atom Mobile Game Controller - Bluetooth, Low Latency",
    productUrl:
      "https://ikigai-tienda-1.myshopify.com/products/turtle-beach-atom-mobile-game-controller-with-bluetooth-for-cloud-gaming-on-iphone-with-compact-shape-console-style-controls-low-latency-bluetooth-cobalt-blue-2",
    amazonLink: "https://www.amazon.com/dp/B0CBCRRVBT?th=1",
    priceLocal: 265.62,
    priceUsd: 78.47,
    imageUrl:
      "https://nyc3.digitaloceanspaces.com/unalukaglobal/screenshots/agent-deals/945b72b3-d98d-458f-a786-320099be5009.jpg",
    images: [],
    createdAt: new Date("2026-02-11T06:13:13.535Z"),
    category: "Gaming",
  },
  {
    id: "d5a65535-bf5e-4197-bd5f-5df8dde714c5",
    title: "Wireless Phone Controller for iPhone/Android/Switch with Hall Joystick & LED",
    productUrl:
      "https://ikigai-tienda-1.myshopify.com/products/wireless-phone-controller-for-iphone-android-switch-1-2-oled-ipad-mini-with-hall-joystick-led-mobile-gaming-controller-for-ios-support-xbox-steam-link-geforce-now-arcade-call-of-duty-roblox-2",
    amazonLink:
      "https://www.amazon.com/-/es/Controlador-tel%C3%A9fono-inal%C3%A1mbrico-Joystick-compatible-Smartphone/dp/B0F4KD1WBR/",
    priceLocal: 272.53,
    priceUsd: 80.51,
    imageUrl:
      "https://nyc3.digitaloceanspaces.com/unalukaglobal/screenshots/agent-deals/d5a65535-bf5e-4197-bd5f-5df8dde714c5.jpg",
    images: [],
    createdAt: new Date("2026-02-11T05:13:25.630Z"),
    category: "Gaming",
  },
  {
    id: "d0d40efd-f67d-43af-b57f-5a50b59c870c",
    title: "DJI Neo Three-Battery Combo - Mini Drone 4K UHD Camera, 135g",
    productUrl:
      "https://ikigai-tienda-1.myshopify.com/products/dji-neo-three-battery-combo-mini-drone-4k-uhd-camera-for-adults-135g-self-flying-drone-that-follows-you-palm-takeoff-subject-tracking-quickshots-stabilized-video-controller-free-gray",
    amazonLink:
      "https://www.amazon.com/gp/product/B0DDS1368S/",
    priceLocal: 1009,
    priceUsd: 298.82,
    imageUrl:
      "https://nyc3.digitaloceanspaces.com/unalukaglobal/screenshots/agent-deals/0a02f44f-b32a-4db4-9299-469c2783af6e.jpg",
    images: [],
    createdAt: new Date("2026-02-17T21:53:54.799Z"),
    category: "Tecnologia",
  },
  {
    id: "a93534e2-61f2-4038-b80a-c005abe6925d",
    title: "DJI Osmo Pocket 3 - Vlogging Camera 1'' CMOS & 4K/120fps, 3-Axis",
    productUrl:
      "https://ikigai-tienda-1.myshopify.com/products/dji-osmo-pocket-3-vlogging-cameras-with-1-cmos-4k-120fps-vlog-camera-3-axis-stabilization-fast-focusing-face-object-tracking-digital-vlogging-camera-for-youtube",
    amazonLink:
      "https://www.amazon.com/gp/product/B0CG19QXWD/",
    priceLocal: 1945,
    priceUsd: 575.55,
    imageUrl:
      "https://nyc3.digitaloceanspaces.com/unalukaglobal/screenshots/agent-deals/1956967f-47f3-496f-80c9-c38b7421eff1.jpg",
    images: [],
    createdAt: new Date("2026-02-17T21:53:51.403Z"),
    category: "Tecnologia",
  },
];

export const categories = [
  { name: "Todos", slug: "todos", icon: "LayoutGrid" },
  { name: "Tecnologia", slug: "tecnologia", icon: "Cpu" },
  { name: "Gaming", slug: "gaming", icon: "Gamepad2" },
  { name: "Audio", slug: "audio", icon: "Headphones" },
  { name: "Deportes", slug: "deportes", icon: "Dumbbell" },
  { name: "Accesorios", slug: "accesorios", icon: "Watch" },
] as const;
