# Application Contexts

This directory contains React Context providers and corresponding custom hooks for managing global application state.

## Available Contexts

### 1. Theme Context (`ThemeContext.tsx`)

Manages the application's visual theme (light/dark).

-   **Provider:** `ThemeProvider`
    -   Wraps the application (or relevant part) to provide theme state.
    -   Accepts optional `defaultTheme` prop ('light' or 'dark').
-   **Hooks:**
    -   `useThemeMode(): ThemeMode` - Returns the current theme mode ('light' or 'dark'). Optimized with `useContextSelector`.
    -   `useToggleTheme(): () => void` - Returns a memoized function to toggle the theme. Optimized with `useContextSelector`.

### 2. Auth Context (`AuthContext.tsx`)

Manages user authentication state.

-   **Provider:** `AuthProvider`
    -   Wraps the application to provide authentication state.
-   **Hooks:**
    -   `useIsAuthenticated(): boolean` - Returns true if the user is logged in. Optimized with `useContextSelector`.
    -   `useUser(): User | null` - Returns the authenticated user object or null. Optimized with `useContextSelector`.
    -   `useLogin(): (userData: User) => void` - Returns a memoized function to log the user in (currently mock). Optimized with `useContextSelector`.
    -   `useLogout(): () => void` - Returns a memoized function to log the user out. Optimized with `useContextSelector`.

## Usage

1.  Wrap your application's root component (or the relevant section) with the required context providers (e.g., `ThemeProvider`, `AuthProvider`) in `src/main.tsx`.
2.  Import and use the custom hooks within your components to access global state or trigger updates.

```jsx
import React from 'react';
import { useThemeMode, useToggleTheme } from '@/contexts/ThemeContext';
import { useIsAuthenticated, useLogout } from '@/contexts/AuthContext';
import { Button } from 'antd';

const MyComponent = () => {
  const themeMode = useThemeMode();
  const toggleTheme = useToggleTheme();
  const isAuthenticated = useIsAuthenticated();
  const logout = useLogout();

  return (
    <div>
      <p>Current Theme: {themeMode}</p>
      <Button onClick={toggleTheme}>Toggle Theme</Button>
      {isAuthenticated ? (
        <Button onClick={logout}>Logout</Button>
      ) : (
        <p>Please log in.</p>
      )}
    </div>
  );
};
```

## Optimization

These contexts utilize `useContextSelector` in their custom hooks. This helps prevent unnecessary re-renders in components that only consume a specific part of the context value that hasn't changed. 