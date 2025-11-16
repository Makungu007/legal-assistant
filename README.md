# Legal Assistant App

A clean and simple mobile application built with React Native and Expo that provides legal guidance and assistance.

## 📱 UI Structure

### Auth Flow
- **WelcomeScreen** - App introduction and navigation to auth
- **LoginScreen** - User authentication 
- **RegisterScreen** - User registration

### Main App Flow  
- **HomeScreen** - Ask question + categories overview
- **AskScreen** - Text/voice input for questions
- **AnswerScreen** - Display legal guidance and answers
- **CategoriesScreen** - Browse legal categories
- **LegalInfoScreen** - Legal resources and information

### Admin Mode
- **AdminLogin** - PIN-based admin access
- **ManageDocuments** - Document management system
- **ManageCategories** - Category management system

## 🚀 Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npx expo start
   ```

3. Open the app in:
   - Expo Go app on your mobile device
   - iOS Simulator
   - Android Emulator

## 🔧 Tech Stack

- React Native
- Expo Router (file-based routing)
- TypeScript
- React Navigation
- Expo Icons

## 📂 Project Structure

```
app/
├── index.tsx              # Entry point
├── _layout.tsx           # Root layout
├── (auth)/               # Authentication screens
│   ├── _layout.tsx
│   ├── welcome.tsx
│   ├── login.tsx
│   └── register.tsx
├── (main)/               # Main app screens
│   ├── _layout.tsx
│   ├── home.tsx
│   ├── ask.tsx
│   ├── answer.tsx
│   ├── categories.tsx
│   └── legal-info.tsx
└── (admin)/              # Admin screens
    ├── _layout.tsx
    ├── login.tsx
    ├── documents.tsx
    └── categories.tsx
```

## 🎨 Design Principles

- Clean and minimal interface
- Intuitive navigation
- Accessible design
- Consistent theming
- Mobile-first approach
