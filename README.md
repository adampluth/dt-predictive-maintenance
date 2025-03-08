# DT Predictive Maintenance

A **predictive maintenance digital twin** currently in development. This is a **personal hobby project** and is **not affiliated with or part of my work at Idaho National Laboratory (INL)**. The project will integrate a **randomized data microservice, a Next.js frontend, a FastAPI backend, a PostgreSQL database, a Jupyter Notebook, and real-time ML analysis** using Plotly.js.

## Project Goals
- **Digital Twin for Predictive Maintenance** – Simulates real-world industrial processes.
- **Randomized Data Microservice** – Generates synthetic sensor data for testing.
- **FastAPI Backend** – Handles API requests and data processing.
- **PostgreSQL Database** – Stores sensor data and machine learning insights.
- **Interactive Next.js Frontend** – Built with **DaisyUI and TailwindCSS** for modern UI/UX.
- **Jupyter Notebook Integration** – For data exploration and model development.
- **Dynamic Machine Learning Analysis** – Uses Plotly.js for on-the-fly analytics.

---

## ⚠️ Project Status
- This project is **20% complete** and actively being developed.
- The current focus is on setting up the **data microservice, backend, and visualization components**.

---

## Project Structure (Planned)
```
/src
 ├── microservice  # Randomized data generator
 ├── backend       # FastAPI backend
 ├── database      # PostgreSQL database setup
 ├── frontend      # Next.js app (DaisyUI + TailwindCSS)
 ├── notebook      # Jupyter Notebook for ML experiments
 ├── ml_analysis   # On-the-fly analytics using Plotly.js
```

---

## Installation & Setup (Planned)

### 🐳 Docker Setup (Future)
A Docker setup will be introduced to simplify deployment. A `docker-compose.yml` file will be added to orchestrate the FastAPI backend, PostgreSQL database, and microservices. Stay tuned for updates!

### 1️⃣ Clone the Repository

```sh
git clone https://github.com/adampluth/dt-predictive-maintenance.git
cd dt-predictive-maintenance
```

### 2️⃣ Set Up Virtual Environment
```sh
python -m venv venv
source venv/bin/activate  # macOS/Linux
venv\Scripts\activate    # Windows
```

### 3️⃣ Install Backend Dependencies
```sh
pip install -r requirements.txt
```

### 4️⃣ Run the FastAPI Backend (Planned)
```sh
cd backend
uvicorn main:app --reload
```

### 5️⃣ Set Up PostgreSQL Database (Planned)
Ensure PostgreSQL is installed and running. Create the necessary database:
```sh
psql -U your_user -d your_database -f database/schema.sql
```

### 6️⃣ Run the Microservice (Planned)
```sh
python microservice/main.py
```

### 7️⃣ Install Frontend Dependencies
```sh
cd frontend
npm install
```

### 8️⃣ Run the Next.js Frontend (Planned)
```sh
npm run dev
```

---

## Future Plans
- **Introduce Docker for simplified deployment.**
- **Develop real-time ML anomaly detection.**
- **Enhance Plotly.js visualizations for better insights.**
- **Refine the data microservice for higher fidelity simulations.**
- **Optimize Next.js performance for interactive monitoring.**
- **Improve database performance for scalable data storage.**
