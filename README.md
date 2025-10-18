# GetPayInTask - Project Structure & Dependencies

## 📁 Project Structure

```
GetPayInTask/
├── src/
│   ├── assets/                    # Static assets
│   │   ├── fonts/                 # Custom fonts (IBMPlexSansArabic)
│   │   └── images/                 # App images and icons
│   ├── common/                    # Shared utilities and components
│   │   ├── components/            # Reusable UI components
│   │   │   └── UserInteractionWrapper/  # Gesture detection wrapper
│   │   ├── constant/              # App constants and styles
│   │   ├── enum/                  # TypeScript enums
│   │   ├── hooks/                 # Custom hooks
│   │   │   ├── useApp.ts          # App context hook
│   │   │   ├── useAutoLock.ts     # Auto-lock functionality
│   │   │   └── useNetworkStatus.ts # Network status detection
│   │   └── utils/                 # Utility functions
│   │       ├── MMKStorage.ts      # MMKV storage wrapper
│   │       ├── capitalize.ts      # Text utilities
│   │       ├── formatDate.ts      # Date formatting
│   │       └── normalize.ts       # Responsive sizing
│   ├── components/                # UI Components
│   │   ├── general/               # General purpose components
│   │   │   ├── Button/            # Custom button component
│   │   │   ├── Icon/              # Lucide icon wrapper
│   │   │   ├── ProductItem/       # Product display component
│   │   │   ├── CategoryItem/      # Category display component
│   │   │   ├── NetworkStatus/     # Offline indicator
│   │   │   └── ...                # Other UI components
│   │   ├── templets/              # Layout templates
│   │   │   └── MainLayout/        # Main app layout wrapper
│   │   └── index.ts               # Component exports
│   ├── features/                  # Feature-based modules
│   │   ├── authentication/       # Auth feature
│   │   │   ├── hooks/             # Auth hooks
│   │   │   ├── screens/           # Login screen
│   │   │   └── services.ts        # Auth API services
│   │   ├── home/                  # Home/Dashboard feature
│   │   │   ├── hooks/             # Data fetching hooks
│   │   │   ├── screens/           # Dashboard & Category screens
│   │   │   └── services/          # API services
│   │   ├── lock/                  # App lock feature
│   │   │   ├── hooks/             # Biometric auth hooks
│   │   │   ├── screens/           # Lock screen
│   │   │   └── utils.ts           # Biometric service
│   │   └── profile/               # User profile feature
│   ├── navigation/                # Navigation configuration
│   │   ├── authStack.tsx          # Authentication stack
│   │   ├── dashboardStack.tsx     # Dashboard stack
│   │   ├── homeBottomTabs.tsx    # Bottom tab navigation
│   │   ├── mainStack.tsx          # Main app stack
│   │   ├── types.ts               # Navigation types
│   │   └── navigationUtils.ts     # Navigation helpers
│   ├── services/                  # External services
│   │   ├── apiEndPoints.ts        # API endpoint definitions
│   │   ├── httpClient.ts          # Axios HTTP client
│   │   ├── queryClient.ts         # React Query configuration
│   │   └── skip401Urls.ts         # Auth bypass URLs
│   ├── store/                     # Redux store
│   │   ├── slices/                # Redux slices
│   │   │   ├── userState.slice.ts # User auth state
│   │   │   └── appStatus.slice.ts # App lock state
│   │   ├── selectors/             # Redux selectors
│   │   └── index.ts               # Store configuration
│   ├── theme/                     # Theming system
│   │   ├── index.ts               # Theme definitions
│   │   ├── themeProvider.tsx     # Theme context
│   │   └── useTheme.ts            # Theme hook
│   ├── translation/               # Internationalization
│   │   ├── ar.json               # Arabic translations
│   │   ├── en.json               # English translations
│   │   └── index.ts              # i18n configuration
│   ├── types/                     # TypeScript definitions
│   │   ├── apiResponse/           # API response types
│   │   ├── components/            # Component prop types
│   │   ├── dto/                   # Data transfer objects
│   │   └── common.ts              # Common types
│   └── utils/                     # Additional utilities
├── android/                       # Android-specific code
├── ios/                          # iOS-specific code
├── __tests__/                    # Test files
├── App.tsx                       # Root component
├── ProvidersWrapper.tsx          # Context providers
├── index.js                      # App entry point
├── package.json                  # Dependencies
├── tsconfig.json                 # TypeScript config
├── metro.config.js              # Metro bundler config
├── babel.config.js               # Babel configuration
└── jest.config.js                # Jest test configuration
```

