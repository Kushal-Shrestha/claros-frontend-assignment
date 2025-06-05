# FDA Analytics Dashboard

A responsive analytics dashboard built using **React**, **TypeScript**, **Redux Toolkit**, **Tailwind CSS**, and **Recharts**, visualizing real-time FDA drug recall data via the [openFDA API](https://open.fda.gov/).

🔗 **Live Demo**: [https://comfy-frangollo-335705.netlify.app](https://comfy-frangollo-335705.netlify.app)  
📂 **GitHub Repo**: [https://github.com/Kushal-Shrestha/claros-frontend-assignment](https://github.com/Kushal-Shrestha/claros-frontend-assignment.git)

---

## 🚀 Features

- 📊 Visual analytics with pie, bar, and line charts
- 🧠 Real-time drug recall insights via openFDA
- 🔍 Search recalls by product description or status
- 🎯 Clean and intuitive UI with a collapsible sidebar
- 📱 Fully responsive across devices
- 🧰 Global state handled with Redux Toolkit

---

## 📁 Project Structure

src/
├── components/
│ ├── drugs/
│ │ └── DrugComponent.tsx
│ ├── home/
│ │ └── HomePage.tsx
│ ├── info/
│ │ └── InfoPage.tsx
│ └── nav-bar/
│ └── SidebarLayout.tsx
├── redux/
│ ├── drugSlice.ts
│ └── store.ts
├── App.tsx
├── main.tsx
└── index.css

---

## 🛠️ Tech Stack

- **React + Vite**
- **TypeScript**
- **Redux Toolkit**
- **Tailwind CSS**
- **Recharts**
- **React Router DOM**
- **openFDA REST API**

---

## 📦 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Kushal-Shrestha/claros-frontend-assignment.git
cd claros-frontend-assignment
```

### 2. Install Dependencies

npm install

### 3. Run the App

npm run dev
