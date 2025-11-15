# Project Blueprint: Nest Social Networking

## Overview

Nest Social Networking is a modern, safe social media platform designed for teenagers. It provides a space for users to connect, share their thoughts, and grow together in a supportive community. The application is built with Next.js and Firebase, leveraging server components and server actions for a fast and secure user experience.

## Design and Features

### Aesthetics & Design

*   **"Liquid Glass" Theme:** The entire application has been redesigned with a modern "Liquid Glass" aesthetic. This includes:
    *   **Glassmorphism:** A frosted-glass effect applied to key UI elements like the navigation bar and forms, creating a sense of depth and transparency.
    *   **Vibrant Color Palette:** A new, vibrant color palette has been introduced, with a focus on modern and energetic hues.
    *   **Updated Button Styles:** All buttons have been updated with a new, consistent style that includes a subtle shadow and a "glow" effect on hover.
*   **Typography:** The Inter font is used throughout the application, with a focus on clear and readable text.
*   **Layout:** The application features a clean and balanced layout with a maximum width of 7xl, ensuring a comfortable viewing experience on all screen sizes.

### Core Features

*   **Authentication:** Users can sign up and log in to their accounts using Firebase Authentication. The application provides a seamless and secure authentication flow with a consistent "Liquid Glass" design.
*   **Community Feed:** The `/posts` page displays a real-time feed of all user-generated posts. If no posts have been created, a "No posts yet" message is displayed.
*   **Create Posts:** Logged-in users can create new posts through the `/posts/create` and `/posts/new` pages. The application uses Server Actions to handle post creation securely and efficiently.
*   **User Connections & Notifications:** The platform now includes a comprehensive system for users to connect with one another.
    *   **User Search:** A search bar on the `/connect` page allows users to find others by their unique `nestEmail`.
    *   **Connection Requests:** Users can send connection requests to others.
    *   **Request Management:** A dedicated section on the `/connect` page lists all incoming connection requests, where users can choose to accept or reject them.
    *   **Notifications:** When a connection request is sent, the recipient receives a notification, alerting them to the new request.
*   **Navigation:** A responsive and intuitive navigation bar with a glassmorphism effect allows users to easily navigate between the home page, the community feed, and other features.
*   **Real-time Chat:** A fully functional, real-time chat feature allows users to communicate with each other instantly. The chat is built with Cloud Firestore and a Next.js Server Action, ensuring a fast, secure, and scalable experience.
*   **Announcement Banner:** A dismissible banner with a glassmorphism effect is displayed on all pages to inform users about the application's alpha status.
*   **Child Signup with Age Verification:** The child signup process now includes an age selection dropdown. This allows for age-appropriate controls and content filtering, with temporary settings applied until a parent finalizes the account setup.
*   **Role-Based User System:** The application now distinguishes between `parent` and `child` user roles. This is stored in the database upon registration and will be used to implement role-specific features and permissions.

## Changelog

### Version Alpha (1.2.8) - Server Stability & Security Enhancement

*   **Critical Bug Fix:** Resolved a server-side crash caused by an improperly configured Firebase Admin SDK. The application now uses Application Default Credentials (ADC) for secure and automatic authentication in the managed Firebase Studio environment, removing the need for manual service account key management.

### Version Alpha (1.2.7) - Bug Fixes & Stability Improvements

*   **Bug Fixes & Improvements:**
    *   Fixed a critical bug on the "Sign up as a Child" page where the page would close or redirect immediately after opening. The issue was resolved by refining the form state logic to prevent premature redirects and ensure the page remains stable until the user successfully completes the form.

### Version Alpha (1.2.6) - User Connections & Search

*   **New Features:**
    *   Implemented a user connection system. Users can now search for other users by their `nestEmail` on the `/connect` page and send them connection requests.
    *   Added a "Connection Requests" section to the `/connect` page, allowing users to accept or reject incoming requests.
    *   Integrated a notification system that alerts users when they receive a new connection request.
*   **Bug Fixes & Improvements:**
    *   Corrected a critical error where the application was attempting to use a non-existent function (`searchUserByNestId`) for user search. It now correctly uses `searchUserByNestEmail`.

### Version Alpha (1.2.5)

*   **UI Improvements:**
    *   Replaced all blue, underlined text links with modern, styled buttons that feature smooth transitions and a subtle "glow" effect on hover. This creates a more consistent and polished user experience across the application.

### Version Alpha (1.2.4)

*   **Bug Fixes & Improvements:**
    *   Resolved the "client is offline" error by re-initializing Firebase services and updating the Firestore security rules to allow read/write access for authenticated users. This ensures the application can connect to the database.
    *   Resolved an "insufficient permission" error with the Firebase Admin SDK by removing conflicting initialization files and correctly configuring the server-side Admin SDK with the project's service account credentials.

### Version Alpha (1.2.3)

*   **UI Improvements:**
    *   Improved the glassmorphism effect with a semi-transparent background and a vibrant gradient, enhancing the visual appeal and modern aesthetic of the application.

### Version Alpha (1.2.2)

*   **Bug Fixes & Improvements:**
    *   Fixed the authentication flow by implementing a session-based authentication system. This resolves issues with post creation and chat functionality.
    *   The announcement banner has been updated with new text and a "Close Announcement" button.
    *   The chat functionality has been fixed to correctly identify the current user, enabling real-time conversations.

### Version Alpha (1.2.1)

*   **Bug Fixes & Improvements:**
    *   Fixed a critical bug that prevented users from logging in. The issue was caused by unescaped apostrophes in JSX, which has now been corrected across all affected components (`/login`, `/signup/child`, etc.).
    *   Performed a full code quality check and resolved all outstanding ESLint errors and warnings throughout the application (`/app` and `/app/components`). This improves code consistency and maintainability.

### Version Alpha (1.2.0) - "Liquid Glass" UI Overhaul

*   **New Features:**
    *   Implemented a new "Liquid Glass" design across the entire application.
    *   Updated the color palette, button styles, and form inputs to a modern, vibrant aesthetic.
    *   Applied a `glassmorphism` effect to the `Navbar`, `AnnouncementBanner`, and all authentication pages.
    *   Redesigned the home page with the new "Liquid Glass" theme.
    *   Added a new "About" page.

### Version Alpha (1.1.1)

*   **New Features:**
    *   Added an announcement banner to all pages.
    *   Added age selection to the child signup process for temporary controls.
    *   Implemented a role-based user system (`parent` and `child`).
*   **Bug Fixes & Improvements:**
    *   Fixed all known TypeScript errors.
    *   Resolved issues with post creation and viewing.
    *   Fixed real-time chat functionality.
    *   Improved UI by replacing all blue underlined links with properly styled buttons.
    *   Updated the landing page with a new design.

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
