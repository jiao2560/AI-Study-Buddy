
# 🧠 AI Study Buddy

**Smarter studying starts here.**  
This app helps users explore trending topics and get AI-suggested study material. Users can sign up, browse topics, and customize their study dashboard.

---

## 📦 Tech Stack

- **Frontend**: React + Vite
- **Routing**: React Router DOM
- **Backend**: Express + MongoDB *(coming soon)*
- **Styling**: Custom CSS (responsive, modern UI)
- **API Calls**: Axios

---

## 🚀 Getting Started

> Make sure you have `Node.js` and `npm` installed.

### 1️⃣ Clone the repository

```bash
git clone https://github.com/jiao2560/AI-Study-Buddy
cd AI-Study-Buddy
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Run the development server

```bash
npm run dev
```

> The app will be available at [http://localhost:5173](http://localhost:5173)

---

## 🔑 Environment Variables

Create a `.env` file in the root directory with:

```env
VITE_API_BASE_URL=http://localhost:5000  # Replace with your backend URL
```

---

## 📁 Project Structure

```
├── public/
├── src/
│   ├── assets/              # Images and static files
│   ├── components/          # Reusable UI components (e.g., NavBar)
│   ├── pages/               # Pages like Home and Signup
│   │   ├── homepage.jsx
│   │   ├── signup.jsx
│   │   ├── homepage.css
│   │   └── signup.css
│   ├── services/            # Axios API functions
│   ├── App.jsx              # Routes and layout
│   └── main.jsx             # Entry point
├── .env
├── package.json
├── README.md
```

---

## ✨ Features

- 🔍 **Trending Wikipedia Topics**
- 🤖 **AI Suggested Study Topics**
- 🎛️ **Filter & Sorting Options**
- 🧭 **Navigation Bar**
- 📝 **Signup Form with Validation**
- 📱 **Responsive Layout**

---

## 🛠️ Future Work

- [ ] User authentication and login
- [ ] MongoDB integration for user profiles
- [ ] Personalized study dashboard
- [ ] Admin panel for managing suggestions

---

## 🙌 Contribution

1. Fork the repo
2. Create your feature branch (`git checkout -b feature/signup`)
3. Commit your changes (`git commit -m 'Add signup page'`)
4. Push to the branch (`git push origin feature/signup`)
5. Create a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

> Feel free to submit issues or suggestions to improve the platform. Happy studying! 🎓
