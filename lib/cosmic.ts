import { createBucketClient } from '@cosmicjs/sdk'

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
})

// Simple error helper for Cosmic SDK
function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}

// Fetch all artisans with error handling
export async function getArtisans() {
  try {
    const response = await cosmic.objects
      .find({ type: 'artisans' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    return response.objects;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch artisans');
  }
}

// Fetch featured artisans
export async function getFeaturedArtisans() {
  try {
    const response = await cosmic.objects
      .find({ 
        type: 'artisans',
        'metadata.featured': true 
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    return response.objects;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch featured artisans');
  }
}

// Fetch single artisan by slug
export async function getArtisan(slug: string) {
  try {
    const response = await cosmic.objects
      .findOne({
        type: 'artisans',
        slug
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    return response.object;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch artisan');
  }
}

// Fetch all products
export async function getProducts() {
  try {
    const response = await cosmic.objects
      .find({ type: 'products' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    return response.objects;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch products');
  }
}

// Fetch featured products
export async function getFeaturedProducts() {
  try {
    const response = await cosmic.objects
      .find({ 
        type: 'products',
        'metadata.featured': true 
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    return response.objects;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch featured products');
  }
}

// Fetch products by artisan
export async function getProductsByArtisan(artisanId: string) {
  try {
    const response = await cosmic.objects
      .find({ 
        type: 'products',
        'metadata.artisan': artisanId 
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    return response.objects;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch products by artisan');
  }
}

// Fetch single product by slug
export async function getProduct(slug: string) {
  try {
    const response = await cosmic.objects
      .findOne({
        type: 'products',
        slug
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    return response.object;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch product');
  }
}

// Fetch workshops
export async function getWorkshops() {
  try {
    const response = await cosmic.objects
      .find({ type: 'workshops' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    // Sort by scheduled_date manually
    return response.objects.sort((a, b) => {
      const dateA = new Date(a.metadata?.scheduled_date || '').getTime();
      const dateB = new Date(b.metadata?.scheduled_date || '').getTime();
      return dateA - dateB; // Earliest first
    });
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch workshops');
  }
}

// Fetch cultural stories
export async function getCulturalStories() {
  try {
    const response = await cosmic.objects
      .find({ type: 'cultural_stories' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    return response.objects;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch cultural stories');
  }
}

// Fetch market insights
export async function getMarketInsights() {
  try {
    const response = await cosmic.objects
      .find({ type: 'market_insights' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    // Sort by generated_date manually (most recent first)
    return response.objects.sort((a, b) => {
      const dateA = new Date(a.metadata?.generated_date || '').getTime();
      const dateB = new Date(b.metadata?.generated_date || '').getTime();
      return dateB - dateA; // Newest first
    });
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch market insights');
  }
}

// Fetch financing opportunities
export async function getFinancingOpportunities() {
  try {
    const response = await cosmic.objects
      .find({ type: 'financing_opportunities' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    // Sort by application_deadline manually (soonest first)
    return response.objects.sort((a, b) => {
      const dateA = new Date(a.metadata?.application_deadline || '').getTime();
      const dateB = new Date(b.metadata?.application_deadline || '').getTime();
      return dateA - dateB; // Soonest first
    });
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch financing opportunities');
  }
}

// Create new product
export async function createProduct(productData: any) {
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