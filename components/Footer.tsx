import Link from 'next/link'
import { Heart, Globe, Palette, Users, Mail, Phone, MapPin } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gradient-to-br from-primary-900 via-primary-800 to-secondary-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-accent-400 to-accent-600 rounded-xl flex items-center justify-center">
                <Palette className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">CraftConnect AI</h3>
                <p className="text-accent-200 text-sm">Empowering Artisans</p>
              </div>
            </div>
            <p className="text-primary-200 leading-relaxed mb-6">
              Bridging traditional craftsmanship with modern technology, helping local artisans share their stories and reach global audiences.
            </p>
            <div className="flex space-x-4">
              <div className="w-10 h-10 bg-primary-700 hover:bg-primary-600 rounded-lg flex items-center justify-center transition-colors cursor-pointer">
                <Globe className="w-5 h-5" />
              </div>
              <div className="w-10 h-10 bg-primary-700 hover:bg-primary-600 rounded-lg flex items-center justify-center transition-colors cursor-pointer">
                <Users className="w-5 h-5" />
              </div>
              <div className="w-10 h-10 bg-primary-700 hover:bg-primary-600 rounded-lg flex items-center justify-center transition-colors cursor-pointer">
                <Heart className="w-5 h-5" />
              </div>
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-accent-100">Platform</h4>
            <nav className="space-y-3">
              <Link href="/artisans" className="block text-primary-200 hover:text-accent-200 transition-colors">
                Discover Artisans
              </Link>
              <Link href="/products" className="block text-primary-200 hover:text-accent-200 transition-colors">
                Browse Crafts
              </Link>
              <Link href="/workshops" className="block text-primary-200 hover:text-accent-200 transition-colors">
                Join Workshops
              </Link>
              <Link href="/stories" className="block text-primary-200 hover:text-accent-200 transition-colors">
                Cultural Stories
              </Link>
              <Link href="/insights" className="block text-primary-200 hover:text-accent-200 transition-colors">
                Market Insights
              </Link>
              <Link href="/financing" className="block text-primary-200 hover:text-accent-200 transition-colors">
                Microfinancing
              </Link>
            </nav>
          </div>

          {/* Features */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-accent-100">Features</h4>
            <nav className="space-y-3">
              <Link href="/voice-setup" className="block text-primary-200 hover:text-accent-200 transition-colors">
                Voice-to-Storefront
              </Link>
              <Link href="/ar-preview" className="block text-primary-200 hover:text-accent-200 transition-colors">
                AR Craft Preview
              </Link>
              <Link href="/blockchain" className="block text-primary-200 hover:text-accent-200 transition-colors">
                Authenticity Badges
              </Link>
              <Link href="/ai-storytelling" className="block text-primary-200 hover:text-accent-200 transition-colors">
                AI Storytelling
              </Link>
              <Link href="/pricing-insights" className="block text-primary-200 hover:text-accent-200 transition-colors">
                Pricing Intelligence
              </Link>
            </nav>
          </div>

          {/* Support & Contact */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-accent-100">Support</h4>
            <div className="space-y-4 mb-6">
              <div className="flex items-center space-x-3 text-primary-200">
                <Mail className="w-5 h-5 text-accent-300" />
                <span>support@craftconnect.ai</span>
              </div>
              <div className="flex items-center space-x-3 text-primary-200">
                <Phone className="w-5 h-5 text-accent-300" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3 text-primary-200">
                <MapPin className="w-5 h-5 text-accent-300" />
                <span>Global Platform</span>
              </div>
            </div>
            <nav className="space-y-3">
              <Link href="/help" className="block text-primary-200 hover:text-accent-200 transition-colors">
                Help Center
              </Link>
              <Link href="/documentation" className="block text-primary-200 hover:text-accent-200 transition-colors">
                Documentation
              </Link>
              <Link href="/community" className="block text-primary-200 hover:text-accent-200 transition-colors">
                Community Forum
              </Link>
              <Link href="/contact" className="block text-primary-200 hover:text-accent-200 transition-colors">
                Contact Us
              </Link>
            </nav>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-primary-600 pt-8 mt-12">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6 text-primary-200 text-sm">
              <span>© {currentYear} CraftConnect AI. All rights reserved.</span>
              <Link href="/privacy" className="hover:text-accent-200 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-accent-200 transition-colors">
                Terms of Service
              </Link>
              <Link href="/cookies" className="hover:text-accent-200 transition-colors">
                Cookie Policy
              </Link>
            </div>
            
            <div className="flex items-center space-x-2 text-primary-200 text-sm">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-400 fill-current" />
              <span>for artisans worldwide</span>
            </div>
          </div>
          
          {/* Cultural Appreciation */}
          <div className="text-center mt-8 p-6 bg-gradient-to-r from-accent-900/20 to-secondary-900/20 rounded-xl border border-accent-700/30">
            <p className="text-accent-100 font-medium mb-2">
              🌍 Celebrating Cultural Heritage • 🎨 Preserving Traditional Crafts • 🤝 Connecting Communities
            </p>
            <p className="text-primary-300 text-sm">
              Every purchase and interaction helps preserve centuries-old traditions and supports artisan communities worldwide
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}