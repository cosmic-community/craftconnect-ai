import { getFeaturedProducts } from '@/lib/cosmic'
import ProductCard from '@/components/ProductCard'

export default async function FeaturedProducts() {
  const products = await getFeaturedProducts()

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-12 max-w-md mx-auto">
          <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-earth-100 to-earth-200 rounded-full flex items-center justify-center">
            <span className="text-4xl">🏺</span>
          </div>
          <h3 className="text-2xl font-bold text-primary-800 mb-4">
            Authentic Crafts Coming Soon
          </h3>
          <p className="text-earth-600 leading-relaxed">
            Our artisans are carefully crafting exceptional pieces that blend traditional techniques with contemporary design. Each item will feature blockchain authenticity and AR preview capabilities.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {products.map((product, index) => (
        <div 
          key={product.id}
          className="animate-slide-up"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <ProductCard 
            product={product} 
            showARPreview={true} 
            showAuthenticityBadge={true}
          />
        </div>
      ))}
    </div>
  )
}