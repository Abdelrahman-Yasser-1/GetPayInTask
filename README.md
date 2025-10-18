# GetPayInTask - React Native 3 Pages Store

A React Native app that implements a minimal store with authentication, auto-lock, biometrics, and offline capabilities using DummyJSON API.

## Features

- **Authentication**: Login via DummyJSON API with session restoration
- **Auto-lock**: App locks after 10 seconds of inactivity or when backgrounded
- **Biometric Unlock**: Face ID/Touch ID with password fallback
- **Offline Support**: React Query cache persisted with MMKV for instant offline access
- **Super Admin**: Special privileges for deleting products (username: `superadmin`)
- **Modern UI**: Clean, responsive design with pull-to-refresh

## Screens

1. **Login Screen**: DummyJSON authentication with demo login
2. **All Products Screen**: Product list with delete functionality for superadmin
3. **Specific Category Screen**: Filtered product list by category

## Tech Stack

- React Native 0.82.0
- TypeScript
- React Navigation (Stack + Bottom Tabs)
- React Query (TanStack Query) with MMKV persistence
- Redux Toolkit for state management
- React Native Biometrics
- MMKV for secure storage
- NetInfo for network status

## Setup Instructions

### Prerequisites

- Node.js >= 20.19.4
- React Native CLI
- iOS Simulator (for iOS development)
- Android Studio (for Android development)

### Installation

1. **Clone and install dependencies:**

   ```bash
   git clone <repository-url>
   cd GetPayInTask
   npm install
   ```

2. **iOS Setup:**

   ```bash
   cd ios
   pod install
   cd ..
   ```

3. **Run the app:**

   ```bash
   # iOS
   npm run ios

   # Android
   npm run android
   ```

## Configuration

### Super Admin User

- **Username**: `superadmin`
- **Password**: `123456`
- **Privileges**: Can delete products from the All Products screen

### Chosen Category

- **Category**: `smartphones`
- **Reason**: Popular category with good product variety for demonstration

### Demo Credentials

- Use any username/password combination to login
- The app uses DummyJSON's test authentication
- Superadmin username grants special delete privileges

## API Endpoints Used

- `POST /auth/login` - User authentication
- `GET /auth/me` - Session validation
- `GET /products` - All products
- `GET /products/categories` - Product categories
- `GET /products/category/{category}` - Products by category
- `DELETE /products/{id}` - Delete product (simulated)

## Architecture

### Folder Structure

```
src/
├── components/          # Reusable UI components
├── hooks/              # Custom React hooks
├── navigation/         # Navigation configuration
├── screens/            # Screen components
├── services/           # API and external services
├── store/              # Redux store and slices
├── types/              # TypeScript type definitions
└── utils/              # Utility functions
```

### State Management

- **Redux Toolkit**: Global app state (auth, app lock status)
- **React Query**: Server state and caching
- **MMKV**: Persistent storage for tokens and cache

### Security Features

- Encrypted token storage with MMKV
- Biometric authentication with password fallback
- Auto-lock on inactivity and background
- Secure API communication

## Key Features Implementation

### Auto-lock System

- Monitors user activity and app state
- Locks after 10 seconds of inactivity
- Locks immediately when app goes to background
- Resets timer on user interaction

### Offline Support

- React Query cache persisted to MMKV
- Instant loading of cached data on app restart
- Network status indicator
- Graceful degradation when offline

### Biometric Authentication

- Face ID/Touch ID support
- Password fallback when biometrics unavailable
- Secure authentication flow
- Proper error handling

## Trade-offs and Future Improvements

### Current Trade-offs

1. **Simple Password Fallback**: Uses hardcoded password for demo purposes
2. **Basic Error Handling**: Limited error UI and retry mechanisms
3. **No Dark Mode**: Single theme implementation
4. **Limited Testing**: Basic test coverage

### If I Had More Time

1. **Enhanced Security**: Implement proper password hashing and secure storage
2. **Advanced Error Handling**: Toast notifications, retry mechanisms, offline queue
3. **Dark Mode**: Complete theming system with user preferences
4. **Comprehensive Testing**: Unit tests, integration tests, E2E tests
5. **Performance Optimization**: Image caching, lazy loading, memory optimization
6. **Accessibility**: Screen reader support, accessibility labels
7. **Analytics**: User behavior tracking and crash reporting

## Testing

Run tests with:

```bash
npm test
```

## Build

### iOS

```bash
cd ios
xcodebuild -workspace GetPayInTask.xcworkspace -scheme GetPayInTask -configuration Release
```

### Android

```bash
cd android
./gradlew assembleRelease
```

## License

This project is for demonstration purposes as part of a coding challenge.
