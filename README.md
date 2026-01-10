<div align="center">

# ⚡ Gautam Vhavle — Portfolio

**A minimal, modern, and fully customizable developer portfolio built for speed and aesthetics.**

[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen?style=for-the-badge&logo=vercel)](https://gautamvhavle.vercel.app)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-blue?style=for-the-badge&logo=linkedin)](https://linkedin.com/in/gautamvhavle)
[![DEV.to](https://img.shields.io/badge/DEV.to-Follow-black?style=for-the-badge&logo=dev.to)](https://dev.to/gautamvhavle)

<img src="./public/assets/preview.png" alt="Portfolio Preview" width="800" />

</div>

---

## ✨ Features

### 🎨 Visual Effects & Animations

| Feature | Description |
|---------|-------------|
| 🌌 **Aurora Background** | Beautiful WebGL-powered aurora gradient animation using OGL shaders |
| ✨ **Starfield Background** | Dynamic GSAP-animated stars with twinkling effects |
| 🖱️ **Canvas Cursor** | Custom interactive cursor that responds to mouse movements |
| 📝 **Animated Text Slider** | Smooth auto-rotating text with fade transitions |
| 🪟 **Glassmorphism UI** | Modern frosted-glass card effects with backdrop blur |
| 💫 **Smooth Transitions** | Page transitions and micro-interactions throughout |

### 🤖 Interactive Components

| Feature | Description |
|---------|-------------|
| 💬 **AI Chatbot** | Gemini-powered assistant with markdown support and a cute shivering bot icon |
| 🎭 **Live2D Character** | Interactive anime-style mascot that follows cursor (optional) |
| 🎬 **Splash Screen** | Customizable loading screen with animated GIF (Nyan Cat by default!) |
| 🙈 **Rick Roll Easter Egg** | A "Delete Website" button that... you'll have to click to find out |
| 💬 **Rotating Quotes** | Auto-cycling inspirational quotes with glassmorphism cards |

### 🎵 Spotify Integration

| Feature | Description |
|---------|-------------|
| 🎧 **Now Playing Widget** | Real-time display of currently playing track with animated equalizer |
| 🎶 **Embedded Playlist** | Configurable Spotify playlist embed on About page |
| 🔄 **Fallback Track** | Customizable fallback when nothing is playing |

### 📊 GitHub Integration

| Feature | Description |
|---------|-------------|
| 🗓️ **Contribution Heatmap** | Beautiful GitHub-style contribution calendar with custom theming |
| 📈 **Contribution Stats** | Total contributions count with loading skeleton |
| 🔌 **Serverless Caching** | Vercel edge function for optimized API calls |

### 📝 Content Sections

| Feature | Description |
|---------|-------------|
| 👤 **Dynamic Intro** | Avatar, name, animated roles, location, live clock |
| 📄 **Bio Section** | Description, social links, resume download, company info |
| 🛠️ **Tech Stack** | Grid of technology icons with tooltips and links |
| 💼 **Experience Timeline** | Interactive tabbed company cards with logos |
| 🚀 **Featured Projects** | Project cards with images, descriptions, and tech icons |
| 🏆 **Certifications** | Expandable certificate list with skills and LinkedIn integration |
| 📬 **Contact Form** | Working form with Web3Forms + multiple contact methods |

### 📰 Blog System

| Feature | Description |
|---------|-------------|
| 📡 **DEV.to Integration** | Auto-fetches articles from your DEV.to profile |
| 🖼️ **Blog Cards** | Beautiful cards with cover images, tags, and reading time |
| 🔄 **Smart Caching** | Environment-aware fetching (dev vs production) |

### 🧩 UI Components Library

> Built with **shadcn/ui** components + custom components

<details>
<summary>📦 <b>Click to expand component list</b></summary>

| Component | Description |
|-----------|-------------|
| `AlertDialog` | Confirmation dialogs with animations |
| `Button` | Multiple variants (default, destructive, outline, ghost) |
| `Card` | Glassmorphism card with hover effects |
| `Carousel` | Smooth image/content carousel |
| `Collapsible` | Animated expand/collapse sections |
| `Dialog` | Modal dialogs with backdrop blur |
| `Dropdown Menu` | Accessible dropdown with sub-menus |
| `Hover Card` | Preview cards on hover |
| `Navigation Menu` | Responsive navigation with mobile support |
| `Progress` | Animated progress bars |
| `Scroll Area` | Custom scrollbar styling |
| `Select` | Styled select dropdowns |
| `Textarea` | Auto-resizing text areas |
| `Tooltip` | Animated tooltips throughout |

</details>

### 🎯 Developer Experience

| Feature | Description |
|---------|-------------|
| 🎛️ **Single JSON Config** | Customize everything from `metadata.json` |
| ⚡ **Vite Powered** | Blazing fast HMR and optimized builds |
| 🔤 **TypeScript** | Full type safety throughout |
| 📱 **Fully Responsive** | Mobile-first design that works everywhere |
| 🌐 **SEO Optimized** | Meta tags, sitemap, robots.txt included |
| 🚀 **Vercel Ready** | One-click deploy with serverless functions |

---

## 🎛️ Customization

**Everything is configurable via `src/content/metadata.json`** — no need to touch the code!

### What You Can Customize

| Section | What You Can Change |
|---------|---------------------|
| **Header** | Logo text, navigation links (enable/disable pages) |
| **Intro** | Name, avatar, roles, availability status |
| **Bio** | Description, company, resume link, social links |
| **GitHub** | Username, contribution year, enable/disable heatmap |
| **Tech Stack** | Add/remove technologies with icons |
| **Projects** | Title, description, image, links, tech used |
| **Experience** | Company details, job titles, descriptions |
| **Contact** | Methods (calendar, email, LinkedIn), contact form |
| **Footer** | Text, author name, social icons |

### Settings (Enable/Disable Features)

```json
"settings": {
  "chatbot": { "enabled": true },
  "splashScreen": { "enabled": true, "gif": "/assets/nyan-cat.gif" },
  "blogs": { "enabled": true, "devToUsername": "your-username" },
  "spotifyNowPlaying": { "enabled": true },
  "spotifyPlaylist": { "enabled": true, "embedUrl": "..." },
  "live2dCharacter": { "enabled": false },
  "rickRoll": { "enabled": true }
}
```

### Quick Start Customization

1. Open `src/content/metadata.json`
2. Replace my info with yours (name, links, bio, etc.)
3. Add your images to `public/assets/`
4. Toggle features on/off in the `settings` section
5. Done! 🎉

---

## 🚀 Quick Start

```bash
# Clone
git clone https://github.com/GautamVhavle/portfoliov2.git
cd portfoliov2

# Install & Run
npm install && npm run dev
```

> Open **[localhost:5173](http://localhost:5173)** — that's it!

---

## 🛠 Tech Stack

<div align="center">

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)

</div>

---

## 📁 Project Structure

```
portfoliov2/
├── api/                 # Vercel serverless functions
├── public/assets/       # Images, icons, logos
├── src/
│   ├── components/      # Reusable UI components
│   ├── content/         # ⭐ CUSTOMIZE HERE
│   │   ├── metadata.json      # Main config file
│   │   ├── about.md           # About page content
│   │   └── featured-certificates-metadata.json
│   ├── pages/           # Route pages
│   └── styles/          # Global CSS
└── README.md
```

---

## 📜 Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the repo
2. Create your branch (`git checkout -b feature/amazing`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push (`git push origin feature/amazing`)
5. Open a Pull Request

---

## 📝 License

```
MIT © 2025 Gautam Vhavle
```

---

<div align="center">

**Built with ☕ and code by [Gautam Vhavle](https://github.com/GautamVhavle)**

⭐ Star this repo if you like it! Fork it to make it your own.

</div>