## 📦 Dependencies & Packages

### Core React Native

```json
{
  "react": "19.1.1",
  "react-native": "0.82.0"
}
```

**Reason**: Latest stable React Native version with modern React features for optimal performance and developer experience.

### Navigation

```json
{
  "@react-navigation/native": "^7.1.18",
  "@react-navigation/stack": "^7.4.9",
  "@react-navigation/bottom-tabs": "^7.4.8",
  "react-native-screens": "^4.16.0",
  "react-native-safe-area-context": "^5.5.2"
}
```

**Reason**:

- **React Navigation**: Industry standard for React Native navigation
- **Stack Navigator**: For screen transitions and modal presentations
- **Bottom Tabs**: For main app navigation structure
- **Screens**: Performance optimization for navigation
- **Safe Area Context**: Handle device notches and status bars

### State Management

```json
{
  "@reduxjs/toolkit": "^2.9.0",
  "react-redux": "^9.2.0",
  "redux-persist": "^6.0.0"
}
```

**Reason**:

- **Redux Toolkit**: Modern Redux with less boilerplate
- **React Redux**: React bindings for Redux
- **Redux Persist**: Persist Redux state across app restarts

### Data Fetching & Caching

```json
{
  "@tanstack/react-query": "^5.90.2",
  "@tanstack/react-query-persist-client": "^1.0.0"
}
```

**Reason**:

- **React Query**: Powerful data fetching, caching, and synchronization
- **Persist Client**: Cache data to MMKV for offline support
- **Background refetching**: Keep data fresh automatically

### Storage & Security

```json
{
  "react-native-mmkv": "^3.3.3",
  "react-native-encrypted-storage": "^4.0.3",
  "react-native-biometrics": "^3.0.1"
}
```

**Reason**:

- **MMKV**: Fast, secure key-value storage (faster than AsyncStorage)
- **Encrypted Storage**: Secure token storage with encryption
- **Biometrics**: Face ID/Touch ID authentication support

### HTTP & Networking

```json
{
  "axios": "^1.12.2",
  "@react-native-community/netinfo": "^11.4.1"
}
```

**Reason**:

- **Axios**: Robust HTTP client with interceptors and error handling
- **NetInfo**: Network status detection for offline/online states

### UI & Icons

```json
{
  "lucide-react-native": "^0.545.0",
  "react-native-vector-icons": "^10.3.0",
  "react-native-svg": "^15.14.0"
}
```

**Reason**:

- **Lucide**: Modern, consistent icon library
- **Vector Icons**: Additional icon support
- **SVG**: Scalable vector graphics support

### User Experience

```json
{
  "react-native-toast-message": "^2.3.3",
  "react-native-gesture-handler": "^2.28.0",
  "react-native-restart": "^0.0.27"
}
```

**Reason**:

- **Toast Message**: User feedback notifications
- **Gesture Handler**: Advanced touch interactions and gestures
- **Restart**: App restart functionality for critical updates

### Internationalization

```json
{
  "i18next": "^25.6.0",
  "react-i18next": "^16.0.1"
}
```

**Reason**:

- **i18next**: Professional internationalization framework
- **React i18next**: React integration for multi-language support

### Development Tools

```json
{
  "@react-native-async-storage/async-storage": "^2.2.0"
}
```

**Reason**:

- **AsyncStorage**: Fallback storage solution and React Query persistence

## 🏗️ Architecture Patterns

### 1. **Feature-Based Structure**

- Each feature has its own folder with screens, hooks, and services
- Promotes modularity and maintainability
- Easy to scale and add new features

### 2. **Separation of Concerns**

