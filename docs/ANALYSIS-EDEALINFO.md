# Analisis de eDealinfo.com - Sitio de Referencia

> Analisis basado en screenshots reales del sitio (22/02/2026) + investigacion web.
> Screenshots de referencia: `media/screenshots/home.png`, `al dar click en foto.png`, `Click en foto 2.png`

## 1. Overview del Sitio

**URL:** https://www.edealinfo.com/
**Fundado:** Diciembre 2000 por Rajiv Maheshwari (Indiana, USA)
**Empresa:** eDealinfo USA Inc.
**Trafico:** ~757K visitas mensuales (68.9% USA)
**Rating:** 4.0/5 (Knoji, 40 reviews)
**Modelo de negocio:** Agregador de deals con monetizacion por links de afiliados (Amazon Associates, Best Buy, Walmart, Newegg, etc.)

---

## 2. Estructura de Paginas y URLs

### 2.1 Paginas Principales

| Pagina | URL | Descripcion |
|--------|-----|-------------|
| Home | `/` | Deals destacados del dia, Super Hot + Super Cool |
| All Deals | `/deals/index.php` | Listado completo de todos los deals |
| Tech Deals | `/deals/tech.php` | Solo deals de tecnologia |
| Non-Tech Deals | `/deals/nontech.php` | Deals no tecnologicos |
| Categories | `/deals/categories/` | Listado de todas las categorias |
| Amazon Lightning | `/deals/amazon-lightning-deals.php` | Deals lightning de Amazon |
| Weekly Hot Deals | `/deals/weekly-super-hot-deals.php` | Top deals de la semana |
| Submit Deal | `/submit-deal.php` | Formulario para enviar deals |
| What's New | `/whats-new.php` | Novedades del sitio |
| Privacy Policy | `/privacy-policy.php` | Politica de privacidad |

### 2.2 Patrones de URL

```
# Deal individual
/d/{ID}/{slug-del-titulo}
Ejemplo: /d/00020260212342/Checkout-for-the-One-Day-Deals-from-Newegg-com

# Categoria
/deals/categories/{nombre}.php
Ejemplo: /deals/categories/laptops.php

# Merchant/Tienda
/deals/merchants/{nombre}.php
Ejemplo: /deals/merchants/amazon.php

# Cupones por merchant
/coupons/merchants/{nombre}.php
Ejemplo: /coupons/merchants/bestbuy.php

# Busqueda
/deals/search/?keyword={termino}
Ejemplo: /deals/search/?keyword=amazon
```

---

## 3. Estructura del Home (verificado via screenshot)

### 3.1 Layout General

```
+====================================================================+
|  [LOGO eDealinfo]                              [📱 mobile] [⚙️]    |
+====================================================================+
| Today's Deals ▼ | Just For You ▼ | Handpicked ▼ | Credit Cards ▼  |
| Others ▼ |              [Search Deals & Stores 🔍]                  |
+====================================================================+
| ⚠️ Note: Prices and promo codes (if any) are valid at the time of  |
| deal publish & can change/expire at anytime. eDealinfo.com may     |
| earn commission via affiliate links and/or ads.                     |
+--------------------------------------------------------------------+
| Deals Sort By: [Recent ▼]                                          |
| ☐ Show Original Publish Order ?                                    |
|                                                                    |
|                    Today's All Deals          [≡] [⊞] [⊟] vistas  |
+--------------------------------------------------------------------+
|  GRID DE DEALS (5 columnas en desktop)                             |
|  +-------+ +-------+ +-------+ +-------+ +-------+                |
|  | card1 | | card2 | | card3 | | card4 | | card5 |                |
|  +-------+ +-------+ +-------+ +-------+ +-------+                |
|  +-------+ +-------+ +-------+ +-------+ +-------+                |
|  | card6 | | card7 | | promo | | card9 | | card10|                |
|  +-------+ +-------+ +-------+ +-------+ +-------+                |
|  ...                                                               |
+--------------------------------------------------------------------+
```

