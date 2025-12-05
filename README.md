🚀 Movie Store — Fullstack Web App

Movie Store adalah aplikasi web buat lihat list film, beli film (simulasi), ngatur user, dan lihat riwayat transaksi. Dibuat pakai React + Express + MySQL.

📌 Tech Stack

Frontend:

React + Vite

Tailwind CSS

Zustand (state management)

React Router DOM

Backend:

Node.js

Express

MySQL (mysql2 / mysql2/promise)

Zod

Database

MySQL dengan tabel:

users

movies

transactions

📁 Project Structure
movie-store/
├── frontend/               # Frontend (React)
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── context/
│   │   ├── lib/
|   |   ├── route/
|   |   ├── utils/
│   │   └── App.jsx
│   └── index.html
│
└── backend/               # Backend (Express)
    ├── controllers/
    ├── routes/
    ├── models/
    ├── config/
    ├── errors/
    ├── validations/
    ├── server.js
    └── package.json

⚙️ Instalasi Backend
cd server
npm install


Bikin file .env kalau perlu:

DB_HOST=localhost
DB_USER=root
DB_PASS=
DB_NAME=movie_store
PORT=1210
JWT_SECRET=your_secret_key


Jalankan server:

npm run dev

💾 Instalasi Frontend
cd client
npm install
npm run dev

🔌 API Endpoints
Auth
Method	Endpoint	Description
POST	/register	Register user baru
POST	/login	Login user
Movies
Method	Endpoint	Description
GET	/movies	Ambil semua film
POST	/movies	Tambah film
GET	/movies/:id	Detail film
Transactions
Method	Endpoint	Description
GET	/transactions/user/:id	Ambil riwayat transaksi user

Contoh response:

[
  {
    "id": 1,
    "userId": 4,
    "movieId": 2,
    "movieTitle": "Spider-Man",
    "poster_url": "...",
    "price": 30000,
    "createdAt": "2025-01-10"
  }
]

🖥️ Fitur Utama
✔ User

Register / Login

Dashboard user

Lihat detail user

Lihat riwayat transaksi

✔ Admin

Tambah film

Edit film

Hapus film

Dashboard admin

✔ Transaksi

Simulasi beli film

Simpan transaksi ke MySQL

Riwayat pembelian per user

🎨 UI / UX

Card film dengan poster

Layout dashboard modern

Scrollbar hidden (Tailwind v4 support)

📸 Screenshot (opsional)

<img width="1919" height="969" alt="Screenshot 2025-12-05 215958" src="https://github.com/user-attachments/assets/e55d0735-bdac-4683-a9d3-a14e6d05b27a" />

🤝 Kontribusi

Pull request welcome.
Issue juga boleh kalo mau nambah fitur baru.

📄 License

Bebas dipakai, asal jangan dijual ulang 😭.
