/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  💌  EVERYTHING PERSONAL LIVES HERE
 * ─────────────────────────────────────────────────────────────────────────────
 *  Edit this one file to make the site entirely yours: names, dates, passcode,
 *  photos, memories, reasons, the letter, and the song.
 *
 *  PHOTOS — to use your own pictures:
 *    1. Drop them into  /public/photos/   (e.g. /public/photos/first-date.jpg)
 *    2. Replace any `unsplash("...")` call below with "/photos/first-date.jpg"
 *
 *  MUSIC — to use your song:
 *    1. Drop an .mp3 into /public/audio/   (e.g. /public/audio/our-song.mp3)
 *    2. Update `music.src`, `music.title` and `music.artist` below.
 * ─────────────────────────────────────────────────────────────────────────────
 */

/** Helper for Unsplash placeholder photos. */
const unsplash = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1600&q=80`;

// ─── Types ───────────────────────────────────────────────────────────────────

export type MilestoneIcon =
  | "coffee"
  | "heart"
  | "plane"
  | "moon"
  | "gem"
  | "infinity";

export interface Milestone {
  date: string;
  title: string;
  memory: string;
  image: string;
  imageAlt: string;
  icon: MilestoneIcon;
}

/** Bento tile size on desktop (4-col grid) and mobile (2-col grid). */
export type GallerySize = "large" | "tall" | "wide" | "square";

export interface GalleryItem {
  image: string;
  alt: string;
  caption: string;
  /** The handwritten note revealed on the back of the photo. */
  note: string;
  date: string;
  size: GallerySize;
}

// ─── Couple & dates ──────────────────────────────────────────────────────────

export const couple = {
  /** What you call her — used in headings and the letter. */
  herName: "My Love",
  /** How you sign off. */
  yourName: "Randika",
};

/**
 * The moment your story began. The live counter in the hero ticks up from here.
 * Format: YYYY-MM-DDTHH:mm:ss (local time).
 */
export const relationshipStart = "2025-10-26T00:00:00";

// ─── Passcode gate ───────────────────────────────────────────────────────────

export const gate = {
  /** 8 digits, DDMMYYYY — 26 October 2025 → "26102025". */
  passcode: "26102025",
  eyebrow: "A little something, just for you",
  title: "For Your Eyes Only",
  prompt: "Enter the day our forever began",
  format: "DD · MM · YYYY",
  /** Shown after a few wrong attempts. */
  hint: "Think of October 26, 2025… the day our hearts connected. ♡",
  wrongMessage: "Not quite, my love — try once more.",
  successMessage: "Welcome home, my love.",
  /** Keep her unlocked for the rest of the browser session. */
  rememberForSession: true,
};

// ─── Hero ────────────────────────────────────────────────────────────────────

export const hero = {
  eyebrow: "26 · 10 · 2025 — Forever",
  /** Rendered as: "{titleLead} {titleAccent}" with the accent in italic rose. */
  titleLead: "Happy Anniversary,",
  titleAccent: "My Love",
  subtitle:
    "From October 26, 2025 to forever — every second of this journey is a quiet miracle I get to call ours.",
  counterLabel: "Together for",
  counterFootnote: "and counting, one heartbeat at a time",
  scrollCue: "Scroll to our story",
};

// ─── Timeline ────────────────────────────────────────────────────────────────

export const timelineSection = {
  eyebrow: "Chapter by chapter",
  title: "Our Story",
  subtitle:
    "Some moments are small enough to fit in a coffee cup, and big enough to change a whole life.",
};

export const milestones: Milestone[] = [
  {
    date: "October 26, 2025",
    title: "Our First Day of Love",
    memory:
      "The unforgettable day our hearts connected and our love story officially began. A single moment that quietly and beautifully rewrote the rest of my life.",
    image: "/photos/first-day-of-love.jpg",
    imageAlt: "Us together by the sea on our first day of love",
    icon: "heart",
  },
  {
    date: "March 12, 2026",
    title: "Our First Adventure",
    memory:
      "Our very first adventure together — laughing, holding each other close, and realizing every place in the world is magical as long as I am with you.",
    image: "/photos/first-adventure.jpg",
    imageAlt: "Us together on our first adventure",
    icon: "plane",
  },
  {
    date: "May 2026",
    title: "The Sunset By The Water",
    memory:
      "Holding hands as the ocean waves gently reached our feet, with the golden sunset all around us. The world faded away, leaving just you and me.",
    image: "/photos/sunset-by-the-water.jpg",
    imageAlt: "Our hands held together by the gentle ocean waves at sunset",
    icon: "heart",
  },
  {
    date: "Today & Always",
    title: "Our Future Together",
    memory:
      "Being our true, silly, and happiest selves together. Here's to all the laughter, the journeys we have yet to take, and a lifetime of beautiful tomorrows side by side.",
    image: "/photos/our-future-together.jpg",
    imageAlt: "Us sharing laughs and sweet moments together",
    icon: "infinity",
  },
];

// ─── Gallery ─────────────────────────────────────────────────────────────────

export const gallerySection = {
  eyebrow: "Little frames of forever",
  title: "Moments I Keep",
  subtitle: "Hover or tap a photo to read the note I hid on the back.",
};

/**
 * Seven tiles fill the bento grid perfectly.
 * Desktop rows → [large large tall square] [large large tall square] [wide wide square square]
 */
export const gallery: GalleryItem[] = [
  {
    image: "/photos/memories/flower-in-her-hair.jpg",
    alt: "Radiant portrait of her with curly hair, sunglasses, and a flower tucked in her hair",
    caption: "Flower In Your Hair",
    note: "With a flower tucked behind your ear and the sun catching your eyes — you take my breath away every single day.",
    date: "May 10, 2026",
    size: "large",
  },
  {
    image: "/photos/memories/peace-sign-adventure.jpg",
    alt: "Playfully posing with a bucket hat and peace sign in front of a rock waterfall",
    caption: "Her Playful Spirit",
    note: "Your silly peace signs and cute bucket hat — every adventure is brighter just watching you be so effortlessly happy.",
    date: "March 10, 2026",
    size: "tall",
  },
  {
    image: "/photos/memories/among-the-roses.jpg",
    alt: "Her reaching out to touch beautiful pink roses on a garden fence",
    caption: "Among The Roses",
    note: "You reached out for the roses, but to me, nothing in that entire garden could ever compare to your gentle beauty.",
    date: "April 11, 2026",
    size: "square",
  },
  {
    image: "/photos/memories/sweet-indoor-smile.jpg",
    alt: "Her sweet, playful indoor candid smile",
    caption: "That Sweet Smile",
    note: "The candid smiles, the soft glances, and the pure comfort of knowing my heart is completely safe with you.",
    date: "April 9, 2026",
    size: "square",
  },
  {
    image: "/photos/memories/cozy-home-selfie.jpg",
    alt: "Close selfie of us together smiling warmly at home",
    caption: "Home In Your Arms",
    note: "No fancy dates needed. Just you, me, cozy evenings at home, and the peace of being right where I belong.",
    date: "May 21, 2026",
    size: "wide",
  },
  {
    image: "/photos/memories/grocery-date-together.jpg",
    alt: "Sitting close together smiling warmly on a casual everyday date",
    caption: "Our Everyday Magic",
    note: "Even the simplest errand or grocery run turns into a precious memory when your hand is tucked beside mine.",
    date: "May 28, 2026",
    size: "square",
  },
  {
    image: "/photos/memories/hands-across-the-table.jpg",
    alt: "Our hands held together intertwined across the cafe table",
    caption: "Held Forever",
    note: "My hand in yours across the table. A quiet, unbreakable promise that no matter where life leads, I will never let go.",
    date: "June 3, 2026",
    size: "square",
  },
];

// ─── Reasons ─────────────────────────────────────────────────────────────────

export const reasonsSection = {
  eyebrow: "An endless list",
  title: "Reasons Why I Love You",
  subtitle: "I could fill a thousand cards. Here are a few to start with.",
  button: "Show Me Another Reason",
  swipeHint: "or swipe the card",
};

export const reasons: string[] = [
  "The way your whole face lights up a second before you laugh.",
  "You make ordinary Tuesdays feel like little holidays.",
  "You remember the tiny things — the songs, the dates, the way I take my tea.",
  "Your kindness isn't loud. It's quiet, constant, and everywhere.",
  "You hold my hand in crowds like you're making sure I'm still real.",
  "You believe in me on the days I forget how.",
  "The sleepy 'good morning' voice I'd wake up early just to hear.",
  "You turn every kitchen into a dance floor.",
  "You're brave in ways you don't even notice.",
  "Home stopped being a place the day I met you. It's you.",
  "You never let me go to sleep angry — and you're always right about that.",
  "Your hugs fix things that words can't.",
  "You make me want to be a better man, simply by being you.",
  "Because every single day since October 26, 2025, you still give me butterflies.",
];

// ─── Love letter ─────────────────────────────────────────────────────────────

export const letterSection = {
  eyebrow: "Sealed with love",
  title: "A Letter For You",
  subtitle: "Some things are better said slowly. Open it when you're ready.",
  tapToOpen: "Tap the seal to open",
  closeLabel: "Fold the letter",
};

export const letter = {
  date: "October 26, 2026",
  salutation: "My dearest love,",
  paragraphs: [
    "When our love story officially began on October 26, 2025, I knew that my life had changed forever. Every single day since then has made me more grateful and more deeply in love than words could ever capture.",
    "Thank you for every early morning and every late night. For the patience you've shown me when I didn't deserve it, and the laughter you've given me when I needed it most. You have turned a house into a home, and a life into a story worth telling.",
    "I love the way you dream out loud. I love how fiercely you care. I love that, even now, my heart does that silly little skip whenever you walk into a room.",
    "Whatever the next chapters hold — the adventures, the quiet Sundays, the hard days and the golden ones — I want to live every single page of it beside you.",
    "Happy anniversary, my love. Today, tomorrow, and for all the forevers after that, I choose you.",
  ],
  closing: "Forever and always yours,",
  signature: "Randika",
};

// ─── Music ───────────────────────────────────────────────────────────────────

export const music = {
  /** Public-domain recording from Wikimedia Commons. Replace with your song! */
  src: "/audio/our-song.mp3",
  title: "Clair de Lune",
  artist: "Claude Debussy",
  /** Start the song automatically the moment she unlocks the site. */
  autoplayOnUnlock: true,
  volume: 0.55,
  prompt: "Play our song",
};

// ─── Footer ──────────────────────────────────────────────────────────────────

export const footer = {
  line: "Made with all my love, for the love of my life.",
  signoff: "Our Love Story · Since October 26, 2025",
};
