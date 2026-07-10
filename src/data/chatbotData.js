/**
 * Mirror Mirror Photowall Qatar — Rule-Based Chatbot Engine
 * 
 * Pure client-side intent matching via keyword scoring.
 * No backend, no API. All business data is self-contained.
 */

// ─── Intent Definitions ───────────────────────────────────────────────
// Each intent has:
//   keywords  — words/phrases that trigger this intent (scored by count)
//   priority  — tiebreaker when two intents score equally
//   response  — i18n key path for the bot's reply
//   suggests  — i18n key paths for quick-reply button labels

const intents = [
  {
    id: "greeting",
    keywords: [
      "hi", "hello", "hey", "hola", "yo", "sup", "good morning", "good evening",
      "good afternoon", "salaam", "marhaba", "ahlan", "greetings", "howdy",
      "what's up", "whats up", "morning", "evening", "salam", "hii", "hiii"
    ],
    priority: 1,
    response: "chatbot.responses.greeting",
    suggests: [
      "chatbot.quickReplies.services",
      "chatbot.quickReplies.pricing",
      "chatbot.quickReplies.bookNow",
      "chatbot.quickReplies.contact"
    ]
  },
  {
    id: "services_overview",
    keywords: [
      "services", "what do you offer", "what you offer", "offerings", "packages",
      "what can you do", "what do you do", "options", "list", "menu",
      "all services", "show services", "tell me about services", "available services"
    ],
    priority: 2,
    response: "chatbot.responses.servicesOverview",
    suggests: [
      "chatbot.quickReplies.mirrorBooth",
      "chatbot.quickReplies.retroBooth",
      "chatbot.quickReplies.booth360",
      "chatbot.quickReplies.telephoneBooth"
    ]
  },
  {
    id: "mirror_booth",
    keywords: [
      "mirror booth", "mirror photo", "photo booth", "mirror", "booth",
      "touchscreen mirror", "interactive mirror", "photo wall", "photowall",
      "selfie", "selfie booth", "mirror mirror"
    ],
    priority: 3,
    response: "chatbot.responses.mirrorBooth",
    suggests: [
      "chatbot.quickReplies.pricing",
      "chatbot.quickReplies.spaceReq",
      "chatbot.quickReplies.bookNow",
      "chatbot.quickReplies.addons"
    ]
  },
  {
    id: "retro_booth",
    keywords: [
      "retro booth", "retro photo", "retro", "vintage booth", "vintage photo",
      "classic print", "photo strip", "photo strips"
    ],
    priority: 3,
    response: "chatbot.responses.retroBooth",
    suggests: [
      "chatbot.quickReplies.pricing",
      "chatbot.quickReplies.bookNow",
      "chatbot.quickReplies.services"
    ]
  },
  {
    id: "booth_360",
    keywords: [
      "360 booth", "360 video", "360", "video booth 360", "revolving camera",
      "slow motion video", "slow mo", "slowmo"
    ],
    priority: 3,
    response: "chatbot.responses.booth360",
    suggests: [
      "chatbot.quickReplies.pricing",
      "chatbot.quickReplies.bookNow",
      "chatbot.quickReplies.services"
    ]
  },
  {
    id: "telephone_booth",
    keywords: [
      "telephone booth", "telephone", "audio guestbook", "audio guest book",
      "audio video booth", "voice message", "video message", "guest message",
      "recording booth", "message booth", "audio video"
    ],
    priority: 3,
    response: "chatbot.responses.telephoneBooth",
    suggests: [
      "chatbot.quickReplies.pricing",
      "chatbot.quickReplies.bookNow",
      "chatbot.quickReplies.services"
    ]
  },
  {
    id: "private_booth",
    keywords: [
      "private booth", "private photo", "brand activation", "brand activation package",
      "vip booth", "custom booth setup", "product launch booth"
    ],
    priority: 3,
    response: "chatbot.responses.privateBooth",
    suggests: [
      "chatbot.quickReplies.pricing",
      "chatbot.quickReplies.bookNow",
      "chatbot.quickReplies.services"
    ]
  },
  {
    id: "high_angle_booth",
    keywords: [
      "high angle", "high angle booth", "top view", "elevated camera",
      "overhead photo", "overhead booth", "creative angle"
    ],
    priority: 3,
    response: "chatbot.responses.highAngleBooth",
    suggests: [
      "chatbot.quickReplies.pricing",
      "chatbot.quickReplies.bookNow",
      "chatbot.quickReplies.services"
    ]
  },
  {
    id: "photography",
    keywords: [
      "photography", "photographer", "photo coverage", "photos", "pictures",
      "candid", "portrait", "portraits", "event photography", "photo shoot",
      "photoshoot", "photograph"
    ],
    priority: 3,
    response: "chatbot.responses.photography",
    suggests: [
      "chatbot.quickReplies.videography",
      "chatbot.quickReplies.pricing",
      "chatbot.quickReplies.bookNow"
    ]
  },
  {
    id: "videography",
    keywords: [
      "videography", "video coverage", "videographer", "filming", "film",
      "cinematic", "highlight reel", "event video", "drone", "video recording",
      "videograph"
    ],
    priority: 3,
    response: "chatbot.responses.videography",
    suggests: [
      "chatbot.quickReplies.photography",
      "chatbot.quickReplies.pricing",
      "chatbot.quickReplies.bookNow"
    ]
  },
  {
    id: "studio_rental",
    keywords: [
      "studio rental", "rent studio", "creative space", "photography studio",
      "videography studio", "content creation studio", "studio space"
    ],
    priority: 3,
    response: "chatbot.responses.studioRental",
    suggests: [
      "chatbot.quickReplies.pricing",
      "chatbot.quickReplies.bookNow",
      "chatbot.quickReplies.services"
    ]
  },
  {
    id: "branding_photo_wall",
    keywords: [
      "photo wall", "photowall", "branding wall", "backdrop", "media wall",
      "press wall", "3x3 backdrop", "custom backdrop", "vinyl backdrop"
    ],
    priority: 3,
    response: "chatbot.responses.brandingPhotoWall",
    suggests: [
      "chatbot.quickReplies.pricing",
      "chatbot.quickReplies.bookNow",
      "chatbot.quickReplies.services"
    ]
  },
  {
    id: "branding_collateral",
    keywords: [
      "branding collateral", "collaterals", "tote bag", "tote bags", "t-shirt",
      "tshirt", "cap", "caps", "merch", "merchandise", "giveaway", "giveaways",
      "souvenirs", "branded", "custom print", "printing", "branding collaterals"
    ],
    priority: 3,
    response: "chatbot.responses.brandingCollateral",
    suggests: [
      "chatbot.quickReplies.pricing",
      "chatbot.quickReplies.bookNow",
      "chatbot.quickReplies.services"
    ]
  },
  {
    id: "pricing",
    keywords: [
      "price", "prices", "pricing", "cost", "costs", "how much", "rate", "rates",
      "budget", "fee", "fees", "charge", "charges", "expensive", "cheap",
      "affordable", "quote", "quotation", "estimate", "qar", "money"
    ],
    priority: 4,
    response: "chatbot.responses.pricing",
    suggests: [
      "chatbot.quickReplies.bookNow",
      "chatbot.quickReplies.services",
      "chatbot.quickReplies.addons",
      "chatbot.quickReplies.contact"
    ]
  },
  {
    id: "booking",
    keywords: [
      "book", "booking", "reserve", "reservation", "availability", "available",
      "schedule", "appointment", "enquiry", "inquiry", "interested", "want to book",
      "how to book", "sign up", "register", "hire"
    ],
    priority: 5,
    response: "chatbot.responses.booking",
    suggests: [
      "chatbot.quickReplies.contact",
      "chatbot.quickReplies.pricing",
      "chatbot.quickReplies.bookingTimeline"
    ]
  },
  {
    id: "contact_info",
    keywords: [
      "contact", "phone", "call", "email", "mail", "whatsapp", "reach",
      "get in touch", "talk to", "speak to", "number", "phone number",
      "social media", "instagram", "dm", "message you"
    ],
    priority: 4,
    response: "chatbot.responses.contactInfo",
    suggests: [
      "chatbot.quickReplies.location",
      "chatbot.quickReplies.hours",
      "chatbot.quickReplies.bookNow"
    ]
  },
  {
    id: "location",
    keywords: [
      "location", "address", "where", "office", "studio", "find you",
      "directions", "map", "based", "doha", "qatar", "al hilal", "visit"
    ],
    priority: 4,
    response: "chatbot.responses.location",
    suggests: [
      "chatbot.quickReplies.contact",
      "chatbot.quickReplies.hours",
      "chatbot.quickReplies.bookNow"
    ]
  },
  {
    id: "hours",
    keywords: [
      "hours", "working hours", "open", "timing", "timings", "business hours",
      "schedule", "when open", "opening hours", "close", "closing",
      "work hours", "operation hours", "what time"
    ],
    priority: 4,
    response: "chatbot.responses.hours",
    suggests: [
      "chatbot.quickReplies.contact",
      "chatbot.quickReplies.location",
      "chatbot.quickReplies.bookNow"
    ]
  },
  {
    id: "event_types",
    keywords: [
      "wedding", "weddings", "corporate", "corporate event", "gala", "party",
      "birthday", "launch", "product launch", "celebration", "private event",
      "private party", "event type", "types of events", "occasions",
      "reception", "engagement", "anniversary"
    ],
    priority: 3,
    response: "chatbot.responses.eventTypes",
    suggests: [
      "chatbot.quickReplies.services",
      "chatbot.quickReplies.pricing",
      "chatbot.quickReplies.bookNow"
    ]
  },
  {
    id: "space_requirements",
    keywords: [
      "space", "area", "setup", "requirements", "room", "footprint",
      "how much space", "space needed", "dimensions", "size", "power",
      "electricity", "outlet", "voltage", "setup area"
    ],
    priority: 5,
    response: "chatbot.responses.spaceRequirements",
    suggests: [
      "chatbot.quickReplies.services",
      "chatbot.quickReplies.bookNow",
      "chatbot.quickReplies.contact"
    ]
  },
  {
    id: "custom_branding",
    keywords: [
      "custom", "customize", "customise", "personalize", "personalise",
      "theme", "themed", "custom design", "custom branding", "logo",
      "brand design", "ui design", "screen design", "digital branding"
    ],
    priority: 5,
    response: "chatbot.responses.customBranding",
    suggests: [
      "chatbot.quickReplies.addons",
      "chatbot.quickReplies.pricing",
      "chatbot.quickReplies.bookNow"
    ]
  },
  {
    id: "booking_timeline",
    keywords: [
      "advance", "how early", "when to book", "advance booking", "lead time",
      "how far in advance", "book early", "last minute", "peak season",
      "busy season", "months ahead", "in advance"
    ],
    priority: 5,
    response: "chatbot.responses.bookingTimeline",
    suggests: [
      "chatbot.quickReplies.bookNow",
      "chatbot.quickReplies.contact",
      "chatbot.quickReplies.pricing"
    ]
  },
  {
    id: "addons",
    keywords: [
      "add-on", "addon", "add on", "extra", "extras", "upgrade", "upgrades",
      "enhancement", "enhancements", "additional", "supplement", "premium add",
      "print station", "floral arch", "live slide", "projection"
    ],
    priority: 4,
    response: "chatbot.responses.addons",
    suggests: [
      "chatbot.quickReplies.pricing",
      "chatbot.quickReplies.bookNow",
      "chatbot.quickReplies.services"
    ]
  },
  {
    id: "goodbye",
    keywords: [
      "bye", "goodbye", "good bye", "thanks", "thank you", "thank",
      "see you", "later", "cheers", "ta", "done", "that's all",
      "thats all", "no more", "shukran", "jazak"
    ],
    priority: 1,
    response: "chatbot.responses.goodbye",
    suggests: [
      "chatbot.quickReplies.services",
      "chatbot.quickReplies.contact"
    ]
  }
];

