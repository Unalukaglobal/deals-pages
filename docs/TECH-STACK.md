# Unaluka Deals - Tech Stack Propuesto

## Stack Recomendado

### Frontend (Public Site)
| Tecnologia | Justificacion |
|------------|---------------|
| **Next.js 14+** (App Router) | SSR/SSG para SEO, ISR para deals dinamicos |
| **TypeScript** | Consistente con el ecosistema Unaluka |
| **Tailwind CSS** | Rapido, responsive, sin dependencia de Chakra (mejor performance) |
| **shadcn/ui** | Componentes accesibles, customizables, ligeros |

### Por que Next.js y NO Vite+React como apps-unaluka:
- **SEO es critico** - Los deals necesitan ser indexados por Google
- **SSR/SSG** - Pre-renderizar paginas de deals para velocidad y SEO
- **ISR (Incremental Static Regeneration)** - Actualizar deals sin rebuild completo
- **Image Optimization** - Next/Image para product images
- **Metadata API** - Open Graph tags dinamicos por deal
- **Sitemap generation** - Built-in support

### Backend (API)
| Tecnologia | Justificacion |
|------------|---------------|
| **apis-unalukaglobal** (NestJS existente) | Nuevo modulo `Deals`, reutilizar auth + infra |
| **TypeORM** | Consistente, nuevas entidades para deals |
| **MySQL 8** | BD existente, nuevas tablas |

### Infraestructura
| Servicio | Uso |
|----------|-----|
| **Vercel** o **DigitalOcean App Platform** | Deploy del frontend Next.js |
| **DigitalOcean Droplet** (existente) | Backend API |
| **Cloudflare** | CDN + proteccion DDoS |
| **DigitalOcean Spaces** | Imagenes de productos |
| **Google Analytics 4** | Tracking de visitas |
| **Brevo** | Newsletter de deals |

---

## Estructura del Proyecto

