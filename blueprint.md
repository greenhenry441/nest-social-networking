# Nest Social Networking App

## Overview

A social networking application designed for young people to connect with friends and family in a safe and controlled environment. Parents can create and manage accounts for their children, ensuring a positive social networking experience.

## Implemented Features

### Simplified Account Setup

*   **Parent Signup:** Parents can create an account using their email and password.
*   **Child Account Creation:** After signing up, parents are guided to create an account for their child.
*   **Unified Child Login:** Children log in through a single, streamlined login page to access the application.

### Modern UI/UX

*   **Vibrant and Appealing Design:** A modern, energetic, and visually balanced design with a focus on user experience. This includes a new, vibrant color palette, expressive typography, subtle background textures, multi-layered drop shadows, and elegant "glow" effects for interactive elements.
*   **Hero Section:** A welcoming hero section on the landing page to make a great first impression.
*   **Iconography:** Use of modern icons to enhance usability and visual appeal.

### Core Features

*   **Post Creation:** Authenticated children can create posts to share their thoughts and experiences.
*   **Posts Feed:** A feed to display all posts from all users, with real-time updates and an enhanced visual presentation including user avatars and clear timestamps.
*   **Navigation Bar:** An intuitive navigation bar with a refined design for easy access to all pages.

### Technical Stack

*   **Next.js:** The application is built using the Next.js framework with the App Router.
*   **Firebase:**
    *   Firebase Authentication for user management.
    *   Firestore for database storage.
    *   Firebase Admin SDK for server-side operations.
*   **Tailwind CSS:** For styling the application, leveraging custom themes and plugins for advanced design.
*   **Zod:** For data validation.

## Next Steps

*   **Comprehensive CSS Improvement:**
    *   **Global Styles:** Enhance `app/globals.css` and `styles/globals.css` to introduce a more vibrant and energetic color palette, expressive typography, and subtle background textures as per the bold design guidelines.
    *   **Component-Specific Styling:** Refine existing component styles (e.g., login, signup forms, buttons, inputs) to ensure consistency, visual balance, and modern aesthetics using Tailwind CSS. This includes adding multi-layered drop shadows for depth and elegant "glow" effects for interactive elements.
    *   **Responsiveness:** Ensure all UI elements are fully responsive across various screen sizes (mobile and web).
*   **Implement "Add People to Chat and Start Posting" Feature:**
    *   **New Route for User Search/Connect:** Create a new page (e.g., `app/connect/page.tsx`) where users can search for others by their Nest ID (user ID).
    *   **Search Functionality:** Implement a server action to query Firebase Firestore for users based on the entered Nest ID.
    *   **Connect System:** Allow users to send "friend requests" or "follow" other users, updating user documents in Firestore to store connections. Display a list of connected users.
    *   **Basic Chat Functionality:** Introduce a basic chat interface allowing users to select a connected friend and send text messages, storing messages in Firestore.
    *   **Post Access Control:** (Future enhancement) Integrate the "connect system" with post visibility, so users can choose to share posts only with their connected friends.
*   **Content Moderation:** Add features for parents to moderate the content their children see and post.
*   **Enhanced Profiles:** Allow users to customize their profiles with avatars and bios.