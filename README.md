# originAI

# Random Pictures Voting App

A React + Vite application that displays random images and allows users to vote **Like / Dislike** on each image.  
Votes are tracked in application state and can be exported to CSV.

The project demonstrates clean component design, global state via React Context, testing with Vitest + Testing Library, SCSS styling, and Dockerized production build with Nginx.

---

## ✨ Features

- Fetch and display a grid of random images
- Like / Dislike voting per image
- Vote counts per image (likes & dislikes)
- Prevent double voting while a request is in progress
- Export all votes to CSV
- Responsive grid layout
- Clean SCSS-based design system
- Unit tests for components
- Production-ready Docker setup

---

## 🧱 Tech Stack

**Frontend**
- React
- Vite
- TypeScript / JavaScript
- SCSS
- React Context (state management)

**Testing**
- Vitest
- @testing-library/react
- @testing-library/jest-dom

**Production**
- Docker
- Nginx

---

## 📁 Project Structure
src/
├─ api/ # API helpers (images, voting, export)
├─ components/
│ ├─ ImageCard.tsx # Single image + voting buttons
│ ├─ ImageGrid.tsx # Responsive image grid
│ ├─ tests/ # Component tests
│ └─ *.scss
├─ pages/
│ └─ HomePage.tsx # Main page
├─ state/
│ ├─ AppProvider.tsx # Global app context
│ └─ useApp.ts # Context hook
├─ styles/
│ ├─ _variables.scss
│ ├─ _mixins.scss
│ ├─ _reset.scss
│ └─ index.scss
├─ test/
│ └─ setup.ts # Vitest setup
├─ App.tsx
└─ main.tsx

## 🚀 Getting Started Front/Back (Local Development)
### 1️⃣ Install dependencies
  npm install

### 2️⃣ Run the development server
   npm run dev


#### The app will be available at:

http://localhost:5173

## 🧪 Running Tests

Run all tests in either backend or frontend:

npm run test

## 🐳 Running with Docker
docker compose up --build


### Extras:
used postgres locally as a db, need to precreate a db named picsvoter, and added all .env files for convenience.
