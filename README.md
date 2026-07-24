# ❤️ PulseGuard AI

### **Predict. Prevent. Protect.**

> An AI-powered medication adherence, health risk prediction, and decentralized medical record platform that helps patients take medicines on time, predicts potential health risks, and alerts caregivers during emergencies.
>
> 🚧 **Project Status:** Prototype (Not Deployed Yet)

---

## 📌 Problem Statement

Millions of patients miss their medications every year, leading to poor health outcomes, emergency hospitalizations, and increased healthcare costs.

Existing reminder apps only send notifications. If patients ignore them, no further action is taken, and medical history is often stored in siloed, centralized databases.

PulseGuard AI solves this by combining medication reminders, AI-powered risk prediction, caregiver monitoring, emergency alerts, and **blockchain-secured decentralized health records** into one comprehensive platform.

---

## ✨ Features

- 💊 **Smart Medicine Reminders**: Never miss a dose with automated alerts.
- 🤖 **AI-Based Health Risk Prediction**: Predicts potential risks based on adherence and health data.
- 📊 **Medication Adherence Tracking**: Monitor and improve medicine intake habits.
- 🚨 **Emergency SOS Alerts**: Instantly notify caregivers and emergency contacts.
- 👨‍👩‍👧 **Caregiver Dashboard**: Allows family members to monitor the patient's health in real-time.
- 🔐 **Secure JWT Authentication**: Role-based access control for patients and caregivers.
- 📈 **Health Dashboard**: A unified view of patient health metrics.
- ⛓️ **Decentralized Health Records**: Immutable, transparent, and secure storage of medical records, risk scores, and prescriptions on the **Polygon Amoy** blockchain.

---

## 👥 Users

### 👤 Patient
- Manage medicines
- Receive reminders
- View health dashboard
- Check AI risk score
- Trigger SOS alerts
- Own their decentralized medical history

### 👨‍👩‍👧 Caregiver
- Monitor adherence
- Receive emergency alerts
- View patient health trends

### 👨‍⚕️ Doctor *(Future)*
- Review decentralized reports
- Monitor adherence
- Update prescriptions on-chain

---

## 🤖 AI & Blockchain Workflow

```text
Patient Data ───► Medicine Schedule ───► Adherence Tracking
                                              │
                                              ▼
Polygon Amoy ◄─── Smart Contract ◄─── Risk Prediction Engine
(Decentralized    (Stores scores &            │
 Storage)          history)                   ▼
                                         Risk Score
                                              │
                                              ▼
                                       Emergency Alert
```

---

## 🏗️ System Architecture

```text
React Frontend (Vite, TailwindCSS)
      │
      ▼
Express API (Node.js)
      │
      ├──► Authentication (JWT, bcrypt)
      │
      ├──► MongoDB (Off-chain user & schedule data)
      │
      └──► Polygon Amoy (On-chain Medical Records via Solidity)
```

---

## 🛠️ Tech Stack

### Frontend
- React 19
- TypeScript
- Vite
- Tailwind CSS 4
- React Router
- Ethers.js (Web3 Integration)
- Lucide React (Icons)

### Backend
- Node.js
- Express.js
- JWT & bcrypt
- Twilio & Nodemailer (Alerts/Notifications)
- Winston (Logging)

### Database & Storage
- MongoDB Atlas & Mongoose

### Smart Contracts (Web3)
- Solidity (^0.8.20)
- Polygon Amoy Testnet

### Security
- Helmet
- Rate Limiter
- CORS
- Input Validation

---

## 📁 Project Structure

```text
PulseGuard-AI/
│
├── frontend/          # React + Vite frontend application
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/           # Node.js + Express backend API
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── services/
│   └── package.json
│
├── contracts/         # Solidity smart contracts for decentralized records
│   ├── PulseGuardHealthRecord.sol
│   ├── abi/
│   └── scripts/
│
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (>= 18.0.0)
- MongoDB URI
- MetaMask (or other Web3 wallet) for Polygon Amoy
- Twilio Account (for SMS alerts)

### Clone Repository

```bash
git clone https://github.com/sapnajha757/pulseguard-ai.git
cd pulseguard-ai
```

### 1. Setup Backend

```bash
cd backend
npm install

# Create a .env file based on .env.example
cp .env.example .env

npm run dev
```

### 2. Setup Frontend

```bash
cd ../frontend
npm install
npm run dev
```

### 3. Smart Contracts (Optional - if developing/deploying locally)

```bash
cd ../contracts
# Deploy scripts are located in contracts/scripts
```

---

## 🔒 Security

- JWT Authentication
- Password Hashing (bcrypt)
- Protected APIs
- Helmet, Rate Limiting, CORS
- Immutable Web3 Records

---

## 🔮 Future Scope

- 🧠 ML-Based Risk Prediction
- ⌚ Smartwatch Integration
- 💬 AI Health Assistant
- 📷 Medicine Image Recognition
- 🏥 Hospital Integration
- 🚑 Ambulance API
- 📈 ECG & BP Monitoring
- 📦 IoT Smart Pill Box

---

## 🎯 Vision

PulseGuard AI aims to transform medication management from simple reminders into intelligent, predictive healthcare assistance—helping patients stay healthy, securing their medical history on the blockchain, and enabling caregivers to intervene before emergencies occur.

---

## 📄 License

This project is developed for educational and hackathon purposes.
