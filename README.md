# 🦸‍♂️ SuperPoke — Pokémon & Superhero Explorer

SuperPoke is a modern full-stack web application that allows users to explore **Pokémon** and **Superheroes**, view detailed stats, bookmark favorites, and manage their personal collection — all in a fast, secure, and responsive experience.

Built with **Next.js App Router**, **TypeScript**, **MongoDB**, and modern UI/UX practices.

---

## 🚀 Live Demo

🔗 **Live App:** [Visit](https://superpoke-v1.vercel.app/)

---

## ✨ Features

### 🔍 Explore & Discover

- Browse **Pokémon** and **Superheroes**
- Search by name
- Sort by name or power
- Paginated results for smooth performance

### ❤️ Bookmark System

- Save Pokémon or Superheroes to bookmarks
- Real-time bookmark count in Navbar
- Delete with confirmation dialog
- Instant UI updates without page refresh

### 🔐 Authentication

- Google OAuth login
- Email & password authentication
- Protected routes using NextAuth
- Secure JWT session handling

### 📊 Detailed Profiles

- Pokémon stats, types, abilities & artwork
- Superhero power stats, biography & appearance
- Clean, animated detail pages

### 🎨 Modern UI/UX

- Responsive design (desktop & mobile)
- Dark / Light mode
- shadcn/ui components
- Framer Motion animations

---

## 🧰 Tech Stack

### Frontend

- Next.js 14 (App Router)
- TypeScript
- React
- Tailwind CSS
- shadcn/ui
- Framer Motion
- TanStack Query

### Backend

- Next.js API Routes
- MongoDB + Mongoose
- NextAuth.js
- JWT Authentication

### APIs Used

- PokéAPI — Pokémon data
- Superhero API (Akabab)

---

Create a `.env` file

```
# api
NEXT_PUBLIC_POKE_BASE_URL='***'
NEXT_PUBLIC_SUPER_BASE_URL='***'

# google oauth
GOOGLE_CLIENT_ID=***
GOOGLE_CLIENT_SECRET=***

# NextAuth
NEXTAUTH_SECRET=***
NEXTAUTH_URL=***

# mongodb
MONGODB_URI=***
```

Document:
[Google Cloud OAuth](https://console.cloud.google.com/apis/credentials)
