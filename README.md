# 🎯 Heap Analytics Case Study

React + TypeScript application demonstrating **Heap Analytics** integration for user behavior tracking.

## 📋 Table of Contents

- [📖 About](#about)
- [🚀 Features](#features)
- [📦 Installation](#installation)
- [💻 Usage](#usage)
- [📊 Heap Analytics Integration](#heap-analytics-integration)
- [🧪 Demo Users](#demo-users)

## 📖 About

This project demonstrates **Heap Analytics integration** in a React application:

- User authentication with demo users
- Automatic user identification via Heap Analytics
- User properties tracking (userRole, planType)
- Event tracking for user interactions
- Modern React architecture with TypeScript

## 📁 Project Structure

```
Heap-Analytics-Case/
├── public/
│   └── vite.svg
├── src/
│   ├── assets/
│   │   └── react.svg
│   ├── components/
│   │   ├── dashboard.tsx
│   │   └── loginComponent.tsx
│   ├── context/
│   │   └── authContext.tsx
│   ├── hooks/
│   │   └── useHeapTracking.ts
│   ├── types/
│   │   ├── heap.d.ts
│   │   └── user.ts
│   ├── App.tsx
│   ├── App.css
│   ├── index.css
│   ├── main.tsx
│   └── vite-env.d.ts
├── index.html
├── package.json
├── vite.config.ts
├── tsconfig.json
├── tailwind.config.js
└── README.md
```

## 🚀 Features

- **Authentication**: Demo login with role-based access
- **Analytics**: Automatic user identification and event tracking
- **UI**: Modern design with Chakra UI
- **Plans**: Free vs Premium feature restrictions

## 📦 Installation

1. **Clone the repository**
```bash
git clone https://github.com/semanurgokirmak/Heap-Analytics-Case.git
cd Heap-Analytics-Case
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

4. **Open browser:** http://localhost:5173

## 💻 Usage

### Demo Users

1. **Admin User (Premium)**
   - Email: `admin@heapcase.com`
   - Access: All features

2. **Regular User (Free)** 
   - Email: `subscriber@heapcase.com`
   - Access: Basic features only

### How to Test

1. Open the application
2. Click "Quick Demo Login" buttons or enter demo emails
3. Enter any password 
4. Explore features based on user type
5. Check browser console for Heap analytics logs

## 📊 Heap Analytics Integration

### Case Requirements Implementation

✅ **User Identification on Login**
- `heap.identify(userId)` called after successful authentication

✅ **User Properties Tracking**  
- `heap.addUserProperties()` sends userRole and planType data

✅ **Event Tracking**
- Feature usage tracking
- Premium feature blocking events

## 🧪 Demo Users

```javascript
// Admin User (Premium Plan)
{
  userId: 'user_admin_001',
  email: 'admin@heapcase.com', 
  userRole: 'admin',
  planType: 'premium'
}

// Regular User (Free Plan)
{
  userId: 'user_subscriber_002',
  email: 'subscriber@heapcase.com',
  userRole: 'subscriber', 
  planType: 'free'
}
```

**Admin User:** ✅ All features  
**Regular User:** ✅ Basic features, ❌ Premium features blocked

---

## 👥 Author

**Semanur Gökırmak** - [@semanurgokirmak](https://github.com/semanurgokirmak)

---

**⭐ If this project helped you understand Heap Analytics integration, please give it a star!**
