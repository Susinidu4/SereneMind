# 🌿 SereneMind – Mental Health Support Platform

SereneMind is a web-based mental health support platform that empowers individuals to manage their emotional well-being through personalized mood tracking, journaling, AI-powered self-care recommendations, and access to curated mental health resources.

---

## 🔍 Table of Contents

- [About the Project](#about-the-project)
- [Key Features](#key-features)
- [Novel Component](#novel-component)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Setup & Installation](#setup--installation)
- [Contributors](#contributors)
- [License](#license)

---

## 📖 About the Project

SereneMind is designed to help users understand, reflect on, and improve their mental health over time. It provides tools for logging mood, writing journal entries, tracking self-care activities, and exploring helpful mental health content. The system includes an AI-powered module that offers dynamic, personalized self-care suggestions based on user emotion patterns.

---

## 🚀 Key Features

- 🧐 **AI-Based Mood Tracking & Self-Care Recommendations**
  - Personalized activity suggestions based on mood logs
- ✍️ **Mood Journaling**
  - Write, edit, and reflect on personal journal entries
- 😊 **Mood Tracking**
  - Log daily moods (morning, afternoon, evening) and view trends over time
- 💆 **Self-Care Activity Tracking**
  - Track self-care habits like meditation, therapy, and exercise
- 📚 **Mental Health Resource Library**
  - Browse and rate articles, videos, and wellness exercises
- 🔐 **User Authentication & Profiles**
  - Secure login, profile management, and role-based access (user/admin)
- 📊 **Admin Insights Dashboard**
  - Analytics on user trends and resource engagement
- 🤝 **Socially Adaptive AI (Novel Feature)**
  - Peer matching, emotional support circles, and group journaling sessions

---

## 🌟 Novel Component

> **Socially Adaptive AI for Collaborative Self-Care**

This feature connects users with similar emotional journeys, enabling group-based challenges, support circles, and AI-moderated conversations — a community-driven mental health experience not commonly found in existing apps.

---

## 🧰 Tech Stack

| Technology                 | Role                                              |
| -------------------------- | ------------------------------------------------- |
| **React.js**               | Frontend UI                                       |
| **Node.js + Express**      | Backend REST APIs                                 |
| **MongoDB**                | Database                                          |
| **JWT**                    | Authentication                                    |
| **Chart.js / Recharts**    | Mood & activity visualizations                    |
| **Trello**                 | Project Management                                |
| **Git + GitHub**           | Version Control                                   |

---

## 🗂 Project Structure (Simplified)

```
serenemind/
├── client/                 # React frontend
│   ├── src/components/
│   ├── src/pages/
│   └── src/App.js
├── server/                 # Node + Express backend
│   ├── controllers/
│   ├── routes/
│   └── app.js
├── ml-service/             # AI-based recommendation service
│   └── mood_predictor.py
├── README.md
└── package.json
```

---

## ⚙️ Setup & Installation

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/serenemind.git
cd serenemind
```

### 2. Set Up Backend

```bash
cd server
npm install
npm run dev
```

### 3. Set Up Frontend

```bash
cd client
npm install
npm start
```

### 4. (Optional) Run ML Microservice

```bash
cd ml-service
pip install -r requirements.txt
python mood_predictor.py
```

---

## 👥 Contributors

| Name      | Role                                 |
|-----------|--------------------------------------|
| Ishara    | Project Manager, Resource Management |
| Oshini    | Self-Care Tracking, UI/UX            |
| Susinidu  | Mood Journal Management, Auth        |
| Yasindu   | AI-Based Mood Tracking, Auth         |

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

Special thanks to SLIIT and the IT3040 – IT Project Management Module for guidance and support.