### 3.2 Header (2 filas)
- **Fila 1:** Logo centrado-izquierda + iconos mobile/settings a la derecha
- **Fila 2 (barra azul oscuro):** Menu dropdown: Today's Deals ▼ | Just For You ▼ | Handpicked ▼ | Credit Cards ▼ | Others ▼ + barra de busqueda con boton naranja

### 3.3 Barra de Aviso (amarilla)
- Disclaimer sobre precios y affiliate links
- Texto: "Prices and promo codes (if any) are valid at the time of deal publish & can change/expire at anytime. eDealinfo.com may earn commission via affiliate links and/or ads."

### 3.4 Controles de Listado
- **Sort By:** Dropdown "Recent" (ordenar por mas reciente)
- **Checkbox:** "Show Original Publish Order"
- **Titulo:** "Today's All Deals"
- **3 modos de vista** (iconos arriba derecha del grid):
  - ≡ List view (solo texto)
  - ⊞ Grid view (imagenes + info)
  - ⊟ Expanded view (detalles completos)

### 3.5 Grid de Deals
- **5 columnas** en desktop
- Mezcla de deal cards + cards promocionales (ej: "Explore Food Groceries Deals", "Follow eDealinfo on X.COM")
- Feed cronologico del dia

---

## 4. Deal Card en el Grid (verificado via screenshot)

```
+------------------------------------------+
| [🔥icono tipo]              [41% off]    |  <- esquina sup-izq: icono tipo deal
|                                          |     esquina sup-der: % descuento (rojo)
|         +------------------+             |
|         |                  |             |
|         |  PRODUCT IMAGE   |             |  <- imagen centrada
|         |                  |             |
|         +------------------+             |
|                                          |
| $17.17                                   |  <- precio grande, color azul
|                                          |
| Ovente 1000W 7" Single Plate            |  <- titulo (max 2 lineas)
| Electric Infrared Burner                 |
|                                          |
| Walmart.com            02/22/2026        |  <- merchant (izq) + fecha (der)
|                                          |
| [ See Deal ]  [New]                      |  <- boton + badge "New"
+------------------------------------------+
```

### Campos visibles en cada card:
1. **Icono de tipo de deal** (esquina superior izquierda) - 🔥 fuego, 🛒 bolsa, 🚩 bandera roja, etc.
2. **Porcentaje de descuento** (esquina superior derecha) - "41% off", "40% off", "50% off" en rojo
3. **Imagen del producto** - Centrada, fondo blanco
4. **Precio actual** - Grande, color azul, formato $XX.XX
5. **Titulo del producto** - 1-2 lineas, texto negro
6. **Nombre del merchant** - Texto gris, alineado izquierda (Walmart.com, Amazon.com, Woot.com, Home Depot)
7. **Fecha de publicacion** - Texto gris, alineado derecha (02/22/2026)
8. **Boton [See Deal]** - Borde negro, texto negro
9. **Badge [New]** - Naranja/rojo, indica deal recien publicado
10. **Badge especial** (opcional) - Ej: "10 Pack" en azul

### Cards Promocionales Mezcladas
- Cards especiales tipo banner: "Explore Food Groceries Deals" (fondo turquesa)
- Cards de social media: "Follow eDealinfo on X.COM @edealinfo_USA"
- Se intercalan entre los deals normales

---

## 5. Modal de Deal - Click en Producto (verificado via screenshots)

Al hacer click en una card, se abre un **modal/popup** sobre el home (NO una pagina nueva).

### 5.1 Layout del Modal - Deal Simple (Screenshot 2: Denim Jacket)

