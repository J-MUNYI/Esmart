# Esmart Beauty — Production Frontend Setup

Built with Vite + React + Tailwind, wired to the backend from
`esmart-beauty-backend`. No mock data — every page pulls from your real API.

---

## 1. Folder Structure

```
client/
├── index.html                  Google Fonts loaded here
├── package.json
├── vite.config.js
├── tailwind.config.js          Esmart Beauty design tokens
├── postcss.config.js
├── .env.example
├── public/
│   └── favicon.svg
└── src/
    ├── main.jsx                 React root
    ├── App.jsx                  Provider tree + Router
    ├── styles/
    │   ├── tokens.css            CSS custom properties (colors, fonts, spacing)
    │   └── globals.css           Tailwind directives + base styles
    ├── utils/
    │   ├── api.js                 Axios instance (cookie-based auth)
    │   ├── whatsapp.js            wa.me deep link helper
    │   └── formatPrice.js         KES currency + slugify
    ├── hooks/
    │   └── useDebounce.js
    ├── context/
    │   ├── AuthContext.jsx        Real login/register/logout calls
    │   ├── CartContext.jsx        localStorage-backed, guest-friendly
    │   ├── WishlistContext.jsx    Auth-gated (opens AuthModal for guests)
    │   └── UIContext.jsx          Modals, toasts, mobile menu state
    ├── components/
    │   ├── atoms/
    │   │   ├── EsmartLogo.jsx     SVG logo, light/dark variants
    │   │   ├── Button.jsx         primary/ghost/outline/icon/whatsapp
    │   │   ├── Badge.jsx          new/sale/bestseller/low-stock
    │   │   ├── StarRating.jsx
    │   │   ├── PriceDisplay.jsx
    │   │   └── Skeleton.jsx
    │   ├── molecules/
    │   │   ├── ProductCard.jsx    Core reusable card, all states
    │   │   ├── SearchBar.jsx      Debounced live search dropdown
    │   │   ├── CartItem.jsx
    │   │   ├── WishlistButton.jsx
    │   │   ├── WhatsAppFAB.jsx    Fixed bottom-right chat button
    │   │   ├── AuthModal.jsx      Sign up / Log in tabs
    │   │   └── Toast.jsx
    │   └── layout/
    │       ├── Navbar.jsx         Sticky, search, category pills, cart badge
    │       ├── Footer.jsx
    │       └── PrivateRoute.jsx   Auth-gate wrapper
    ├── sections/
    │   ├── Hero.jsx               Bento grid (New Arrivals + 2 side cards)
    │   ├── EditorsPicks.jsx       Product grid, loading/error/empty states
    │   ├── CategoriesGrid.jsx
    │   └── Newsletter.jsx
    ├── pages/
    │   ├── Home.jsx
    │   ├── Shop.jsx                Grid + category filter
    │   ├── ProductDetail.jsx       Gallery, add to cart, WhatsApp enquiry
    │   ├── About.jsx
    │   ├── Wishlist.jsx            auth-gated
    │   ├── Cart.jsx
    │   ├── Checkout.jsx            auth-gated, manual M-Pesa confirmation
    │   ├── Account.jsx             auth-gated, order history
    │   └── NotFound.jsx
    └── router/
        └── AppRouter.jsx           All routes wired together
```

---

## 2. Install

```bash
cd client
npm install
cp .env.example .env
```

Open `.env`:
```
VITE_API_URL=http://localhost:5000/api
VITE_WHATSAPP_NUMBER=254700000000
```

- `VITE_API_URL` must point at your running backend (see the backend
  README — it should already be up on port 5000 before you start this).
- `VITE_WHATSAPP_NUMBER` — the shop owner's WhatsApp number, digits only,
  country code first, no `+` or leading `0` (e.g. Kenyan `0712345678`
  becomes `254712345678`).

---

## 3. Confirm the Backend CORS Setting Matches

