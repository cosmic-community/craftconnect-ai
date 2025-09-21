import { getCulturalStories } from '@/lib/cosmic'
import CulturalStoryCard from '@/components/CulturalStoryCard'
import { CulturalStory } from '@/types'

export default async function CulturalStories() {
  const stories = await getCulturalStories()

  if (!stories || stories.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-12 max-w-lg mx-auto">
          <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-earth-100 to-earth-200 rounded-full flex items-center justify-center">
            <span className="text-4xl">📚</span>
          </div>
          <h3 className="text-2xl font-bold text-primary-800 mb-4">
            Cultural Stories Collection Growing
          </h3>
          <p className="text-earth-600 leading-relaxed">
            We're gathering remarkable stories from artisans worldwide about their cultural heritage, traditional techniques, and the journey of their craft. These stories will be available in multiple languages to reach global audiences.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            <span className="skill-badge bg-accent-100 text-accent-700">Heritage Stories</span>
            <span className="skill-badge bg-secondary-100 text-secondary-700">Craft Techniques</span>
            <span className="skill-badge bg-primary-100 text-primary-700">Artisan Journeys</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {stories.slice(0, 6).map((story: CulturalStory, index: number) => (
        <div 
          key={story.id}
          className="animate-slide-up"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <CulturalStoryCard story={story} />
        </div>
      ))}
    </div>
  )
}