```
+================================================================+
|                                                          [X]    |  <- boton cerrar
|                                                                 |
| $11.99                                                 [👍]     |  <- precio azul grande
|                                                        [↗️]     |  <- share
| +------------------+  Amazon Essentials Women's        [🔔]     |  <- notificacion
| |                  |  Oversized-Fit Cropped Denim      [⚠️]     |  <- reportar
| |  PRODUCT IMAGE   |  Jacket w/ Collar                          |
| |  (grande)        |                                            |
| |                  |  [Super Hot!] [Lowest Ever!]                |  <- badges rojo/verde
| |                  |                                            |
| |                  |  Get Amazon Essentials Women's              |
| +------------------+  Oversized-Fit Cropped Denim Jacket        |
|                       with Contrast Collar (Rinse, Medium)      |
|                       from Woot.com.                            |  <- link afiliado en texto
|                                                                 |
|                       Price     : $11.99                        |
|                       Discount  : Reflected in sale price       |
|                       Shipping  : Free for Amazon Prime         |
|                                   members (or $6 Shipping)      |
|                       Final Price: $11.99 + Free Shipping       |
|                                    with Prime                   |
|                                                                 |
|                       💳 Boost your deal with the right          |
|                       cash back credit card.                    |
|                                                                 |
| Woot.com (02/22/2026)                                          |
|                                                                 |
| Compare: [Amazon logo] $42.80          [▼]  [GET DEAL]         |
|                                              Woot.com: Deals    |
+================================================================+
```

### 5.2 Layout del Modal - Deal Multi-Merchant (Screenshot 3: LG Monitor)

```
+================================================================+
|                                                          [X]    |
|                                                                 |
| [🔥🚩]  $226.99                                       [🖥️]     |
|                                                        [↗️]     |
| +------------------+  27" LG UltraGear WQHD 300Hz     [🔔]     |
| |                  |  1ms HDR IPS Freesync Monitor     [⚠️]     |
| |  PRODUCT IMAGE   |                                            |
| |  (LG UltraGear)  |  [Super Hot!] [Lowest Ever!]               |
| |                  |                                            |
| |                  |  Following select merchants have a          |
| +------------------+  price drop on LG UltraGear 27"...         |
|                       Purchase it from your favorite merchant:  |
|                                                                 |
|                       • B&H Photo Video: $226.99                |  <- link afiliado
|                       • Amazon.com: $226.99                     |  <- link afiliado
|                       • LG Electronics: $229.99                 |  <- link afiliado
|                       • Newegg.com: $229.99                     |  <- link afiliado
|                       • Walmart.com: $229.99                    |  <- link afiliado
|                                                                 |
| B&H Photo Video (02/22/2026)                                   |
| [🚩]                                                            |
|                                                                 |
| Compare: [BestBuy] $326.99 [Newegg] $346.42 [otro] $449.99    |
|                                              [▼] [GET DEAL]    |
|                                     B&H Photo Video: Deals      |
+================================================================+
```

### 5.3 Elementos del Modal:

| Elemento | Descripcion |
|----------|-------------|
| **Precio** | Grande, azul, arriba a la izquierda |
| **Imagen** | Grande, lado izquierdo |
| **Titulo** | Nombre completo del producto |
| **Badges** | "Super Hot!" (rojo) + "Lowest Ever!" (verde) |
| **Descripcion** | Texto con link afiliado al merchant integrado |
| **Tabla de precios** | Price, Discount, Shipping, Final Price |
| **Multi-merchant** | Lista de merchants con precio + link afiliado por cada uno |
| **Compare** | Logos de otros merchants + sus precios (mas caros) |
| **Iconos laterales** | Thumbs up, Share, Bell (alert), Report |
| **Merchant + fecha** | Abajo izquierda: "Woot.com (02/22/2026)" |
| **[Get Deal]** | Boton negro, abajo derecha -> LINK DE AFILIADO al merchant |
| **Merchant: Deals** | Link a ver mas deals de ese merchant |
| **[▼] Expand** | Flecha para expandir mas detalles |
| **[X] Cerrar** | Cerrar modal, volver al grid |

### 5.4 Tipos de Modal segun Deal:

**Tipo 1 - Single Merchant:**
- Un solo merchant con tabla de precio/descuento/envio/precio final
- Compare muestra precio en otros merchants (mas caros)
- Boton Get Deal va directo al merchant principal

**Tipo 2 - Multi-Merchant:**
- Varios merchants ofrecen el mismo producto
- Lista de merchants con precios y links individuales
- Compare muestra precios historicos o de merchants aun mas caros
- "Purchase it from your favorite merchant"
- Boton Get Deal va al merchant con mejor precio

---

