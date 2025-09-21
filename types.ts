// Base Cosmic object interface
interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
}

// Artisan Profile
export interface Artisan extends CosmicObject {
  type: 'artisans';
  metadata: {
    bio?: string;
    cultural_background?: string;
    craft_specialties?: string[];
    experience_years?: number;
    location?: {
      country: string;
      region: string;
      coordinates?: [number, number];
    };
    avatar?: {
      url: string;
      imgix_url: string;
    };
    featured_image?: {
      url: string;
      imgix_url: string;
    };
    languages?: string[];
    featured?: boolean;
    verification_status?: ArtisanStatus;
    cultural_heritage?: string;
    traditional_techniques?: string[];
    story?: string;
    contact_info?: {
      email?: string;
      phone?: string;
      social_media?: Record<string, string>;
    };
  };
}

// Craft Product
export interface Product extends CosmicObject {
  type: 'products';
  metadata: {
    artisan?: Artisan;
    category?: ProductCategory;
    price?: number;
    currency?: string;
    description?: string;
    cultural_story?: string;
    materials?: string[];
    techniques_used?: string[];
    dimensions?: {
      length?: number;
      width?: number;
      height?: number;
      weight?: number;
    };
    images?: {
      url: string;
      imgix_url: string;
    }[];
    authenticity_badge?: {
      blockchain_hash: string;
      verification_date: string;
      origin_verified: boolean;
    };
    ar_preview_enabled?: boolean;
    ar_model_url?: string;
    availability_status?: ProductStatus;
    crafting_time_days?: number;
    featured?: boolean;
    tags?: string[];
    shipping_info?: {
      weight: number;
      fragile: boolean;
      custom_packaging: boolean;
    };
  };
}

// Product Category
export interface ProductCategory extends CosmicObject {
  type: 'product_categories';
  metadata: {
    description?: string;
    icon?: string;
    parent_category?: ProductCategory;
    cultural_significance?: string;
    traditional_techniques?: string[];
  };
}

// Cultural Story
export interface CulturalStory extends CosmicObject {
  type: 'cultural_stories';
  metadata: {
    artisan?: Artisan;
    story_type?: StoryType;
    cultural_region?: string;
    historical_period?: string;
    techniques_featured?: string[];
    images?: {
      url: string;
      imgix_url: string;
    }[];
    audio_narration?: {
      url: string;
      duration: number;
      language: string;
    };
    video_content?: {
      url: string;
      duration: number;
      thumbnail: string;
    };
    translated_versions?: {
      language: string;
      content: string;
      audio_url?: string;
    }[];
  };
}

// Workshop Event
export interface Workshop extends CosmicObject {
  type: 'workshops';
  metadata: {
    artisan?: Artisan;
    workshop_type?: WorkshopType;
    scheduled_date?: string;
    duration_minutes?: number;
    max_participants?: number;
    price?: number;
    currency?: string;
    description?: string;
    materials_included?: string[];
    skill_level?: SkillLevel;
    language?: string;
    virtual_link?: string;
    location?: {
      address?: string;
      coordinates?: [number, number];
    };
    thumbnail?: {
      url: string;
      imgix_url: string;
    };
    registration_status?: WorkshopStatus;
    cultural_context?: string;
  };
}

// Market Insight
export interface MarketInsight extends CosmicObject {
  type: 'market_insights';
  metadata: {
    product_category?: ProductCategory;
    region?: string;
    trending_score?: number;
    price_range?: {
      min: number;
      max: number;
      average: number;
    };
    demand_level?: DemandLevel;
    seasonal_trends?: {
      month: string;
      demand_multiplier: number;
    }[];
    competitor_analysis?: {
      average_price: number;
      unique_selling_points: string[];
    };
    export_potential?: {
      target_markets: string[];
      shipping_considerations: string[];
    };
    generated_date?: string;
  };
}

// Microfinance Opportunity
export interface FinancingOpportunity extends CosmicObject {
  type: 'financing_opportunities';
  metadata: {
    opportunity_type?: FinancingType;
    amount_range?: {
      min: number;
      max: number;
    };
    currency?: string;
    eligibility_criteria?: string[];
    application_deadline?: string;
    provider?: {
      name: string;
      type: string;
      contact: string;
    };
    interest_rate?: number;
    repayment_terms?: string;
    success_stories?: string[];
    application_url?: string;
    requirements?: string[];
  };
}

// AI Content Generation
export interface AIContent extends CosmicObject {
  type: 'ai_content';
  metadata: {
    content_type?: AIContentType;
    source_object_id?: string;
    source_object_type?: string;
    generated_content?: string;
    language?: string;
    generation_prompt?: string;
    quality_score?: number;
    human_reviewed?: boolean;
    approved_for_use?: boolean;
    generated_date?: string;
    variations?: {
      language: string;
      content: string;
    }[];
  };
}

// Type literals for select-dropdown values
export type ArtisanStatus = 'pending_verification' | 'verified' | 'master_artisan' | 'suspended';
export type ProductStatus = 'available' | 'made_to_order' | 'out_of_stock' | 'discontinued';
export type StoryType = 'craft_technique' | 'cultural_heritage' | 'artisan_journey' | 'material_sourcing';
export type WorkshopType = 'live_in_person' | 'virtual_online' | 'hybrid' | 'recorded_course';
export type WorkshopStatus = 'open_registration' | 'waitlist' | 'full' | 'cancelled' | 'completed';
export type SkillLevel = 'beginner' | 'intermediate' | 'advanced' | 'master_class';
export type DemandLevel = 'very_low' | 'low' | 'moderate' | 'high' | 'very_high';
export type FinancingType = 'microloan' | 'crowdfunding' | 'grant' | 'investment' | 'sponsorship';
export type AIContentType = 'product_description' | 'cultural_story' | 'blog_post' | 'social_media' | 'video_script';

// API response types
export interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit: number;
  skip: number;
}

// Component prop interfaces
export interface ArtisanCardProps {
  artisan: Artisan;
  showCTA?: boolean;
  className?: string;
}

export interface ProductCardProps {
  product: Product;
  showARPreview?: boolean;
  showAuthenticityBadge?: boolean;
  className?: string;
}

export interface WorkshopCardProps {
  workshop: Workshop;
  showRegistration?: boolean;
  className?: string;
}

// Utility types
export type CreateArtisanData = Omit<Artisan, 'id' | 'created_at' | 'modified_at'>;
export type CreateProductData = Omit<Product, 'id' | 'created_at' | 'modified_at'>;
export type UpdateProductData = Partial<CreateProductData['metadata']>;

// Type guards
export function isArtisan(obj: CosmicObject): obj is Artisan {
  return obj.type === 'artisans';
}

export function isProduct(obj: CosmicObject): obj is Product {
  return obj.type === 'products';
}

export function isWorkshop(obj: CosmicObject): obj is Workshop {
  return obj.type === 'workshops';
}

export function isCulturalStory(obj: CosmicObject): obj is CulturalStory {
  return obj.type === 'cultural_stories';
}