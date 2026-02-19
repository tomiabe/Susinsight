import { SectionData, FooterColumn, NavItem } from './types';

export const NAV_STRUCTURE: NavItem[] = [
  {
    label: "Regions",
    href: "#",
    children: [
      { label: "Across Africa", href: "https://susinsight.com/africa/" },
      { label: "Central Africa", href: "https://susinsight.com/central-africa/" },
      { label: "East Africa", href: "https://susinsight.com/east-africa/" },
      { label: "North Africa", href: "https://susinsight.com/north-africa/" },
      { label: "Southern Africa", href: "https://susinsight.com/southern-africa/" },
      { label: "West Africa", href: "https://susinsight.com/west-africa/" },
      { label: "All Countries", href: "https://susinsight.com/countries/" },
    ]
  },
  {
    label: "Signals",
    href: "#",
    children: [
      { label: "Career Compass", href: "https://susinsight.com/career-compass/" },
      { label: "Founder Playbook", href: "https://susinsight.com/founder-playbook/" },
      { label: "Ground Truth", href: "https://susinsight.com/ground-truth/" },
      { label: "Market Watch", href: "https://susinsight.com/market-watch/" },
      { label: "Policy in Practice", href: "https://susinsight.com/policy-practice/" },
    ]
  },
  {
    label: "Stories",
    href: "#",
    children: [
      { label: "All Stories", href: "https://susinsight.com/stories/" },
      { label: "Business Stories", href: "https://susinsight.com/business/" },
      { label: "Cultural Stories", href: "https://susinsight.com/culture/" },
      { label: "Event Focus", href: "https://susinsight.com/events/" },
      { label: "Expert Opinions", href: "https://susinsight.com/opinions/" },
      { label: "Fictional Stories", href: "https://susinsight.com/fiction/" },
      { label: "Founder's Corner", href: "https://susinsight.com/founders/" },
      { label: "Impact Stories", href: "https://susinsight.com/impact/" },
      { label: "Insightful Articles", href: "https://susinsight.com/articles/" },
      { label: "Investor Insights", href: "https://susinsight.com/investors/" },
    ]
  },
  {
    label: "What's Trending",
    href: "https://susinsight.com/trending/"
  },
  {
    label: "Series",
    href: "#",
    children: [
      { label: "All Series", href: "https://susinsight.com/series/" },
      { label: "Beyond the Torch", href: "https://susinsight.com/beyond-the-torch/" },
      { label: "Crisis & Recovery", href: "https://susinsight.com/crisis-and-recovery/" },
      { label: "Critical Lifelines", href: "https://susinsight.com/critical-lifelines/" },
      { label: "Echoes of History", href: "https://susinsight.com/echoes-of-history/" },
      { label: "Food for Thought", href: "https://susinsight.com/food-for-thought/" },
      { label: "Green Games", href: "https://susinsight.com/green-games/" },
      { label: "Laws of Change", href: "https://susinsight.com/laws-of-change/" },
      { label: "Legacy in Motion", href: "https://susinsight.com/legacy-in-motion/" },
      { label: "Roots & Rituals", href: "https://susinsight.com/roots-and-rituals/" },
    ]
  },
  {
    label: "Data",
    href: "#",
    children: [
      { label: "Susdata", href: "https://susinsight.com/data/" },
      { label: "Look at the Data", href: "https://susinsight.com/look-data/" },
    ]
  },
  {
    label: "Resources",
    href: "#",
    children: [
      { label: "Glossary", href: "https://susinsight.com/resources/glossary/" },
      { label: "Historical Milestones", href: "https://susinsight.com/?page_id=3083" },
      { label: "Independence Dates", href: "https://susinsight.com/resources/independence/" },
      { label: "World Days", href: "https://susinsight.com/resources/world-days/" },
    ]
  },
  {
    label: "Info",
    href: "#",
    children: [
      { label: "About Us", href: "https://susinsight.com/about/" },
      { label: "Our Vision", href: "https://susinsight.com/vision/" },
      { label: "Our Philosophy", href: "https://susinsight.com/philosophy/" },
      { label: "The Founders", href: "https://susinsight.com/the-founders/" },
      { label: "Partner With Us", href: "https://susinsight.com/partner/" },
      { label: "Amplify your Impact", href: "https://susinsight.com/amplify/" },
      { label: "Be in the Spotlight", href: "https://susinsight.com/spotlight/" },
    ]
  },
  {
    label: "Contribute",
    href: "#",
    children: [
      { label: "Become a Contributor", href: "https://susinsight.com/contribute/" },
      { label: "Share Your Story", href: "https://susinsight.com/share/" },
      { label: "Our Contributors", href: "https://susinsight.com/contributors/" },
    ]
  },
  {
    label: "Contact",
    href: "https://susinsight.com/contact/"
  },
  {
    label: "Account",
    href: "#",
    children: [
      { label: "Log Out", href: "https://susinsight.com/wp-login.php?action=logout" },
      { label: "My Account", href: "https://susinsight.com/account/" },
    ]
  }
];

