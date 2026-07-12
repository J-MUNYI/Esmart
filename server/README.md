# Esmart Beauty — Production Backend Setup

No seed data due to time constraints. Every product you create goes through the real, validated,
admin-protected API — so what you test is exactly what production will do.

---

## 1. MongoDB Atlas Setup

1. Go to mongodb.com/cloud/atlas → sign up / log in.
2. Create a free M0 cluster (region closest to you — Frankfurt or
   Cape Town for lowest latency from Kenya).
3. **Database Access** (left sidebar) → Add New Database User:
   - Username + a generated password (save it)
   - Role: "Read and write to any database"
4. **Network Access** (left sidebar) → Add IP Address:
   - For now: "Allow Access from Anywhere" (0.0.0.0/0)
   - Tighten this later once you know your Render deployment's
     outbound IP, if your Render plan supports static IPs.
5. Cluster → Connect → Drivers → copy the connection string:
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
6. Add your database name before the `?`:
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/esmartbeauty?retryWrites=true&w=majority
   ```
   This becomes your `MONGO_URI`. If your password has special characters
   (`@`, `#`, etc.), URL-encode them or Mongoose will fail to parse the string.

You do NOT need to create any collections manually — Mongoose creates
`users`, `products`, and `orders` automatically the first time a document
is saved to each.

---

## 2. Cloudinary Setup

1. Sign up at cloudinary.com (free tier is generous enough for this).
2. Dashboard homepage shows your **Cloud Name**, **API Key**, **API Secret**.
   Copy all three — you'll paste them into `.env`.
3. That's it for setup. No manual uploading needed — the
   `/api/products/upload-image` endpoint below handles real uploads
   through your own code, not the dashboard.

---

## 3. Install and Configure

```bash
cd server
npm install
cp .env.example .env
```

Open `.env` and fill in:
- `MONGO_URI
- `JWT_SECRET` — generate one:
  ```bash
  node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
  ```
- `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` — from step 2
- Leave `PORT=5000`, `NODE_ENV=development`, `CLIENT_URL=http://localhost:5173` as is for now

---

## 4. Start the Server and Confirm the Connection

```bash
npm run dev
```

**Expected output:**
```
MongoDB connected: cluster0-shard-...mongodb.net
Server running on port 5000 [development]
```

If you see a connection error instead: check the password encoding,
confirm Network Access includes your current IP (or 0.0.0.0/0), and
confirm the database name is in the URI.

**Do not proceed until this is clean.**

---

## 5. Create Your Admin Account (no seed script, no manual DB editing)
 
This is thepart that replaces "seed data" — you register a real
account through the real API, then promote it to admin with one command.

**Step 1 — Register yourself as a normal user.**
Open Postman, import `Esmart-Beauty.postman_collection.json` (File → Import),
set the collection variable `baseUrl` to `http://localhost:5000`.

Run **Auth - Register** with your real email/password in the body.
You should get a `201` response with your user object.

**Step 2 — Promote yourself to admin:**
```bash
npm run make-admin -- you@example.com
```
Expected output:
```
Joan Admin (you@example.com) is now an admin.
```

**Step 3 — Log in again** (run **Auth - Login** in Postman) so your
session cookie reflects the updated admin status. Run **Auth - Me** to
confirm `"isAdmin": true` in the response.

---

## 6. Test Every Endpoint (in this order)

All of these are pre-built in the Postman collection. Postman will
automatically carry your login cookie between requests as long as you
stay in the same Postman session.

1. **Health Check** → `GET /` → `{"message": "Esmart Beauty API is running"}`
2. **Auth - Register** → already done in step 5
3. **Auth - Login** → `200` + cookie set
4. **Auth - Me** → returns your user, `isAdmin: true`
5. **Products - Upload Image**:
   - Switch body type to `form-data`
   - Key: `image`, type: File, select a real product photo from your computer
   - Send → response gives you a real Cloudinary URL:
     ```json
     { "url": "https://res.cloudinary.com/.../esmart-products/abc123.jpg", "publicId": "esmart-products/abc123" }
     ```
   - **Copy this URL** — you'll use it in the next step
6. **Products - Create (admin)**:
   - Paste the Cloudinary URL from step 5 into the `images[0].url` field in the request body
   - Send → `201` with the full product object, including its auto-generated `slug`
   - **Copy the `_id` and `slug`** from the response — save them as the
     `productId` and `productSlug` collection variables in Postman (or just
     paste them manually into the next requests)
7. **Products - Get All** → should return an array containing your product
8. **Products - Get All (filtered by category)** → same product, filtered correctly
9. **Products - Get Single by Slug** → returns that one product
10. **Products - Update (admin)** → change price, confirm it updates
11. **Orders - Create** → use the `productId` you saved; should return `201`
    with `status: "pending"`
12. **Orders - Get My Orders** → returns the order you just created

Repeat steps 5–6 for each real product you want live (aim for 8–10).
This is slower than a seed script per product, but every product this
way has gone through real validation, real image upload, and real slug
generation — exactly what your admin panel UI will do later. Testing endpoints.


---

## 7. What's Already Production-Hardened Here

- Passwords hashed with bcrypt, never stored or returned in plaintext
- JWT in httpOnly cookie (not localStorage) — immune to XSS token theft
- Cookie `secure` + `sameSite` flags auto-switch based on `NODE_ENV`
- All mutating routes (`POST`/`PUT`/`DELETE` on products, order status
  updates) require `protect` + `adminOnly`
- Input validation on register, login, and product creation
  (`express-validator`)
- Rate limiting on auth routes (10 attempts / 15 min) — blocks brute-force
- Centralized error handler — no stack traces leak in production responses
- Text index on Product `name`/`description` — search is fast, not a
  full collection scan
- Category and featured indexes for common query patterns
- 404 handler for unmatched routes

## 8. Before Deploying to Render

- [ ] In Render's dashboard, set all `.env` values as environment
      variables (never upload the `.env` file itself)
- [ ] Generate a **different** `JWT_SECRET` for production than dev
- [ ] Set `NODE_ENV=production` and `CLIENT_URL` to your real Vercel URL
- [ ] Re-run `npm run make-admin -- you@example.com` against production
      once deployed (your dev and prod databases are separate unless
      you reused the same Atlas cluster)
- [ ] Confirm `.env` was not committed in any instance:
      `git log --all --full-history -- server/.env` should return nothing

---

## 9. To make a user an admin
Promote user to admin with one command (npm run make-admin -- you@email.com)