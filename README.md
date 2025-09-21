# CraftConnect AI - Empowering Local Artisans Globally

![CraftConnect AI Platform](https://images.unsplash.com/photo-1550985616-10810253b84d?w=1200&h=300&fit=crop&auto=format)

CraftConnect AI is a revolutionary platform that bridges traditional craftsmanship with modern digital commerce. Our AI-powered tools help local artisans share their cultural stories, showcase authentic crafts, and connect with global audiences while preserving their heritage.

## ✨ Features

- **🤖 AI Storytelling Engine** - Generate compelling multilingual content about artisan heritage and craft techniques
- **🎤 Voice-to-Storefront Setup** - Create online shops using natural speech in native languages
- **📱 AR Craft Preview** - Virtual product placement for customer confidence
- **🔐 Blockchain Authenticity Badges** - Traceable provenance and cultural authentication
- **📊 AI Demand & Pricing Insights** - Real-time market intelligence and optimization
- **🌍 Global Cultural Experience Hub** - Live workshops and storytelling sessions
- **💰 AI-Powered Microfinancing** - Connect artisans to funding opportunities
- **📈 Analytics Dashboard** - Track sales, engagement, and cultural impact
- **🌐 Multilingual Support** - Connect with global audiences in their languages
- **📱 Mobile-First Design** - Accessible from any device, anywhere

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=68cf85c0d7c81076a7d6bfd3&clone_repository=68cf8910d7c81076a7d6bfd9)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> No content model prompt provided - app built from existing content structure

### Code Generation Prompt

> Create an AI-driven platform called CraftConnect AI that empowers local artisans to market their crafts, tell their cultural stories, and expand their reach to global digital audiences. The platform should include unique features not found in existing marketplaces: AI Storytelling Engine – Generates compelling product descriptions, blog posts, and short video scripts about artisans' heritage, craft techniques, and cultural value in multiple languages. Voice-to-Storefront Setup – Allow artisans to create online shops simply by speaking in their native language; AI auto-generates product listings, pricing suggestions, and banners. Augmented Reality (AR) Craft Preview – Customers can virtually place handicrafts (like pottery, paintings, or furniture) in their homes before purchase. Blockchain Craft Authenticity Badge – Each product has a traceable badge showing origin, artisan story, and materials used, ensuring authenticity and transparency. AI Demand & Pricing Insights – Provide artisans with real-time suggestions about trending products, global pricing standards, and export potential. Global Cultural Experience Hub – Beyond selling crafts, artisans can host live workshops, virtual craft classes, or cultural storytelling sessions for global customers. AI-Powered Microfinancing Integration – Analyze artisan credibility & sales, then connect them to microloans, crowdfunding, or sponsorships to help scale their craft.

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## 🛠 Technologies Used

- **Framework:** Next.js 15 with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Content Management:** Cosmic CMS
- **Authentication:** Built-in user management
- **Package Manager:** Bun
- **Deployment:** Vercel/Netlify ready

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ or Bun
- A Cosmic account and bucket
- Git

### Installation

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd craftconnect-ai
   ```

2. **Install dependencies:**
   ```bash
   bun install
   ```

3. **Set up environment variables:**
   ```bash
   cp .env.example .env.local
   ```

4. **Start the development server:**
   ```bash
   bun run dev
   ```

5. **Open your browser:**
   Navigate to `http://localhost:3000`

## 📚 Cosmic SDK Examples

### Fetching Artisan Profiles
```typescript
import { cosmic } from '@/lib/cosmic'

// Get all artisans with their craft stories
const artisans = await cosmic.objects
  .find({ type: 'artisans' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)

// Get featured artisans
const featured = await cosmic.objects
  .find({ 
    type: 'artisans',
    'metadata.featured': true 
  })
  .depth(1)
```

### Managing Craft Products
```typescript
// Get products by category
const products = await cosmic.objects
  .find({ 
    type: 'products',
    'metadata.category': categoryId 
  })
  .depth(1)

// Create new product listing
const newProduct = await cosmic.objects.insertOne({
  type: 'products',
  title: 'Handwoven Basket',
  metadata: {
    artisan: artisanId,
    price: 45.99,
    authenticity_badge: blockchainHash,
    ar_preview_enabled: true,
    cultural_story: aiGeneratedStory
  }
})
```

## 🔗 Cosmic CMS Integration

This platform connects with your Cosmic CMS bucket to manage:

- **Artisan Profiles** - Personal stories, skills, and cultural background
- **Craft Products** - Detailed listings with AI-generated descriptions
- **Cultural Stories** - Heritage content and craft techniques
- **Workshop Events** - Live sessions and virtual experiences
- **Authenticity Records** - Blockchain verification data
- **Market Insights** - AI-generated demand analytics

The content structure supports multilingual content, rich media, and complex relationships between artisans, products, and cultural heritage.

## 🚀 Deployment Options

### Deploy to Vercel (Recommended)
1. Push your code to GitHub
2. Import your repository in Vercel
3. Add your environment variables
4. Deploy!

### Deploy to Netlify
1. Build the project: `bun run build`
2. Deploy the `out` folder to Netlify
3. Configure environment variables

### Environment Variables
Set these in your deployment platform:
- `COSMIC_BUCKET_SLUG`
- `COSMIC_READ_KEY`
- `COSMIC_WRITE_KEY`

<!-- README_END -->