export const HERO_FEATURE = {
  category: "Event Focus",
  title: "COP30 Showed Why Africa Must Lead the Next Phase of Climate Action",
  author: "Adetoro Adetayo",
  excerpt: "The continent isn’t asking for charity; it’s building energy systems, financing models, and industries that could shape the global green economy.",
};

export const TRENDING_ARTICLES = [
  {
    title: "South Africa Closes Historic G20 Summit Amid U.S. Boycott",
    author: "The Trending Desk",
    excerpt: "On November 23, 2025, South Africa officially closed the G20 summit’s first-ever African edition in Johannesburg without the customary U.S. handover...",
    date: "Nov 23, 2025"
  },
  {
    title: "Lagos Fashion Week Wins 2025 Earthshot Prize",
    author: "The Trending Desk",
    excerpt: "On November 5, 2025, Lagos Fashion Week received a £1 million Earthshot Prize in Rio. Africa’s first circular fashion hub is now on the way.",
    date: "Nov 5, 2025"
  },
  {
    title: "Kenya Launches Green Hydrogen Roadmap at Nairobi Summit",
    author: "The Trending Desk",
    excerpt: "A landmark $4 billion partnership with EU investors positions Kenya to become East Africa's premier clean energy exporter by 2030.",
    date: "Nov 1, 2025"
  }
];

export const SIGNALS_PREVIEW: SectionData = {
  id: 'signals-preview',
  title: "Signals",
  subtitle: "Strategic intelligence and data-driven insights for decision makers.",
  articles: [
    {
      title: "Market Watch: The Shilling Stabilizes Against the Dollar",
      author: "Signals Team",
      excerpt: "An in-depth analysis of East African currency trends in Q3 2025, showing unexpected resilience in the manufacturing sector despite global volatility.",
      category: "Market Watch"
    },
    {
      title: "Ground Truth: Inside Lagos' Tech Hub Migration",
      author: "Signals Team",
      excerpt: "Why startups are moving from Yaba to Lekki, and what it means for infrastructure demands and real estate valuations in the new corridor.",
      category: "Ground Truth"
    },
    {
      title: "Career Compass: The Rise of the Chief Sustainability Officer",
      author: "Signals Team",
      excerpt: "Demand for CSOs has grown 300% in the last two years across the continent. We analyze the skills required to lead in this new era.",
      category: "Career Compass"
    }
  ],
  ctaText: "View All Signals"
};

export const SUSDATA_SECTION = {
  title: "Look at the data.",
  subtitle: "De-bunking myths with raw numbers and clear visualizations.",
  visualizationImageSeed: 888,
  articles: [
    {
      title: "Renewable Energy Capacity vs. Grid Reliability in West Africa (2020-2025)",
      excerpt: "Visualizing the correlation between decentralised solar adoption and reduction in grid downtime hours.",
      category: "Energy"
    },
    {
      title: "The Real Cost of Fast Fashion Imports",
      excerpt: "Data breakdown of volume (tonnes) versus economic value created in local textile markets.",
      category: "Trade"
    }
  ]
};

export const SPECIAL_PROJECT = {
  title: "The 2025 Outlook Report",
  subtitle: "A comprehensive deep-dive into the trends that will define African sustainability this year.",
  cta: "Read the Report",
  imageSeed: 777
};

export const AD_SPOTS = [
  {
    title: "Ethical Fashion Week 2025",
    subtitle: "Join the movement redefining style in Accra.",
    cta: "Get Tickets",
    imageSeed: 101,
    sponsor: "Partner Spotlight"
  },
  {
    title: "Green Tech Summit",
    subtitle: "Where innovation meets investment. Nairobi, June 2025.",
    cta: "Register Now",
    imageSeed: 102,
    sponsor: "Partner Spotlight"
  },
  {
    title: "Sustainable Agriculture Fund",
    subtitle: "Empowering smallholder farmers with climate-resilient seeds.",
    cta: "Learn More",
    imageSeed: 103,
    sponsor: "Initiative Focus"
  }
];

