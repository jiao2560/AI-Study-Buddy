
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

Wenbo Jiao:
Absolutely! Here's a polished and professional **"My Contribution"** section for your `README.md` based on what you’ve implemented:

---

## 👨‍💻 My Contribution(Wenbo Jiao)
codewalk video: https://youtu.be/8BzVmgmIMpQ

As part of the development team for AI Study Buddy, I implemented several frontend and backend features to enhance functionality, user experience, and visual design:

### ✅ Frontend (React)
- Homepage Layout: Built a responsive and dynamic homepage using React and modular CSS, serving as the central hub for AI-suggested and Wikipedia trending topics.
- **Search, Filter & Sorting UI**: Implemented user-friendly controls to:
  - Search topics using keywords
  - Filter results by required keywords
  - Sort Wikipedia results by alphabetical order or snippet richness
- **Filter Toggle System**: Designed a collapsible filter panel with smooth UX and clean default UI state.
- **Login/Signup UI Buttons**: Added styled, static Login and Signup buttons in the top-right corner for future authentication integration.
- **Animated AI Bot Character**:
  - Positioned an AI Study Bot image in the bottom-right of the screen
  - Applied custom CSS keyframe animations for a floating/bouncing/dancing effect
  - Ensured non-intrusive and playful UI enhancement
- **Dark Text Contrast Fix**: Improved accessibility by fixing font visibility issues on gradient backgrounds.
- **Layout Optimizations**: Refactored CSS layout to prevent wrapping issues and support a full-width background.

### ✅ Backend (Node.js + Express)
- **Integrated Wikipedia API**: Configured backend to fetch trending topics using the Wikipedia search API with custom search parameters.
- **Gemini AI Integration**:
  - Made a secure POST request to Google’s Gemini API
  - Parsed and cleaned Gemini AI-generated suggestions for frontend display
- **Query Parameter Support**: Enhanced the API to accept `search` and `keyword` query params to support real-time search and filtering from the frontend.

### 📸 Screenshots
![image](https://github.com/user-attachments/assets/b0dcc169-6d2f-4262-915a-3ebb930a648e)
![image](https://github.com/user-attachments/assets/3739503d-a1a6-43d5-b88c-2194aba14602)
![image](https://github.com/user-attachments/assets/118581b8-4a73-44ac-bdc4-1254d027e0d5)
![image](https://github.com/user-attachments/assets/3dcb0563-932f-43f5-937a-4599635d9f1f)
![image](https://github.com/user-attachments/assets/66b49058-f1a2-4840-8259-387bb3ba7930)






---


---

## 📄 License

This project is licensed under the MIT License.

---

> Feel free to submit issues or suggestions to improve the platform. Happy studying! 🎓
