# 🏦 Simple Banking System

A simple banking system built using Node.js, Express, MySQL, and React following MVC architecture.  
Implements token-based authentication, customer and banker roles, and basic transaction features.

---
## 🔗 Live Links

Backend API: https://banking-system-5-varibles-changes.onrender.com

Frontend: https://banking-system-project-endpointe.vercel.app/

---

## 🚀 Tech Stack
Node, Express, Sequelize, MySQL
React, Axios  
bcryptjs, uuid, dotenv, cors, nodemon

## Deployments
>RENDER  (BACKEND)
>VERCEL  (FRONTEND)
>RAILWAY (SQL DATABASE)

---

## ✨ Features

### Customer
- Login with username/email and password  
- View all transactions  
- Deposit and withdraw using popup with balance check  
- Shows "Insufficient Funds" if withdrawal exceeds balance  

### Banker
- Separate login page  
- View all customers  
- View each customer's transaction history  

### Database
- Users table for bankers and customers  
- Accounts table for deposits and withdrawals  

---
<img width="1378" height="841" alt="Screenshot 2025-09-19 152639" src="https://github.com/user-attachments/assets/ce061485-6fc2-46b4-8005-09dd9708ef51" />
<img width="1884" height="772" alt="Screenshot 2025-09-19 152726" src="https://github.com/user-attachments/assets/7b9b5f30-79be-4910-9ec5-06d2e6b346a7" />
<img width="1864" height="863" alt="Screenshot 2025-09-19 152813" src="https://github.com/user-attachments/assets/db0ebd4f-0e07-468e-a6ad-1a604ef2cc98" />
<img width="1829" height="849" alt="Screenshot 2025-09-19 152841" src="https://github.com/user-attachments/assets/2e3e7854-36f7-4e4f-8010-8d3e209256bc" />




## ⚙️ Setup
```bash
git clone https://github.com/perryofficial/banking-system.git
cd banking-system

# Backend
cd backend
npm install
npm run dev

# Frontend
cd ../frontend
npm install
npm run dev
