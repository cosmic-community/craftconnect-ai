import Link from 'next/link'
import { Sparkles, Globe, Palette, Users } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-secondary-50 to-accent-50 min-h-screen flex items-center">
      {/* Background Pattern */}
      <div className="absolute inset-0 cultural-pattern opacity-30" />
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 floating-animation">
        <Palette className="w-8 h-8 text-accent-400 opacity-60" />
      </div>
      <div className="absolute top-40 right-20 floating-animation animation-delay-200">
        <Globe className="w-12 h-12 text-secondary-400 opacity-60" />
      </div>
      <div className="absolute bottom-40 left-20 floating-animation animation-delay-400">
        <Sparkles className="w-10 h-10 text-primary-400 opacity-60" />
      </div>
      <div className="absolute bottom-20 right-10 floating-animation animation-delay-600">
        <Users className="w-8 h-8 text-earth-400 opacity-60" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            {/* Main Headline */}
            <h1 className="text-5xl md:text-7xl font-bold mb-8">
              <span className="text-primary-800">Craft</span>
              <span className="text-accent-600">Connect</span>
              <span className="text-secondary-700"> AI</span>
            </h1>
            
            {/* Subheading */}
            <p className="text-xl md:text-2xl text-earth-700 mb-8 max-w-4xl mx-auto leading-relaxed">
              Empowering local artisans to share their cultural stories, preserve traditional crafts, 
              and connect with global audiences through AI-powered storytelling and authentic marketplace experiences.
            </p>

            {/* Feature Highlights */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 max-w-6xl mx-auto">
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 text-center artisan-card-hover">
                <div className="w-16 h-16 bg-gradient-to-br from-accent-100 to-accent-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-8 h-8 text-accent-600" />
                </div>
                <h3 className="font-semibold text-primary-800 mb-2">AI Storytelling</h3>
                <p className="text-sm text-earth-600">Generate compelling multilingual content about your craft heritage</p>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 text-center artisan-card-hover">
                <div className="w-16 h-16 bg-gradient-to-br from-secondary-100 to-secondary-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-8 h-8 text-secondary-600" />
                </div>
                <h3 className="font-semibold text-primary-800 mb-2">Global Reach</h3>
                <p className="text-sm text-earth-600">Connect with customers worldwide while preserving your cultural identity</p>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 text-center artisan-card-hover">
                <div className="w-16 h-16 bg-gradient-to-br from-primary-100 to-primary-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Palette className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="font-semibold text-primary-800 mb-2">AR Preview</h3>
                <p className="text-sm text-earth-600">Let customers visualize your crafts in their homes before purchase</p>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 text-center artisan-card-hover">
                <div className="w-16 h-16 bg-gradient-to-br from-earth-100 to-earth-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-earth-600" />
                </div>
                <h3 className="font-semibold text-primary-800 mb-2">Cultural Hub</h3>
                <p className="text-sm text-earth-600">Host virtual workshops and share your traditional techniques</p>
              </div>
            </div>

            {/* Call to Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-2xl mx-auto">
              <Link
                href="/artisans"
                className="bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-semibold py-4 px-8 rounded-xl text-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Discover Artisans
              </Link>
              
              <Link
                href="/products"
                className="bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-600 hover:to-accent-700 text-white font-semibold py-4 px-8 rounded-xl text-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Explore Crafts
              </Link>
              
              <Link
                href="/workshops"
                className="border-2 border-secondary-500 hover:bg-secondary-500 text-secondary-700 hover:text-white font-semibold py-4 px-8 rounded-xl text-lg transition-all duration-300 hover:scale-105 bg-white/80 backdrop-blur-sm"
              >
                Join Workshops
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="mt-16 pt-8 border-t border-earth-200">
              <p className="text-earth-600 mb-6">Trusted by artisans in 50+ countries</p>
              <div className="flex flex-wrap justify-center items-center gap-8 opacity-70">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="text-sm text-earth-600">Blockchain Verified</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <span className="text-sm text-earth-600">AI-Powered</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                  <span className="text-sm text-earth-600">Cultural Preservation</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                  <span className="text-sm text-earth-600">Global Marketplace</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}