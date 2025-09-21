import Link from 'next/link'
import { MapPin, Award, Calendar, Star } from 'lucide-react'
import { optimizeImage, calculateArtisanRating } from '@/lib/utils'
import { ArtisanCardProps } from '@/types'

export default function ArtisanCard({ artisan, showCTA = true, className = '' }: ArtisanCardProps) {
  if (!artisan || !artisan.metadata) {
    return null
  }

  const {
    bio,
    cultural_background,
    craft_specialties = [],
    experience_years = 0,
    location,
    avatar,
    featured_image,
    verification_status = 'pending_verification',
    traditional_techniques = []
  } = artisan.metadata

  const displayImage = featured_image?.imgix_url || avatar?.imgix_url
  const rating = calculateArtisanRating(experience_years, verification_status, craft_specialties.length)
  
  return (
    <div className={`bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 group ${className} artisan-card-hover`}>
      {/* Hero Image */}
      {displayImage && (
        <div className="relative h-64 overflow-hidden">
          <img
            src={optimizeImage(displayImage, 600, 400)}
            alt={artisan.title}
            width={600}
            height={400}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          
          {/* Verification Badge */}
          {verification_status === 'master_artisan' && (
            <div className="absolute top-4 right-4 authenticity-badge">
              <Award className="w-4 h-4 mr-1" />
              Master Artisan
            </div>
          )}
          
          {/* Rating */}
          <div className="absolute bottom-4 right-4 flex items-center space-x-1 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
            <Star className="w-4 h-4 text-yellow-500 fill-current" />
            <span className="font-medium text-sm">{rating.toFixed(1)}</span>
          </div>
        </div>
      )}

      <div className="p-6">
        {/* Artisan Name and Cultural Background */}
        <div className="mb-4">
          <h3 className="text-2xl font-bold text-primary-800 mb-2 group-hover:text-primary-700 transition-colors">
            {artisan.title}
          </h3>
          {cultural_background && (
            <p className="text-earth-600 font-medium">
              {cultural_background}
            </p>
          )}
        </div>

        {/* Location and Experience */}
        <div className="flex items-center text-sm text-earth-600 mb-4 space-x-4">
          {location && (
            <div className="flex items-center space-x-1">
              <MapPin className="w-4 h-4" />
              <span>{location.country}</span>
            </div>
          )}
          <div className="flex items-center space-x-1">
            <Calendar className="w-4 h-4" />
            <span>{experience_years}+ years</span>
          </div>
        </div>

        {/* Bio */}
        {bio && (
          <p className="text-earth-700 text-sm leading-relaxed mb-6 line-clamp-3">
            {bio}
          </p>
        )}

        {/* Craft Specialties */}
        {craft_specialties.length > 0 && (
          <div className="mb-6">
            <h4 className="font-semibold text-primary-800 text-sm mb-2">Specialties</h4>
            <div className="flex flex-wrap gap-2">
              {craft_specialties.slice(0, 3).map((specialty, index) => (
                <span
                  key={index}
                  className="skill-badge bg-secondary-100 text-secondary-800 border border-secondary-200"
                >
                  {specialty}
                </span>
              ))}
              {craft_specialties.length > 3 && (
                <span className="skill-badge bg-earth-100 text-earth-700 border border-earth-200">
                  +{craft_specialties.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Traditional Techniques */}
        {traditional_techniques.length > 0 && (
          <div className="mb-6">
            <h4 className="font-semibold text-primary-800 text-sm mb-2">Traditional Techniques</h4>
            <div className="flex flex-wrap gap-2">
              {traditional_techniques.slice(0, 2).map((technique, index) => (
                <span
                  key={index}
                  className="skill-badge bg-accent-100 text-accent-800 border border-accent-200"
                >
                  {technique}
                </span>
              ))}
              {traditional_techniques.length > 2 && (
                <span className="skill-badge bg-earth-100 text-earth-700 border border-earth-200">
                  +{traditional_techniques.length - 2} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Call to Action */}
        {showCTA && (
          <div className="flex space-x-3">
            <Link
              href={`/artisans/${artisan.slug}`}
              className="flex-1 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white text-center font-medium py-3 px-4 rounded-lg transition-all duration-300 hover:scale-105"
            >
              View Profile
            </Link>
            <Link
              href={`/artisans/${artisan.slug}/products`}
              className="flex-1 border-2 border-secondary-500 hover:bg-secondary-500 text-secondary-700 hover:text-white text-center font-medium py-3 px-4 rounded-lg transition-all duration-300 hover:scale-105"
            >
              View Crafts
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}