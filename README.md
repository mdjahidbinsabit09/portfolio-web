# MD Jahid Bin Sabit — Developer Portfolio

<div align="center">

[![Live Demo](https://img.shields.io/badge/View%20Demo-jbsabit.com-orange?style=for-the-badge)](https://jbsabit.com)
[![GitHub](https://img.shields.io/badge/GitHub-mdjahidbinsabit09-blue?style=for-the-badge&logo=github)](https://github.com/mdjahidbinsabit09)
[![Email](https://img.shields.io/badge/Email-mail@jbsabit.com-red?style=for-the-badge)](mailto:mail@jbsabit.com)

**A professional, feature-rich portfolio website** with admin panel, real-time content management, and modern glassmorphism design.

</div>

---

## About

This is a **full-stack developer portfolio** built with cutting-edge technologies. It showcases projects, skills, experience, and services with an interactive UI. The integrated **admin panel** allows full control over portfolio content without touching code — projects, skills, education, testimonials, services, design colors, and SEO settings are all manageable from a web interface backed by MongoDB.

**Perfect for:** Developers, freelancers, and agencies who want a stunning, production-ready portfolio with zero coding required for content updates.

---

## ✨ Features

### Frontend Features
| # | Feature | Details |
|---|---------|---------|
| 1 | **Project Image Previews** | Glass cards with cover images and interactive hover overlays |
| 2 | **Full-screen Project Modal** | Detailed view with descriptions, live demo, and GitHub links |
| 3 | **Interactive Terminal Hero** | Typing animation cycling through developer identity commands |
| 4 | **Live GitHub Stats** | Real-time GitHub API integration — repos, followers, contributions |
| 5 | **Tech Orbit Animation** | Skills orbiting in 3 concentric rings using Framer Motion |
| 6 | **Smart Project Filtering** | Filter by category (All / WordPress / Full Stack) with search |
| 7 | **Auto-Rotating Testimonials** | Client testimonials carousel with star ratings and auto-play |
| 8 | **Services Showcase** | 6 customizable service cards with icons and descriptions |
| 9 | **Availability Badge** | Pulsing green indicator in navbar showing hire status |
| 10 | **Animated Stats Counters** | Numbers animate from 0 to target on scroll view |
| 11 | **Custom Cursor + Transitions** | Dot/ring cursor (desktop only) + smooth page transitions |
| 12 | **Dark / Light Theme** | Automatic theme switching with localStorage persistence |
| 13 | **vCard Download** | One-click contact file download for easy phone imports |

### Admin Panel Features
| Feature | Access | Purpose |
|---------|--------|---------|
| **Dashboard** | `/admin` | Overview with content counts for all collections |
| **Personal Info** | `/admin/personal` | Edit name, email, phone, bio, social links, profile photo |
| **Projects** | `/admin/projects` | Full CRUD — create, edit, delete projects with image uploads |
| **Skills** | `/admin/skills` | Add/remove technical skills as pill tags |
| **Experience** | `/admin/experience` | Manage work history with inline editing |
| **Education** | `/admin/education` | Manage academic background |
| **Stats** | `/admin/stats` | Edit counter values with live preview |
| **Testimonials** | `/admin/testimonials` | Add/edit client testimonials with star ratings |
| **Services** | `/admin/services` | Manage service offerings with icon selection |
| **Design Settings** | `/admin/design` | Change accent colors, toggle UI features, set announcement text |
| **SEO Settings** | `/admin/settings` | Edit site title, meta description, og:image |

---

## 🛠 Tech Stack

| Layer | Technology | Version | Purpose |
|-------|-----------|---------|---------|
| **Frontend** | Next.js | 16.0.1 | React framework with App Router & Server Components |
| | React | 19.2.0 | UI component library |
| | Tailwind CSS | 4.x | Utility-first CSS framework |
| | Framer Motion | ^11 | Advanced animations & transitions |
| **Backend** | Node.js / Express | Built-in | API routes with Next.js |
| | MongoDB | Atlas (Cloud) | Content database with auto-seeding |
| | Mongoose | Latest | MongoDB ODM for data validation |
| **Database** | MongoDB Atlas | Free Tier | NoSQL database (serverless) |
| | Jose | Latest | JWT authentication (lightweight) |
| **File Storage** | Cloudinary | Free Tier | Image uploads from admin panel |
| **Notifications** | Telegram Bot API | Latest | Contact form notifications to admin |
| **Email** | Nodemailer | Latest | Optional Gmail email delivery |
| **Utilities** | Axios | Latest | HTTP client for API calls |
| | Lottie React | Latest | Vector animations |
| | react-hot-toast | Latest | Toast notifications |
| | React Hook Form | Latest | Admin form state management |

---

## 📋 Sections on Homepage

| Section | Features |
|---------|----------|
| **Hero** | Terminal typing animation + CTA buttons + social links |
| **About** | Bio text + profile image + gradient design |
| **Stats** | 4 animated counters: projects, clients, years, technologies |
| **Services** | 6 service cards with icons and descriptions |
| **Experience** | Timeline of work history with company names and duration |
| **Skills** | Scrolling marquee + orbit animation + skill radar chart |
| **Projects** | Filterable grid with category tabs, search, image previews |
| **GitHub Stats** | Live contribution graph + follower count + repo showcase |
| **Education** | Academic background with institution and duration |
| **Testimonials** | Auto-rotating carousel with client feedback and ratings |
| **Blog** | Latest dev.to articles (auto-fetched every hour) |
| **Contact** | Contact form (Telegram + Email), social links, vCard download |

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** v18.17.0+
- **npm** or **pnpm**
- **MongoDB Atlas** account (free tier works)
- **Cloudinary** account (free tier for image uploads)
- **Telegram Bot** (optional, for contact form notifications)

### Installation

```bash
# Clone the repository
git clone https://github.com/mdjahidbinsabit09/portfolio.git
cd portfolio

# Install dependencies
npm install

# Copy environment template
cp .env.example .env.local
```

### Environment Setup

Edit `.env.local` with your credentials:

```env
# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000

# MongoDB Atlas
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/portfolio

# Admin Authentication
ADMIN_PASSWORD=your_secure_password
JWT_SECRET=generate_random_256_char_string

# Image Uploads (Cloudinary)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Contact Form (Telegram)
TELEGRAM_BOT_TOKEN=123456789:ABCDEFGHijklmnopqrstuvwxyz
TELEGRAM_CHAT_ID=987654321

# Contact Form (Gmail - Optional)
EMAIL_ADDRESS=your_email@gmail.com
GMAIL_PASSKEY=your_16_char_app_password

# Google Tag Manager (Optional)
NEXT_PUBLIC_GTM=GTM-XXXXXXX
```

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

#### Access Admin Panel
1. Go to [http://localhost:3000/admin/login](http://localhost:3000/admin/login)
2. Enter password from `ADMIN_PASSWORD` env var
3. Dashboard auto-seeds on first access with your portfolio data
4. Start editing!

### Production Build

```bash
npm run build
npm start
```

---

## 📝 Content Management

### Option 1: Via Admin Panel (Recommended)
Login to `/admin` and edit everything through the UI:
- ✅ No coding required
- ✅ Real-time preview
- ✅ Image uploads
- ✅ Instant live updates

### Option 2: Edit Data Files
All content lives in `utils/data/`:

```
utils/data/
├── personal-data.js      # Name, email, bio, social links
├── projects-data.js      # Portfolio projects
├── skills.js             # Technical skills
├── experience.js         # Work history
├── educations.js         # School/degrees
├── stats-data.js         # Counter values
├── testimonials-data.js  # Client reviews
├── services-data.js      # Services offered
```

---

## 🔐 Admin Panel Security

- **JWT Authentication** — httpOnly cookies, 7-day auto-expiry
- **Protected Routes** — Middleware enforces auth on `/admin/*` routes
- **Single Admin User** — Password protected (no user registration)
- **Rate Limiting Ready** — Structure supports adding rate limits

---

## 🌐 Deployment

### Deploy on Vercel (Recommended)

```bash
# 1. Push to GitHub
git add .
git commit -m "Initial commit"
git push origin main

# 2. Import on Vercel
# Visit https://vercel.com/new and import your repo

# 3. Add environment variables in Vercel dashboard
# (same as .env.local)

# 4. Deploy — automatically triggers on git push
```

### Deploy on Netlify

```bash
# 1. Connect GitHub repo to Netlify
# 2. Build: npm run build
# 3. Publish: .next
# 4. Add environment variables in site settings
```

### Deploy on Self-Hosted Server

```bash
# Build first
npm run build

# Run with Node
node .next/standalone/server.js

# Or use PM2 for process management
pm2 start 'npm start' --name portfolio
```

---

## 📁 Project Structure

```
portfolio/
├── app/
│   ├── admin/                          # Admin dashboard pages
│   │   ├── components/                 # AdminSidebar, AdminHeader, etc.
│   │   ├── page.js                     # Dashboard
│   │   ├── personal/page.js             # Edit personal info
│   │   ├── projects/page.js             # Manage projects
│   │   ├── skills/page.js               # Manage skills
│   │   ├── experience/page.js           # Manage experience
│   │   ├── education/page.js            # Manage education
│   │   ├── stats/page.js                # Manage stats
│   │   ├── testimonials/page.js         # Manage testimonials
│   │   ├── services/page.js             # Manage services
│   │   ├── design/page.js               # Design settings
│   │   └── settings/page.js             # SEO settings
│   ├── components/
│   │   ├── helper/                     # Reusable: cursor, theme-switcher, etc.
│   │   └── homepage/                   # Section components: Hero, About, Skills, etc.
│   ├── api/
│   │   ├── admin/                      # Admin API routes
│   │   │   ├── auth/route.js           # Login/logout
│   │   │   ├── personal/route.js       # CRUD personal info
│   │   │   ├── projects/route.js       # CRUD projects
│   │   │   ├── skills/route.js         # CRUD skills
│   │   │   ├── experience/route.js     # CRUD experience
│   │   │   ├── education/route.js      # CRUD education
│   │   │   ├── stats/route.js          # CRUD stats
│   │   │   ├── testimonials/route.js   # CRUD testimonials
│   │   │   ├── services/route.js       # CRUD services
│   │   │   ├── design/route.js         # Design settings
│   │   │   ├── settings/route.js       # SEO settings
│   │   │   ├── upload/route.js         # Cloudinary image upload
│   │   │   └── seed/route.js           # Manual seed endpoint
│   │   └── contact/route.js            # Contact form (Telegram + Email)
│   ├── css/                            # Global styles & design system
│   ├── layout.js                       # Root layout
│   └── page.js                         # Homepage
├── models/                             # Mongoose schemas
│   ├── Settings.js                     # Personal info + design + SEO
│   ├── Project.js
│   ├── Skill.js
│   ├── Experience.js
│   ├── Education.js
│   ├── Stat.js
│   ├── Testimonial.js
│   └── Service.js
├── lib/
│   ├── mongodb.js                      # Mongoose connection singleton
│   ├── auth.js                         # JWT signing/verification
│   └── get-data.js                     # Server-side data fetching with DB fallback
├── middleware.js                       # Auth middleware for /admin routes
├── public/
│   ├── images/projects/                # Project screenshots
│   └── [other assets]
├── utils/
│   ├── data/                           # Static data files (fallback)
│   │   ├── personal-data.js
│   │   ├── projects-data.js
│   │   ├── skills.js
│   │   ├── experience.js
│   │   ├── educations.js
│   │   ├── stats-data.js
│   │   ├── testimonials-data.js
│   │   └── services-data.js
│   └── [utility functions]
├── .env.local                          # Environment variables
├── next.config.js                      # Next.js configuration
├── tailwind.config.js                  # Tailwind configuration
├── package.json
└── README.md
```

---

## 🔗 Links

- **Live Portfolio** — [jbsabit.com](https://jbsabit.com)
- **GitHub** — [@mdjahidbinsabit09](https://github.com/mdjahidbinsabit09)
- **Email** — [mail@jbsabit.com](mailto:mail@jbsabit.com)
- **LinkedIn** — [MD Jahid Bin Sabit](https://bd.linkedin.com/in/md-jahid-bin-sabit-b30a50220)
- **GitHub Issues** — [Report bugs or feature requests](https://github.com/mdjahidbinsabit09/portfolio/issues)

---

## 📄 License

This project is licensed under the **MIT License** — free to use, modify, and distribute. See [LICENSE](LICENSE) for details.

---

## 🤝 Contributing

Found a bug or want to improve something?
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

<div align="center">

**Built with ❤️ by [MD Jahid Bin Sabit](https://jbsabit.com)**

_Full Stack Developer • WordPress Specialist • Open Source Enthusiast_

</div>
