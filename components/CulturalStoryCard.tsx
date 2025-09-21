import Link from 'next/link'
import { Play, Headphones, Globe, Calendar } from 'lucide-react'
import { optimizeImage, formatDate } from '@/lib/utils'
import { CulturalStory } from '@/types'

interface CulturalStoryCardProps {
  story: CulturalStory
  className?: string
}

export default function CulturalStoryCard({ story, className = '' }: CulturalStoryCardProps) {
  if (!story || !story.metadata) {
    return null
  }

  const {
    story_type = 'craft_technique',
    cultural_region,
    historical_period,
    techniques_featured = [],
    images = [],
    audio_narration,
    video_content,
    translated_versions = [],
    artisan
  } = story.metadata

  const mainImage = images[0]?.imgix_url
  const hasMultipleLanguages = translated_versions.length > 0

  const getStoryTypeColor = (type: string) => {
    switch (type) {
      case 'craft_technique': return 'bg-blue-100 text-blue-700 border-blue-200'
      case 'cultural_heritage': return 'bg-purple-100 text-purple-700 border-purple-200'
      case 'artisan_journey': return 'bg-green-100 text-green-700 border-green-200'
      case 'material_sourcing': return 'bg-orange-100 text-orange-700 border-orange-200'
      default: return 'bg-gray-100 text-gray-700 border-gray-200'
    }
  }

  return (
    <div className={`bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 group ${className} artisan-card-hover`}>
      {/* Story Image */}
      {mainImage && (
        <div className="relative h-48 overflow-hidden">
          <img
            src={optimizeImage(mainImage, 600, 300)}
            alt={story.title}
            width={600}
            height={300}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          
          {/* Story Type Badge */}
          <div className={`absolute top-4 left-4 skill-badge border ${getStoryTypeColor(story_type)}`}>
            {story_type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
          </div>
          
          {/* Media Indicators */}
          <div className="absolute top-4 right-4 flex space-x-2">
            {video_content && (
              <div className="bg-red-500 text-white p-2 rounded-full">
                <Play className="w-4 h-4" />
              </div>
            )}
            {audio_narration && (
              <div className="bg-purple-500 text-white p-2 rounded-full">
                <Headphones className="w-4 h-4" />
              </div>
            )}
            {hasMultipleLanguages && (
              <div className="bg-green-500 text-white p-2 rounded-full">
                <Globe className="w-4 h-4" />
              </div>
            )}
          </div>
          
          {/* Historical Period */}
          {historical_period && (
            <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg px-3 py-1 text-sm font-medium text-earth-800">
              {historical_period}
            </div>
          )}
        </div>
      )}

      <div className="p-6">
        {/* Story Title */}
        <h3 className="text-xl font-bold text-primary-800 mb-3 group-hover:text-primary-700 transition-colors line-clamp-2">
          {story.title}
        </h3>

        {/* Artisan and Cultural Region */}
        <div className="flex items-center justify-between mb-4">
          {artisan && (
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-secondary-300 to-secondary-500 flex items-center justify-center">
                <span className="text-white font-medium text-sm">
                  {artisan.title?.charAt(0)}
                </span>
              </div>
              <span className="text-sm font-medium text-earth-700">{artisan.title}</span>
            </div>
          )}
          {cultural_region && (
            <span className="text-sm text-earth-500">{cultural_region}</span>
          )}
        </div>

        {/* Story Content Preview */}
        {story.content && (
          <div className="mb-4">
            <p className="text-earth-600 text-sm leading-relaxed line-clamp-4">
              {story.content}
            </p>
          </div>
        )}

        {/* Featured Techniques */}
        {techniques_featured.length > 0 && (
          <div className="mb-4">
            <p className="text-xs text-earth-500 mb-2 font-medium">Featured Techniques:</p>
            <div className="flex flex-wrap gap-2">
              {techniques_featured.slice(0, 3).map((technique, index) => (
                <span
                  key={index}
                  className="skill-badge bg-accent-100 text-accent-700 border border-accent-200 text-xs"
                >
                  {technique}
                </span>
              ))}
              {techniques_featured.length > 3 && (
                <span className="skill-badge bg-earth-100 text-earth-600 border border-earth-200 text-xs">
                  +{techniques_featured.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Story Details */}
        <div className="mb-6 space-y-2">
          {video_content && (
            <div className="flex items-center space-x-2 text-sm text-earth-600">
              <Play className="w-4 h-4 text-red-500" />
              <span>Video story ({Math.floor(video_content.duration / 60)}:{(video_content.duration % 60).toString().padStart(2, '0')})</span>
            </div>
          )}
          
          {audio_narration && (
            <div className="flex items-center space-x-2 text-sm text-earth-600">
              <Headphones className="w-4 h-4 text-purple-500" />
              <span>Audio narration in {audio_narration.language}</span>
            </div>
          )}
          
          {hasMultipleLanguages && (
            <div className="flex items-center space-x-2 text-sm text-earth-600">
              <Globe className="w-4 h-4 text-green-500" />
              <span>Available in {translated_versions.length + 1} languages</span>
            </div>
          )}
          
          <div className="flex items-center space-x-2 text-sm text-earth-500">
            <Calendar className="w-4 h-4" />
            <span>Published {formatDate(story.created_at)}</span>
          </div>
        </div>

        {/* Action Button */}
        <Link
          href={`/stories/${story.slug}`}
          className="w-full bg-gradient-to-r from-secondary-600 to-secondary-700 hover:from-secondary-700 hover:to-secondary-800 text-white text-center font-medium py-3 px-4 rounded-lg transition-all duration-300 hover:scale-105 block"
        >
          Read Full Story
        </Link>
      </div>
    </div>
  )
}