## 6. Merchants Confirmados (via screenshots)

| Merchant | Visto en |
|----------|----------|
| **Walmart.com** | Home card - Infrared Burner $17.17 |
| **Woot.com** | Modal - Denim Jacket $11.99 |
| **Home Depot** | Home card - Aluminum Chairs $68.00 |
| **Amazon.com** | Home card - Hydro Flask $20.99 + Compare |
| **B&H Photo Video** | Modal - LG Monitor $226.99 |
| **Newegg.com** | Modal - LG Monitor $229.99 |
| **LG Electronics** | Modal - LG Monitor $229.99 |
| **Best Buy** | Compare section |

---

## 7. Categorias (via busqueda web)

### Tecnologia
| Categoria | URL slug |
|-----------|----------|
| Laptops | `laptops` |
| Computer Accessories | `computeraccessories` |
| Camera & Camcorder | `cameraandcamcorder` |
| Gadgets & Accessories | `gadgetsaccessories` |
| Networking | `networking` |
| Software | `software` |
| Wearable Tech | `wearabletech` |

### Hogar y Vida
| Categoria | URL slug |
|-----------|----------|
| Home Appliances | `homeappliances` |
| Tools & Hardware | `toolshardware` |

### Otros
| Categoria | URL slug |
|-----------|----------|
| Gift Cards | `giftcards` |
| Photo Service | `photoservice` |
| Food & Groceries | (card promocional en home) |
| Toys & Games | (confirmado via feeds) |
| Apparels & Accessories | (confirmado via feeds) |
| Footwear | (confirmado via feeds) |

---

## 8. Modelo de Monetizacion (Afiliados)

### Como funciona en eDealinfo:
1. Editores curan deals de multiples tiendas
2. Cada deal tiene **links de afiliado** embebidos (en descripcion + boton Get Deal)
3. Al hacer click en "Get Deal" -> redirect al merchant via affiliate link
4. Si el usuario compra, eDealinfo recibe **comision por referido** (1-10%)
5. En deals multi-merchant, CADA link de merchant es un affiliate link

### Donde estan los affiliate links:
- **Boton [Get Deal]** - Principal CTA
- **Nombre del producto** en la descripcion (link clickeable)
- **Lista de merchants** en deals multi-merchant (cada uno es affiliate link)
- **"Merchant: Deals"** link abajo del boton Get Deal

### Programas de afiliados detectados:
- Amazon Associates
- B&H Photo Affiliate
- Walmart Affiliate
- Newegg Affiliate
- eBay Partner Network
- Woot/Amazon subsidiary
- Home Depot Affiliate

### Disclosure:
> "eDealinfo.com may earn commission via affiliate links and/or ads."

---

## 9. Features Adicionales

### Notificaciones
- Push notifications via app (iOS/Android)
- Deal alerts por keyword
- Telegram channel para Amazon deals/glitches
- WhatsApp alerts para deals hot
- **Bell icon** en modal de deal (alertar sobre este producto)

### Interaccion en Modal
- **👍 Thumbs up** - Votar/like del deal
- **↗️ Share** - Compartir deal
- **🔔 Bell** - Notificacion/alert sobre deal similar
- **⚠️ Report** - Reportar deal expirado/incorrecto

### Vistas del Grid
- **≡ List view** - Solo texto compacto
- **⊞ Grid view** - Cards con imagen (default)
- **⊟ Expanded view** - Cards con todos los detalles

### App Movil
- iOS: App Store (v4.0+, 22.2MB, iOS 15.6+)
- Android: Google Play (v9.0.4)
- Dark/Light mode, filtros, alertas

---

## 10. Tech Stack Estimado

- **Backend:** PHP (extensiones .php)
- **Frontend:** HTML/CSS/JS server-side rendered
- **Modal:** JavaScript (probablemente jQuery) - modal overlay sin cambio de pagina
- **Comentarios:** Disqus
- **CDN/Security:** Cloudflare (Turnstile challenge agresivo)
- **Hosting:** Servidor dedicado
- **Mobile:** Apps nativas iOS/Android
- **Analytics:** Google Analytics
