import { TrendingUp, TrendingDown, DollarSign, Globe, Calendar, BarChart3 } from 'lucide-react'
import { formatCurrency, formatDate, getDemandLevelIndicator } from '@/lib/utils'
import { MarketInsight } from '@/types'

interface MarketInsightCardProps {
  insight: MarketInsight
  className?: string
}

export default function MarketInsightCard({ insight, className = '' }: MarketInsightCardProps) {
  if (!insight || !insight.metadata) {
    return null
  }

  const {
    product_category,
    region = 'Global',
    trending_score = 0,
    price_range,
    demand_level = 'moderate',
    seasonal_trends = [],
    competitor_analysis,
    export_potential,
    generated_date
  } = insight.metadata

  const demandIndicator = getDemandLevelIndicator(demand_level)
  const isPositiveTrend = trending_score > 0
  
  return (
    <div className={`bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 group ${className} artisan-card-hover`}>
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-xl font-bold text-primary-800 mb-1 group-hover:text-primary-700 transition-colors">
            {insight.title}
          </h3>
          {product_category && (
            <p className="text-earth-600 text-sm">Category: {product_category.title}</p>
          )}
        </div>
        <div className="text-right">
          <div className="flex items-center space-x-1 text-sm">
            <Globe className="w-4 h-4 text-earth-500" />
            <span className="text-earth-600">{region}</span>
          </div>
          {generated_date && (
            <div className="flex items-center space-x-1 text-xs text-earth-500 mt-1">
              <Calendar className="w-3 h-3" />
              <span>{formatDate(generated_date)}</span>
            </div>
          )}
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {/* Demand Level */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4">
          <div className="flex items-center space-x-2 mb-2">
            <BarChart3 className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-medium text-blue-800">Demand Level</span>
          </div>
          <div className={`flex items-center space-x-1 ${demandIndicator.color}`}>
            <span className="text-lg">{demandIndicator.icon}</span>
            <span className="font-bold capitalize">{demand_level.replace('_', ' ')}</span>
          </div>
        </div>

        {/* Trending Score */}
        <div className={`bg-gradient-to-br ${isPositiveTrend ? 'from-green-50 to-green-100' : 'from-red-50 to-red-100'} rounded-xl p-4`}>
          <div className="flex items-center space-x-2 mb-2">
            {isPositiveTrend ? (
              <TrendingUp className="w-5 h-5 text-green-600" />
            ) : (
              <TrendingDown className="w-5 h-5 text-red-600" />
            )}
            <span className={`text-sm font-medium ${isPositiveTrend ? 'text-green-800' : 'text-red-800'}`}>
              Trend Score
            </span>
          </div>
          <div className={`font-bold text-lg ${isPositiveTrend ? 'text-green-600' : 'text-red-600'}`}>
            {isPositiveTrend ? '+' : ''}{trending_score}%
          </div>
        </div>
      </div>

      {/* Price Range */}
      {price_range && (
        <div className="mb-6 p-4 bg-gradient-to-br from-accent-50 to-accent-100 rounded-xl">
          <div className="flex items-center space-x-2 mb-3">
            <DollarSign className="w-5 h-5 text-accent-600" />
            <span className="font-medium text-accent-800">Price Intelligence</span>
          </div>
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div>
              <p className="text-accent-600 mb-1">Min</p>
              <p className="font-bold text-accent-800">{formatCurrency(price_range.min)}</p>
            </div>
            <div>
              <p className="text-accent-600 mb-1">Avg</p>
              <p className="font-bold text-accent-800">{formatCurrency(price_range.average)}</p>
            </div>
            <div>
              <p className="text-accent-600 mb-1">Max</p>
              <p className="font-bold text-accent-800">{formatCurrency(price_range.max)}</p>
            </div>
          </div>
        </div>
      )}

      {/* Seasonal Trends Preview */}
      {seasonal_trends.length > 0 && (
        <div className="mb-6">
          <h4 className="font-medium text-primary-800 text-sm mb-3">Seasonal Trends</h4>
          <div className="flex flex-wrap gap-2">
            {seasonal_trends.slice(0, 4).map((trend, index) => (
              <div
                key={index}
                className={`skill-badge text-xs ${
                  trend.demand_multiplier > 1.2 
                    ? 'bg-green-100 text-green-700 border-green-200' 
                    : trend.demand_multiplier < 0.8
                    ? 'bg-red-100 text-red-700 border-red-200'
                    : 'bg-blue-100 text-blue-700 border-blue-200'
                }`}
              >
                {trend.month}: {trend.demand_multiplier}x
              </div>
            ))}
            {seasonal_trends.length > 4 && (
              <span className="skill-badge bg-earth-100 text-earth-600 border border-earth-200 text-xs">
                +{seasonal_trends.length - 4} more
              </span>
            )}
          </div>
        </div>
      )}

      {/* Export Potential */}
      {export_potential && export_potential.target_markets.length > 0 && (
        <div className="mb-6">
          <h4 className="font-medium text-primary-800 text-sm mb-3">Export Opportunities</h4>
          <div className="flex flex-wrap gap-2">
            {export_potential.target_markets.slice(0, 3).map((market, index) => (
              <span
                key={index}
                className="skill-badge bg-purple-100 text-purple-700 border border-purple-200 text-xs"
              >
                {market}
              </span>
            ))}
            {export_potential.target_markets.length > 3 && (
              <span className="skill-badge bg-earth-100 text-earth-600 border border-earth-200 text-xs">
                +{export_potential.target_markets.length - 3} more
              </span>
            )}
          </div>
        </div>
      )}

      {/* Competitor Analysis */}
      {competitor_analysis && (
        <div className="mb-6 p-4 bg-gradient-to-br from-secondary-50 to-secondary-100 rounded-xl">
          <h4 className="font-medium text-secondary-800 text-sm mb-3">Market Position</h4>
          <div className="space-y-2 text-sm">
            <div>
              <span className="text-secondary-600">Avg Market Price: </span>
              <span className="font-bold text-secondary-800">
                {formatCurrency(competitor_analysis.average_price)}
              </span>
            </div>
            {competitor_analysis.unique_selling_points.length > 0 && (
              <div>
                <span className="text-secondary-600">Key Differentiators:</span>
                <div className="mt-1 flex flex-wrap gap-1">
                  {competitor_analysis.unique_selling_points.slice(0, 2).map((point, index) => (
                    <span
                      key={index}
                      className="skill-badge bg-secondary-200 text-secondary-800 border border-secondary-300 text-xs"
                    >
                      {point}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Action Button */}
      <button className="w-full bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-medium py-3 px-4 rounded-lg transition-all duration-300 hover:scale-105">
        View Full Analysis
      </button>
    </div>
  )
}