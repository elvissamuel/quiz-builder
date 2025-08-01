# 🎯 Personality Quiz Builder

A modern, interactive web application for creating and sharing personality quizzes with a beautiful Kahoot-style interface. Built with Next.js, TypeScript, and Tailwind CSS.

![Personality Quiz Builder](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3-38B2AC?style=for-the-badge&logo=tailwind-css)
![Prisma](https://img.shields.io/badge/Prisma-5.0-2D3748?style=for-the-badge&logo=prisma)

## ✨ Features

### 🎨 **Modern UI/UX**
- **Kahoot-style Interface**: Engaging, colorful quiz experience with 2x2 answer grid
- **Teal & Gold Theme**: Beautiful gradient design with consistent branding
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Smooth Animations**: Elegant transitions and hover effects

### 🏗️ **Quiz Creation**
- **Intuitive Builder**: Easy-to-use form interface for creating quizzes
- **Multiple Results**: Support for multiple personality outcomes
- **Creator Attribution**: Track who created each quiz
- **Real-time Preview**: See changes as you build

### 🎮 **Quiz Experience**
- **Interactive Questions**: Large, colorful answer buttons
- **Progress Tracking**: Visual progress bar and question counter
- **Clean Selection**: Elegant answer selection with clear indicators
- **Smooth Navigation**: Previous/Next navigation between questions

### 📊 **Results & Sharing**
- **Detailed Results**: Rich result pages with descriptions and images
- **Dual Sharing**: Share both quiz links and specific result links
- **Social Integration**: Native sharing support for mobile devices
- **Copy Links**: Easy link copying for social media

### 🔧 **Technical Features**
- **TypeScript**: Full type safety and better development experience
- **Prisma ORM**: Robust database management with PostgreSQL
- **Next.js 14**: Latest React framework with App Router
- **Tailwind CSS**: Utility-first CSS framework for rapid styling

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- PostgreSQL database
- npm, yarn, or pnpm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/elvissamuel/quiz-builder.git
   cd quiz-builder
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Add your database URL:
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/quiz_builder"
   ```

4. **Set up the database**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
personality-quiz-builder/
├── app/                    # Next.js App Router
│   ├── admin/             # Admin dashboard
│   ├── api/               # API routes
│   ├── quiz/              # Quiz player and results
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── quiz-builder.tsx  # Quiz creation interface
│   ├── quiz-player.tsx   # Quiz playing interface
│   └── result-display.tsx # Results display
├── lib/                  # Utility functions
├── prisma/               # Database schema and migrations
└── public/               # Static assets
```

## 🎯 Usage

### Creating a Quiz
1. Navigate to `/admin`
2. Click "New Quiz" or "Create Your First Quiz"
3. Fill in the basic information (title, creator name, description)
4. Add personality results with titles, descriptions, and optional images
5. Create questions with multiple answer options
6. Link each answer to a specific result
7. Save your quiz

### Taking a Quiz
1. Browse available quizzes on the homepage
2. Click "Take Quiz" on any quiz
3. Answer questions using the colorful interface
4. View your personalized result
5. Share your result with friends

### Sharing Results
- **Share Quiz**: Share the quiz link so others can take it
- **Share Result**: Share your specific result link
- **Copy Links**: Easy one-click copying for social media

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, CSS Modules
- **Database**: PostgreSQL with Prisma ORM
- **UI Components**: Custom component library
- **Icons**: Lucide React
- **Deployment**: Vercel-ready

## 🎨 Design System

### Color Palette
- **Primary**: Teal (`#008080`) - Used for main actions and headers
- **Secondary**: Gold (`#FFDB58`) - Used for accents and highlights
- **Background**: Gradient combinations for visual appeal

### Typography
- **Font**: Inter (Google Fonts)
- **Weights**: Regular, Medium, Bold
- **Sizes**: Responsive scaling from mobile to desktop

### Components
- **Cards**: Rounded corners with subtle shadows
- **Buttons**: Gradient backgrounds with hover effects
- **Forms**: Clean inputs with focus states
- **Navigation**: Smooth transitions and clear hierarchy

## 🔧 API Endpoints

### Quizzes
- `GET /api/quizzes` - Get all quizzes
- `POST /api/quizzes` - Create a new quiz
- `GET /api/quizzes/[id]` - Get a specific quiz
- `PUT /api/quizzes/[id]` - Update a quiz
- `DELETE /api/quizzes/[id]` - Delete a quiz

### Quiz Submissions
- `POST /api/quizzes/[id]/submit` - Submit quiz answers and get results

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables
4. Deploy automatically

### Other Platforms
The app is compatible with any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 👨‍💻 Developer

**Elvis Omotehinse**  
*Software Developer with 3+ years of experience*

- 🚀 Passionate about creating user-friendly web applications
- 💻 Experienced with modern web technologies
- 🎨 Focus on clean, maintainable code and beautiful UI/UX
- 🔧 Skilled in full-stack development with React, Node.js, and databases

### Connect with Elvis
- [GitHub](https://github.com/elvissamuel)

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing React framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Prisma](https://prisma.io/) for the excellent ORM
- [Lucide](https://lucide.dev/) for the beautiful icons
- [Vercel](https://vercel.com/) for seamless deployment

---

⭐ **Star this repository if you found it helpful!**

Made with ❤️ by Elvis Omotehinse 