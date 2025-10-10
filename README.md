# 🍣 Пузаті суші - Brovary

Modern sushi restaurant website with online ordering and delivery for Brovary, Ukraine.

**Live Site**: [puzatisushi.com.ua](https://puzatisushi.com.ua)

## 📋 About

Пузаті суші is a full-featured restaurant website offering:
- 🛒 Interactive menu with 12 categories and 45+ items
- 🛍️ Shopping cart with real-time updates
- 📦 Online ordering system via Google Forms integration
- 📱 Fully responsive design
- 🚀 Fast performance with Vite
- ♿ Accessibility features (ARIA labels, semantic HTML)
- 🔍 SEO optimized with structured data

### Menu Categories

1. **Роли** (Rolls) - 15 items including Philadelphia, California, Canada
2. **Сети** (Sets) - 10 combo sets
3. **Запечені** (Baked Rolls) - 3 baked specialties
4. **Салат** (Salad) - Chuka seaweed salad
5. **Сашимі** (Sashimi) - 3 varieties
6. **Нігірі** (Nigiri Sushi) - 4 types
7. **Гункани** (Gunkan) - 3 options
8. **Супи** (Soups) - Miso, Tom Yam, Ramen
9. **Напої** (Drinks) - Beverages
10. **Міні роли / Макі** (Mini Rolls / Maki)
11. **Суші та крім-суші** (Sushi & Cream Sushi)
12. **Всі** (All) - View all items

### Contact Information

- 📍 **Address**: м. Бровари, вул. Грушевського 7
- 📞 **Phone**: +38 (077) 172-07-07
- 🕐 **Hours**: Пн-Нд: 10:00 - 21:00

## 🛠 Technologies

This project is built with modern web technologies:

- **Frontend Framework**: React 18.3
- **Build Tool**: Vite 5.4
- **Language**: TypeScript 5.8
- **Styling**: Tailwind CSS 3.4
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Routing**: React Router DOM 6.30
- **State Management**: React hooks (useState)
- **Forms**: React Hook Form + Zod validation
- **Icons**: Lucide React
- **Notifications**: Sonner toasts

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Local Development

```sh
# Clone the repository
git clone https://github.com/YOUR_USERNAME/buzaty-sushi-brovary.git

# Navigate to project directory
cd buzaty-sushi-brovary

# Install dependencies
npm install

# Start development server (runs on http://localhost:8080)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📝 Development

### Working Locally

Work locally with your preferred IDE (VS Code, WebStorm, etc.). All changes pushed to the `main` branch will trigger automatic deployment via GitHub Actions.

### Available Scripts

```json
{
  "dev": "vite",                    // Start dev server
  "build": "vite build",            // Production build
  "build:dev": "vite build --mode development",
  "lint": "eslint .",              // Run linter
  "preview": "vite preview",        // Preview production build
  "deploy": "npm run build && cp CNAME dist/ && gh-pages -d dist"
}
```

## 📁 Project Structure

```
buzaty-sushi-brovary/
├── src/
│   ├── components/
│   │   ├── Cart.tsx              # Shopping cart sidebar
│   │   ├── Footer.tsx            # Footer with contact info
│   │   ├── Header.tsx            # Sticky header with cart
│   │   ├── Hero.tsx              # Hero banner section
│   │   ├── Menu.tsx              # Menu with category tabs
│   │   ├── MenuItem.tsx          # Product card component
│   │   ├── OrderForm.tsx         # Order form dialog
│   │   └── ui/                   # shadcn/ui components
│   ├── pages/
│   │   ├── Index.tsx             # Main page
│   │   └── NotFound.tsx          # 404 page
│   ├── hooks/
│   │   └── use-toast.ts          # Toast notifications hook
│   ├── lib/
│   │   └── utils.ts              # Utility functions
│   ├── assets/                   # Images
│   ├── App.tsx                   # App router
│   ├── main.tsx                  # Entry point
│   └── index.css                 # Global styles
├── public/                       # Static assets
├── dist/                         # Production build
└── index.html                    # HTML template
```

## 🎨 Features

### Shopping Cart
- Add/remove items
- Quantity adjustment
- Real-time total calculation
- Persistent during session

### Order System
- Google Forms integration
- Customer information collection
- Order details submission
- Success/error notifications

### SEO Optimization
- Meta tags (Open Graph, Twitter Cards)
- Structured data (Schema.org)
- Semantic HTML
- Geo-location tags
- Sitemap and robots.txt

### Responsive Design
- Mobile-first approach
- Tablet and desktop layouts
- Touch-friendly interfaces
- Smooth animations

## How can I deploy this project?

### GitHub Pages (puzatisushi.com.ua)

This project is configured to deploy automatically to GitHub Pages at **puzatisushi.com.ua**.

#### Initial Setup (One-time)

1. Go to your GitHub repository settings
2. Navigate to **Settings** > **Pages**
3. Under **Source**, select **GitHub Actions**
4. Under **Custom domain**, enter `puzatisushi.com.ua` (if not already set)
5. Wait for DNS check to complete

#### DNS Configuration

Make sure your DNS provider has the following records:

**A Records** (point to GitHub Pages servers):
```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

**CNAME Record** (if using www subdomain):
```
www.puzatisushi.com.ua CNAME <your-github-username>.github.io
```

#### Automatic Deployment

Every push to the `main` branch will automatically trigger a deployment via GitHub Actions. The workflow will:
1. Build the project
2. Copy the CNAME file
3. Deploy to GitHub Pages

You can also manually trigger a deployment from the **Actions** tab in GitHub.