export const SOCIAL_FEED = [
  { platform: 'instagram', link: 'https://instagram.com/susinsight', seed: 201 },
  { platform: 'instagram', link: 'https://instagram.com/susinsight', seed: 202 },
  { platform: 'pinterest', link: '#', seed: 203 },
  { platform: 'flipboard', link: '#', seed: 204 },
];

export const CONTENT_SECTIONS: SectionData[] = [
  {
    id: 'insightful-articles',
    title: 'Insightful Articles',
    subtitle: 'Stories that reveal where Africa’s development is heading and why.',
    articles: [
      {
        title: "E-Commerce Took Over Fashion. Can Trade Policy Bring Local Manufacturing Back?",
        author: "Gloria Edukere",
        excerpt: "South Africa’s crackdown on duty-free imports hints at a blueprint for protecting jobs, the environment, and regional trade.",
        category: "Trade Policy"
      },
      {
        title: "The Complex World of African Activism",
        author: "Tomi Abe",
        excerpt: "As youth-led movements rise across Africa, citizens are increasingly demanding accountability and reform in response to widespread social and economic issues.",
        category: "Activism"
      },
      {
        title: "Lake Chad: Understanding Nature’s Retreat",
        author: "Tomi Abe",
        excerpt: "Lake Chad's decline, once a vibrant ecosystem, illustrates how climate change and human demand threaten livelihoods and regional stability.",
        category: "Environment"
      },
      {
        title: "How Invisible Networks Are Powering the Next Economic Leap",
        author: "Adetumilara Adetayo",
        excerpt: "Fiber cables and cloud servers don’t get much attention, but they’re changing lives—from smart farms in Uganda to online classrooms in Nigeria.",
        category: "Technology",
        link: "/stories/how-invisible-networks-are-powering-the-next-economic-leap"
      },
      {
        title: "Beyond the Grid: How Pay-As-You-Go Solar is Redefining Ownership in Rural Zambia",
        author: "Favour Olumuyiwa",
        excerpt: "For centuries, energy was something you paid a utility for. Now, a new model is letting rural households own the very tools of their power.",
        category: "Energy"
      },
      {
        title: "The Great Decoupling: Why African Tech Ecosystems are Looking South-South for Partnerships",
        author: "Adetola Adetayo",
        excerpt: "Forget Silicon Valley; the most meaningful tech exchanges for African founders are now happening with Brazil, India, and Southeast Asia.",
        category: "Technology"
      }
    ],
    ctaText: "View All Articles"
  },
  {
    id: 'business-stories',
    title: 'Business Stories',
    subtitle: 'Where resilience meets revenue, and purpose powers profit.',
    articles: [
      {
        title: "The Hustle Economy That Keeps Harare Moving",
        author: "Adetola Adetayo",
        excerpt: "From street stalls to repair shops, Zimbabwe's informal workers are proving that hustle is more than survival; it's the city's engine.",
      },
      {
        title: "Ugandan Filmmakers Are Tired of Waiting. So They’re Building a New Film Economy.",
        author: "Jessica Ireju",
        excerpt: "Forget grants: through crowdfunding, hustle, and grit, Uganda's indie creators are reshaping how stories get made, and who gets to tell them.",
      },
      {
        title: "Inside the Push for Disability-Inclusive Housing in Cape Town",
        author: "Adetoro Adetayo",
        excerpt: "Policy promises exist on paper, but township residents are finding solutions through nonprofits, advocacy, and architectural innovation.",
      }
    ],
    ctaText: "View All Stories"
  },
  {
    id: 'spotlight-features',
    title: 'Spotlight Features',
    subtitle: 'Where bold initiatives and inspiring solutions meet sustainability on the ground.',
    articles: [
      {
        title: "How Teach the Child Is Rewriting Nigeria’s Literacy Story",
        author: "Jessica Ireju",
        excerpt: "In a country where many children go to school without learning, this community-driven model is helping students read, thrive, and dream again.",
      },
      {
        title: "Ecobarter’s Digital Revolution in Waste Management",
        author: "Favour Olumuyiwa",
        excerpt: "Ecobarter pioneers a transformative approach to waste management, seamlessly integrating technology and community engagement.",
        category: "Climate Action"
      },
      {
        title: "How Future For Africa Sparks Sustainable Change in Ghana",
        author: "Adetola Adetayo",
        excerpt: "Future for Africa, a dynamic Ghanaian NGO, passionately drives transformative initiatives in education, healthcare, and community empowerment.",
      }
    ],
    ctaText: "Be in the Spotlight »"
  }
];