- **Components**: Pure UI components
- **Hooks**: Business logic and state management
- **Services**: API calls and external integrations
- **Types**: TypeScript definitions for type safety

### 3. **State Management Strategy**

- **Redux**: Global app state (auth, lock status)
- **React Query**: Server state and caching
- **Local State**: Component-specific state with useState

### 4. **Navigation Architecture**

- **Stack Navigators**: Screen transitions
- **Bottom Tabs**: Main app navigation
- **Type Safety**: Full TypeScript support for navigation

## 🔧 Key Features Implementation

### 🔐 Authentication System

- **Login Screen**: Username/password authentication
- **Biometric Authentication**: Face ID/Touch ID support
- **Session Management**: Automatic token refresh
- **Secure Storage**: Encrypted token storage with MMKV
- **Auto-logout**: Session timeout handling

### 🏠 Dashboard & Product Management

- **Product Grid/List View**: Toggle between grid and list layouts
- **Category Filtering**: Browse products by category
- **Product Search**: Search functionality across products
- **Pull-to-Refresh**: Manual data refresh
- **Infinite Scroll**: Pagination support
- **Product Details**: Detailed product information
- **Admin Controls**: Delete products (superadmin only)

### 🔒 Auto-Lock System

- **Background Detection**: Locks app when backgrounded
- **Inactivity Timer**: 10-second timeout (configurable)
- **Gesture Tracking**: Comprehensive user interaction detection
- **Biometric Unlock**: Face ID/Touch ID with password fallback
- **Lock Screen**: Secure unlock interface

### 🌐 Offline Support

- **React Query Persistence**: Cache data to MMKV
- **Network Detection**: Show offline indicators
- **Graceful Degradation**: App works without internet
- **Data Synchronization**: Automatic sync when online

### 👤 User Profile Management

- **Profile Display**: Complete user information
- **Personal Information**: Name, age, gender, contact details
- **Physical Information**: Height, weight, physical attributes
- **Address Information**: Location and postal details
- **Work Information**: Company and job details
- **Profile Editing**: Update user information

### 🎨 Theming & Internationalization

- **Dark/Light Mode**: Theme switching
- **Arabic/English Support**: Full RTL/LTR support
- **Dynamic Theming**: Real-time theme changes
- **Localized Content**: All text translated
- **RTL Layout**: Proper right-to-left support

### 🔧 Security Features

- **Encrypted Storage**: Secure token storage
- **Biometric Authentication**: Device-level security
- **Auto-lock**: Automatic security when inactive
- **Session Management**: Secure session handling
- **Admin Privileges**: Role-based access control

### ⚡ Performance Optimizations

- **MMKV Storage**: Faster than AsyncStorage
- **React Query Caching**: Intelligent data caching
- **Gesture Handler**: Optimized touch interactions
- **Safe Area Context**: Proper device handling
- **Memory Management**: Efficient resource usage

## 🎯 Design Decisions

### Why MMKV over AsyncStorage?

- **Performance**: 30x faster than AsyncStorage
- **Synchronous**: No async/await needed for simple operations
- **Encryption**: Built-in encryption support
- **Size**: Smaller bundle size

### Why React Query?

- **Caching**: Automatic background refetching
- **Offline**: Works without network
- **Optimistic Updates**: Immediate UI updates
- **Error Handling**: Built-in retry and error states

### Why Redux Toolkit?

- **Less Boilerplate**: Simplified Redux usage
- **TypeScript**: Excellent TypeScript support
- **DevTools**: Great debugging experience
- **Performance**: Optimized re-renders

### Why Feature-Based Structure?

- **Scalability**: Easy to add new features
- **Maintainability**: Clear separation of concerns
- **Team Development**: Multiple developers can work independently
- **Testing**: Easier to test individual features

## 📱 Platform Support

### iOS

- **Biometric Authentication**: Face ID and Touch ID
- **Safe Area**: Proper handling of notches and status bars
- **Performance**: Optimized for iOS devices

### Android

- **Biometric Authentication**: Fingerprint and Face unlock
- **Material Design**: Android-specific UI patterns
- **Performance**: Optimized for Android devices

