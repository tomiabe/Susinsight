// Primary WP category slugs for deterministic homepage section population.
// Keep these aligned with your live WordPress taxonomy.
export const SECTION_CATEGORY_MAP = {
  signalsPreview: ["signals", "market-watch", "ground-truth", "career-compass", "policy-practice"],
  contentSections: {
    insightful: ["articles"],
    business: ["business"],
    spotlight: ["spotlight", "spotlight-features"]
  },
  founderCorner: ["founders"],
  culturalStories: ["culture"],
  unexpectedImpact: ["unexpected-impact"],
  fictionalStories: ["fiction"],
  impactStories: ["impact"],
  lowerSections: {
    investorInsights: ["investors"],
    eventFocus: ["events"],
    expertOpinions: ["opinions"],
    policyReviews: ["policy-practice", "policy"],
    unAffairs: ["un-affairs", "un"]
  },
  exploreSeries: ["series"]
} as const;
