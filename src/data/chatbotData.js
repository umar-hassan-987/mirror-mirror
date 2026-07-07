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
      "chatbot.quickReplies.videography",
      "chatbot.quickReplies.pricing",
      "chatbot.quickReplies.bookNow"
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
    id: "audio_video_booth",
    keywords: [
      "audio booth", "video booth", "telephone booth", "audio", "telephone",
      "voice message", "video message", "guest message", "recording booth",
      "message booth", "audio video"
    ],
    priority: 3,
    response: "chatbot.responses.audioVideoBooth",
    suggests: [
      "chatbot.quickReplies.pricing",
      "chatbot.quickReplies.bookNow",
      "chatbot.quickReplies.services"
    ]
  },
  {
    id: "polaroid",
    keywords: [
      "polaroid", "guest book", "guestbook", "guest list", "photo book",
      "instant photo", "instant camera", "polaroid book", "guest album"
    ],
    priority: 3,
    response: "chatbot.responses.polaroid",
    suggests: [
      "chatbot.quickReplies.pricing",
      "chatbot.quickReplies.bookNow",
      "chatbot.quickReplies.services"
    ]
  },
  {
    id: "branding",
    keywords: [
      "branding", "brand", "collaterals", "tote bag", "tote bags", "t-shirt",
      "tshirt", "cap", "caps", "merch", "merchandise", "giveaway", "giveaways",
      "souvenirs", "branded", "custom print", "printing"
    ],
    priority: 3,
    response: "chatbot.responses.branding",
    suggests: [
      "chatbot.quickReplies.pricing",
      "chatbot.quickReplies.bookNow",
      "chatbot.quickReplies.services"
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
