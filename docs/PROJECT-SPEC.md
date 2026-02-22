# Unaluka Deals - Especificacion del Proyecto

## 1. Vision del Proyecto

Crear una pagina web de deals y ofertas estilo eDealinfo.com, donde mostramos las mejores ofertas curadas y al hacer click en "Ver Deal" / "Get Deal", **redirigimos al usuario a los productos en nuestra propia web unaluka.com** (tiendas Shopify del ecosistema Unaluka). Es el mismo concepto que eDealinfo (que gana por affiliate links a Amazon/merchants), pero nosotros mandamos el trafico a nuestras propias tiendas.

**Nombre:** Unaluka Deals
**Dominio sugerido:** deals.unaluka.com o unalukadeals.com
**Modelo de negocio:** Deals page como driver de trafico a nuestra web unaluka.com + affiliate links

---

## 2. Modelo de Negocio

### Diferencia clave con eDealinfo:
- **eDealinfo:** Muestra deals -> click "Get Deal" -> redirect a Amazon/BestBuy/etc con affiliate link -> gana comision por referido (1-10%)
- **Unaluka Deals:** Muestra deals -> click "Ver Deal" -> redirect a **unaluka.com** (nuestras tiendas Shopify) -> ganamos la venta completa (no solo comision)

### Revenue Streams
1. **Ventas directas** (principal) - El deal redirige a producto en unaluka.com (nuestras tiendas Shopify)
   - El usuario compra en nuestra tienda -> revenue completo
   - Deals de productos que manejamos via Agent Deals pipeline
2. **Links de afiliados** (secundario) - Para deals de merchants externos donde no vendemos
   - Amazon Associates para productos que no tenemos en stock
   - Otros programas de afiliados
3. **Trafico + Brand awareness** - Posicionar unaluka.com como destino de compras
4. **Deals patrocinados** (futuro) - Merchants pagan por destacar sus deals

### Flujo Principal de Monetizacion
```
Usuario visita Unaluka Deals (deals.unaluka.com)
        |
        v
Navega/busca deals por categoria
        |
        v
Ve un deal atractivo con descuento
        |
        v
Click en "Ver Deal" / "Comprar"
        |
        v
Redirect a unaluka.com/products/{producto}  <-- NUESTRA TIENDA
        |
        v
Usuario compra en nuestra web
        |
        v
Revenue completo para Unaluka (no solo comision)
```

### Flujo Secundario (Affiliate)
```
Usuario ve deal de producto que NO vendemos
        |
        v
Click en "Ver en Amazon" / link externo
        |
        v
Redirect via affiliate link (con tracking ID)
        |
        v
Comision por referido (1-10%)
```

---

## 3. Paginas y Rutas

### 3.1 Paginas Publicas

| Pagina | Ruta | Descripcion |
|--------|------|-------------|
| Home | `/` | Hero + deals destacados del dia + categorias |
| All Deals | `/deals` | Listado completo con filtros y paginacion |
| Deal Detail | `/deals/:slug` | Pagina individual de un deal |
| Category | `/category/:slug` | Deals filtrados por categoria |
| Store/Merchant | `/store/:slug` | Deals filtrados por tienda |
| Search | `/search?q=` | Resultados de busqueda |
| Lightning Deals | `/lightning-deals` | Deals con tiempo limitado |
| Top Deals | `/top-deals` | Mejores deals de la semana |
| Cupones | `/coupons` | Codigos de descuento activos |
| About | `/about` | Sobre Unaluka Deals |
| Affiliate Disclosure | `/disclosure` | Transparencia sobre afiliados |
| Submit Deal | `/submit-deal` | Formulario para sugerir deals |

### 3.2 Panel Admin (futuro, integrado en apps-unaluka)

