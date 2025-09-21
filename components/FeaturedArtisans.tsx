import { getFeaturedArtisans } from '@/lib/cosmic'
import ArtisanCard from '@/components/ArtisanCard'

export default async function FeaturedArtisans() {
  const artisans = await getFeaturedArtisans()

  if (!artisans || artisans.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-12 max-w-md mx-auto">
          <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-earth-100 to-earth-200 rounded-full flex items-center justify-center">
            <span className="text-4xl">🎨</span>
          </div>
          <h3 className="text-2xl font-bold text-primary-800 mb-4">
            Master Artisans Coming Soon
          </h3>
          <p className="text-earth-600 leading-relaxed">
            We're carefully curating a collection of exceptional artisans who preserve traditional crafting techniques while embracing innovation. Check back soon to meet these talented creators.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {artisans.map((artisan, index) => (
        <div 
          key={artisan.id}
          className="animate-slide-up"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <ArtisanCard artisan={artisan} showCTA={true} />
        </div>
      ))}
    </div>
  )
}