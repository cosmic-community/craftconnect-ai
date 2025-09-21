import { createBucketClient } from '@cosmicjs/sdk'
import { Artisan, Product, Workshop, CulturalStory, MarketInsight, FinancingOpportunity } from '@/types'

// Create bucket client with proper error handling
const createCosmicClient = () => {
  try {
    const bucketSlug = process.env.COSMIC_BUCKET_SLUG
    const readKey = process.env.COSMIC_READ_KEY
    const writeKey = process.env.COSMIC_WRITE_KEY

    if (!bucketSlug || !readKey) {
      console.warn('Missing Cosmic CMS environment variables during build')
      return null
    }

    return createBucketClient({
      bucketSlug,
      readKey,
      writeKey,
    })
  } catch (error) {
    console.warn('Failed to create Cosmic client:', error)
    return null
  }
}

export const cosmic = createCosmicClient()

// Simple error helper for Cosmic SDK
function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}

// Generic function to handle Cosmic API calls with proper error handling
async function safeCosmicCall<T>(
  apiCall: () => Promise<{ objects: T[] } | { object: T }>,
  errorMessage: string,
  returnArray: boolean = true
): Promise<T[] | T | null> {
  if (!cosmic) {
    console.warn('Cosmic client not available, returning empty result')
    return returnArray ? [] as T[] : null
  }

  try {
    const response = await apiCall()
    
    if ('objects' in response) {
      return response.objects as T[]
    } else if ('object' in response) {
      return response.object as T
    }
    
    return returnArray ? [] as T[] : null
  } catch (error) {
    console.warn(errorMessage, error)
    
    if (hasStatus(error) && error.status === 404) {
      return returnArray ? [] as T[] : null
    }
    
    // During build time, don't throw errors - just return empty results
    if (process.env.NODE_ENV === 'production' || process.env.VERCEL) {
      console.warn(`Build-time error ignored for ${errorMessage}`)
      return returnArray ? [] as T[] : null
    }
    
    throw new Error(errorMessage)
  }
}

// Fetch all artisans with error handling
export async function getArtisans(): Promise<Artisan[]> {
  return safeCosmicCall<Artisan>(
    () => cosmic!.objects
      .find({ type: 'artisans' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1),
    'Failed to fetch artisans'
  ) as Promise<Artisan[]>
}

// Fetch featured artisans
export async function getFeaturedArtisans(): Promise<Artisan[]> {
  return safeCosmicCall<Artisan>(
    () => cosmic!.objects
      .find({ 
        type: 'artisans',
        'metadata.featured': true 
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1),
    'Failed to fetch featured artisans'
  ) as Promise<Artisan[]>
}

// Fetch single artisan by slug
export async function getArtisan(slug: string): Promise<Artisan | null> {
  return safeCosmicCall<Artisan>(
    () => cosmic!.objects
      .findOne({
        type: 'artisans',
        slug
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1),
    'Failed to fetch artisan',
    false
  ) as Promise<Artisan | null>
}

// Fetch all products
export async function getProducts(): Promise<Product[]> {
  return safeCosmicCall<Product>(
    () => cosmic!.objects
      .find({ type: 'products' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1),
    'Failed to fetch products'
  ) as Promise<Product[]>
}

// Fetch featured products
export async function getFeaturedProducts(): Promise<Product[]> {
  return safeCosmicCall<Product>(
    () => cosmic!.objects
      .find({ 
        type: 'products',
        'metadata.featured': true 
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1),
    'Failed to fetch featured products'
  ) as Promise<Product[]>
}

// Fetch products by artisan
export async function getProductsByArtisan(artisanId: string): Promise<Product[]> {
  return safeCosmicCall<Product>(
    () => cosmic!.objects
      .find({ 
        type: 'products',
        'metadata.artisan': artisanId 
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1),
    'Failed to fetch products by artisan'
  ) as Promise<Product[]>
}

// Fetch single product by slug
export async function getProduct(slug: string): Promise<Product | null> {
  return safeCosmicCall<Product>(
    () => cosmic!.objects
      .findOne({
        type: 'products',
        slug
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1),
    'Failed to fetch product',
    false
  ) as Promise<Product | null>
}

// Fetch workshops
export async function getWorkshops(): Promise<Workshop[]> {
  const workshops = await safeCosmicCall<Workshop>(
    () => cosmic!.objects
      .find({ type: 'workshops' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1),
    'Failed to fetch workshops'
  ) as Workshop[]

  if (!workshops || workshops.length === 0) {
    return []
  }
  
  // Sort by scheduled_date manually
  return workshops.sort((a: Workshop, b: Workshop) => {
    const dateA = new Date(a.metadata?.scheduled_date || '').getTime();
    const dateB = new Date(b.metadata?.scheduled_date || '').getTime();
    return dateA - dateB; // Earliest first
  });
}

// Fetch cultural stories
export async function getCulturalStories(): Promise<CulturalStory[]> {
  return safeCosmicCall<CulturalStory>(
    () => cosmic!.objects
      .find({ type: 'cultural_stories' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1),
    'Failed to fetch cultural stories'
  ) as Promise<CulturalStory[]>
}

// Fetch market insights
export async function getMarketInsights(): Promise<MarketInsight[]> {
  const insights = await safeCosmicCall<MarketInsight>(
    () => cosmic!.objects
      .find({ type: 'market_insights' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1),
    'Failed to fetch market insights'
  ) as MarketInsight[]

  if (!insights || insights.length === 0) {
    return []
  }
  
  // Sort by generated_date manually (most recent first)
  return insights.sort((a: MarketInsight, b: MarketInsight) => {
    const dateA = new Date(a.metadata?.generated_date || '').getTime();
    const dateB = new Date(b.metadata?.generated_date || '').getTime();
    return dateB - dateA; // Newest first
  });
}

// Fetch financing opportunities
export async function getFinancingOpportunities(): Promise<FinancingOpportunity[]> {
  const opportunities = await safeCosmicCall<FinancingOpportunity>(
    () => cosmic!.objects
      .find({ type: 'financing_opportunities' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1),
    'Failed to fetch financing opportunities'
  ) as FinancingOpportunity[]

  if (!opportunities || opportunities.length === 0) {
    return []
  }
  
  // Sort by application_deadline manually (soonest first)
  return opportunities.sort((a: FinancingOpportunity, b: FinancingOpportunity) => {
    const dateA = new Date(a.metadata?.application_deadline || '').getTime();
    const dateB = new Date(b.metadata?.application_deadline || '').getTime();
    return dateA - dateB; // Soonest first
  });
}

// Create new product
export async function createProduct(productData: any) {
  if (!cosmic) {
    throw new Error('Cosmic client not available')
  }

  try {
    const response = await cosmic.objects.insertOne({
      type: 'products',
      title: productData.title,
      slug: productData.slug,
      metadata: productData.metadata
    });
    return response.object;
  } catch (error) {
    console.error('Error creating product:', error);
    throw new Error('Failed to create product');
  }
}

// Update product
export async function updateProduct(id: string, updates: any) {
  if (!cosmic) {
    throw new Error('Cosmic client not available')
  }

  try {
    const response = await cosmic.objects.updateOne(id, {
      metadata: updates
    });
    return response.object;
  } catch (error) {
    console.error('Error updating product:', error);
    throw new Error('Failed to update product');
  }
}