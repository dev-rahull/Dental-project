# 🦷 ENTNT Dental Center Management Dashboard

## 📌 Overview

**ENTNT Dental Center Management Dashboard** is a **frontend-only** dental clinic management system built using **React**, **TailwindCSS**, **React Router**, and **localStorage** to simulate data persistence and user interaction.

---

## 🎯 Objective

To simulate a basic dental clinic system where:

- **Admins (Dentists)** can manage patients and their dental incidents (appointments).
- **Patients** can view their appointment history and personal treatment information.

> **Note:** This project does not use any backend or external APIs. All data is stored and managed via `localStorage`.

---

## 🔐 User Authentication

- Login using email/password
- Hardcoded user data stored in `localStorage`
- Role-based routing and access (Admin vs. Patient)
- Session persistence using `localStorage`

---

## 🩺 Admin (Dentist) Features

- **Patient Management**
  - Add / View / Edit / Delete patients
  - Patient fields include:
    - Full Name
    - Date of Birth (DOB)
    - Contact Information
    - Health Info / Medical History

- **Appointment (Incident) Management**
  - Link appointments to patients
  - Manage treatment history

---

## 👨‍⚕️ Patient Features

Patients can log in and view **only their own data**, including:

- Personal profile
- Upcoming appointments
- Appointment history:
  - Treatment details
  - Cost breakdown
  - Attachments (if any)

---

## 🛠️ Tech Stack

- React
- TailwindCSS
- React Router
- localStorage (for simulated backend)

---

## 🚀 Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/your-repo-name.git
   cd your-repo-name

2. Install dependencies:

npm install

3. Run the development server:

npm start
