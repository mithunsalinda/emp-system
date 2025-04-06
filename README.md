# Project Name

A modern web application built with [React](https://reactjs.org/), [Vite](https://vitejs.dev/), and [TypeScript](https://www.typescriptlang.org/).

## 🚀 Features

- Fast bundling with Vite
- Type-safe code with TypeScript
- Styled with Antd , highcharts, ag-grid-react
- State management with [Redux Toolkit With RTQ Query]
- Ready for production build

---

## 🛠️ Installation & Setup

Follow the steps below to get the project up and running locally.

### 1. Clone the repository

```bash
git clone https://github.com/mithunsalinda/emp-system.git
cd emp-system
npm install
npm run dev

### 2.  Folder Structure
src/
├── _tests_/  
├── assets/       # Static assets
├── components/   # Reusable UI components
├── pages/        # Route-level pages
├── hooks/        # Custom React hooks
├── store/        # State management
├── types/        # TypeScript type definitions
├── App.tsx       # Root component
└── main.tsx      # App entry point

## ✅ Assumptions

- JSON Server is hosted via Glitch and used as the mock backend.
- Login credentials are hardcoded in db.json and basic login is implemented.
- Pagination is handled entirely on the frontend.
- Focus is on form validation, clean structure, and scalability.
- The project simulates a scalable environment and could be easily swapped to use real APIs.

## 💻 Live Backend API

> JSON Server is hosted here:  
**https://your-glitch-project.glitch.me**

All API calls are made to this URL from the frontend.  
Example:  
`GET https://your-glitch-project.glitch.me/test?_page=1&_limit=10`

---

## 🔐 Login Info

The login system is basic and for demo purposes only. Credentials are stored inside the `db.json`.

### Sample Credentials

```json
{
  "users": [
    {
      "id": 1,
      "username": "admin@xxxxxxx",
      "password": "xxxxx"
    }
  ]
}