```
page-unaluka-deals/
├── docs/                          # Documentacion
│   ├── ANALYSIS-EDEALINFO.md      # Analisis del sitio referencia
│   ├── PROJECT-SPEC.md            # Especificacion del proyecto
│   └── TECH-STACK.md              # Este archivo
│
├── src/
│   ├── app/                       # Next.js App Router
│   │   ├── layout.tsx             # Root layout (header, footer)
│   │   ├── page.tsx               # Home page
│   │   ├── deals/
│   │   │   ├── page.tsx           # All deals listing
│   │   │   └── [slug]/
│   │   │       └── page.tsx       # Deal detail page
│   │   ├── category/
│   │   │   └── [slug]/
│   │   │       └── page.tsx       # Deals by category
│   │   ├── store/
│   │   │   └── [slug]/
│   │   │       └── page.tsx       # Deals by merchant
│   │   ├── search/
│   │   │   └── page.tsx           # Search results
│   │   ├── go/
│   │   │   └── [dealId]/
│   │   │       └── route.ts       # Affiliate redirect + click tracking
│   │   ├── coupons/
│   │   │   └── page.tsx           # Active coupons
│   │   ├── top-deals/
│   │   │   └── page.tsx           # Weekly top deals
│   │   ├── lightning-deals/
│   │   │   └── page.tsx           # Time-limited deals
│   │   ├── about/
│   │   │   └── page.tsx           # About page
│   │   ├── disclosure/
│   │   │   └── page.tsx           # Affiliate disclosure
│   │   └── submit-deal/
│   │       └── page.tsx           # Submit a deal form
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx         # Navigation bar
│   │   │   ├── Footer.tsx         # Footer
│   │   │   ├── Sidebar.tsx        # Categories sidebar
│   │   │   └── SearchBar.tsx      # Search component
│   │   ├── deals/
│   │   │   ├── DealCard.tsx       # Deal card component
│   │   │   ├── DealGrid.tsx       # Grid of deal cards
│   │   │   ├── DealList.tsx       # List view of deals
│   │   │   ├── DealDetail.tsx     # Full deal view
│   │   │   ├── DealBadge.tsx      # "Super Hot!", "50% OFF" badges
│   │   │   ├── PriceDisplay.tsx   # Price with discount
│   │   │   ├── CountdownTimer.tsx # For lightning deals
│   │   │   ├── CouponCode.tsx     # Copy-to-clipboard coupon
│   │   │   └── PriceComparison.tsx# Compare prices
│   │   ├── merchants/
│   │   │   ├── MerchantLogo.tsx   # Merchant logo display
│   │   │   └── MerchantBadge.tsx  # Merchant name + logo
│   │   ├── categories/
│   │   │   ├── CategoryGrid.tsx   # Category browser
│   │   │   └── CategoryChip.tsx   # Category tag
│   │   ├── home/
│   │   │   ├── HeroSection.tsx    # Hero banner
│   │   │   ├── FeaturedDeals.tsx  # Deals destacados
│   │   │   ├── LightningSection.tsx # Lightning deals row
│   │   │   └── CategoryBrowser.tsx# Popular categories
│   │   └── ui/                    # shadcn/ui components
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── badge.tsx
│   │       ├── input.tsx
│   │       └── ...
│   │
│   ├── lib/
│   │   ├── api.ts                 # API client (fetch from backend)
│   │   ├── utils.ts               # Utilities
│   │   ├── formatPrice.ts         # Price formatting
│   │   └── seo.ts                 # SEO helpers (metadata generation)
│   │
│   ├── types/
│   │   ├── deal.ts                # Deal interfaces
│   │   ├── category.ts            # Category interfaces
│   │   ├── merchant.ts            # Merchant interfaces
│   │   └── api.ts                 # API response types
│   │
│   └── styles/
│       └── globals.css            # Tailwind imports + custom styles
│
├── public/
│   ├── images/
│   │   ├── logo.svg
│   │   └── og-default.png         # Default Open Graph image
│   └── favicon.ico
│
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

---

## Nuevas Entidades Backend (apis-unalukaglobal)

### deals
```sql
CREATE TABLE deals (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(500) NOT NULL,
  slug VARCHAR(500) NOT NULL UNIQUE,
  description TEXT,
  image_url VARCHAR(1000),
  images JSON,

  -- Pricing
  current_price DECIMAL(10,2) NOT NULL,
  original_price DECIMAL(10,2),
  currency VARCHAR(3) DEFAULT 'USD',
  discount_percent DECIMAL(5,2),

  -- Relations
  merchant_id INT NOT NULL,
  category_id INT NOT NULL,

  -- Links
  affiliate_url VARCHAR(2000) NOT NULL,
  direct_url VARCHAR(2000),

  -- Deal info
  coupon_code VARCHAR(100),
  free_shipping TINYINT(1) DEFAULT 0,
  deal_type ENUM('regular','lightning','coupon','price_error','clearance') DEFAULT 'regular',
  badge VARCHAR(50),
  expires_at DATETIME,

  -- Tags
  tags JSON,

  -- Stats
  clicks INT DEFAULT 0,
  views INT DEFAULT 0,
  status ENUM('active','expired','draft') DEFAULT 'draft',

  -- Timestamps
  published_at DATETIME,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  FOREIGN KEY (merchant_id) REFERENCES deal_merchants(id),
  FOREIGN KEY (category_id) REFERENCES deal_categories(id),
  INDEX idx_status_published (status, published_at),
  INDEX idx_category (category_id),
  INDEX idx_merchant (merchant_id),
  INDEX idx_deal_type (deal_type),
  FULLTEXT INDEX idx_search (title, description)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

### deal_categories
```sql
CREATE TABLE deal_categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) NOT NULL UNIQUE,
  icon VARCHAR(50),
  parent_id INT,
  sort_order INT DEFAULT 0,
  is_active TINYINT(1) DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (parent_id) REFERENCES deal_categories(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

### deal_merchants
```sql
CREATE TABLE deal_merchants (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  slug VARCHAR(200) NOT NULL UNIQUE,
  logo_url VARCHAR(500),
  website VARCHAR(500),
  affiliate_program VARCHAR(100),
  affiliate_base_url VARCHAR(1000),
  tracking_id VARCHAR(200),
  commission_rate DECIMAL(5,2),
  is_active TINYINT(1) DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

### deal_clicks
```sql
CREATE TABLE deal_clicks (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  deal_id INT NOT NULL,
  session_id VARCHAR(100),
  source VARCHAR(50) DEFAULT 'web',
  referrer VARCHAR(500),
  ip VARCHAR(45),
  user_agent VARCHAR(500),
  country VARCHAR(2),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (deal_id) REFERENCES deals(id),
  INDEX idx_deal_date (deal_id, created_at),
  INDEX idx_source (source)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

### deal_price_comparisons
```sql
CREATE TABLE deal_price_comparisons (
  id INT AUTO_INCREMENT PRIMARY KEY,
  deal_id INT NOT NULL,
  merchant_name VARCHAR(200) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  url VARCHAR(2000),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (deal_id) REFERENCES deals(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

---

## Nuevo Modulo Backend: DealsModule

```
apis-unalukaglobal/src/modules/deals/
├── deals.module.ts
├── deals.controller.ts           # REST endpoints
├── deals.service.ts              # Business logic
├── deals-scraper.service.ts      # Scraping de deals automatico
├── deals-affiliate.service.ts    # Generacion de affiliate links
├── deals-analytics.service.ts    # Click tracking + stats
├── dto/
│   ├── create-deal.dto.ts
│   ├── update-deal.dto.ts
│   └── search-deals.dto.ts
└── entities/
    ├── deal.entity.ts
    ├── deal-category.entity.ts
    ├── deal-merchant.entity.ts
    ├── deal-click.entity.ts
    └── deal-price-comparison.entity.ts
```

### Endpoints API

```
# Public (no auth)
GET    /deals                     # List deals (paginated, filterable)
GET    /deals/:slug               # Get deal by slug
GET    /deals/categories          # List categories
GET    /deals/categories/:slug    # Deals by category
GET    /deals/merchants           # List merchants
GET    /deals/merchants/:slug     # Deals by merchant
GET    /deals/search?q=           # Search deals
GET    /deals/top                 # Top deals this week
GET    /deals/lightning           # Active lightning deals
POST   /deals/click/:id           # Register click (returns affiliate URL)
POST   /deals/submit              # Submit deal suggestion

# Admin (JWT required)
POST   /deals                     # Create deal
PUT    /deals/:id                 # Update deal
DELETE /deals/:id                 # Delete deal
POST   /deals/categories          # Create category
PUT    /deals/categories/:id      # Update category
POST   /deals/merchants           # Create merchant
PUT    /deals/merchants/:id       # Update merchant
GET    /deals/analytics/overview  # Dashboard stats
GET    /deals/analytics/clicks    # Click analytics
```

---

## Performance Considerations

### Next.js Optimizations
- **SSG** para categorias y merchants (rebuild cada 1h via ISR)
- **SSR** para deal detail (datos frescos)
- **ISR** con `revalidate: 300` (5 min) para listings
- **next/image** con sizes y priority para above-the-fold
- **Lazy loading** para deals below-the-fold

### Caching Strategy
- **CDN cache** en Cloudflare para assets estaticos
- **API cache** con Redis (futuro) para queries frecuentes
- **Browser cache** para imagenes y JS bundles
- **Stale-while-revalidate** para deal listings
