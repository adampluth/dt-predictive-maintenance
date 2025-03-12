# DT Predictive Maintenance + Cybersecurity

A **Predictive Maintenance Digital Twin** designed to **simulate industrial processes, detect failures, and track cyber events**.

This is a **personal hobby project** and **not affiliated with my work at Idaho National Laboratory (INL)**.

Features real-time machine learning analysis, cybersecurity attack tracking, and a dynamic dashboard powered by:
- **FastAPI Backend** (API & WebSocket streaming) ✅ Implemented
- **Next.js Frontend (DaisyUI & TailwindCSS)** ✅ Implemented
- **PostgreSQL Database** (Sensor & Cybersecurity Data) ✅ Implemented
- **Machine Learning (Anomaly Detection + Forecasting)** ⚠️ In Progress
- **MITRE ATT&CK ICS Cyber Event Tracking** ⚠️ In Progress
- **Apache Kafka for Real-Time Cyber Events & ML Insights** ⏳ Planned (Phase 2)

---

## Project Goals

- **Digital Twin for Predictive Maintenance** – Simulates real-world industrial sensor data. ✅ Implemented
- **Cybersecurity Event Tracking** – Uses **MITRE ATT&CK ICS** to **detect cyber threats**. ⚠️ In Progress
- **FastAPI + WebSockets** – Manages real-time sensor & cyber event streaming. ✅ Implemented
- **PostgreSQL Database** – Stores sensor data & ML-based anomaly detection results. ✅ Implemented
- **Next.js Frontend (DaisyUI + TailwindCSS)** – Provides an interactive UI/UX for monitoring. ✅ Implemented
- **Real-Time Machine Learning** – Runs **Isolation Forest, Apache Prophet, & anomaly detection models** in Python. ⚠️ In Progress
- **Apache Kafka Integration** (🚀 Phase 2) – Will power real-time cyber attack processing. ⏳ Planned

---

## ⚠️ Project Status

- **Phase 1: MITRE ATT&CK + Cyber Event Simulation (Week 1-2)** ⚠️ In Progress
- **Phase 2: Apache Kafka for Real-Time Attack Streaming (Week 3-4)** ⏳ Planned

---

## 📂 Project Structure

```
/src
 ├── microservice  # Randomized sensor & cyber event data generator ✅ Implemented
 ├── backend       # FastAPI backend (APIs & WebSockets) ✅ Implemented
 ├── database      # PostgreSQL database setup ✅ Implemented
 ├── frontend      # Next.js app (DaisyUI + TailwindCSS) ✅ Implemented
 ├── notebook      # Jupyter Notebook for ML experiments ⚠️ In Progress
 ├── ml_analysis   # Anomaly detection & forecasting (Isolation Forest, Apache Prophet) ⚠️ In Progress
 ├── kafka_streams # Apache Kafka for real-time cyber event processing (Phase 2) ⏳ Planned
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
- ✅ **PostgreSQL Database**
- ✅ **FastAPI Backend** (port **8000**)
- ✅ **Next.js Frontend** (port **3000**)

After running, visit:
- **Frontend:** [http://localhost:3000](http://localhost:3000)
- **Backend API Docs:** [http://localhost:8000/docs](http://localhost:8000/docs)

---

## Development Mode (Live Updates Without Restarting)
If you want to work on files **without restarting containers**, use the following setup:

### **Run Backend in Dev Mode**
```sh
docker-compose up backend
```
- Backend will **auto-reload** on code changes (FastAPI `--reload` enabled).

### **Run Frontend in Dev Mode**
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

## Future Plans
- **Complete real-time ML anomaly detection & forecasting.** ⚠️ In Progress
- **Enhance Plotly.js visualizations for predictive insights.** ⏳ Planned
- **Simulate MITRE ATT&CK-based cyber attack scenarios.** ⚠️ In Progress
- **Optimize Next.js performance for interactive monitoring.** ⏳ Planned
- **Integrate Apache Kafka for real-time cyber attack streaming (Phase 2).** ⏳ Planned

