import { type ClassValue, clsx } from 'clsx'

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}

// Format currency with proper locale
export function formatCurrency(amount: number, currency: string = 'USD', locale: string = 'en-US') {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(amount)
}

// Format date with proper locale
export function formatDate(date: string, locale: string = 'en-US') {
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date))
}

// Generate optimized image URL with imgix
export function optimizeImage(url: string, width?: number, height?: number) {
  if (!url) return ''
  
  const params = new URLSearchParams()
  if (width) params.append('w', width.toString())
  if (height) params.append('h', height.toString())
  params.append('fit', 'crop')
  params.append('auto', 'format,compress')
  
  return `${url}?${params.toString()}`
}

// Truncate text to specified length
export function truncateText(text: string, maxLength: number) {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength).trim() + '...'
}

// Generate slug from title
export function generateSlug(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

// Calculate artisan rating based on various factors
export function calculateArtisanRating(
  experienceYears: number,
  verificationStatus: string,
  productCount: number
) {
  let rating = 3.0 // Base rating
  
  // Experience bonus (up to +1.5)
  rating += Math.min(experienceYears / 10, 1.5)
  
  // Verification bonus
  if (verificationStatus === 'master_artisan') rating += 0.5
  else if (verificationStatus === 'verified') rating += 0.3
  
  // Product portfolio bonus (up to +0.5)
  rating += Math.min(productCount / 20, 0.5)
  
  return Math.min(rating, 5.0) // Cap at 5.0
}

// Parse blockchain hash for display
export function formatBlockchainHash(hash: string, length: number = 8) {
  if (!hash) return 'Not verified'
  return `${hash.substring(0, length)}...${hash.substring(hash.length - 4)}`
}

// Convert duration in minutes to human readable
export function formatDuration(minutes: number) {
  const hours = Math.floor(minutes / 60)
  const remainingMinutes = minutes % 60
  
  if (hours === 0) return `${remainingMinutes}m`
  if (remainingMinutes === 0) return `${hours}h`
  return `${hours}h ${remainingMinutes}m`
}

// Get skill level color
export function getSkillLevelColor(level: string) {
  switch (level) {
    case 'beginner': return 'text-green-600 bg-green-100'
    case 'intermediate': return 'text-blue-600 bg-blue-100'
    case 'advanced': return 'text-orange-600 bg-orange-100'
    case 'master_class': return 'text-purple-600 bg-purple-100'
    default: return 'text-gray-600 bg-gray-100'
  }
}

// Get demand level indicator
export function getDemandLevelIndicator(level: string) {
  switch (level) {
    case 'very_high': return { color: 'text-red-500', icon: '🔥' }
    case 'high': return { color: 'text-orange-500', icon: '📈' }
    case 'moderate': return { color: 'text-yellow-500', icon: '📊' }
    case 'low': return { color: 'text-blue-500', icon: '📉' }
    case 'very_low': return { color: 'text-gray-500', icon: '💤' }
    default: return { color: 'text-gray-400', icon: '❓' }
  }
}

// Validate email address
export function isValidEmail(email: string) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Generate random ID for temporary use
export function generateTempId() {
  return Math.random().toString(36).substring(2) + Date.now().toString(36)
}

// Check if an object is empty
export function isEmpty(obj: any): boolean {
  if (obj == null) return true
  if (Array.isArray(obj)) return obj.length === 0
  if (typeof obj === 'object') return Object.keys(obj).length === 0
  return false
}