## 🚀 Future Enhancements

### Planned Features

1. **Push Notifications**: Real-time updates
2. **Deep Linking**: URL-based navigation
3. **Analytics**: User behavior tracking
4. **Crash Reporting**: Error monitoring
5. **A/B Testing**: Feature experimentation

### Performance Improvements

1. **Code Splitting**: Lazy loading of features
2. **Image Optimization**: Caching and compression
3. **Bundle Optimization**: Smaller app size
4. **Memory Management**: Better resource usage

## 🧪 Testing Guide

### 👤 Normal User Testing

#### **1. Authentication Flow**

```bash
# Test Login
1. Open the app
2. Enter username: "john_doe" (or any valid username)
3. Enter password: "mypassword" (or any valid password)
4. Tap "Sign In"
5. Verify: Success toast appears, navigates to Dashboard
6. Verify: User profile loads correctly

# Test Biometric Login (if available)
1. Enable biometric authentication in device settings
2. Login with username/password first time
3. Close and reopen app
4. Verify: Biometric prompt appears
5. Use biometric to unlock
6. Verify: App unlocks successfully
```

#### **2. Dashboard Navigation**

```bash
# Test Dashboard Features
1. Navigate to Dashboard (Home tab)
2. Verify: Products load in list view
3. Tap grid/list toggle button
4. Verify: View switches to grid layout
5. Pull down to refresh
6. Verify: Data refreshes with loading indicator
7. Tap on a product
8. Verify: Navigates to product details

# Test Category Navigation
1. Scroll through categories at top
2. Tap on a category (e.g., "Electronics")
3. Verify: Navigates to category screen
4. Verify: Shows products for that category only
5. Tap back button
6. Verify: Returns to dashboard
```

#### **3. Product Management**

```bash
# Test Product Interactions
1. Browse products in dashboard
2. Tap "Add to Cart" button on any product
3. Verify: Button shows loading state briefly
4. Tap "Favorite" button on any product
5. Verify: Heart icon changes state
6. Search for a product using search bar
7. Verify: Results filter correctly
```

#### **4. Profile Management**

```bash
# Test Profile Screen
1. Navigate to Profile tab
2. Verify: User information loads
3. Scroll through profile sections:
   - Personal Information
   - Physical Information
   - Address Information
   - Work Information
4. Verify: All data displays correctly
5. Tap edit button (if available)
6. Verify: Edit functionality works
```

#### **5. Settings & Menu**

```bash
# Test Menu Screen
1. Navigate to Menu tab
2. Verify: Menu options load
3. Test Language Switching:
   - Tap "Language" option
   - Verify: Switches between Arabic/English
   - Verify: UI updates with new language
4. Test Theme Switching:
   - Toggle Dark/Light mode
   - Verify: Theme changes immediately
   - Verify: All screens respect new theme
5. Test Logout:
   - Tap "Logout" option
   - Verify: Returns to login screen
   - Verify: User session is cleared
```

#### **6. Auto-Lock Testing**

```bash
# Test Auto-Lock Functionality
1. Login to the app
2. Leave app idle for 10+ seconds
3. Verify: App locks automatically
4. Verify: Lock screen appears
5. Test unlock methods:
   - Use biometric (if available)
   - Use password: "mypassword"
6. Verify: App unlocks successfully
7. Test background lock:
   - Put app in background
   - Verify: App locks when returning
```

### 👑 Admin User Testing

#### **1. Admin Login**

```bash
# Test Superadmin Login
1. Open the app
2. Enter username: "oliviaw"
3. Enter password: "oliviawpass"
4. Tap "Sign In"
5. Verify: Success toast appears
6. Verify: Admin privileges are activated
7. Verify: Delete buttons appear on products
```

#### **2. Admin Product Management**

```bash
# Test Product Deletion
1. Navigate to Dashboard
2. Verify: Red delete buttons appear on all products
3. Tap delete button on any product
4. Verify: Product disappears immediately
5. Verify: Success toast appears
6. Test deletion in category view:
   - Navigate to any category
   - Verify: Delete buttons still visible
   - Delete a product
   - Verify: Product removed from category view
```

