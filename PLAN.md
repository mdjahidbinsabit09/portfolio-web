# Admin Panel Implementation Plan

## Tech Stack
- **Database**: MongoDB Atlas (free tier) via Mongoose
- **Auth**: jose (JWT) stored in httpOnly cookie - lightweight, no external service
- **Image Upload**: Cloudinary (already whitelisted in next.config.js)
- **Forms**: react-hook-form + zod validation
- **UI**: Reuse existing glass-card design system + admin sidebar layout

## New Dependencies
```
mongoose, jose, react-hook-form, zod, @hookform/resolvers, cloudinary
```

## Environment Variables (new)
```
MONGODB_URI=mongodb+srv://...
ADMIN_PASSWORD=your-secure-password
JWT_SECRET=random-64-char-string
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

---

## Phase 1: Infrastructure (DB + Auth + Middleware)

### 1.1 MongoDB Connection
- `lib/mongodb.js` - Cached Mongoose connection singleton

### 1.2 Mongoose Models (8 models matching existing data)
- `models/Settings.js` - Personal info (15 fields) + design settings + feature toggles
- `models/Project.js` - id, name, description, tools[], role, code, demo, image, category
- `models/Skill.js` - name (string), order (number)
- `models/Experience.js` - title, company, duration
- `models/Education.js` - title, duration, institution
- `models/Stat.js` - label, value, suffix
- `models/Testimonial.js` - name, role, text, rating
- `models/Service.js` - title, description, icon

### 1.3 Auth System
- `lib/auth.js` - JWT sign/verify helpers using jose
- `app/api/admin/auth/route.js` - POST login, DELETE logout
- `middleware.js` - Protect all `/admin/*` except `/admin/login`

### 1.4 Seed Script
- `scripts/seed.js` - Reads existing static data files, populates MongoDB

---

## Phase 2: Admin Layout & Dashboard

### 2.1 Admin Layout
- `app/admin/layout.js` - Separate layout (no public navbar/footer/cursor/particles)
- Admin sidebar with navigation links + collapse on mobile
- Admin header bar with logout button + theme toggle

### 2.2 Dashboard
- `app/admin/page.js` - Overview cards: total projects, skills, experience entries, etc.

---

## Phase 3: Content Management Pages (CRUD)

Each section follows the same pattern:
- List page with data table/cards
- Create/Edit form with validation
- Delete with confirmation modal
- API routes for GET/POST/PUT/DELETE

### 3.1 Personal Info Editor
- `app/admin/personal/page.js` - Edit all personalData fields
- `app/api/admin/personal/route.js` - GET/PUT

### 3.2 Projects Manager
- `app/admin/projects/page.js` - Project list with edit/delete
- `app/admin/projects/new/page.js` - Create project form
- `app/admin/projects/[id]/page.js` - Edit project form
- `app/api/admin/projects/route.js` - GET/POST
- `app/api/admin/projects/[id]/route.js` - GET/PUT/DELETE

### 3.3 Skills Manager
- `app/admin/skills/page.js` - Add/remove/reorder skills
- `app/api/admin/skills/route.js` - GET/PUT

### 3.4 Experience Manager
- `app/admin/experience/page.js` - List + inline edit
- `app/api/admin/experience/route.js` - GET/POST
- `app/api/admin/experience/[id]/route.js` - PUT/DELETE

### 3.5 Education Manager
- `app/admin/education/page.js` - List + inline edit
- `app/api/admin/education/route.js` - GET/POST
- `app/api/admin/education/[id]/route.js` - PUT/DELETE

### 3.6 Stats Editor
- `app/admin/stats/page.js` - Edit 4 stat cards
- `app/api/admin/stats/route.js` - GET/PUT

### 3.7 Testimonials Manager
- `app/admin/testimonials/page.js` - CRUD
- `app/api/admin/testimonials/route.js` - GET/POST
- `app/api/admin/testimonials/[id]/route.js` - PUT/DELETE

### 3.8 Services Manager
- `app/admin/services/page.js` - CRUD
- `app/api/admin/services/route.js` - GET/POST
- `app/api/admin/services/[id]/route.js` - PUT/DELETE

---

## Phase 4: Design & Site Settings

### 4.1 Design Controls
- `app/admin/design/page.js`
  - Color theme picker (accent-blue, accent-orange, accent-gold)
  - Feature toggles: particles, announcement banner, mouse trail, floating orbs, cursor, section dots, command palette, Konami Easter egg, scroll progress bar
  - Font selection
- `app/api/admin/design/route.js` - GET/PUT

### 4.2 Site Settings
- `app/admin/settings/page.js`
  - SEO: site title, meta description, OG image
  - Contact: Telegram bot token, chat ID, Gmail credentials
  - Integrations: reCAPTCHA key, GTM ID, dev.to username
- `app/api/admin/settings/route.js` - GET/PUT

---

## Phase 5: Media Upload

- `app/api/admin/upload/route.js` - POST multipart form → Cloudinary
- Reusable `ImageUploader` component for project images + profile photo

---

## Phase 6: Connect Public Site to Database

Update all public-facing components to read from MongoDB instead of static JS files:
- `app/page.js` - Fetch all data from DB
- Each section component receives data as props from the server component
- Fallback: if DB is empty/unreachable, fall back to static data files
- Design settings applied via CSS variables from DB

---

## Reusable Admin UI Components
- `app/admin/components/AdminSidebar.jsx` - Navigation sidebar
- `app/admin/components/AdminHeader.jsx` - Top bar
- `app/admin/components/DataTable.jsx` - Sortable table
- `app/admin/components/FormField.jsx` - Input wrapper with label + error
- `app/admin/components/ImageUploader.jsx` - Drag-drop + preview
- `app/admin/components/DeleteModal.jsx` - Confirmation dialog
- `app/admin/components/PageHeader.jsx` - Page title with actions
- `app/admin/components/StatsCard.jsx` - Dashboard stat card

---

## File Count Estimate
- Models: 8 files
- Lib (db, auth): 2 files
- Middleware: 1 file
- Admin layout + components: ~10 files
- Admin pages: ~15 pages
- API routes: ~18 route files
- Seed script: 1 file
- **Total: ~55 new files**

## Approach
Implementation will use parallel Task agents to create files in batches, dramatically reducing build time. Each phase will be verified with a build check before proceeding.
