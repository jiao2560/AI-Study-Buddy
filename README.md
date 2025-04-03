
# 🧠 AI Study Buddy

**Smarter studying starts here.**  
This app helps users explore trending topics and get AI-suggested study material. Users can sign up, browse topics, and customize their study dashboard.

---

## 📦 Tech Stack

- **Frontend**: React + Vite
- **Routing**: React Router DOM
- **Backend**: Express + MongoDB
- **Styling**: Custom CSS (responsive, modern UI)
- **API Calls**: Axios
- **External API**: Cohere (for AI-generated quiz questions), Wikipedia API, Gemini AI
  
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

## 👨‍💻 My Contribution (Zhenziye Lin)

🎥 **Code Walkthrough Video**: [Click to watch](https://drive.google.com/file/d/1OTJt8dUgkYx-CJOwB3qkq3DZG8bjqR3Z/view?usp=sharing)

As a key frontend contributor to the **AI Study Buddy** project, I focused on improving the user interface, implementing user authentication, and managing post-login routing logic for a smooth and friendly user experience.

---

### ✅ Frontend (React)

- **Homepage Redesign**
  - Designed and implemented a responsive homepage layout.
  - Used gradient background theme consistent with branding.
  - Integrated animated AI Study Bot in the bottom-right corner for visual engagement.
  - Created visually pleasing card layout for:
    - Trending Topics from Wikipedia
    - AI-Suggested Topics

- **Navigation Bar (NavBar)**
  - Designed a modern, responsive NavBar with:
    - Home, Study Material, Show Search buttons.
    - Dynamic display of `Hi, [username]`, Profile, and Logout after login.
  - Ensured three buttons are spaced across the bar evenly.

- **Login & Signup**
  - Built standalone `Login.jsx` and `Signup.jsx` pages.
  - Enabled JWT token storage on successful login (via `localStorage`).
  - Implemented page redirection to Dashboard after login.
  - Added message display for login success/failure.

- **Dashboard Page (DashPage.jsx)**
  - Created personalized post-login dashboard with greeting and:
    - 📌 AI Recommended Topics
    - 📚 Trending Study Materials
    - ⏳ Recent Study Topics
  - Used custom layout and theme-consistent colors.

- **Search & Filters**
  - Designed a collapsible search/filter bar:
    - Search bar for topic keywords.
    - Optional required keyword input.
    - Dropdown to sort topics alphabetically or by richness.

### ✅ Backend (Node.js + Express)

- **User Authentication**
  - Developed user routes (`/register`, `/login`, `/profile/:id`).
  - Implemented secure password hashing using `bcrypt`.
  - Generated JWT tokens using `jsonwebtoken` with proper secret key management.

- **Login Routing**
  - Integrated login flow with frontend:
    - On login, token and user ID are stored.
    - Profile is fetched from backend using the token and ID.
    - Dynamic greeting and UI are rendered based on user state.

### 📸 Screenshots
![Image](https://github.com/user-attachments/assets/f93ba3a1-43b0-44d6-9844-a44492e6c864)
![Image](https://github.com/user-attachments/assets/4c1cdd89-8f88-4036-bff7-0eac5495c038)
![Image](https://github.com/user-attachments/assets/43e59371-e339-442a-ae03-69e501c4842e)

---

## 🧠 My Contribution (Xinlai Chen)

🎥 **Code Walkthrough Video**: [Click to Watch](https://northeastern-my.sharepoint.com/:v:/g/personal/chen_xinla_northeastern_edu/EWz0S7fNuLtOt2tFe2gBHzYBemcg_1BPAg6PIgCTmkZCmA?e=6aBWsb&nav=eyJyZWZlcnJhbEluZm8iOnsicmVmZXJyYWxBcHAiOiJTdHJlYW1XZWJBcHAiLCJyZWZlcnJhbFZpZXciOiJTaGFyZURpYWxvZy1MaW5rIiwicmVmZXJyYWxBcHBQbGF0Zm9ybSI6IldlYiIsInJlZmVycmFsTW9kZSI6InZpZXcifX0%3D)

As the primary backend developer for **AI Study Buddy**, I focused on building the server infrastructure, implementing all core CRUD functionality, and ensuring full test coverage and frontend-backend integration.

---

### ✅ Backend (Node.js + Express + MongoDB)

- **Express + MongoDB Setup**
  - Initialized the Express server and connected to MongoDB Atlas using Mongoose.
  - Managed environment variables and deployment configurations.

- **Collections & Models**
  - Created and managed four collections:
    - `Users`: Handles registration, login, profile updates, deletion.
    - `StudyMaterials`: Stores user-created study content.
    - `Quizzes`: Stores multiple-choice questions linked to study materials.
    - `AdminReports`: Allows users to flag inappropriate content.

- **CRUD API Development**
  - Implemented full RESTful endpoints for all collections (`GET`, `POST`, `PUT`, `DELETE`).
  - Included field validation and proper HTTP status codes (e.g., `400`, `404`, `500`).

- **Authentication**
  - Used `bcrypt` to hash user passwords.
  - Issued JWT tokens using `jsonwebtoken` during login.
  - Helped configure `JWT_SECRET` and ensured token-based routing worked with frontend.

- **External API Configuration**
  - Assisted with deployment to Render and added missing keys like `JWT_SECRET`, `COHERE_API_KEY`, and `GOOGLE_API_KEY` to fix production bugs.


### ✅ Automated Testing (Jest + Supertest)

- **Full Test Coverage**
  - Wrote 32 automated tests across 4 files: `users.test.js`, `studyMaterial.test.js`, `quiz.test.js`, and `report.test.js`.
  - Each test suite covers:
    - Successful CRUD operations
    - Missing field errors (`400`)
    - Invalid or non-existent ID handling (`404`)

- **Test Tools**
  - Used Jest for assertions and Supertest for simulating HTTP requests.
  - Verified backend functionality before merging to `main`.


### 🔁 Integration & Debugging

- Verified frontend-backend integration using Axios and REST endpoints.
- Helped teammates debug login failures related to JWT and missing `.env` variables.
- Ensured deployed frontend could communicate securely with the backend.

### 📸 Screenshots
<img width="274" alt="image" src="https://github.com/user-attachments/assets/4e03649d-284e-4d42-b973-44cd076c727d" />





---

## 📄 License

This project is licensed under the MIT License.

---

> Feel free to submit issues or suggestions to improve the platform. Happy studying! 🎓
