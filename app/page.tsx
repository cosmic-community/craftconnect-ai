import { Suspense } from 'react'
import Hero from '@/components/Hero'
import FeaturedArtisans from '@/components/FeaturedArtisans'
import FeaturedProducts from '@/components/FeaturedProducts'
import PlatformFeatures from '@/components/PlatformFeatures'
import CulturalStories from '@/components/CulturalStories'
import UpcomingWorkshops from '@/components/UpcomingWorkshops'
import MarketInsights from '@/components/MarketInsights'
import Footer from '@/components/Footer'
import LoadingSpinner from '@/components/LoadingSpinner'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Hero />

      {/* Platform Features */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <PlatformFeatures />
        </div>
      </section>

      {/* Featured Artisans */}
      <section className="py-20 craft-gradient">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary-800 mb-4">
              Meet Our Master Artisans
            </h2>
            <p className="text-xl text-earth-700 max-w-3xl mx-auto">
              Discover the talented craftspeople preserving centuries-old traditions while embracing modern innovation
            </p>
          </div>
          <Suspense fallback={<LoadingSpinner />}>
            <FeaturedArtisans />
          </Suspense>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary-800 mb-4">
              Authentic Handcrafted Excellence
            </h2>
            <p className="text-xl text-earth-700 max-w-3xl mx-auto">
              Every piece tells a story, verified with blockchain authenticity and enhanced with AR preview
            </p>
          </div>
          <Suspense fallback={<LoadingSpinner />}>
            <FeaturedProducts />
          </Suspense>
        </div>
      </section>

      {/* Cultural Stories */}
      <section className="py-20 cultural-pattern bg-earth-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary-800 mb-4">
              Cultural Heritage Stories
            </h2>
            <p className="text-xl text-earth-700 max-w-3xl mx-auto">
              Explore the rich traditions and techniques passed down through generations
            </p>
          </div>
          <Suspense fallback={<LoadingSpinner />}>
            <CulturalStories />
          </Suspense>
        </div>
      </section>

      {/* Upcoming Workshops */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary-800 mb-4">
              Learn from Master Artisans
            </h2>
            <p className="text-xl text-earth-700 max-w-3xl mx-auto">
              Join live workshops and cultural experiences with artisans from around the world
            </p>
          </div>
          <Suspense fallback={<LoadingSpinner />}>
            <UpcomingWorkshops />
          </Suspense>
        </div>
      </section>

      {/* Market Insights */}
      <section className="py-20 bg-gradient-to-r from-accent-50 to-secondary-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary-800 mb-4">
              AI-Powered Market Insights
            </h2>
            <p className="text-xl text-earth-700 max-w-3xl mx-auto">
              Real-time data to help artisans understand global demand and optimize their craft business
            </p>
          </div>
          <Suspense fallback={<LoadingSpinner />}>
            <MarketInsights />
          </Suspense>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}