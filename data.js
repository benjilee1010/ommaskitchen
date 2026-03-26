/** @typedef {{ id: string; name: string; price: number; description: string; badge?: string; leaveOut?: string[]; orderable?: boolean }} MenuItem */
/** @typedef {{ title: string; items: MenuItem[]; subtitle?: string; kbbq?: boolean }} MenuSection */
/** @typedef {{ id: string; name: string; cuisine: string; blurb: string; eta: string; accent: string; image: string; customizeDefaults: { leaveOut: string[] }; sections: MenuSection[] }} Restaurant */

/** @type {Restaurant} */
const RESTAURANT = {
  id: "ommas-kitchen",
  name: "Omma's Kitchen",
  cuisine: "Korean · Premium · Comfort & late night",
  blurb: "Korean food made with love.",
  eta: "20 to 35 min",
  accent: "#c73e4a",
  image: "assets/menu-hero-japanese-banner.jpg",
  customizeDefaults: {
    leaveOut: [
      "No green onion",
      "Less spicy / mild",
      "No egg",
      "No sesame",
      "No meat (vegetarian prep)",
    ],
  },
  sections: [
    {
      title: "Family deals",
      subtitle: "Bundle a few favorites and keep a little extra in your pocket.",
      items: [
        {
          id: "deal-table-4",
          name: "Omma's table for 4",
          price: 68,
          description:
            "2 rice bowls (bulgogi or bibimbap), large kimchi jjigae to share, japchae, and half yangnyeom chicken. Enough for a cozy family night.",
          badge: "Save about $15",
        },
        {
          id: "deal-feast-6",
          name: "Feast for 6",
          price: 108,
          description:
            "Three mains (mix of stews & noodles), large japchae, extra banchan trio, and 4 drinks. Great for guests.",
          badge: "Save about $22",
        },
        {
          id: "deal-duo",
          name: "Date night duo",
          price: 42,
          description: "Any two entrées from Rice dishes or Noodles (excl. family bundles).",
          badge: "Save about $9",
        },
        {
          id: "deal-weekend-4",
          name: "Weekend comfort set",
          price: 74,
          description:
            "Any 2 stews, 1 japchae, 1 large tteokbokki, and banchan sampler. Built for a cozy 4-person dinner.",
          badge: "Save about $13",
        },
        {
          id: "deal-late-night-crew",
          name: "Late night crew pack",
          price: 89,
          description:
            "2 noodle mains, 2 rice mains, half fried chicken, and 4 canned drinks. Great for group cravings.",
          badge: "Save about $18",
        },
      ],
    },
    {
      title: "Rice dishes",
      items: [
        {
          id: "rice-bibimbap",
          name: "Bibimbap",
          price: 17.5,
          description: "Warm rice with seasonal namul, gochujang, egg, and sesame, mixed at the table.",
          leaveOut: ["No fried egg", "No gochujang (sauce on side)", "No green onion", "No sesame", "No meat (vegetarian prep)"],
        },
        {
          id: "rice-dolsot-bibimbap",
          name: "Dolsot bibimbap",
          price: 18.5,
          description: "Sizzling stone bowl for crispy rice edges, namul, gochujang, and fried egg.",
          badge: "Popular",
          leaveOut: ["No fried egg", "No gochujang (sauce on side)", "No green onion", "Less spicy / mild", "No sesame", "No meat (vegetarian prep)"],
        },
        {
          id: "rice-bokkeum-bap",
          name: "Bokkeum bap (fried rice)",
          price: 16.5,
          description: "Wok fried rice with kimchi or bulgogi style. Ask for your preference.",
          leaveOut: ["No kimchi", "No egg", "No pork", "Less spicy / mild"],
        },
        {
          id: "rice-gimbap",
          name: "Gimbap",
          price: 14,
          description: "Seaweed rolls with pickled radish, egg, vegetables, and your choice of filling.",
          leaveOut: ["No egg", "No pickled radish", "Vegetarian roll"],
        },
        {
          id: "rice-oyako-don",
          name: "Oyako don",
          price: 17,
          description: "Simmered chicken and egg over rice, comforting and mild.",
          leaveOut: ["No onion", "No egg", "Gluten free soy on request"],
        },
      ],
    },
    {
      title: "Noodles",
      items: [
        {
          id: "noodle-jjajangmyeon",
          name: "Jjajangmyeon",
          price: 17,
          description: "Fresh noodles in savory black bean sauce with pork and vegetables.",
          leaveOut: ["No pork", "No onion", "Less oil", "No cucumber garnish"],
        },
        {
          id: "noodle-jjamppong",
          name: "Jjamppong",
          price: 18.5,
          description: "Spicy seafood noodle soup with mussels, squid, shrimp, and vegetables.",
          badge: "Spicy",
          leaveOut: ["No shellfish", "No pork", "Less spicy / mild", "No mussels"],
        },
        {
          id: "noodle-udon",
          name: "Udon",
          price: 16.5,
          description: "Thick wheat noodles in a light broth with vegetables and optional tempura.",
          leaveOut: ["No tempura", "Vegetable only"],
        },
        {
          id: "noodle-naengmyeon",
          name: "Naengmyeon (mul)",
          price: 17.5,
          description: "Chewy buckwheat noodles in icy broth with pear, cucumber, and egg.",
          leaveOut: ["No egg", "No pear", "Extra vinegar", "Less cold broth"],
        },
        {
          id: "noodle-bibim-naengmyeon",
          name: "Bibim naengmyeon",
          price: 18.5,
          description: "Cold buckwheat noodles tossed in spicy sweet gochujang sauce with beef, egg, pear, and cucumber.",
          badge: "Spicy",
          leaveOut: ["No beef", "No egg", "Less spicy / mild", "No pear", "No sesame"],
        },
        {
          id: "noodle-ramyeon",
          name: "Ramyeon",
          price: 13,
          description: "Korean instant noodles upgraded with egg, cheese, and vegetables.",
          badge: "Late night",
          leaveOut: ["No egg", "No cheese", "Less spicy / mild"],
        },
        {
          id: "noodle-japchae",
          name: "Japchae",
          price: 16,
          description: "Sweet potato glass noodles stir fried with vegetables and thinly sliced beef.",
          leaveOut: ["No beef", "No egg", "No sesame", "No green onion"],
        },
      ],
    },
    {
      title: "Soups & stews",
      items: [
        {
          id: "soup-seolleongtang",
          name: "Seolleongtang",
          price: 16,
          description: "Milky ox bone broth with brisket, noodles, and rice. Season to taste at the table.",
          leaveOut: ["No beef", "No green onion", "No noodles"],
        },
        {
          id: "soup-doenjang-jjigae",
          name: "Doenjang jjigae",
          price: 16.5,
          description: "Hearty soybean paste stew with tofu, zucchini, and potatoes.",
          leaveOut: ["No tofu", "No pork", "Less spicy / mild"],
        },
        {
          id: "soup-kimchi-jjigae",
          name: "Kimchi jjigae",
          price: 16.5,
          description: "Aged kimchi stew with pork belly, tofu, and steamed rice.",
          leaveOut: ["No pork", "No tofu", "Less spicy / mild"],
        },
        {
          id: "soup-sundubu",
          name: "Sundubu jjigae",
          price: 16,
          description: "Silky soft tofu stew, spicy broth, egg dropped in at the end.",
          badge: "Spicy",
          leaveOut: ["No egg", "No seafood", "Less spicy / mild"],
        },
        {
          id: "soup-galbitang",
          name: "Galbitang",
          price: 19.5,
          description: "Clear beef short rib soup with radish, glass noodles, and scallions.",
          leaveOut: ["No beef", "No green onion", "No noodles"],
        },
        {
          id: "soup-budae",
          name: "Budae jjigae",
          price: 18.5,
          description: "Army stew with spam, sausage, kimchi, ramyeon, and cheese, great for sharing.",
          leaveOut: ["No spam", "No cheese", "Less spicy / mild"],
        },
        {
          id: "soup-samgyetang",
          name: "Samgyetang",
          price: 20.5,
          description: "Whole young chicken stuffed with rice, ginseng, and jujube in a gentle broth.",
          leaveOut: ["No ginseng", "No rice stuffing"],
        },
      ],
    },
    {
      title: "Grilled & fried",
      items: [
        {
          id: "grill-galbi",
          name: "Galbi",
          price: 32,
          description: "Marinated beef short rib grilled and served with rice, lettuce wraps, and ssamjang.",
          badge: "Grilled",
          leaveOut: ["No rice", "No lettuce wrap", "No sesame", "Less sweet marinade"],
        },
        {
          id: "grill-bulgogi",
          name: "Bulgogi",
          price: 20,
          description: "Pear marinated sliced beef, onions, and sesame over rice or on its own.",
          leaveOut: ["No beef", "No onion", "No sesame", "Less sweet"],
        },
        {
          id: "grill-samgyeopsal",
          name: "Samgyeopsal",
          price: 20.5,
          description: "Thick cut pork belly, grilled until crisp. Wrap with garlic and ssamjang.",
          leaveOut: ["No garlic", "No spicy paste", "Well done"],
        },
        {
          id: "grill-tonkatsu",
          name: "Tonkatsu (donkkaseu)",
          price: 18.5,
          description: "Breaded pork cutlet, shredded cabbage, and tonkatsu sauce.",
          leaveOut: ["No cabbage", "Sauce on the side"],
        },
        {
          id: "grill-dakgalbi",
          name: "Dakgalbi",
          price: 20,
          description: "Spicy stir fried chicken with cabbage, rice cakes, and cheese finish optional.",
          badge: "Spicy",
          leaveOut: ["No cheese", "Less spicy / mild", "No rice cakes"],
        },
        {
          id: "grill-yangnyeom-chicken",
          name: "Yangnyeom chicken",
          price: 19.5,
          description: "Double fried chicken in a sweet and spicy glaze, half order, radish on the side.",
          badge: "Late night",
          leaveOut: ["No glaze / plain fried", "No pickled radish", "No sesame"],
        },
      ],
    },
    {
      title: "Sides & snacks",
      items: [
        {
          id: "side-pajeon",
          name: "Pajeon (green onion pancake)",
          price: 13,
          description: "Crispy savory pancake with scallions and soy vinegar dip.",
          leaveOut: ["Less oil", "No dip"],
        },
        {
          id: "side-haemul-pajeon",
          name: "Haemul pajeon (seafood pancake)",
          price: 16.5,
          description: "Green onion pancake loaded with squid, shrimp, and clams.",
          leaveOut: ["No shellfish", "Less oil"],
        },
        {
          id: "side-tteokbokki",
          name: "Tteokbokki",
          price: 15,
          description: "Chewy rice cakes in sweet and spicy sauce with fish cakes and scallions.",
          leaveOut: ["No fish cakes", "No green onion", "Less spicy / mild"],
        },
        {
          id: "side-sundae",
          name: "Sundae (blood sausage)",
          price: 14.5,
          description: "Korean sausage with sweet potato noodles inside, served with salt and pepper dip.",
          leaveOut: ["Salt and pepper on the side", "Extra spicy mustard"],
        },
        {
          id: "side-mandu",
          name: "Mandu (dumplings)",
          price: 12.5,
          description: "Pan fried or steamed, pork and vegetable filling.",
          leaveOut: ["No pork", "Steamed only"],
        },
      ],
    },
    {
      title: "Drinks",
      subtitle: "Hot, iced, and zero proof. Barley tea refills on the house when you dine in.",
      items: [
        {
          id: "drink-boricha",
          name: "Roasted barley tea (boricha)",
          price: 3.5,
          description: "Hot or iced. Toasty, clean, and easy with any dish.",
          leaveOut: ["Iced only", "Hot only", "Extra large"],
        },
        {
          id: "drink-sikhye",
          name: "Sikhye",
          price: 4,
          description: "Sweet chilled rice punch, lightly malted and sparkling.",
          leaveOut: ["Less sweet"],
        },
        {
          id: "drink-citron",
          name: "Citron tea (yuja)",
          price: 4.5,
          description: "Honeyed yuja marmalade with hot water. Comforting on a cold day.",
          leaveOut: ["Less honey", "Iced yuja ade"],
        },
        {
          id: "drink-corn-tea",
          name: "Corn silk tea (oksusu cha)",
          price: 3.5,
          description: "Mild and slightly sweet, caffeine free.",
          leaveOut: ["Iced only"],
        },
        {
          id: "drink-barley-latte",
          name: "Misugaru latte",
          price: 5.5,
          description: "Toasted multigrain powder with milk, iced. Filling and not too sweet.",
          leaveOut: ["Oat milk", "Less sugar", "No ice"],
        },
        {
          id: "drink-soft",
          name: "Soft drinks",
          price: 3,
          description: "Coke, Diet Coke, Sprite, or ginger ale.",
          leaveOut: ["Caffeine free only"],
        },
        {
          id: "drink-sparkling",
          name: "Sparkling water",
          price: 3.5,
          description: "Plain or lime. Large bottle to share.",
          leaveOut: ["Still water instead"],
        },
        {
          id: "drink-korean-lager",
          name: "Korean lager (bottle)",
          price: 6.5,
          description: "Crisp and cold. 12 oz. Must be 21 plus. ID checked on pickup.",
          badge: "21 plus",
          leaveOut: ["Non alcoholic substitute"],
        },
      ],
    },
    {
      title: "Korean BBQ (grill)",
      subtitle:
        "Not available for online order. Meats and prices are for dine in reference. Ask your server or call to reserve a grill table.",
      kbbq: true,
      items: [
        {
          id: "kbbq-prime-galbi",
          name: "Prime beef short rib (galbi)",
          price: 48,
          description: "Marinated bone in short rib. Per order, grilled at the table.",
          orderable: false,
        },
        {
          id: "kbbq-marinated-pork",
          name: "Marinated pork belly",
          price: 30,
          description: "Thick cut belly, soy garlic glaze. Per order.",
          orderable: false,
        },
        {
          id: "kbbq-brisket",
          name: "Thin sliced brisket",
          price: 28,
          description: "Quick sear cuts. Per order.",
          orderable: false,
        },
        {
          id: "kbbq-bulgogi",
          name: "Bulgogi (beef)",
          price: 32,
          description: "Pear marinated ribeye slices. Per order.",
          orderable: false,
        },
        {
          id: "kbbq-spicy-pork",
          name: "Spicy pork (jeyuk bokkeum style)",
          price: 29,
          description: "Gochujang marinated shoulder. Per order.",
          orderable: false,
        },
        {
          id: "kbbq-shrimp",
          name: "Garlic butter shrimp",
          price: 26,
          description: "Shell on shrimp, butter and garlic. Per order.",
          orderable: false,
        },
      ],
    },
  ],
};