| Pagina | Ruta | Descripcion |
|--------|------|-------------|
| Dashboard | `/admin/deals` | Metricas de clicks, conversiones |
| Manage Deals | `/admin/deals/manage` | CRUD de deals |
| Categories | `/admin/deals/categories` | Gestionar categorias |
| Merchants | `/admin/deals/merchants` | Gestionar tiendas |
| Analytics | `/admin/deals/analytics` | Reportes de performance |

---

## 4. Estructura del Home

```
+================================================================+
|  [LOGO]   Inicio  Deals  Categorias  Tiendas  Cupones  [SEARCH]|
+================================================================+

+----------------------------------------------------------------+
|                         HERO SECTION                            |
|   "Las mejores ofertas de internet, actualizadas cada dia"      |
|   [Buscar deals...]                                             |
|   Tags rapidos: Amazon | Tecnologia | Hogar | < $10 | 50% OFF  |
+----------------------------------------------------------------+

+----------------------------------------------------------------+
|  DEALS DESTACADOS HOY  (scroll horizontal o grid)               |
|  +--------+  +--------+  +--------+  +--------+                |
|  | DEAL 1 |  | DEAL 2 |  | DEAL 3 |  | DEAL 4 |               |
|  | img    |  | img    |  | img    |  | img    |                |
|  | titulo |  | titulo |  | titulo |  | titulo |                |
|  | $29    |  | $15    |  | $99    |  | $45    |                |
|  | Amazon |  | eBay   |  | BestBuy|  | Amazon |                |
|  |[VER -> ]|  |[VER -> ]|  |[VER -> ]|  |[VER -> ]|               |
|  +--------+  +--------+  +--------+  +--------+                |
+----------------------------------------------------------------+

+----------------------------------------------------------------+
|  LIGHTNING DEALS  (con countdown timer)                         |
|  +--------+  +--------+  +--------+                             |
|  | DEAL   |  | DEAL   |  | DEAL   |                            |
|  | 02:45  |  | 05:12  |  | 01:30  |  <- tiempo restante       |
|  +--------+  +--------+  +--------+                             |
+----------------------------------------------------------------+

+----------------------------------------------------------------+
|  CATEGORIAS POPULARES                                           |
|  [Tecnologia] [Hogar] [Moda] [Gaming] [Belleza] [Deportes]     |
+----------------------------------------------------------------+

+----------------------------------------------------------------+
|  DEALS RECIENTES  (feed cronologico, paginado)                  |
|  +----------------------------------------------------+        |
|  | [img] Titulo del Deal          $29.99  Reg: $59.99 |        |
|  |       Amazon | Free Shipping | -50%    [VER DEAL]  |        |
|  +----------------------------------------------------+        |
|  | [img] Otro Deal                $15.00  Reg: $35.00 |        |
|  |       eBay | Cupon: SAVE15 | -57%     [VER DEAL]  |        |
|  +----------------------------------------------------+        |
|  ...                                                            |
|  [Cargar mas deals...]                                          |
+----------------------------------------------------------------+

+----------------------------------------------------------------+
|  FOOTER                                                         |
|  Categorias | Tiendas | About | Disclosure | Privacy           |
|  Telegram | WhatsApp | Instagram                                |
|  (c) 2026 Unaluka Deals                                        |
+----------------------------------------------------------------+
```

---

## 5. Estructura del Deal Card

### Campos del modelo Deal:

