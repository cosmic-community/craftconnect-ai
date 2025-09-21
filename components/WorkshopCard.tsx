import Link from 'next/link'
import { Calendar, Clock, Users, MapPin, Globe, Video, Award } from 'lucide-react'
import { optimizeImage, formatCurrency, formatDate, formatDuration, getSkillLevelColor } from '@/lib/utils'
import { WorkshopCardProps } from '@/types'

export default function WorkshopCard({ workshop, showRegistration = true, className = '' }: WorkshopCardProps) {
  if (!workshop || !workshop.metadata) {
    return null
  }

  const {
    workshop_type = 'virtual_online',
    scheduled_date,
    duration_minutes = 120,
    max_participants = 20,
    price = 0,
    currency = 'USD',
    description,
    skill_level = 'beginner',
    language = 'English',
    virtual_link,
    location,
    thumbnail,
    registration_status = 'open_registration',
    cultural_context,
    artisan
  } = workshop.metadata

  const getWorkshopTypeIcon = (type: string) => {
    switch (type) {
      case 'live_in_person': return MapPin
      case 'virtual_online': return Globe
      case 'hybrid': return Video
      case 'recorded_course': return Award
      default: return Globe
    }
  }

  const getRegistrationStatusColor = (status: string) => {
    switch (status) {
      case 'open_registration': return 'bg-green-100 text-green-700 border-green-200'
      case 'waitlist': return 'bg-yellow-100 text-yellow-700 border-yellow-200'
      case 'full': return 'bg-red-100 text-red-700 border-red-200'
      case 'cancelled': return 'bg-gray-100 text-gray-700 border-gray-200'
      case 'completed': return 'bg-blue-100 text-blue-700 border-blue-200'
      default: return 'bg-gray-100 text-gray-700 border-gray-200'
    }
  }

  const getWorkshopTypeLabel = (type: string) => {
    switch (type) {
      case 'live_in_person': return 'In-Person'
      case 'virtual_online': return 'Virtual'
      case 'hybrid': return 'Hybrid'
      case 'recorded_course': return 'Self-Paced'
      default: return 'Virtual'
    }
  }

  const WorkshopIcon = getWorkshopTypeIcon(workshop_type)

  return (
    <div className={`bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 group ${className} artisan-card-hover`}>
      {/* Workshop Image */}
      {thumbnail?.imgix_url && (
        <div className="relative h-48 overflow-hidden">
          <img
            src={optimizeImage(thumbnail.imgix_url, 600, 300)}
            alt={workshop.title}
            width={600}
            height={300}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          
          {/* Workshop Type Badge */}
          <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg px-3 py-1 flex items-center space-x-1">
            <WorkshopIcon className="w-4 h-4 text-primary-600" />
            <span className="text-sm font-medium text-primary-800">
              {getWorkshopTypeLabel(workshop_type)}
            </span>
          </div>
          
          {/* Registration Status */}
          <div className={`absolute top-4 right-4 skill-badge border ${getRegistrationStatusColor(registration_status)}`}>
            {registration_status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
          </div>
          
          {/* Price */}
          <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm rounded-lg px-3 py-2">
            <p className="font-bold text-lg text-primary-800">
              {price > 0 ? formatCurrency(price, currency) : 'Free'}
            </p>
          </div>
        </div>
      )}

      <div className="p-6">
        {/* Workshop Title */}
        <h3 className="text-xl font-bold text-primary-800 mb-3 group-hover:text-primary-700 transition-colors line-clamp-2">
          {workshop.title}
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
              <p className="text-sm font-medium text-earth-700">Instructor: {artisan.title}</p>
              {artisan.metadata?.cultural_background && (
                <p className="text-xs text-earth-500">{artisan.metadata.cultural_background}</p>
              )}
            </div>
          </div>
        )}

        {/* Workshop Details */}
        <div className="space-y-3 mb-4">
          {scheduled_date && (
            <div className="flex items-center space-x-2 text-sm text-earth-600">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(scheduled_date)} at {new Date(scheduled_date).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
          )}
          
          <div className="flex items-center space-x-2 text-sm text-earth-600">
            <Clock className="w-4 h-4" />
            <span>{formatDuration(duration_minutes)}</span>
          </div>
          
          <div className="flex items-center space-x-2 text-sm text-earth-600">
            <Users className="w-4 h-4" />
            <span>Max {max_participants} participants</span>
          </div>
          
          <div className="flex items-center space-x-2 text-sm text-earth-600">
            <Globe className="w-4 h-4" />
            <span>Conducted in {language}</span>
          </div>
          
          {workshop_type === 'live_in_person' && location?.address && (
            <div className="flex items-center space-x-2 text-sm text-earth-600">
              <MapPin className="w-4 h-4" />
              <span className="line-clamp-1">{location.address}</span>
            </div>
          )}
        </div>

        {/* Skill Level */}
        <div className="mb-4">
          <span className={`skill-badge ${getSkillLevelColor(skill_level)}`}>
            {skill_level.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())} Level
          </span>
        </div>

        {/* Description */}
        {description && (
          <p className="text-earth-600 text-sm leading-relaxed mb-4 line-clamp-3">
            {description}
          </p>
        )}

        {/* Cultural Context */}
        {cultural_context && (
          <div className="mb-6 p-3 bg-accent-50 border border-accent-100 rounded-lg">
            <p className="text-xs text-accent-700 font-medium mb-1">Cultural Context:</p>
            <p className="text-sm text-accent-800 line-clamp-2">
              {cultural_context}
            </p>
          </div>
        )}

        {/* Registration Button */}
        {showRegistration && (
          <div className="space-y-2">
            {registration_status === 'open_registration' ? (
              <Link
                href={`/workshops/${workshop.slug}`}
                className="w-full bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white text-center font-medium py-3 px-4 rounded-lg transition-all duration-300 hover:scale-105 block"
              >
                Register Now
              </Link>
            ) : registration_status === 'waitlist' ? (
              <Link
                href={`/workshops/${workshop.slug}`}
                className="w-full bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 text-white text-center font-medium py-3 px-4 rounded-lg transition-all duration-300 hover:scale-105 block"
              >
                Join Waitlist
              </Link>
            ) : (
              <button
                disabled
                className="w-full bg-gray-300 text-gray-500 text-center font-medium py-3 px-4 rounded-lg cursor-not-allowed"
              >
                {registration_status === 'full' ? 'Workshop Full' : 
                 registration_status === 'cancelled' ? 'Cancelled' : 
                 registration_status === 'completed' ? 'Completed' : 'Unavailable'}
              </button>
            )}
            
            <Link
              href={`/workshops/${workshop.slug}`}
              className="w-full border-2 border-secondary-500 hover:bg-secondary-500 text-secondary-700 hover:text-white text-center font-medium py-2 px-4 rounded-lg transition-all duration-300 block"
            >
              View Details
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}