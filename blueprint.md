# Project Blueprint: Nest Social Networking

## Overview

Nest Social Networking is a modern, safe social media platform designed for teenagers. It provides a space for users to connect, share their thoughts, and grow together in a supportive community. The application is built with Next.js and Firebase, leveraging server components and server actions for a fast and secure user experience.

## Design and Features

### Aesthetics & Design

*   **Color Palette:** The application uses a modern and vibrant color palette with a primary, background, foreground, card, accent, and destructive colors.
*   **Typography:** The Inter font is used throughout the application, with a focus on clear and readable text.
*   **Layout:** The application features a clean and balanced layout with a maximum width of 7xl, ensuring a comfortable viewing experience on all screen sizes.

### Core Features

*   **Authentication:** Users can sign up and log in to their accounts using Firebase Authentication. The application provides a seamless and secure authentication flow.
*   **Community Feed:** The `/posts` page displays a real-time feed of all user-generated posts. If no posts have been created, a "No posts yet" message is displayed.
*   **Create Posts:** Logged-in users can create new posts through the `/posts/create` and `/posts/new` pages. The application uses Server Actions to handle post creation securely and efficiently.
*   **Navigation:** A responsive and intuitive navigation bar allows users to easily navigate between the home page, the community feed, and other features.
*   **Real-time Chat:** A fully functional, real-time chat feature allows users to communicate with each other instantly. The chat is built with Cloud Firestore and a Next.js Server Action, ensuring a fast, secure, and scalable experience.

## Recent Changes

### Real-time Chat Implementation

*   **Problem:** The existing chat interface was a non-functional, static component with hardcoded data.
*   **Solution:**
    1.  **Initialized Firestore:** Cloud Firestore was initialized in the Firebase project to serve as the backend for the chat feature.
    2.  **Created `sendMessage` Server Action:** A new Server Action, `sendMessage`, was created in `app/actions.ts` to handle the logic for sending and storing chat messages in Firestore.
    3.  **Refactored `ChatInterface.tsx`:** The chat component was completely overhauled to connect to Firestore, listen for real-time message updates, and use the `sendMessage` action to send new messages.
    4.  **Created Dynamic Chat Page:** A new dynamic page was created at `app/chat/[userId]/page.tsx` to host the chat interface. This page fetches user data on the server and passes it to the `ChatInterface` component.

### Next.js v16 Upgrade & Dependency Resolution

*   **Problem:** The project was using an outdated version of Next.js (`14.2.3`), leading to a cascade of build errors.
*   **Solution:** A multi-step process was executed to stabilize the project, including upgrading core dependencies, resolving peer dependency conflicts, refactoring components, and performing a clean installation of all packages.

### Bug Fixes

*   **Firebase Connection:** An issue with the Firebase connection was resolved by creating a `.firebaserc` file and specifying the correct project ID.
*   **State Mismatch:** A state mismatch in the `Navbar` component was corrected to ensure that the `currentUser` object was being correctly accessed from the `AuthContext`.
*   **Corrupted Files:** Several corrupted files were identified and restored to their correct state, resolving a number of rendering errors.
