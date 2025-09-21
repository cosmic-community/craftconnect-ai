import { getMarketInsights } from '@/lib/cosmic'
import MarketInsightCard from '@/components/MarketInsightCard'

export default async function MarketInsights() {
  const insights = await getMarketInsights()

  if (!insights || insights.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-12 max-w-lg mx-auto">
          <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-earth-100 to-earth-200 rounded-full flex items-center justify-center">
            <span className="text-4xl">📈</span>
          </div>
          <h3 className="text-2xl font-bold text-primary-800 mb-4">
            AI Market Intelligence Incoming
          </h3>
          <p className="text-earth-600 leading-relaxed mb-6">
            Our AI system is analyzing global craft market trends, pricing patterns, and demand forecasts. Soon, artisans will receive personalized insights to optimize their businesses and expand into new markets.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg">
              <div className="font-semibold text-blue-800 mb-2">Trend Analysis</div>
              <div className="text-blue-600">Real-time market trends across 50+ countries</div>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg">
              <div className="font-semibold text-green-800 mb-2">Price Optimization</div>
              <div className="text-green-600">AI-powered pricing suggestions for maximum profit</div>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg">
              <div className="font-semibold text-purple-800 mb-2">Export Potential</div>
              <div className="text-purple-600">Identify best international markets for your crafts</div>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-lg">
              <div className="font-semibold text-orange-800 mb-2">Seasonal Insights</div>
              <div className="text-orange-600">Understand demand patterns throughout the year</div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {insights.slice(0, 6).map((insight, index) => (
        <div 
          key={insight.id}
          className="animate-slide-up"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <MarketInsightCard insight={insight} />
        </div>
      ))}
    </div>
  )
}