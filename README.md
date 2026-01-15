# QuimiPro - Chemical Products Web Application

Modern web application for chemical products (soaps, degreasers, disinfectants, and cleaners) built with TypeScript full-stack.

## 🚀 Tech Stack

### Frontend

- **React 18** with TypeScript
- **Vite** for fast development
- **Vanilla CSS** with modern design system
- **SessionStorage** for data caching

### Backend

- **Node.js** with TypeScript
- **Express.js** REST API
- **In-memory data store** (MVP - no database)
- **CORS** enabled

## 📁 Project Structure

```
InicioPaginaQuimicos/
├── backend/
│   ├── src/
│   │   ├── routes/
│   │   │   └── products.routes.ts
│   │   ├── data.ts
│   │   ├── types.ts
│   │   └── server.ts
│   ├── package.json
│   ├── tsconfig.json
│   ├── .env.example
│   └── .gitignore
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Header.tsx
    │   │   ├── Footer.tsx
    │   │   ├── ProductList.tsx
    │   │   ├── ProductCard.tsx
    │   │   └── ProductDetail.tsx
    │   ├── services/
    │   │   └── api.ts
    │   ├── App.tsx
    │   ├── main.tsx
    │   ├── config.ts
    │   ├── types.ts
    │   └── index.css
    ├── index.html
    ├── package.json
    ├── tsconfig.json
    ├── vite.config.ts
    ├── .env.example
    └── .gitignore
```

## 🛠️ Setup & Installation

### Prerequisites

- Node.js 18+ installed
- npm or yarn

### Backend Setup

1. Navigate to backend directory:

```bash
cd backend
```

2. Copy environment file:

```bash
copy .env.example .env
```

3. Install dependencies:

```bash
npm install
```

4. Start development server:

```bash
npm run dev
```

Backend will run on `http://localhost:3000`

### Frontend Setup

1. Navigate to frontend directory:

```bash
cd frontend
```

2. Copy environment file:

```bash
copy .env.example .env
```

3. Install dependencies:

```bash
npm install
```

4. Start development server:

```bash
npm run dev
```

Frontend will run on `http://localhost:5173`

## 🎯 Features

### Current (MVP)

- ✅ Product catalog with categories
- ✅ Search functionality
- ✅ Category filtering
- ✅ Product detail view
- ✅ Responsive design
- ✅ Modern UI with animations
- ✅ SessionStorage caching
- ✅ Environment-based configuration

### Product Categories

- 🧼 **Jabones** (Soaps)
- 💧 **Desengrasantes** (Degreasers)
- 🦠 **Desinfectantes** (Disinfectants)
- ✨ **Limpiadores** (Cleaners)

## 🔧 Configuration

### Backend (.env)

```env
PORT=3000
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
```

### Frontend (.env)

```env
VITE_APP_NAME=QuimiPro
VITE_API_URL=http://localhost:3000/api
VITE_COMPANY_NAME=QuimiPro Solutions
VITE_CONTACT_EMAIL=contacto@quimipro.com
VITE_CONTACT_PHONE=+57 300 123 4567
```

## 📡 API Endpoints

### Products

- `GET /api/products` - Get all products
  - Query params: `?category=jabones&search=industrial`
- `GET /api/products/:id` - Get product by ID

### Categories

- `GET /api/categories` - Get all categories

## 🎨 Design System

The application uses a modern design system with:

- CSS custom properties for theming
- Vibrant color palette with gradients
- Smooth animations and transitions
- Glassmorphism effects
- Responsive grid layouts
- Mobile-first approach

## 🚀 Deployment

### Build for Production

**Backend:**

```bash
cd backend
npm run build
npm start
```

**Frontend:**

```bash
cd frontend
npm run build
npm run preview
```

## 📈 Future Enhancements

- [ ] Database integration (PostgreSQL/MongoDB)
- [ ] User authentication
- [ ] Shopping cart functionality
- [ ] Order management
- [ ] Admin panel
- [ ] Payment integration
- [ ] Email notifications
- [ ] Product reviews
- [ ] Inventory management

## 🔄 Scalability

This MVP is built with scalability in mind:

- **Microservices ready**: Backend can be split into services
- **Database migration**: Easy to add Prisma/TypeORM
- **State management**: Can add Redux/Zustand when needed
- **Docker ready**: Can containerize both services
- **Cloud deployment**: Ready for AWS/Azure/GCP

## 📝 License

MIT

## 👥 Contact

- Email: contacto@quimipro.com
- Phone: +57 300 123 4567
