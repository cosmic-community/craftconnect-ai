import { 
  Mic, 
  Eye, 
  Shield, 
  TrendingUp, 
  Users, 
  DollarSign,
  Languages,
  Smartphone
} from 'lucide-react'

const features = [
  {
    icon: Mic,
    title: 'Voice-to-Storefront Setup',
    description: 'Create your online shop simply by speaking in your native language. AI auto-generates product listings, pricing suggestions, and banners.',
    gradient: 'from-blue-500 to-cyan-500',
    delay: '0'
  },
  {
    icon: Eye,
    title: 'AR Craft Preview',
    description: 'Customers can virtually place handicrafts like pottery, paintings, or furniture in their homes before purchase using augmented reality.',
    gradient: 'from-purple-500 to-pink-500',
    delay: '100'
  },
  {
    icon: Shield,
    title: 'Blockchain Authenticity',
    description: 'Each product has a traceable badge showing origin, artisan story, and materials used, ensuring authenticity and transparency.',
    gradient: 'from-green-500 to-emerald-500',
    delay: '200'
  },
  {
    icon: TrendingUp,
    title: 'AI Demand Insights',
    description: 'Real-time suggestions about trending products, global pricing standards, and export potential powered by market intelligence.',
    gradient: 'from-orange-500 to-red-500',
    delay: '300'
  },
  {
    icon: Users,
    title: 'Cultural Experience Hub',
    description: 'Host live workshops, virtual craft classes, or cultural storytelling sessions for global customers beyond just selling crafts.',
    gradient: 'from-indigo-500 to-purple-500',
    delay: '400'
  },
  {
    icon: DollarSign,
    title: 'AI Microfinancing',
    description: 'Analyze artisan credibility & sales, then connect them to microloans, crowdfunding, or sponsorships to help scale their craft.',
    gradient: 'from-yellow-500 to-orange-500',
    delay: '500'
  },
  {
    icon: Languages,
    title: 'Multilingual Storytelling',
    description: 'AI generates compelling product descriptions, blog posts, and video scripts about heritage and techniques in multiple languages.',
    gradient: 'from-teal-500 to-blue-500',
    delay: '600'
  },
  {
    icon: Smartphone,
    title: 'Mobile-First Experience',
    description: 'Optimized for artisans who primarily use mobile devices, with intuitive touch interfaces and offline capabilities.',
    gradient: 'from-pink-500 to-rose-500',
    delay: '700'
  }
]

export default function PlatformFeatures() {
  return (
    <div className="max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-20">
        <h2 className="text-4xl md:text-5xl font-bold text-primary-800 mb-6">
          Revolutionary Features for Artisans
        </h2>
        <p className="text-xl text-earth-700 max-w-4xl mx-auto leading-relaxed">
          Our AI-powered platform combines cutting-edge technology with deep respect for traditional craftsmanship, 
          offering unique capabilities not found in existing marketplaces.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {features.map((feature, index) => {
          const IconComponent = feature.icon
          return (
            <div 
              key={index}
              className={`bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 group artisan-card-hover animate-slide-up`}
              style={{ animationDelay: `${feature.delay}ms` }}
            >
              {/* Icon with gradient background */}
              <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <IconComponent className="w-8 h-8 text-white" />
              </div>

              {/* Feature Title */}
              <h3 className="text-xl font-bold text-primary-800 mb-4 group-hover:text-primary-700 transition-colors">
                {feature.title}
              </h3>

              {/* Feature Description */}
              <p className="text-earth-600 leading-relaxed text-sm">
                {feature.description}
              </p>

              {/* Hover effect indicator */}
              <div className={`w-0 h-1 bg-gradient-to-r ${feature.gradient} mt-6 group-hover:w-full transition-all duration-500 rounded-full`} />
            </div>
          )
        })}
      </div>

      {/* Bottom CTA Section */}
      <div className="mt-20 text-center">
        <div className="bg-gradient-to-r from-primary-50 to-accent-50 rounded-3xl p-12">
          <h3 className="text-3xl font-bold text-primary-800 mb-4">
            Ready to Transform Your Craft Business?
          </h3>
          <p className="text-xl text-earth-700 mb-8 max-w-2xl mx-auto">
            Join thousands of artisans who have already discovered the power of AI-enhanced storytelling and global reach.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-semibold py-4 px-8 rounded-xl text-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl">
              Start Your Journey
            </button>
            <button className="border-2 border-secondary-500 hover:bg-secondary-500 text-secondary-700 hover:text-white font-semibold py-4 px-8 rounded-xl text-lg transition-all duration-300 hover:scale-105">
              Watch Demo
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}