export const FOUNDER_CORNER: SectionData = {
  id: 'founders-corner',
  title: "Founder's Corner",
  subtitle: "Meet the minds behind Africa’s most impactful, SDG-driven initiatives.",
  bgColor: "bg-brand-light",
  articles: [
    {
      title: "How Prayer Nwagboso is Nurturing Hope Through Education in Nigeria",
      excerpt: "Education is the key to unlocking potential, and through her efforts, Prayer Nwagboso opens doors for Nigeria’s most vulnerable children.",
    },
    {
      title: "How Hannah Max-Macarthy is Redefining Energy Solutions in Sierra Leone",
      excerpt: "Driven by personal loss and a passion for change, Hannah Max-Macarthy transforms energy solutions in Sierra Leone through sustainable, life-saving cookstoves.",
    },
    {
      title: "How Betty Wandia Githinji is Shaping Eco-Conscious Living Through Design in Kenya",
      excerpt: "Betty’s designs fuse African craftsmanship with practical, mindful living—creating functional pieces that preserve culture and empower local communities.",
    }
  ],
  ctaText: "Recommend a Founder »"
};

export const CULTURAL_STORIES: SectionData = {
  id: 'cultural-stories',
  title: "Cultural Stories",
  subtitle: "Heritage isn’t history, it’s a blueprint for tomorrow.",
  articles: [
    {
      title: "Why WhatsApp Voice Notes Are Becoming Tanzania’s Farming Lifeline",
      author: "Adetumilara Adetayo",
      excerpt: "Cheap, accessible, and personal: audio messages are helping farmers act quickly and learn from each other.",
    },
    {
      title: "Slow Fashion Is Thriving in Ethiopia And It’s Anything but Small",
      author: "Adetola Adetayo",
      excerpt: "Women-led collectives are weaving climate-smart fashion from heritage crafts, creating lasting jobs along the way.",
    },
    {
      title: "The Push to Digitize Ghana’s Indigenous Languages",
      author: "Adetumilara Adetayo",
      excerpt: "Ghanaian developers are coding in Twi, Ewe, and Ga to close a digital divide and protect what’s at risk of being erased.",
    }
  ],
  ctaText: "View All Stories"
};

export const UNEXPECTED_IMPACT: SectionData = {
  id: 'unexpected-impact',
  title: "Unexpected Impact",
  subtitle: "Discover how ordinary choices can ripple into continental transformation.",
  articles: [
    {
      title: "Why Your Choice of Sunscreen Could Save Coral Reefs",
      author: "Adetoro Adetayo",
      excerpt: "Just as your choice of sunscreen shields your skin, it can also protect the vibrant life beneath the waves.",
    },
    {
      title: "How Your Gym Fitness Classes Could Heal Community Mental Health",
      author: "Adetola Adetayo",
      excerpt: "When you step into a fitness class, you’re not just moving your body—you’re building bonds and lifting collective spirits.",
    },
    {
      title: "How Community Radio Stations Became the Frontline of Pandemic Recovery in the Sahel",
      author: "Jessica Ireju",
      excerpt: "In areas where the internet is a luxury, the simple radio wave became the primary vector for life-saving information and social cohesion.",
    }
  ],
  ctaText: "View All Impacts"
};

export const FICTIONAL_STORIES: SectionData = {
  id: 'fictional-stories',
  title: "Fictional Stories",
  subtitle: "Fiction that inspires reflection and action on real-world issues.",
  articles: [
    {
      title: "The Silent Echoes",
      excerpt: "How can shared stories and open conversations help heal unseen wounds and bring hope to those suffering in silence?"
    },
    {
      title: "The Guardians of Gaia",
      excerpt: "What happens when a small African village, guided by the wisdom of its elders, harnesses the power of the sun to defend its land?"
    },
    {
      title: "The Rebirth of Lake Lumo",
      excerpt: "In a battle against despair, a village discovers the strength of innovation and community to restore their cherished lake."
    }
  ],
  ctaText: "View All Stories"
}