#### **3. Admin Dashboard Features**

```bash
# Test Admin-Specific Features
1. Verify: All normal user features work
2. Verify: Additional admin controls visible
3. Test bulk operations (if available)
4. Verify: Admin status persists across navigation
5. Test admin logout:
   - Logout and login as normal user
   - Verify: Admin controls disappear
   - Login as admin again
   - Verify: Admin controls reappear
```

### 🌐 Internationalization Testing

#### **1. Language Switching**

```bash
# Test Arabic Language
1. Go to Menu → Language
2. Switch to Arabic
3. Verify: All text translates to Arabic
4. Verify: Layout switches to RTL
5. Test navigation in Arabic
6. Verify: All screens work in Arabic

# Test English Language
1. Switch back to English
2. Verify: All text translates to English
3. Verify: Layout switches to LTR
4. Test all features in English
5. Verify: No text remains untranslated
```

#### **2. RTL Layout Testing**

```bash
# Test Right-to-Left Layout
1. Switch to Arabic
2. Navigate through all screens
3. Verify: Text alignment is correct
4. Verify: Navigation flows properly
5. Test form inputs in RTL
6. Verify: Cursor positioning is correct
```

### 🔒 Security Testing

#### **1. Authentication Security**

```bash
# Test Invalid Credentials
1. Enter wrong username/password
2. Verify: Error message appears
3. Verify: App doesn't crash
4. Test empty fields
5. Verify: Validation messages appear

# Test Session Security
1. Login successfully
2. Close app completely
3. Reopen app
4. Verify: Login screen appears
5. Verify: No sensitive data is cached
```

#### **2. Auto-Lock Security**

```bash
# Test Security Timeouts
1. Login to app
2. Leave idle for 10+ seconds
3. Verify: App locks automatically
4. Test background security:
   - Put app in background
   - Wait 5+ seconds
   - Return to app
   - Verify: Lock screen appears
```

### 📱 Device Testing

#### **1. iOS Testing**

```bash
# Test iOS-Specific Features
1. Test Face ID authentication
2. Test Touch ID authentication
3. Verify: Safe area handling
4. Test iOS navigation gestures
5. Verify: iOS-specific UI elements
```

#### **2. Android Testing**

```bash
# Test Android-Specific Features
1. Test fingerprint authentication
2. Test face unlock
3. Verify: Material Design compliance
4. Test Android navigation
5. Verify: Android-specific behaviors
```

### 🌐 Network Testing

#### **1. Online Testing**

```bash
# Test with Internet Connection
1. Ensure device is online
2. Test all data loading features
3. Verify: Data loads from API
4. Test pull-to-refresh
5. Verify: Fresh data loads
```

#### **2. Offline Testing**

```bash
# Test Offline Functionality
1. Disable internet connection
2. Open app
3. Verify: Offline indicator appears
4. Test cached data access
5. Verify: App doesn't crash
6. Re-enable internet
7. Verify: Data syncs automatically
```

### 🐛 Error Testing

#### **1. Network Error Handling**

```bash
# Test Network Failures
1. Disable internet during app use
2. Try to refresh data
3. Verify: Error handling works
4. Verify: User-friendly error messages
5. Re-enable internet
6. Verify: App recovers gracefully
```

#### **2. Data Error Handling**

```bash
# Test Invalid Data
1. Test with corrupted cache
2. Test with invalid API responses
3. Verify: App doesn't crash
4. Verify: Fallback behaviors work
5. Test edge cases
6. Verify: Robust error handling
```

## 🚀 Quick Start Testing

### **For Normal Users:**

1. **Login**: Use any valid username/password
2. **Browse**: Navigate dashboard and categories
3. **Profile**: Check user information
4. **Settings**: Test language and theme switching

### **For Admin Users:**

1. **Login**: Use `oliviaw` / `oliviawpass`
2. **Delete**: Test product deletion features
3. **Verify**: Admin controls are visible
4. **Test**: All normal user features still work

This comprehensive testing guide ensures all features work correctly for both user types and provides a solid foundation for quality assurance.
