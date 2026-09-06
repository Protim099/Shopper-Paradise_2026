# শপার্স প্যারাডাইস — Full-Stack E-commerce (Next.js + Express + Stripe)

Rebranded, Bangla-language storefront matching the design reference:
teal/green branding, star ratings, wishlist hearts, grid/sort controls,
and a secure checkout flow.

## 1. Backend setup

```bash
cd backend
npm install
cp .env.example .env
```

Add your Stripe **test** secret key to `.env` (free, no real charges):
https://dashboard.stripe.com/test/apikeys

```
STRIPE_SECRET_KEY=sk_test_...
STRIPE_CURRENCY=usd
PORT=4000
FRONTEND_URL=http://localhost:3000
```

> **Important note on currency:** Stripe does not support Bangladeshi
> merchant accounts or BDT settlement. This starter displays prices in ৳
> (BDT) throughout the UI, but the demo Stripe integration charges in USD
> behind the scenes so you can test the full flow. For real payments from
> Bangladeshi customers, replace the logic in `backend/routes/checkout.js`
> with **SSLCommerz** or the **bKash Merchant API** — that file is the only
> place checkout logic lives, so nothing else in the app needs to change.

Run it:

```bash
npm run dev
```

## 2. Frontend setup

```bash
cd frontend
npm install
cp .env.local.example .env.local
```

Add your Stripe **publishable** key to `.env.local`:

```
NEXT_PUBLIC_API_URL=http://localhost:4000
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

Run it:

```bash
npm run dev
```

Visit `http://localhost:3000`.

## 3. Test a purchase

1. Add a product to your cart, go to `/cart`, click **চেকআউট করুন**.
2. On the checkout page, use Stripe's test card: `4242 4242 4242 4242`,
   any future expiry, any CVC, any postal code.
3. On success you'll land on `/success`.

## Why card details never touch your own server

The checkout page uses **Stripe Elements** (`CardElement`) — a secure iframe
hosted by Stripe. The raw card number is sent directly to Stripe, never to
your Express backend. Your server only creates a `PaymentIntent` for the
correct amount (calculated from your own product catalog, not the client)
and confirms the result. This keeps you out of PCI-DSS scope, unlike a form
that POSTs raw card numbers to your own API — which you should never build.

## What changed from a plain design mockup

- Product grid with wishlist hearts, star ratings, grid/list + sort toggles
- Bangla UI copy throughout, prices in ৳ (BDT)
- A "নিরাপদ চেকআউট" (secure checkout) page with order summary + payment,
  matching the two-column layout from the reference design
- A success page mentioning nationwide delivery

## Editing your product catalog

Edit `backend/data/products.json` directly — each product needs: `id`,
`name`, `price`, `currency`, `image`, `description`, `stock`, `category`,
`rating`, `reviewCount`. Product photos are placeholder stock images
(Unsplash, free license) — swap in your own product photography before
launching.

## Going to production

- Move `products.json` to a real database (Postgres via Supabase) — see
  `schema.sql` from earlier in this conversation for a ready-made schema.
- Swap Stripe for SSLCommerz/bKash if charging Bangladeshi cards in BDT.
- Add a Stripe webhook handler to record orders reliably server-side.
- Deploy frontend to Vercel, backend to Railway/Render.

## Project structure

```
shoppers-paradise/
├── backend/
│   ├── data/products.json
│   ├── routes/products.js
│   ├── routes/checkout.js      # Stripe PaymentIntent creation only
│   ├── server.js
│   └── .env.example
└── frontend/
    ├── pages/index.js          # shop grid: breadcrumb, sort, grid/list
    ├── pages/product/[id].js   # product detail
    ├── pages/cart.js
    ├── pages/checkout.js       # Stripe Elements secure checkout
    ├── pages/success.js
    ├── context/CartContext.js
    ├── context/WishlistContext.js
    ├── components/
    └── .env.local.example
```
