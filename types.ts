export interface ProductIdea {
  niche: string;
  coreProblem: string;
  transformationOutcome: string;
  productIdeaName: string;
  willingnessToBuy: string;
}

export interface TargetAudienceProfile {
  detailedPersona: string;
  goals: string[];
  pains: string[];
  behaviors: string[];
}

export interface PricingTier {
  name: string;
  price: string;
  features: string[];
  description: string;
}

export interface PricingStrategy {
  psychologicalTriggers: string[];
  tiers: PricingTier[];
}

export interface AdIdea {
  platform: string;
  copy?: string; // For Facebook/social
  headline?: string; // For Google Ads
  description?: string; // For Google Ads
}

export interface MarketingAngles {
  emotionalHooks: string[];
  adIdeas: AdIdea[];
  salesPageHeadlines: string[];
}

export interface ModuleDetail {
  moduleNumber: number;
  moduleTitle: string;
  goal: string;
  videoScript: string;
  breakthroughMoment: string;
  digitalToolsAndAssets: string[];
}

export interface LeadMagnetSuggestion {
  title: string;
  format: string;
  description: string;
}

export interface ColorScheme {
  primary: string;
  secondary: string;
  accent: string;
  neutralLight: string;
  neutralDark: string;
}

export interface Fonts {
  headings: string;
  body: string;
}

export interface VisualIdentityGuidance {
  colorScheme: ColorScheme;
  fonts: Fonts;
  brandingNotes: string[];
}

export interface FullProduct {
  productName: string;
  targetAudienceProfile: TargetAudienceProfile;
  coreValueProposition: string;
  transformationPromise: {
    before: string;
    after: string;
  };
  pricingStrategy: PricingStrategy;
  marketingAngles: MarketingAngles;
  programStructure: ModuleDetail[];
  leadMagnetSuggestion: LeadMagnetSuggestion;
  visualIdentityGuidance: VisualIdentityGuidance;
}

export interface SavedProductItem extends FullProduct {
  id: string; // Unique ID for the saved item
  savedAt: string; // ISO string for when it was saved
}

export enum AppPhase {
  Initial = 'initial',
  IdeaGeneration = 'ideaGeneration',
  ProductBuilding = 'productBuilding',
  ProductView = 'productView',
  SavedProductsView = 'savedProductsView'
}