export const IMPACT_STORIES: SectionData = {
  id: 'impact-stories',
  title: "Impact Stories",
  subtitle: "Explore how companies across Africa are building profit with purpose.",
  articles: [
    {
      title: "Brewing a Better World: The Nigerian Breweries Impact Story",
      author: "Adetoro Adetayo",
      excerpt: "Nigerian Breweries is making a big difference by helping communities, protecting the environment, and promoting responsible drinking."
    },
    {
      title: "Why Capricorn Group Thinks Social Impact is Good Business",
      author: "Adetoro Adetayo",
      excerpt: "Capricorn Group believes investing in education and local communities isn’t just charity—it’s a smart strategy for lasting change."
    },
    {
      title: "The Circular Loop: How a Nairobi Startup is Turning Plastic Waste into School Desks",
      author: "Gloria Edukere",
      excerpt: "Instead of clogging landfills, Nairobi's waste is being transformed into high-durability furniture, solving both an environmental and educational crisis.",
    }
  ],
  ctaText: "Amplify your impact »"
}


export const LOWER_SECTIONS: SectionData[] = [
  {
    id: 'investor-insights',
    title: "Investor Insights",
    subtitle: "Capital meets context in Africa’s sustainability frontier.",
    articles: [
      {
        title: "The Climate Case for Bamboo Is Clear. So Why Isn’t the Money Moving?",
        author: "Adetoro Adetayo",
        excerpt: "Bamboo is cheap, fast-growing, and carbon-rich. Cameroon has active pilot projects, but unlocking scale will take more than potential.",
      },
      {
        title: "Venture Debt in Africa: A New Frontier for Scaling Sustainability Startups?",
        author: "Favour Olumuyiwa",
        excerpt: "Equity isn't the only answer. We explore how debt financing is allowing green founders to scale without diluting their mission-driven ownership.",
      },
      {
        title: "Measuring the Unmeasurable: The Push for Standardized ESG Reporting in Emerging Markets",
        author: "Adetumilara Adetayo",
        excerpt: "Global ESG standards often miss the mark in Africa. Analysts are now calling for metrics that reflect local social impact alongside carbon counts.",
      }
    ],
    ctaText: "View All Insights"
  },
  {
    id: 'event-focus-lower',
    title: "Event Focus",
    subtitle: "Highlights and insights from forums shaping our shared future.",
    articles: [
      {
        title: "COP30 Showed Why Africa Must Lead the Next Phase of Climate Action",
        author: "Adetoro Adetayo",
        excerpt: "The continent isn’t asking for charity; it’s building energy systems, financing models, and industries that could shape the global green economy.",
      },
      {
        title: "Africa Is Tired of Promises. It Wants Power Over Its Climate Future.",
        author: "Tomi Abe",
        excerpt: "At the 2025 Africa Climate Summit in Addis Ababa, leaders launched a $50 billion plan to fund homegrown solutions.",
      },
      {
        title: "Climate Countdown: COP28’s Impact on Africa",
        author: "Favour Olumuyiwa",
        excerpt: "COP28 marked a pivotal shift away from the fossil fuel era towards sustainable development, particularly for Africa.",
      }
    ],
    ctaText: "View All Events"
  },
  {
    id: 'expert-opinions',
    title: "Expert Opinions",
    subtitle: "Insights from researchers, thought leaders, and practitioners driving sustainable change.",
    articles: [
      {
        title: "What Oreoluwa Adebayo Thinks About Reforming Data Systems in Africa",
        excerpt: "Many African data systems still serve external agendas; Oreoluwa Adebayo argues communities must define, collect, and use data themselves.",
      },
      {
        title: "What Dr. Eyitemi Fasanu Thinks About Africa’s Power Funding Puzzle",
        excerpt: "Limited funding and high capital costs hinder Africa’s clean energy expansion. Dr. Eyitemi Fasanu explores solutions to bridge the investment gap.",
      },
      {
        title: "What Prof. Amara Diallo Thinks About the Future of Urban Mobility in African Megacities",
        excerpt: "Lagos and Cairo are reaching a tipping point. Prof. Diallo explains why the solution isn't more roads, but decentralized, multimodal transport.",
      }
    ],
    ctaText: "View All Opinions"
  },
  {
    id: 'policy-reviews',
    title: "Policy Reviews",
    subtitle: "Clear, critical looks at the decisions shaping Africa’s development.",
    articles: [
      {
        title: "Lagos Plastic Ban: A Bold Step or an Economic Blow?",
        author: "Adetoro Adetayo",
        excerpt: "The Lagos State government's decisive ban on single-use plastics sparks intense discussions about its economic impact.",
      },
      {
        title: "Is Equatorial Guinea’s Horizon 2020 Policy Advancing Gender Equality?",
        author: "Jessica Ireju",
        excerpt: "Despite Horizon 2020’s promises, women in Equatorial Guinea still face violence, limited political power, and daily barriers to equality.",
      },
      {
        title: "Can Tunisia’s Jobs Plan Deliver on Its Promise?",
        author: "Adetola Adetayo",
        excerpt: "Youth unemployment is soaring past 40%, yet parts of Tunisia’s National Employment Strategy show signs of hope.",
      }
    ],
    ctaText: "View All Reviews"
  },
  {
    id: 'un-affairs',
    title: "The UN Affairs",
    subtitle: "How UN initiatives are supporting peace, sustainability, and progress in Africa.",
    articles: [
      {
        title: "The Birth of UNAMID and the Quest for Regional Stability",
        author: "Tomi Abe",
        excerpt: "The establishment of UNAMID marked a pivotal moment in international efforts to address conflict and restore stability in Darfur.",
      },
      {
        title: "How UN-Backed Digital Hubs Are Opening the Internet to Cameroon’s Informal Traders",
        author: "Adetumilara Adetayo",
        excerpt: "With affordable training and online marketplaces, UNDP and ITC are helping women and youth build confident digital businesses.",
      },
      {
        title: "Strengthening the Blue Economy: FAO's Initiative for Sustainable Fisheries in West Africa",
        author: "Gloria Edukere",
        excerpt: "Overfishing and climate change threaten millions of livelihoods. We look at how new community-led management models are reviving local coasts.",
      }
    ],
    ctaText: "View All Affairs"
  }
];