```typescript
interface Deal {
  id: string;
  title: string;                    // "Canon Pixma MG2522 3-in-1 Printer"
  slug: string;                     // "canon-pixma-mg2522-3in1-printer"
  description: string;              // Descripcion detallada
  imageUrl: string;                 // URL imagen del producto
  images: string[];                 // Galeria de imagenes

  // Pricing
  currentPrice: number;             // 29.99
  originalPrice: number;            // 59.99
  currency: string;                 // "USD" | "PEN"
  discountPercent: number;          // 50 (calculado)

  // Merchant/Store
  merchantId: string;               // ref a merchant
  merchantName: string;             // "Amazon"
  merchantLogo: string;             // logo URL

  // Links
  affiliateUrl: string;             // Link de afiliado (tracking)
  directUrl: string;                // URL directa al producto
  affiliateProgram: string;         // "amazon-associates" | "shopify-collabs"

  // Metadata
  categoryId: string;               // ref a categoria
  categoryName: string;             // "Laptops"
  tags: string[];                   // ["tech", "printer", "canon"]

  // Deal Info
  couponCode?: string;              // "SAVE20" (opcional)
  freeShipping: boolean;            // true/false
  dealType: DealType;               // 'regular' | 'lightning' | 'coupon' | 'price_error'
  badge?: string;                   // "Super Hot!" | "Lowest Ever!" | "Price Error!"
  expiresAt?: Date;                 // Fecha expiracion (lightning deals)

  // Price Comparison
  priceComparisons?: PriceComparison[];  // Precios en otros merchants

  // Stats
  clicks: number;                   // Total clicks
  views: number;                    // Total views
  status: 'active' | 'expired' | 'draft';

  // Timestamps
  publishedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

interface PriceComparison {
  merchantName: string;
  price: number;
  url: string;
}

interface Category {
  id: string;
  name: string;                     // "Laptops"
  slug: string;                     // "laptops"
  icon: string;                     // emoji o icono
  parentId?: string;                // para subcategorias
  dealCount: number;
}

interface Merchant {
  id: string;
  name: string;                     // "Amazon"
  slug: string;                     // "amazon"
  logo: string;                     // URL logo
  website: string;                  // "https://amazon.com"
  affiliateProgram: string;         // tipo de programa
  affiliateBaseUrl: string;         // URL base para generar links
  trackingId: string;               // ID de tracking afiliado
  dealCount: number;
  isActive: boolean;
}

type DealType = 'regular' | 'lightning' | 'coupon' | 'price_error' | 'clearance';
```

### Visual del Deal Card (basado en eDealinfo real):

```
+------------------------------------------+
| [🔥 icono tipo]            [41% off]     |  <- iconos + % descuento
|                                          |
|  +------------------+                    |
|  |                  |                    |
|  |   PRODUCT IMAGE  |                    |
|  |   (fondo blanco) |                    |
|  +------------------+                    |
|                                          |
| $17.17                                   |  <- precio grande, azul
|                                          |
| Ovente 1000W 7" Single Plate            |  <- titulo (max 2 lineas)
| Electric Infrared Burner                 |
|                                          |
| Unaluka.com            02/22/2026        |  <- origen + fecha
|                                          |
| [ Ver Deal ]  [Nuevo]                    |  <- boton + badge
+------------------------------------------+
```

### Modal de Deal (al hacer click en card):
eDealinfo usa un **modal/popup sobre el home** (no pagina nueva). Nosotros haremos lo mismo.

```
+================================================================+
|                                                          [X]    |
| $11.99                                                 [👍]     |
|                                                        [↗️]     |
| +------------------+  Titulo Completo del Producto     [🔔]     |
| |                  |                                   [⚠️]     |
| |  PRODUCT IMAGE   |  [Super Hot!] [Precio Mas Bajo!]           |
| |  (grande)        |                                            |
| |                  |  Descripcion del deal con link              |
| +------------------+  al producto en unaluka.com                |
|                                                                 |
|                       Price     : $11.99                        |
|                       Descuento : -50% (antes $23.99)           |
|                       Envio     : Gratis                        |
|                       Precio Final: $11.99 + Envio Gratis       |
|                                                                 |
| Unaluka.com (22/02/2026)                                       |
|                                                                 |
| Comparar: [Amazon] $42.80         [▼]  [VER DEAL]              |
|                                        -> unaluka.com/product   |
+================================================================+
```

---

## 6. Categorias Propuestas para Unaluka Deals

### Tecnologia
- Laptops & Computadoras
- Smartphones & Tablets
- Audio & Audifonos
- Gaming
- Camaras & Video
- Accesorios Tech
- Wearables (Smartwatch, etc.)
- Networking & WiFi
- Software & Apps
- Storage & USB

