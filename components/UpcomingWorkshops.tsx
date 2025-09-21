import { getWorkshops } from '@/lib/cosmic'
import WorkshopCard from '@/components/WorkshopCard'
import { Workshop } from '@/types'

export default async function UpcomingWorkshops() {
  const workshops = await getWorkshops()

  // Filter upcoming workshops (in the future)
  const upcomingWorkshops = workshops.filter((workshop: Workshop) => {
    if (!workshop.metadata?.scheduled_date) return false
    return new Date(workshop.metadata.scheduled_date) > new Date()
  }).slice(0, 6) // Show only first 6

  if (!upcomingWorkshops || upcomingWorkshops.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-12 max-w-lg mx-auto">
          <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-earth-100 to-earth-200 rounded-full flex items-center justify-center">
            <span className="text-4xl">🎓</span>
          </div>
          <h3 className="text-2xl font-bold text-primary-800 mb-4">
            Workshops Coming Soon
          </h3>
          <p className="text-earth-600 leading-relaxed mb-6">
            Our artisans are preparing exciting workshops where you can learn traditional crafting techniques, explore cultural heritage, and create your own masterpieces. Both virtual and in-person sessions will be available.
          </p>
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            <span className="skill-badge bg-blue-100 text-blue-700">Virtual Classes</span>
            <span className="skill-badge bg-green-100 text-green-700">In-Person Sessions</span>
            <span className="skill-badge bg-purple-100 text-purple-700">Cultural Storytelling</span>
          </div>
          <p className="text-sm text-earth-500">
            Sign up for notifications to be the first to know when new workshops are announced.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {upcomingWorkshops.map((workshop: Workshop, index: number) => (
        <div 
          key={workshop.id}
          className="animate-slide-up"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <WorkshopCard workshop={workshop} showRegistration={true} />
        </div>
      ))}
    </div>
  )
}