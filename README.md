# ⚖️ Norma Translator

Simplify complex legal texts from Kazakhstan's legislation into plain, easy-to-understand language — in Kazakh, Russian, or English.

---

## 🗂 Project Structure

```
norma-translator/
├── backend/
│   ├── routes/
│   │   ├── translate.js      # POST /api/translate
│   │   └── history.js        # GET/DELETE /api/history
│   ├── services/
│   │   ├── aiService.js      # Mock AI simplification logic
│   │   └── historyStore.js   # In-memory history store
│   ├── server.js             # Express entry point
│   ├── .env.example
│   └── package.json
│
└── frontend/
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── components/
    │   │   ├── Header.jsx
    │   │   ├── TranslateForm.jsx
    │   │   ├── ResultPanel.jsx
    │   │   └── HistoryPanel.jsx
    │   ├── services/
    │   │   └── api.js
    │   ├── i18n/
    │   │   └── index.js       # RU / KK / EN translations
    │   ├── App.js
    │   ├── App.css
    │   └── index.js
    ├── .env.example
    └── package.json
```

---

## 🚀 Running Locally

You need **Node.js v18+** installed. Download it from https://nodejs.org

### 1. Start the Backend

Open a terminal and run:

```bash
cd backend
npm install
cp .env.example .env
npm start
```

Backend will be running at: `http://localhost:5000`

### 2. Start the Frontend

Open a **second terminal** and run:

```bash
cd frontend
npm install
npm start
```

The app will open automatically at: `http://localhost:3000`

---

## ⚙️ Environment Variables

### Backend (`backend/.env`)
| Variable | Description | Default |
|---|---|---|
| `PORT` | Server port | `5000` |
| `FRONTEND_URL` | Allowed CORS origin | `http://localhost:3000` |

### Frontend (`frontend/.env`)
No variables required for basic local use.
The `proxy` field in `frontend/package.json` automatically forwards `/api/*` calls to port 5000.

---

## 🔥 Adding Firebase (Optional)

To persist translations across restarts:

1. Create a project at https://console.firebase.google.com
2. Enable **Firestore Database**
3. Go to **Project Settings → Service Accounts** → Generate a new private key
4. Add the values to `backend/.env`
5. Enable **Authentication → Email/Password** if you want user login

---

## 🤖 Replacing the Mock AI

Open `backend/services/aiService.js` and replace the `simplifyText` function body with a real API call:

```js
// Example with OpenAI
const { OpenAI } = require("openai");
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function simplifyText(text, language) {
  const response = await client.chat.completions.create({
    model: "gpt-4o",
    messages: [
      { role: "system", content: "You simplify Kazakhstani legal texts into plain language." },
      { role: "user", content: text }
    ]
  });
  return {
    simplifiedText: response.choices[0].message.content,
    language: language || "ru"
  };
}
```

---

## 🌐 Languages Supported

| Code | Language |
|---|---|
| `ru` | Russian (default) |
| `kk` | Kazakh |
| `en` | English |

Language is auto-detected if not specified.

---

## 📦 Tech Stack

- **Frontend**: React 18, i18next, Axios
- **Backend**: Node.js, Express
- **Storage**: In-memory (swap for Firebase Firestore)
- **Styling**: Custom CSS (navy + gold theme)
