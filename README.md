# Authentication System - Frontend

A premium, high-contrast, minimalist authentication dashboard built with React and Tailwind CSS. This frontend is designed with an "Apple/Vercel-esque" aesthetic, prioritizing visual excellence, smooth interactions, and ultimate readability.

## Design Philosophy

- **High Contrast**: Deep Zinc-950 backgrounds with vibrant Indigo accents.
- **Minimalist Aesthetic**: Clean layouts, consistent grid alignment, and ample negative space.
- **Glassmorphism**: Subtle backdrop blurs and translucent card elements.
- **Premium Interactions**: Smooth animations powered by Framer Motion and elegant icons from Lucide React.
- **Box-Sizing Correctness**: Strict layout grid ensuring no input overflow or container misalignment.

## Key Features

- **Full Auth Flow**: Login, Signup, Email Verification, and Password Recovery.
- **Global State Management**: Powered by Redux Toolkit for seamless user data handling.
- **Form Management**: Logic-heavy forms handled with Formik and validated with Yup.
- **Responsive Design**: Mobile-first approach with perfectly centered and scaled containers.
- **Secure Integration**: Full credential support for HttpOnly cookies.
- **Real-time Feedback**: Dynamic error handling and success states with SweetAlert2.

## Technologies Used

- **React (Vite)**: Lighting-fast frontend framework.
- **Tailwind CSS**: Modern styling with a custom design system.
- **Redux Toolkit (RTK)**: predictable state container.
- **Framer Motion**: State-of-the-art animations.
- **Formik & Yup**: Form handling and validation.
- **Lucide React**: Beautiful, minimalist icon set.
- **Axios**: Promised-based HTTP client with interceptors.
- **SweetAlert2**: Elegant popups and feedback.

## Installation

1. Navigate to the client directory:
   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure Environment:
   Create a `.env` file:
   ```env
   VITE_API_URL=http://localhost:3000
   ```

4. Launch Development Server:
   ```bash
   npm run dev
   ```

## Project Structure

```
client/src/
├── components/     # UI Components (Login, Signup, etc.)
├── store/          # Redux Toolkit (API Thunks, Auth Slices)
├── utils/          # Axios configuration and Helpers
├── App.jsx         # Global routing and layout
└── index.css       # Design tokens and custom utilities
```

## Security
This frontend strictly uses `withCredentials: true` via Axios to work with the backend's Secure HttpOnly cookies, ensuring that authentication tokens are never exposed to JavaScript.

## License
ISC License