// ─── Intent Matching Engine ───────────────────────────────────────────

/**
 * Normalizes user input for matching: lowercases, strips punctuation,
 * collapses whitespace.
 */
function normalize(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s']/g, " ")   // strip punctuation except apostrophe
    .replace(/\s+/g, " ")         // collapse whitespace
    .trim();
}

/**
 * Scores an intent against normalized user input.
 * Longer keyword phrases get a bonus to prefer more specific matches.
 */
function scoreIntent(intent, normalizedInput) {
  let score = 0;

  for (const keyword of intent.keywords) {
    const normalizedKeyword = normalize(keyword);

    if (normalizedInput.includes(normalizedKeyword)) {
      // Bonus for longer (more specific) phrases
      const wordCount = normalizedKeyword.split(" ").length;
      score += wordCount;
    }
  }

  return score;
}

/**
 * Matches user input to the best intent.
 * Returns { intentId, response, suggests } or a fallback.
 */
export function matchIntent(userMessage) {
  const normalizedInput = normalize(userMessage);

  if (!normalizedInput || normalizedInput.length === 0) {
    return {
      intentId: "fallback",
      response: "chatbot.responses.fallback",
      suggests: [
        "chatbot.quickReplies.services",
        "chatbot.quickReplies.pricing",
        "chatbot.quickReplies.contact"
      ]
    };
  }

  let bestIntent = null;
  let bestScore = 0;

  for (const intent of intents) {
    const score = scoreIntent(intent, normalizedInput);

    if (score > bestScore || (score === bestScore && intent.priority > (bestIntent?.priority || 0))) {
      bestScore = score;
      bestIntent = intent;
    }
  }

  // Minimum threshold — must match at least 1 keyword word
  if (bestScore < 1) {
    return {
      intentId: "fallback",
      response: "chatbot.responses.fallback",
      suggests: [
        "chatbot.quickReplies.services",
        "chatbot.quickReplies.pricing",
        "chatbot.quickReplies.contact"
      ]
    };
  }

  return {
    intentId: bestIntent.id,
    response: bestIntent.response,
    suggests: bestIntent.suggests
  };
}
