# Digital Wallet System - Frontend

A **secure, responsive, and role-based digital wallet frontend** built with **React, Redux & Typescript.**
It provides tailored dashboards for **Users, Agents, and Admins**, enabling seamless financial operations like deposits, withdrawals, transfers, and transaction management.

---

## Features

### Public Section
- **Home Page** - Responsive landing page with navigation, hero banner, CTA buttons, footer, and smooth transitions.
- **About, Features, Pricing, FAQ, Contact Pages** - Informative sections with professional UI.
- **Authentication** - Role based login/registration (User/Agent), JWT authentication, persisted login state, and logout.

### User Dashboard
- Wallet overview with balance and recent transactions.
- Add, Withdraw, Send and Cashout Money.
- Transaction history with pagination & filtering.
- Profile Management (update details, change password).

### Agent Dashboard
- Wallet overview with balance and recent transactions.
- Cash In money to "USER" role users.
- Agent transaction list with pagination & filtering.
- Profile Management (update details, change password).

### Admin Dashboard
- Overview of last 7 days statistics using cards & charts.
- Manage users and agents and their wallets.
- View all transactions.
- All listing page with pagination & filtering.
- Profile Management.

### General Features
- Role-based navigation menu.
- Form validations
- Handling loadings & errors.
- **Toast notifications** for feedbacks and alerts.
- **Guided Tour** for onboarding using driver.js.
- Responsive dark/light theme with clean typography and accessible color palette.
- Performance optimized using lazy loading and skeleton loaders.


## Tech Stack
- React.js
- Redux Toolkit + RTK Query
- TypeScript
- Tailwind CSS

## Installation & Setup

### Clone Repository
```bash
  git clone https://github.com/margubmurshed/digital-wallet-system-client.git
  cd digital-wallet-system-client
```
### Install Dependencies
```bash
  npm install --force
```

### Environment Variables
Create a .env file in the root with the following:
```env
  VITE_BASE_URL=http://localhost:5000/api/v1
```

### Run Development Server
```bash
  npm run dev
```
The app will be available at:
http://localhost:5173

---

## Folder Structure

```Digital Wallet System/
- src
- -- components/
- -- assets/
- -- config/
- -- constants/
- -- contexts/
- -- providers/
- -- hooks/
- -- lib/
- -- pages/
- -- redux/
- -- routes/
- -- types/
- -- utils/
- -- main.tsx
```
---

**Live URL:** [https://margub-digital-wallet.vercel.app/](https://margub-digital-wallet.vercel.app/)
**Backend Github:** [https://github.com/margubmurshed/digital-wallet-system/](https://github.com/margubmurshed/digital-wallet-system/)

---

## Developer
**Name:** Margub Murshed

**Role:** Full Stack Developer

**Location:** Dhaka, Bangladesh

**Contact:**
- **Email:** murshedmargub@gmail.com
- **LinkedIn:** [linkedin.com/in/margubmurshed](https://linkedin.com/in/margubmurshed)
- **Facebook:** [facebook.com/margub32](https://facebook.com/margub32)