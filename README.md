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

## Installation & Setup

### Docker Setup
The project is fully **Dockerized**, and `docker-compose` manages all services.

### **1️⃣ Clone the Repository**
```sh
git clone https://github.com/adampluth/dt-predictive-maintenance.git
cd dt-predictive-maintenance
```

### **2️⃣ Run Everything with Docker**
```sh
docker-compose up --build
```
This starts:
✅ **PostgreSQL Database**
✅ **FastAPI Backend** (port **8000**)
✅ **Next.js Frontend** (port **3000**)

After running, visit:
- **Frontend:** [http://localhost:3000](http://localhost:3000)
- **Backend API Docs:** [http://localhost:8000/docs](http://localhost:8000/docs)

---

### **Development Mode** (Live Updates Without Restarting)
If you want to work on files **without restarting containers**, use the following setup:

#### **Run Backend in Dev Mode**
```sh
docker-compose up backend
```
- Backend will **auto-reload** on code changes (FastAPI `--reload` enabled).

#### **Run Frontend in Dev Mode**
```sh
docker-compose up frontend
```
- Next.js will **hot-reload** UI changes.
- You can still install new dependencies using:
  ```sh
  docker exec -it nextjs_frontend sh
  npm install some-package
  exit
  ```

---

### **Production Deployment**
To serve the project without development tools:
```sh
docker-compose -f docker-compose.yml up -d
```
This runs everything **in detached mode**, so it stays up in the background.

To stop the services:
```sh
docker-compose down
```

---

## Future Plans
- **Develop real-time ML anomaly detection.**
- **Enhance Plotly.js visualizations for better insights.**
- **Refine the data microservice for higher fidelity simulations.**
- **Optimize Next.js performance for interactive monitoring.**
- **Improve database performance for scalable data storage.**