### Hogar
- Electrodomesticos
- Cocina
- Muebles & Decoracion
- Herramientas
- Jardin & Exterior

### Moda & Belleza
- Ropa Hombre
- Ropa Mujer
- Zapatillas & Calzado
- Accesorios
- Belleza & Cuidado Personal

### Otros
- Juguetes & Ninos
- Deportes & Fitness
- Libros & Educacion
- Gift Cards
- Viajes
- Automotriz
- Mascotas
- Ofertas < S/10 (o < $5)
- 50% OFF+

---

## 7. Features por Fase

### Fase 1 - MVP (Landing + Deals Estaticos)
- [ ] Home page con deals destacados
- [ ] Listado de deals con paginacion
- [ ] Pagina individual de deal
- [ ] Filtro por categoria
- [ ] Filtro por tienda/merchant
- [ ] Busqueda basica
- [ ] Links de afiliado con tracking
- [ ] SEO optimizado (meta tags, Open Graph, sitemap)
- [ ] Responsive design (mobile-first)
- [ ] Affiliate disclosure page
- [ ] Google Analytics + click tracking

### Fase 2 - Dinamico
- [ ] Admin panel para CRUD de deals (en apps-unaluka)
- [ ] Scraping automatico de deals (Amazon, etc.)
- [ ] Lightning deals con countdown
- [ ] Sistema de cupones
- [ ] Comparacion de precios entre merchants
- [ ] RSS feed
- [ ] Newsletter signup (Brevo)

### Fase 3 - Comunidad
- [ ] Comentarios en deals (propio o Disqus)
- [ ] Votacion de deals (hot/not)
- [ ] Submit deal por usuarios
- [ ] Notificaciones push (web + app)
- [ ] Deal alerts por keyword
- [ ] User accounts (optional)

### Fase 4 - Expansion
- [ ] App movil (React Native o PWA)
- [ ] Telegram bot para deals
- [ ] WhatsApp alerts
- [ ] API publica de deals
- [ ] Multiple paises/monedas
- [ ] Deals patrocinados (revenue)

---

## 8. Integracion con Ecosistema Unaluka

### Conexion con apis-unalukaglobal
- Nuevo modulo `Deals` en el backend NestJS
- Entidades: `deals`, `deal_categories`, `deal_merchants`, `deal_clicks`
- Endpoints REST para CRUD + busqueda + analytics
- Reutilizar auth existente para admin

### Conexion con apps-unaluka
- Nueva seccion en el dashboard para gestionar deals
- Pagina de analytics de clicks/conversiones
- Gestionar categorias y merchants

### Conexion con Tiendas Shopify (unaluka.com) - CLAVE
- **El "Ver Deal" redirige a unaluka.com** (nuestras tiendas Shopify)
- Los deals son productos que ya tenemos publicados en Shopify
- Se puede sincronizar automaticamente: cuando Agent Deals publica un producto en Shopify -> auto-crear deal en Unaluka Deals
- Trackear conversiones via Shopify webhooks (order created -> marcar deal como converted)
- El deal muestra precio en unaluka.com vs precio en Amazon/otros (para mostrar que somos mas baratos)

### Conexion con Agent Deals Pipeline
- Productos procesados por Agent Deals -> auto-publicar como deals
- Reutilizar data de scraping (imagenes, precios, descripciones)
- Pipeline: Agent Deals publica en Shopify -> webhook -> crea deal en deals page
- Precios de comparacion vienen del scraping original (Amazon, etc.)

### Conexion con Instagram API Service
- Auto-publicar deals hot en Instagram via DM broadcasts
- Compartir deals con imagen + precio + link a deals.unaluka.com
- Desde deals.unaluka.com el usuario llega a unaluka.com para comprar

---

## 9. SEO Strategy

