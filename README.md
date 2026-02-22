# 💰 Expense Diary – Full Stack Budget & Expense Tracker

A full-stack Expense & Budget Management Application built with the MERN stack.

Users can create budgets, track expenses per budget, visualize financial growth, and manage transactions securely with JWT-based authentication using HTTP-only cookies.

---

## 🚀 Live Features

- 🔐 JWT Authentication (HTTP-only cookies)
- 👤 User Registration & Login
- 📊 Dashboard with Charts (Bar + Pie)
- 📁 Create & Manage Budgets
- 💸 Add Expenses Inside Budgets
- 📈 Auto Budget Calculation (Spent + Remaining)
- 🗑 Delete Expenses & Budgets
- 📅 Monthly Filtering
- 📱 Fully Responsive UI
- 🍪 Secure Cookie-based Auth
- 🔒 Protected Routes

---

## 🏗 Tech Stack

### Frontend
- React (TypeScript)
- Context API (Global State)
- Axios
- Tailwind CSS
- Recharts (Data Visualization)
- React Router

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (jsonwebtoken)
- bcryptjs
- Cookie-parser
- CORS

---

## 📂 Project Structure

```
root/
│
├── Backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── server.js
│
├── Frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── Context/
│   │   └── utils/
│   └── vite.config.ts
```

---

## 🔐 Authentication Flow

1. User logs in
2. Backend generates JWT
3. JWT stored in HTTP-only cookie
4. Frontend calls `/auth/me`
5. Backend verifies cookie
6. User session restored on reload

Backend is the **source of truth**.

---

## 📊 Data Flow Architecture

- Backend stores all budgets & expenses in MongoDB
- On app load:
  - `/auth/me`
  - `/budgets`
  - `/expenses`
- React Context stores fetched data
- State updates after CRUD operations

---

## 🧠 Core Models

### User Model
```js
{
  username: String,
  email: String,
  password: String
}
```

### Budget Model
```js
{
  user: ObjectId,
  category: String,
  month: String,
  amount: Number,
  spent: Number,
  ExpenseItems: Number,
  emoji: String
}
```

### Expense Model
```js
{
  user: ObjectId,
  budgetId: ObjectId,
  name: String,
  amount: Number,
  month: String,
  category: String
}
```

---

## 📡 API Endpoints

### 🔐 Auth Routes
| Method | Route | Description |
|--------|-------|------------|
| POST | `/api/auth/register` | Register User |
| POST | `/api/auth/login` | Login User |
| GET  | `/api/auth/me` | Get Current User |
| POST | `/api/auth/logout` | Logout |

---

### 💰 Budget Routes
| Method | Route | Description |
|--------|-------|------------|
| GET | `/api/budgets` | Get All Budgets |
| POST | `/api/budgets` | Create Budget |
| DELETE | `/api/budgets/:id` | Delete Budget |

---

### 💸 Expense Routes
| Method | Route | Description |
|--------|-------|------------|
| GET | `/api/expenses` | Get All Expenses |
| POST | `/api/expenses` | Create Expense |
| DELETE | `/api/expenses/:id` | Delete Expense |

---

## ⚙️ Environment Variables

Create a `.env` file inside Backend:

```
PORT=3000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
NODE_ENV=development
```

---

## 🛠 Installation & Setup

### 1️⃣ Clone Repository

```
git clone https://github.com/yourusername/expense-diary.git
cd expense-diary
```

---

### 2️⃣ Backend Setup

```
cd Backend
npm install
npm run dev
```

Runs on:
```
http://localhost:3000
```

---

### 3️⃣ Frontend Setup

```
cd Frontend
npm install
npm run dev
```

Runs on:
```
http://localhost:5173
```

---

## 🔄 State Management

Global state handled via React Context:

```ts
{
  user: UserType | null,
  isAuthenticated: boolean,
  budgets: BudgetData[],
  expenses: ExpenseData[]
}
```

---

## 📈 Dashboard Analytics

- Total Budget
- Total Expenses
- Savings
- Growth Rate
- Monthly Comparison
- Category Breakdown

Powered by Recharts.

---

## 🔒 Security Practices

- Password hashing with bcrypt
- JWT stored in HTTP-only cookies
- CORS configured with credentials
- Protected routes middleware
- Backend ownership validation
- MongoDB relational cleanup (delete expenses when budget deleted)

---

## 🎯 Future Improvements

- Edit Budget / Expense
- Pagination
- Export to CSV
- Dark Mode
- Role-based access
- Deployment (Render / Vercel)

---

## 📌 Why This Project?

This project demonstrates:

- Full-stack architecture
- Authentication with cookies
- REST API design
- Relational MongoDB modeling
- State management
- Data visualization
- Production-level structure

---

## 👨‍💻 Author

Utkarsh Barnwal  
Full Stack Developer

---

## ⭐ If you like this project

Give it a star on GitHub ⭐