/** Home hero: image carousel in app.js (3s idle after each swipe; left copy uses slide 1 only). Optional `position` / `scale` per image. */
/** @typedef {{ src: string; alt: string; eyebrow?: string; headline?: string; lede?: string; position?: { x: number; y: number; scale?: number } }} HeroSlide */

const HERO_COPY_DEFAULT = {
  eyebrow: "Korean food made with love.",
  headline: "Order from Omma's Kitchen",
  lede:
    "Honest, home style cooking, like it was made by someone who loves you. Add dishes to your bag when you're ready. This is a static demo, so you won't be charged.",
};

const HERO_SLIDES = [
  {
    src: "assets/heroSlide1.jpg",
    alt: "Korean dishes and sides at Omma's Kitchen",
    eyebrow: "Korean food made with love.",
    headline: "Order from Omma's Kitchen",
    lede:
      "Honest, home style cooking, like it was made by someone who loves you. Add dishes to your bag when you're ready. This is a static demo, so you won't be charged.",
    position: { x: 50, y: 58 },
  },
  {
    src: "assets/heroSlide2.jpg",
    alt: "Food spread with noodles and bowls",
    eyebrow: "Noodles & rice bowls",
    headline: "Comfort in every bite",
    lede:
      "Jjajangmyeon, bibimbap, and more—made to hit the spot. Browse the menu and add what sounds good. Demo only; no real charges.",
    // Direction back to original interpretation.
    position: { x: 55, y: 40, scale: 1.25 },
  },
  {
    src: "assets/heroSlide3.jpg",
    alt: "Comfort food from the kitchen",
    eyebrow: "Soups & stews",
    headline: "Warm bowls, bold flavor",
    lede:
      "Kimchi jjigae, sundubu, and slow simmered broths for cold nights or late cravings. Pick your favorites in the menu. Static demo site.",
    position: { x: 32, y: 35, scale: 1.3 },
  },
  {
    src: "assets/heroSlide4.jpg",
    alt: "Table spread with Korean favorites",
    eyebrow: "Share the table",
    headline: "Family style spreads",
    lede:
      "Bundle deals and sides made for passing around. Great for a night in with people you care about. This demo won't process payment.",
    position: { x: 65, y: 12, scale: 1.2 },
  },
  {
    src: "assets/heroSlide6.jpg",
    alt: "Omma's Kitchen menu highlights",
    eyebrow: "Grill tables · dine in",
    headline: "Korean BBQ at the table",
    lede:
      "Our BBQ section is for dining in—call or ask when you visit. For delivery tonight, explore the rest of the menu online. Demo only.",
    position: { x: 75, y: 95, scale: 1.45 },
  },
  {
    src: "assets/heroSlide7.jpg",
    alt: "Spicy noodles, tteokbokki, and Korean street food spread",
    eyebrow: "Late night · comfort",
    headline: "Your table, your fix",
    lede:
      "Noodles, rice cakes, and sides that hit the spot. Build your order from the menu when you are ready. Demo only; no payment.",
    position: { x: 25, y: 98, scale: 1.3 },
  },
];
