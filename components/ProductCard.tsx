import Link from 'next/link'
import { Eye, ShieldCheck, MapPin, Clock, Star } from 'lucide-react'
import { optimizeImage, formatCurrency, formatBlockchainHash } from '@/lib/utils'
import { ProductCardProps } from '@/types'

export default function ProductCard({ 
  product, 
  showARPreview = false, 
  showAuthenticityBadge = false, 
  className = '' 
}: ProductCardProps) {
  if (!product || !product.metadata) {
    return null
  }

  const {
    price = 0,
    currency = 'USD',
    description,
    cultural_story,
    materials = [],
    techniques_used = [],
    images = [],
    authenticity_badge,
    ar_preview_enabled = false,
    availability_status = 'available',
    crafting_time_days,
    artisan
  } = product.metadata

  const mainImage = images[0]?.imgix_url

  const getAvailabilityColor = (status: string) => {
    switch (status) {
      case 'available': return 'text-green-600 bg-green-100'
      case 'made_to_order': return 'text-blue-600 bg-blue-100'
      case 'out_of_stock': return 'text-red-600 bg-red-100'
      case 'discontinued': return 'text-gray-600 bg-gray-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  return (
    <div className={`bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 group ${className} artisan-card-hover`}>
      {/* Product Image */}
      {mainImage && (
        <div className="relative h-64 overflow-hidden">
          <img
            src={optimizeImage(mainImage, 600, 400)}
            alt={product.title}
            width={600}
            height={400}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
          
          {/* Availability Status */}
          <div className={`absolute top-4 left-4 skill-badge ${getAvailabilityColor(availability_status)}`}>
            {availability_status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
          </div>
          
          {/* AR Preview Badge */}
          {showARPreview && ar_preview_enabled && (
            <div className="absolute top-4 right-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
              <Eye className="w-3 h-3" />
              <span>AR Preview</span>
            </div>
          )}
          
          {/* Price */}
          <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm rounded-lg px-3 py-2">
            <p className="font-bold text-lg text-primary-800">
              {formatCurrency(price, currency)}
            </p>
          </div>
        </div>
      )}

      <div className="p-6">
        {/* Product Title */}
        <h3 className="text-xl font-bold text-primary-800 mb-3 group-hover:text-primary-700 transition-colors line-clamp-2">
          {product.title}
        </h3>

        {/* Artisan Info */}
        {artisan && (
          <div className="flex items-center space-x-2 mb-4">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-secondary-300 to-secondary-500 flex items-center justify-center">
              <span className="text-white font-medium text-sm">
                {artisan.title?.charAt(0)}
              </span>
            </div>
            <div>
              <p className="text-sm font-medium text-earth-700">by {artisan.title}</p>
              {artisan.metadata?.location?.country && (
                <p className="text-xs text-earth-500 flex items-center space-x-1">
                  <MapPin className="w-3 h-3" />
                  <span>{artisan.metadata.location.country}</span>
                </p>
              )}
            </div>
          </div>
        )}

        {/* Description */}
        {description && (
          <p className="text-earth-600 text-sm leading-relaxed mb-4 line-clamp-3">
            {description}
          </p>
        )}

        {/* Cultural Story Snippet */}
        {cultural_story && (
          <div className="mb-4">
            <p className="text-xs text-earth-500 mb-1 font-medium">Cultural Heritage:</p>
            <p className="text-sm text-earth-600 line-clamp-2 italic">
              {cultural_story}
            </p>
          </div>
        )}

        {/* Materials and Techniques */}
        <div className="mb-4">
          {materials.length > 0 && (
            <div className="mb-2">
              <p className="text-xs text-earth-500 mb-1 font-medium">Materials:</p>
              <div className="flex flex-wrap gap-1">
                {materials.slice(0, 3).map((material, index) => (
                  <span
                    key={index}
                    className="skill-badge bg-earth-100 text-earth-700 border border-earth-200 text-xs"
                  >
                    {material}
                  </span>
                ))}
                {materials.length > 3 && (
                  <span className="skill-badge bg-earth-100 text-earth-600 border border-earth-200 text-xs">
                    +{materials.length - 3}
                  </span>
                )}
              </div>
            </div>
          )}

          {techniques_used.length > 0 && (
            <div>
              <p className="text-xs text-earth-500 mb-1 font-medium">Techniques:</p>
              <div className="flex flex-wrap gap-1">
                {techniques_used.slice(0, 2).map((technique, index) => (
                  <span
                    key={index}
                    className="skill-badge bg-accent-100 text-accent-700 border border-accent-200 text-xs"
                  >
                    {technique}
                  </span>
                ))}
                {techniques_used.length > 2 && (
                  <span className="skill-badge bg-accent-100 text-accent-600 border border-accent-200 text-xs">
                    +{techniques_used.length - 2}
                  </span>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Authenticity Badge */}
        {showAuthenticityBadge && authenticity_badge && (
          <div className="mb-4">
            <div className="blockchain-verified">
              <ShieldCheck className="w-4 h-4" />
              <span>Verified: {formatBlockchainHash(authenticity_badge.blockchain_hash)}</span>
            </div>
          </div>
        )}

        {/* Crafting Time */}
        {crafting_time_days && (
          <div className="flex items-center space-x-1 text-sm text-earth-600 mb-4">
            <Clock className="w-4 h-4" />
            <span>{crafting_time_days} days to craft</span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-3">
          <Link
            href={`/products/${product.slug}`}
            className="w-full bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white text-center font-medium py-3 px-4 rounded-lg transition-all duration-300 hover:scale-105 block"
          >
            View Details
          </Link>
          
          {ar_preview_enabled && (
            <button className="w-full ar-preview-button">
              <Eye className="w-4 h-4 mr-2" />
              Preview with AR
            </button>
          )}
        </div>
      </div>
    </div>
  )
}