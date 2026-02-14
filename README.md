# 🧠 AI Reflection Quote Generator

![Project Status](https://img.shields.io/badge/Status-Active-success)
![License](https://img.shields.io/badge/License-MIT-blue)
![Tech Stack](https://img.shields.io/badge/Tech-HTML%20%7C%20CSS%20%7C%20JS-yellow)

> **Where Inspiration Meets Artificial Intelligence.**
> A modern, interactive web application that transforms daily quotes into deep, personalized insights using OpenAI's GPT models.

---

## 📸 Screenshots

<div align="center">
  <img src="https://via.placeholder.com/600x300?text=Light+Mode+Preview" alt="Light Mode" width="45%">
  <img src="https://via.placeholder.com/600x300/16213e/ffffff?text=Dark+Mode+Preview" alt="Dark Mode" width="45%">
</div>

---

## 🚀 Live Demo
Check out the live application here: **[[Link to your GitHub Pages](https://qatre-ai.github.io/ai-reflection-quote/)]**

---

## 🌟 Key Features

This project goes beyond a simple quote generator by integrating advanced web capabilities:

* **🤖 AI-Powered Analysis:** Leverages **OpenAI API (GPT-4o)** to generate context-aware, inspiring reflections for every quote.
* **🎨 Dynamic UI/UX:** Features a seamless **Dark/Light mode** toggle using CSS Variables for optimal readability.
* **💾 Local Persistence:** Implements **LocalStorage** to save user preferences (theme) and favorite quotes without a backend database.
* **🗣️ Text-to-Speech:** Utilizes the native **Web Speech API** for accessibility, reading quotes aloud with natural pacing.
* **🖼️ Instant Poster Generation:** Integrates `html2canvas` to render the DOM into a high-quality downloadable image for social sharing.
* **🐦 Social Integration:** One-click sharing to **X (formerly Twitter)** with pre-filled content.

---

## 🛠️ Tech Stack & Skills Demonstrated

| Category | Technologies / Concepts |
| :--- | :--- |
| **Frontend Core** | HTML5, CSS3 (Flexbox, CSS Variables), Vanilla JavaScript (ES6+) |
| **API Integration** | `fetch` API, Async/Await, Error Handling (Try/Catch) |
| **AI & ML** | OpenAI API (Prompt Engineering, JSON Response Parsing) |
| **State Management** | Browser LocalStorage (CRUD operations for Favorites) |
| **Libraries** | FontAwesome (Icons), html2canvas (DOM Rendering) |
| **Tools** | Git, GitHub Pages, Chrome DevTools |

---

## ⚙️ Technical Highlights

### 1. Asynchronous State Management
The application handles multiple asynchronous data streams. It fetches quotes from an external API and, upon user request, chains a secondary call to the OpenAI API. Loading states (spinners) are managed meticulously to ensure a smooth user experience (UX) during network latency.

### 2. Security Awareness
*Note: In a production environment, API keys should be handled via a backend proxy or serverless functions (e.g., Vercel Edge Functions) to prevent exposure. For this client-side demo, the key is strictly separated or requires user input.*

### 3. DOM Manipulation & Event Bubbling
The project uses advanced DOM manipulation techniques to dynamically update content, toggle classes for animations, and generate list items for the "Favorites" section efficiently.

---

## 📦 How to Run Locally

To run this project on your local machine, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/qatre-ai/ai-reflection-quote.git](https://github.com/qatre-ai/ai-reflection-quote.git)
    ```

2.  **Navigate to the project directory:**
    ```bash
    cd ai-reflection-quote
    ```

3.  **Open `index.html`:**
    You can open it directly in your browser or use a live server (e.g., VS Code Live Server extension).

4.  **API Configuration:**
    Open `script.js` and insert your OpenAI API key (optional, only needed for AI features):
    ```javascript
    const OPENAI_API_KEY = "YOUR_API_KEY_HERE";
    ```

---

## 🔮 Future Roadmap

* [ ] **Sentiment Analysis:** Auto-tagging quotes based on mood (e.g., #Motivation, #Melancholy).
* [ ] **Backend Integration:** Migrating to Node.js/Express to secure API keys.
* [ ] **PWA Support:** Converting the app into a Progressive Web App for mobile installability.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/qatre-ai/ai-reflection-quote/issues).

---

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

---

<div align="center">
  <sub>Built with ❤️ by the Qatre AI Team</sub>
</div>
