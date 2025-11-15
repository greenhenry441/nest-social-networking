# Project Blueprint: Nest Social Networking

## Overview

Nest Social Networking is a modern, safe social media platform designed for teenagers. It provides a space for users to connect, share their thoughts, and grow together in a supportive community. The application is built with Next.js and Firebase, leveraging server components and server actions for a fast and secure user experience.

## Design and Features

### Aesthetics & Design

*   **"Liquid Glass" Theme:** The entire application has been redesigned with a modern "Liquid Glass" aesthetic. This includes:
    *   **Glassmorphism:** A frosted-glass effect applied to key UI elements like the navigation bar and forms, creating a sense of depth and transparency.
    *   **Vibrant Color Palette:** The application's color palette has been updated to a cool and modern blueish-green gradient. This new color scheme is applied to the background and reflected in the glassmorphism effect, creating a cohesive and visually appealing design.
    *   **Updated Button Styles:** All buttons have been updated with a new, consistent style that includes a subtle shadow and a "glow" effect on hover.
*   **Typography:** The Inter font is used throughout the application, with a focus on clear and readable text.
*   **Layout:** The application features a clean and balanced layout with a maximum width of 7xl, ensuring a comfortable viewing experience on all screen sizes.

### Core Features

*   **Authentication:** Users can sign up and log in to their accounts using Firebase Authentication. The application provides a seamless and secure authentication flow. After registration, users are automatically logged in, creating a smooth onboarding experience. The UI for authentication pages follows the consistent "Liquid Glass" design.
*   **Secure Password Reset:** A secure and user-friendly password reset process. Users can request a password reset from the login page, and they will receive an email with a link to a dedicated page where they can securely update their password.
*   **Community Feed:** The `/posts` page displays a real-time feed of all user-generated posts. If no posts have been created, a "No posts yet" message is displayed.
*   **Create Posts:** Logged-in users can create new posts through the `/posts/create` and `/posts/new` pages. The application uses Server Actions to handle post creation securely and efficiently.
*   **User Connections & Notifications:** The platform now includes a comprehensive system for users to connect with one another.
    *   **User Search:** A search bar on the `/connect` page allows users to find others by their unique `nestEmail`.
    *   **Connection Requests:** Users can send connection requests to others.
    *   **Request Management:** A dedicated section on the `/connect` page lists all incoming connection requests, where users can choose to accept or reject them.
    *   **Notifications:** When a connection request is sent, the recipient receives a notification, alerting them to the new request.
*   **Navigation:** A responsive and intuitive navigation bar with a glassmorphism effect allows users to easily navigate between the home page, the community feed, and other features.
*   **Real-time Chat:** A fully functional, real-time chat feature allows users to communicate with each other instantly. The chat is built with Cloud Firestore and a Next.js Server Action, ensuring a fast, secure, and scalable experience.
*   **Announcement Banner:** A dismissible banner announces the application's full 1.0.2 release and includes a button linking to the GitHub repository.
*   **Child Signup with Age Verification:** The child signup process now includes an age selection dropdown. This allows for age-appropriate controls and content filtering, with temporary settings applied until a parent finalizes the account setup.
*   **Role-Based User System:** The application now distinguishes between `parent` and `child` user roles. This is stored in the database upon registration and will be used to implement role-specific features and permissions.

## Changelog

### Version 1.0.6

*   **Hydration Error Fix:** Resolved a client-side hydration error by preventing the application from rendering until the initial authentication check is complete. This ensures that the server-rendered UI and the client-rendered UI are in sync, preventing a common source of client-side exceptions.

### Version 1.0.5

*   **Client-Side Exception Fix:** Resolved a client-side exception on the login page by removing `window.location.origin` and `suppressHydrationWarning` props. This prevents a server-side rendering error and ensures a smooth user experience.

### Version 1.0.4

*   **Vercel Build Fix:** Resolved a build error on Vercel by wrapping the `ResetPasswordForm` component in a `<Suspense>` boundary on the `/reset-password` page. This fixes an issue where `useSearchParams` was being used outside of a Suspense boundary, causing the build to fail.

### Version 1.0.3
*   **Announcement Banner Update:** Updated the announcement banner to display the correct version number (1.0.2).

### Version 1.0.2 - Seamless Authentication

*   **Authentication Flow Improvement:** Reworked the sign-up process for both parents and children. Users are now automatically logged in after creating an account, creating a seamless and uninterrupted user experience. This was achieved by using custom Firebase authentication tokens and session cookies.

### Version 1.0.1

*   **Announcement Banner Update:** Updated the text and layout of the announcement banner for clarity, placing the GitHub link button below the announcement text.

### Version 1.0.0 - Full Release

*   **Announcement Banner Update:** Updated the announcement banner to announce the end of alpha/beta testing and the official 1.0.0 release. The banner now includes a message and a button that links to the project's GitHub repository.

### Pre-release Versions (Alpha)

*   **UI Refresh (Alpha 1.3.0):** Updated the application's color scheme with a new blueish-green gradient, giving the "Liquid Glass" theme a fresh and modern look.
*   **Secure Password Reset (Alpha 1.2.9):** Implemented a secure password reset flow. Users can now request a password reset email, which will direct them to a dedicated page within the application to set a new password.
*   **Server Stability & Security Enhancement (Alpha 1.2.8):** Resolved a server-side crash caused by an improperly configured Firebase Admin SDK. The application now uses Application Default Credentials (ADC) for secure and automatic authentication in the managed Firebase Studio environment, removing the need for manual service account key management.

## Future Development Plan

The following features are planned for the next stage of development to make the platform more dynamic and engaging.

### 1. Enhanced Authentication with Facebook Login

*   **Goal:** Allow users to sign up and log in using their Facebook accounts.
*   **Implementation:**
    *   Create a "Sign in with Facebook" button component.
    *   Implement a server action to handle the Firebase authentication flow with the Facebook provider.
    *   Add the new sign-in option to the Login and Signup pages.

### 2. "Nest Mail" User Identity System (Completed)

*   **Goal:** Assign a unique, internal email address to each user upon signup (e.g., `username@nestsocial.com`).
*   **Implementation:** This has been implemented. The `nestEmail` is created upon user signup and is used for searching and connecting with other users.

### 3. A Central "For You" Feed (Partially Completed)

*   **Goal:** Create a main feed that displays posts from all users on the platform.
*   **Implementation:** A `/posts` page exists that shows a feed of all posts. Future enhancements could include algorithmic sorting and personalization.

### 4. Robust Post Creation (Completed)

*   **Goal:** Ensure users can create posts that are saved to the database and displayed on the feed.
*   **Implementation:** This is fully implemented. Posts are saved to the `posts` collection in Firestore and displayed on the `/posts` feed.

### 5. Enhanced User Connections & Chat

*   **Goal:** Fully integrate the user connection and chat features.
*   **Implementation:**
    *   After a connection request is accepted, both users should be added to each other's "Connected Users" list.
    *   The `/chat` page should dynamically display a list of all connected users.
    *   Clicking on a connected user will navigate to the private chat interface (`/chat/[userId]`).
    *   **(Completed)** On the `/connect` page, a search bar allows users to find others by their `nestEmail`.
    *   **(Completed)** The search result shows the user's profile and a "Connect" button.
