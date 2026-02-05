# Tourvisto - Travel Agency Platform

A modern travel agency platform with AI-powered trip planning, admin dashboard, and seamless booking experience.

## 🌟 Features

- **AI-Powered Trip Planning**: Generate customized travel itineraries using Google Gemini AI
- **Admin Dashboard**: Comprehensive admin panel for managing trips, users, and analytics
- **Real-time Analytics**: Track user growth, trip statistics, and travel preferences
- **Secure Authentication**: Google OAuth integration via Appwrite
- **Payment Processing**: Stripe integration for seamless booking
- **Responsive Design**: Beautiful UI with Syncfusion components and Tailwind CSS

## 🛠️ Tech Stack

- **Frontend**: React Router v7 (Framework Mode)
- **Backend**: Appwrite (BaaS)
- **AI**: Google Gemini API
- **Payments**: Stripe
- **UI Components**: Syncfusion
- **Styling**: Tailwind CSS
- **Monitoring**: Sentry
- **Build Tool**: Vite

## 📋 Prerequisites

- Node.js 18+ and npm
- Appwrite account and project
- Google Gemini API key
- Stripe account
- Syncfusion license key

## 🚀 Quick Start

### 1. Clone the repository

```bash
git clone https://github.com/ParaPixel-DigiServices/travel-agency-dashboard.git
cd travel-agency-dashboard
```

### 2. Install dependencies

```bash
npm install
```

### 3. Environment Setup

Create a `.env` file in the root directory:

```env
# Syncfusion
VITE_SYNCFUSION_LICENSE_KEY=your_syncfusion_license

# Appwrite Configuration
VITE_APPWRITE_PROJECT_ID=your_project_id
VITE_APPWRITE_API_ENDPOINT=https://your-region.cloud.appwrite.io/v1
VITE_APPWRITE_API_KEY=your_api_key
VITE_APPWRITE_DATABASE_ID=your_database_id
VITE_APPWRITE_USERS_COLLECTION_ID=users
VITE_APPWRITE_TRIPS_COLLECTION_ID=trips

# Stripe
STRIPE_SECRET_KEY=your_stripe_secret_key

# AI
GEMINI_API_KEY=your_gemini_api_key

# Image API
UNSPLASH_ACCESS_KEY=your_unsplash_key

# Base URL
VITE_BASE_URL=http://localhost:5173
```

### 4. Appwrite Setup

1. Create a new Appwrite project
2. Create a database with two collections:
   - **users**: accountId (string), email (string), name (string), imageUrl (string), joinedAt (datetime), status (string)
   - **trips**: tripDetails (string), imageUrls (string[]), createdAt (datetime), userId (string)
3. Enable Google OAuth in Appwrite Authentication
4. Copy your project credentials to `.env`

**Important**: Make sure to use the correct region-specific endpoint (e.g., `https://sgp.cloud.appwrite.io/v1` for Singapore region). Check your Appwrite console settings for the exact endpoint.

### 5. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:5173`

## 📦 Build for Production

```bash
npm run build
```

## 🎯 Project Structure

```
├── app/
│   ├── appwrite/          # Appwrite client and auth logic
│   ├── routes/            # Route components
│   │   ├── admin/         # Admin dashboard routes
│   │   ├── api/           # API routes
│   │   └── root/          # Public routes
│   ├── lib/               # Utility functions
│   └── constants/         # Constants and configs
├── components/            # Reusable components
├── public/                # Static assets
└── .env                   # Environment variables
```

## 🔧 Key Features Explained

### Authentication Flow

1. Users sign in with Google OAuth via Appwrite
2. User data is stored in the Appwrite database
3. Session management handled by Appwrite SDK
4. Admin access controlled via user status field

### AI Trip Generation

The platform uses Google Gemini AI to generate personalized travel itineraries based on:

- Destination country
- Number of days
- Travel style
- Interests
- Budget
- Group type

### Payment Integration

Stripe handles all payment processing:

- Product creation for each trip
- Payment link generation
- Success/failure callbacks
- Metadata tracking

## 🌐 Deployment

### Vercel Deployment

1. Push your code to GitHub
2. Import repository in Vercel
3. Set Framework Preset to **Remix**
4. Add environment variables in Vercel dashboard
5. Deploy

### Environment Variables for Production

Make sure to add all environment variables in your deployment platform's settings, especially:

- Database credentials
- API keys
- Correct Appwrite endpoint for your region

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is licensed under the MIT License.

## 🐛 Troubleshooting

### "Project is not accessible in this region" error

Make sure you're using the correct region-specific Appwrite endpoint. Check your Appwrite console settings.

### Sign-in redirects back to sign-in page

This usually indicates:

1. OAuth callback URL not configured in Appwrite
2. Session not persisting (check browser cookies)
3. Database permissions not set correctly

### Build errors

1. Clear `.react-router` cache folder
2. Delete `node_modules` and `package-lock.json`
3. Reinstall: `npm install`
4. Rebuild: `npm run build`

## 📧 Support

For issues and questions, please open an issue on GitHub.

---

Built with ❤️ using React Router 7, Appwrite, and modern web technologies.
