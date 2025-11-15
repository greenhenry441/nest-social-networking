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

## Current Development Plan: Bug Squashing and UI Polish

The immediate priority is to fix all existing bugs to ensure the core features of the application are working as expected. This includes:

*   **Fixing all TypeScript errors.**
*   **Ensuring post creation and viewing is fully functional.**
*   **Fixing the real-time chat functionality.**
*   **Improving the UI by replacing all blue underlined links with properly styled buttons.**

## Future Development Plan: "The Facebook-like Experience"

The following features are planned for the next stage of development to make the platform more dynamic and engaging.

### 1. Enhanced Authentication with Facebook Login

*   **Goal:** Allow users to sign up and log in using their Facebook accounts.
*   **Implementation:**
    *   Create a "Sign in with Facebook" button component.
    *   Implement a server action to handle the Firebase authentication flow with the Facebook provider.
    *   Add the new sign-in option to the Login and Signup pages.

### 2. "Nest Mail" User Identity System

*   **Goal:** Assign a unique, internal email address to each user upon signup (e.g., `username@nestsocial.com`).
*   **Implementation:**
    *   Modify the signup server action.
    *   After a user is created, update their profile data in Firestore to include a `nestEmail` field, formatted as `username@nestsocial.com`.
    *   This `nestEmail` will be used as a public identifier for search and communication.

### 3. A Central "For You" Feed

*   **Goal:** Create a main feed that displays posts from all users on the platform.
*   **Implementation:**
    *   Create a new page at `/foryou`.
    *   This page will fetch all documents from the `posts` collection in Firestore.
    *   A `Post` component will be designed to display the post content, author's username, and timestamp.

### 4. Robust Post Creation

*   **Goal:** Ensure users can create posts that are saved to the database and displayed on the feed.
*   **Implementation:**
    *   Verify the post creation server action correctly saves post data to a `posts` collection in Firestore.
    *   Each post document will include the user's ID, username, content, and a server-generated timestamp.

### 5. Enhanced User Chat

*   **Goal:** Enable users to find each other via "Nest Mail" and initiate chats.
*   **Implementation:**
    *   On the `/connect` page, add a search bar for users to find others by their `nestEmail`.
    *   The search result will show the user's profile and a "Chat" button.
    *   The "Chat" button will navigate to the existing chat interface (`/chat/[userId]`), passing the correct user ID.