### Meta Tags
```html
<title>{Deal Title} - {Discount}% OFF | Unaluka Deals</title>
<meta name="description" content="Consigue {producto} por solo ${precio}.
  Antes ${precioOriginal}. {descuento}% de descuento en {merchant}.
  Envio gratis. Oferta limitada." />
```

### URL Structure
- Clean URLs con slugs descriptivos
- Categorias y merchants como landing pages indexables
- Sitemap XML auto-generado
- Schema.org Product markup en deals

### Open Graph / Social
```html
<meta property="og:title" content="Deal: {titulo} - ${precio}" />
<meta property="og:image" content="{imagen_producto}" />
<meta property="og:description" content="{descuento}% OFF - {merchant}" />
```

---

## 10. Estrategia de Links y Redirects

### Flujo del boton "Ver Deal"
```
1. Usuario hace click en "Ver Deal" en deals.unaluka.com
        |
        v
2. Hit a: deals.unaluka.com/go/{dealId}  (route API interna)
        |
        v
3. Backend registra el click (analytics)
        |
        v
4a. SI es producto nuestro:
    -> Redirect a unaluka.com/products/{slug}  (nuestra tienda Shopify)
        |
4b. SI es producto externo (affiliate):
    -> Redirect a amazon.com/dp/XXXXX?tag=unaluka-20  (affiliate link)
```

### Tipos de Deal segun destino

| Tipo | Destino del "Ver Deal" | Revenue |
|------|----------------------|---------|
| **Producto propio** | unaluka.com/products/{slug} | Venta completa |
| **Affiliate Amazon** | amazon.com?tag=unaluka-20 | Comision 1-10% |
| **Affiliate otro** | merchant.com?ref=unaluka | Comision variable |

### Estructura del Link
```
# Link interno con tracking
https://deals.unaluka.com/go/{dealId}

# Destino principal (producto propio)
-> https://unaluka.com/products/{product-slug}

# Destino secundario (affiliate)
-> https://www.amazon.com/dp/B0XXXXX?tag=unaluka-20

# Tracking parameters
?ref=deals&source=web&campaign={categorySlug}&deal={dealId}
```

### Click Tracking
```typescript
// Cada click registra:
interface DealClick {
  dealId: string;
  userId?: string;          // si esta logueado
  sessionId: string;        // anonymous tracking
  source: string;           // 'web' | 'telegram' | 'instagram' | 'email'
  destination: string;      // 'unaluka' | 'amazon' | 'external'
  destinationUrl: string;   // URL final
  referrer: string;         // de donde vino el usuario a deals
  timestamp: Date;
  ip: string;               // geo-location
  userAgent: string;
  converted?: boolean;      // si compro (via postback o Shopify webhook)
}
```

---

## 11. Competidores / Referencia

| Sitio | Mercado | Enfoque |
|-------|---------|---------|
| eDealinfo.com | USA | Tech deals, Amazon focused |
| Slickdeals.net | USA | Comunidad de deals |
| DealNews.com | USA | Curated deals editorial |
| CamelCamelCamel | USA | Price tracking Amazon |
| Pelando.com | Brasil | Deals comunidad |
| PromoDescuentos.com | Mexico | Deals + cupones LatAm |
| Chollometro.com | Espana | Deals comunidad |

### Diferenciadores de Unaluka Deals:
1. **Trafico a tienda propia** - A diferencia de eDealinfo que solo gana comision, nosotros mandamos el trafico a unaluka.com (revenue completo)
2. **Integracion Shopify directa** - Deals son productos de nuestras tiendas, sincronizados via Agent Deals pipeline
3. **Precio comparativo** - Mostramos: "En Unaluka: $X vs Amazon: $Y" para demostrar que somos mas baratos
4. **Telegram + WhatsApp + Instagram DM** - Canales de comunicacion LatAm + servicio de broadcast existente
5. **Curado por editores + AI** - Scraping automatico (Agent Deals) + curado humano
6. **Enfoque LatAm/Peru** - Moneda local, envio local, merchants relevantes
