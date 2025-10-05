# 🎭 Theatre Booking System

A full-stack web application for managing theatre shows, seats, and bookings.  
Built with **Angular** (frontend) and **Laravel** (backend) using **RESTful APIs** and **Sanctum authentication**.

---

## 🚀 Features

### 👥 Users

- Register, log in, and view available shows.
- Book seats and add optional add-ons (e.g., food packages).
- View and cancel existing bookings.

### 🧑‍💼 Admin Panel

- Manage theatres (create, edit, delete).
- Manage shows (add, schedule, update, remove).
- Manage seats (create seats in bulk per theatre).
- Manage add-ons (create and edit food/beverage options).

### ⚙️ System

- Secure API authentication with **Laravel Sanctum**.
- Backend validation and automatic total-cost calculation.
- Responsive and modern Angular UI.

---

## 🏗️ Tech Stack

| Layer          | Technology                        |
| -------------- | --------------------------------- |
| Frontend       | Angular 20, TypeScript, Bootstrap |
| Backend        | Laravel 12 (PHP 8+)               |
| Database       | MySQL                             |
| Authentication | Laravel Sanctum                   |
| API            | RESTful JSON                      |
| Dev Tools      | Composer, NPM, Git, VS Code       |

---

## 📂 Project Structure

root/
├── backend/ # Laravel API
│ ├── app/
│ ├── routes/api.php
│ ├── .env
│ └── ...
├── frontend/ # Angular app
│ ├── src/app/
│ ├── package.json
│ └── ...
└── README.md

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/SohaTalaat/Theater-Booking-System.git
cd theatre-booking-system
```

### 2️⃣ Backend (Laravel)

```bash
cd backend
cp .env.example .env
composer install
php artisan key:generate
php artisan migrate --seed
php artisan serve
```

The backend runs at http://localhost:8000

### 3️⃣ Frontend (Angular)

```bash
cd backend
cp .env.example .env
composer install
php artisan key:generate
php artisan migrate --seed
php artisan serve
```

The frontend runs at http://localhost:4200

## 🧠 Key Entities

| Entity   | Description                                                |
| -------- | ---------------------------------------------------------- |
| Users    | Handles authentication and roles (user/admin).             |
| Theatres | Represents theatre halls and their locations.              |
| Shows    | Linked to theatres, includes title, time, duration, price. |
| Seats    | Associated with theatres, available or booked.             |
| Add-ons  | Optional items (food/beverages) per booking.               |
| Bookings | Links users to shows, seats, and add-ons with total cost.  |

## 🧩 API Overview

| Method               | Endpoint            | Description |
| -------------------- | ------------------- | ----------- |
| `POST /api/register` | Register user       |             |
| `POST /api/login`    | Login user          |             |
| `GET /api/theaters`  | List theatres       |             |
| `POST /api/shows`    | Create show (Admin) |             |
| `POST /api/bookings` | Create booking      |             |
| `GET /api/bookings`  | List user bookings  |             |
| `POST /api/logout`   | Logout user         |             |

### 🧪 Admin Credentials (Seeder)

Email: soha@admin.com
Password: password

## 🧑‍💻 Authors

- Soha Talaat — Full-stack Developer (ITI Student)

- Abdelrahman Ramadan — Full-stack Developer (ITI Student)
