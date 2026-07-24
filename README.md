# ❤️ PulseGuard AI

### **Predict. Prevent. Protect.**

> An AI-powered medication adherence and health risk prediction platform that helps patients take medicines on time, predicts potential health risks, and alerts caregivers during emergencies.

> 🚧 **Project Status:** Prototype (Not Deployed Yet)

---

## 📌 Problem Statement

Millions of patients miss their medications every year, leading to poor health outcomes, emergency hospitalizations, and increased healthcare costs.

Existing reminder apps only send notifications. If patients ignore them, no further action is taken.

PulseGuard AI solves this by combining medication reminders, AI-powered risk prediction, caregiver monitoring, and emergency alerts into one platform.

---

# ✨ Features

- 💊 Smart Medicine Reminders
- 🤖 AI-Based Health Risk Prediction
- 📊 Medication Adherence Tracking
- 🚨 Emergency SOS Alerts
- 👨‍👩‍👧 Caregiver Dashboard
- 🔐 Secure JWT Authentication
- 📈 Health Dashboard
- 📁 Secure Health Records

---

# 👥 Users

### 👤 Patient
- Manage medicines
- Receive reminders
- View health dashboard
- Check AI risk score
- Trigger SOS alerts

### 👨‍👩‍👧 Caregiver
- Monitor adherence
- Receive emergency alerts
- View patient health trends

### 👨‍⚕️ Doctor *(Future)*
- Review reports
- Monitor adherence
- Update prescriptions

---

# 🤖 AI Workflow

```text
Patient Data
      │
      ▼
Medicine Schedule
      │
      ▼
Adherence Tracking
      │
      ▼
Risk Prediction Engine
      │
      ▼
Risk Score
      │
      ▼
Emergency Alert
```

---

# 🏗️ System Architecture

```text
React Frontend
      │
      ▼
Express API
      │
      ▼
Authentication
      │
      ▼
MongoDB
      │
      ▼
AI Risk Engine
      │
      ▼
Emergency Alerts
```

---

# 🛠️ Tech Stack

### Frontend
- React
- TypeScript
- Vite
- Tailwind CSS
- React Router

### Backend
- Node.js
- Express.js
- JWT
- bcrypt

### Database
- MongoDB Atlas
- Mongoose

### Security
- Helmet
- Rate Limiter
- CORS
- Input Validation

### AI
- Rule-Based Risk Prediction Engine *(Prototype)*

---

# 📁 Project Structure

```text
PulseGuard-AI/
│
├── frontend/
│   ├── src/
│   ├── components/
│   ├── pages/
│   └── dashboard/
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── services/
│
└── README.md
```

---

# 🚀 Getting Started

## Clone Repository

```bash
git clone https://github.com/your-username/PulseGuard-AI.git
cd PulseGuard-AI
```

## Install Dependencies

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Backend

```bash
cd backend
npm install
npm start
```

---

# 🔒 Security

- JWT Authentication
- Password Hashing (bcrypt)
- Protected APIs
- Helmet
- Rate Limiting
- CORS

---

# 🔮 Future Scope

- 🧠 ML-Based Risk Prediction
- ⌚ Smartwatch Integration
- 💬 AI Health Assistant
- 📷 Medicine Image Recognition
- 🏥 Hospital Integration
- 🚑 Ambulance API
- 📈 ECG & BP Monitoring
- 📦 IoT Smart Pill Box

---

# 🎯 Vision

PulseGuard AI aims to transform medication management from simple reminders into intelligent, predictive healthcare assistance—helping patients stay healthy while enabling caregivers to intervene before emergencies occur.

---

## 📄 License

This project is developed for educational and hackathon purposes.