In your **backend** `.env`, `CLIENT_URL` must exactly match where this
frontend runs:
```
CLIENT_URL=http://localhost:5173
```
Vite's default dev port is `5173` — if that's already taken and Vite
picks a different port, update the backend's `CLIENT_URL` to match, or
requests will be blocked by CORS.

---

## 4. Run the Dev Server

```bash
npm run dev
```

Expected output:
```
VITE ready in xxx ms
➜  Local:   http://localhost:5173/
```

Open that URL. You should see:
- The Navbar with the Esmart logo, search bar, and category pills
- The Home page attempting to load featured products from your API

**If the homepage shows "No featured products yet"** — that's correct
and expected until you mark a product `featured: true` via the
`PUT /api/products/:id` endpoint from the backend's Postman collection.
It is not a bug; it's the empty state working as designed.

**If you see a network/CORS error in the browser console** — double
check step 3 above, and confirm the backend is actually running
(`npm run dev` in the `server/` folder, separate terminal).

---

## 5. Confirm the Full Loop Works

1. In the backend Postman collection, run **Products - Create (admin)**
   for a couple of products, then `PUT` one of them with `{"featured": true}`.
2. Refresh `localhost:5173` — that product should now appear in the
   Hero card and Editor's Picks section.
3. Click **Sign In** in the navbar → switch to the Sign Up tab → create
   an account. You should be logged in immediately (check the avatar
   initial appears in the navbar).
4. Click the heart icon on a product card — it should toggle filled/unfilled
   (this confirms WishlistContext + auth gate work).
5. Click **Add to Cart** on a product — the cart badge count in the
   navbar should increment immediately (confirms CartContext + localStorage).
6. Go to `/cart` → **Proceed to Checkout** → fill the form → **Place Order**
   — this hits the real `/api/orders` endpoint. Confirm it appears in
   `/account` under Order History.
7. Click the green WhatsApp button (bottom-right) — it should open
   WhatsApp Web/App with a pre-filled message to the number in your `.env`.

If all seven steps work, your frontend and backend are correctly wired
end to end.

---

## 6. Design System Reference (already implemented in `tailwind.config.js` + `tokens.css`)

```
Colors
  blush        #F9E8E8   light pink surfaces
  rose         #E8A5A5   mid pink accents
  deep-rose    #C97A7A   primary CTA color
  cream        #FDF6F0   page background
  warm-cream   #F5EBE0   card surfaces
  latte        #D4B896   borders, dividers
  ink          #2C1A1A   headings
  slate        #6B4F4F   body text
  mist         #B89E9E   placeholders, disabled
  whatsapp     #25D366

Fonts (loaded via Google Fonts in index.html)
  font-display   Cormorant Garamond   logo, page titles
  font-heading   Jost                 section titles, buttons, nav
  font-body      DM Sans              body copy, form inputs
  font-accent    Italiana             taglines only

Usage in Tailwind classes:
  bg-deep-rose, text-ink, font-display, font-heading, font-body, font-accent
```

---

## 7. Before Deploying to Vercel

- [ ] Set `VITE_API_URL` in Vercel's environment variables to your
      **deployed** Render backend URL (not localhost)
- [ ] Set `VITE_WHATSAPP_NUMBER` in Vercel's environment variables
- [ ] Update the backend's `CLIENT_URL` (in Render's env vars) to your
      real Vercel domain once deployed
- [ ] Re-test the full loop from step 5 against the live URLs, not
      localhost — CORS and cookie behavior can differ in production
      (see the backend README's `secure`/`sameSite` cookie notes)

---

## 8. What's Deliberately Not Included (by design, from earlier scoping)

- Checkout does not integrate M-Pesa STK Push — it captures order +
  phone number, payment is confirmed manually. Wire Daraja API
  separately if/when that becomes a priority.
- No admin dashboard UI — products are managed via Postman against
  the backend's protected routes for now.
- No product reviews UI — the backend route exists but isn't
  consumed here yet; add a ReviewCard molecule + section on
  ProductDetail when ready.

Everything else in the original design breakdown — bento hero,
category pills, wishlist auth-gate, WhatsApp FAB, cart persistence —
is implemented and running against real data.