# 🌍 BookIt — Experiences & Slots

A **full-stack travel booking application** where users can explore exciting travel experiences, view available slots, and make seamless bookings — all within an elegant and responsive interface.

Hosted on **[Vercel](https://vercel.com)** 🚀  

---

## 📸 Preview

> A beautifully designed booking platform built with **Next.js**, **TypeScript**, and **Tailwind CSS**, featuring a complete booking flow — from exploring experiences to confirmation.

---

## 🧩 Features

### 🖥️ Frontend
- Built with **Next.js 14 + TypeScript**
- Styled using **Tailwind CSS** for a clean, responsive UI
- Fully responsive across **desktop and mobile**
- Smooth user journey:
  - 🏠 Home Page — Explore travel experiences  
  - 📄 Details Page — View details and available slots  
  - 💳 Checkout Page — Enter details, apply promo code, and confirm booking  
  - ✅ Confirmation Page — Display success or failure message
- Form validation for name, email, and promo code
- API data fetching using **Axios/Fetch**
- State managed with **React Hooks**

---

### ⚙️ Backend
- Powered by **Next.js API Routes (Node.js + Express-like environment)**
- Integrated with **MongoDB** for storing experiences, slots, and bookings
- API Endpoints:
  - `GET /api/experience` → Fetch all experiences  
  - `GET /api/experience/[id]` → Fetch single experience details  
  - `POST /api/booking` → Create new booking  
  - `POST /api/promo/validate` → Validate promo codes  
- Prevents **double-booking** for same slot  
- Handles all **validation and error states** gracefully  

---

## 🔄 Integration Flow

The complete flow:
Home → Details → Checkout → Confirmation

yaml
Copy code
Data dynamically fetched and stored:
- Experiences and slots from database  
- Booking confirmation stored and displayed  

---

## 🧰 Tech Stack

| Category | Technology |
|-----------|-------------|
| **Frontend** | Next.js 14, TypeScript, Tailwind CSS |
| **Backend** | Node.js (Next.js API routes) |
| **Database** | PostgreSql |
| **Deployment** | Vercel |
| **Version Control** | Git + GitHub |

---

## 🚀 Installation & Setup


### 1️⃣ Clone the Repository
```bash
git clone https://github.com/yourusername/bookit.git
cd bookit
```
2️⃣ Install Dependencies

    bash
    Copy code
    npm install

``

3️⃣ Setup Environment Variables

    Create a .env file in the root directory:
    
    env
    Copy code
    DATABASE_URL=your_postgress_db_url
  

4️⃣ Run the Project

    bash
    Copy code
    npm run dev
    Your app will be live at 👉 http://localhost:3000

🌐 Deployment

    The project is hosted live on Vercel for seamless performance and zero-config deployment.
    🔗 Live Link: [https://bookit.vercel.app](https://hd-qfiq.vercel.app/)

🧮 Folder Structure

    bash
    Copy code
    .
    ├── app/
    │   ├── api/
    │   │   ├── booking/
    │   │   │   └── route.js
    │   │   ├── experience/
    │   │   │   ├── [id]/route.js
    │   │   │   └── route.js
    │   │   └── slot/[id]/route.js
    │   ├── checkout/page.js
    │   ├── confirmation/[id]/page.js
    │   ├── Details/[id]/page.js
    │   ├── _not-found/page.js
    │   └── layout.js
    ├── package.json
    ├── tailwind.config.js
    ├── tsconfig.json
    ├── .env
    └── README.md

🎨 Design Reference

    The UI closely follows the provided Figma Design for accurate responsiveness, color palette, and spacing.



🧑‍💻 Developer
Developed by:Paras Krishali
Role: Fullstack Developer Intern
Email: paraskrishali15@gmail.com


🏁 Conclusion
This project demonstrates an end-to-end full-stack booking system, showcasing:

API integration

Database management

Clean and responsive UI/UX

Real-world workflow from data fetching to confirmation

Deployed with ❤️ on Vercel.

yaml
Copy code