export const FOOTER_LINKS: FooterColumn[] = [
  {
    title: "Info",
    links: [
      { label: "About", href: "#" },
      { label: "Our Vision", href: "#" },
      { label: "Our Philosophy", href: "#" },
      { label: "Meet the Founders", href: "#" },
      { label: "Our Contributors", href: "#" },
      { label: "Partner With Us", href: "#" },
      { label: "Contact Us", href: "#" },
    ]
  },
  {
    title: "Regions",
    links: [
      { label: "Across Africa", href: "https://susinsight.com/africa/" },
      { label: "Central Africa", href: "https://susinsight.com/central-africa/" },
      { label: "East Africa", href: "https://susinsight.com/east-africa/" },
      { label: "North Africa", href: "https://susinsight.com/north-africa/" },
      { label: "Southern Africa", href: "https://susinsight.com/southern-africa/" },
      { label: "West Africa", href: "https://susinsight.com/west-africa/" },
      { label: "All Countries", href: "https://susinsight.com/countries/" },
    ]
  },
  {
    title: "Resources",
    links: [
      { label: "Susdata", href: "#" },
      { label: "Glossary", href: "#" },
      { label: "Historical Milestones", href: "#" },
      { label: "Independence Dates", href: "#" },
      { label: "World Days", href: "#" },
      { label: "How-Tos", href: "#" },
      { label: "Research Reports", href: "#" },
    ]
  },
  {
    title: "Get Involved",
    links: [
      { label: "Share Your Story", href: "#" },
      { label: "Become a Contributor", href: "#" },
      { label: "Be in the Spotlight", href: "#" },
      { label: "Amplify Your Impact", href: "#" },
      { label: "Recommend a Founder", href: "#" },
      { label: "Give Feedback", href: "#" },
      { label: "Newsletter Signup", href: "#" },
    ]
  }
];

export const EXPLORE_SERIES = [
  { title: "Crisis and Recovery", desc: "How do economic and environmental disasters shape recovery efforts?", imageSeed: 501 },
  { title: "Food for Thought", desc: "Can African food systems support long-term sustainability and food security?", imageSeed: 502 },
  { title: "Seasons of Growth", desc: "What challenges do farmers face in maintaining sustainable harvest seasons?", imageSeed: 503 },
  { title: "Sustainable by Design", desc: "How do cultural values influence sustainable architecture in African homes?", imageSeed: 504 },
];