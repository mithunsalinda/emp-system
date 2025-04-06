# EMP System - 👉 **[DEMO (Click to View)](https://mithunsalinda.github.io/emp-system/)**

A modern web application built with [React](https://reactjs.org/), [Vite](https://vitejs.dev/), and [TypeScript](https://www.typescriptlang.org/).

## 🚀 Features

- Fast bundling with Vite
- Type-safe code with TypeScript
- Styled with Antd , highcharts, ag-grid-react
- State management with [Redux Toolkit With RTQ Query]
- Ready for production build
- Unit Test using vitest.

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
```
## ✅ Assumptions

- JSON Server is hosted via Glitch and used as the mock backend.
- Login credentials are hardcoded in db.json and basic login is implemented.
- Pagination is handled entirely on the frontend.
- Focus is on form validation, clean structure, and scalability.
- The project simulates a scalable environment and could be easily swapped to use real APIs.

## Extra Feature
- Scalable login machanism with protect routs
- Dashboard with custom widgets
- Seperate card view for mobile device.
- User can add the profile picture.

## 🧾 User Stories & Acceptance Criteria
  ### 📝 User Story 1: View Employee List
- Table with: First Name, Last Name, Email, Phone, Gender
- Actions: Edit & Delete buttons on each row
- Add Employee button navigates to add form

### ➕ User Story 2: Add Employee
- Add PRofile Picture used base64 to store in the db.json
- First Name (6–10 characters)
- Last Name (6–10 characters)
- Email (valid format)
- Phone (valid SG number)
- Gender (radio group)
- DOB Date (must be ≥18 years old)
- Validations with real-time feedback
- Highlights errors with red border and message

### ✏️ User Story 3: Edit Employee
- Edit button navigates to prefilled form
- Same validation rules as add
- Unsaved changes trigger warning modal I used a JavaScript modal to do that. There is an issue when I try to integrate it with the Ant Design modal. For the time being, I'm using it as is and need some time to sort it out.

### 🗑️ User Story 4: Delete Employee
- Confirmation modal on delete
- Record is removed and table is refreshed

⚠️ Error Handling
- API errors (add/edit/delete) are gracefully handled with user-friendly error messages. in api-common.ts i have added Server error messages.


## 💻 Live Backend API

> JSON Server is hosted here:  
**https://glitch.com/edit/#!/silky-wakeful-fifth?path=README.md%3A1%3A0**

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