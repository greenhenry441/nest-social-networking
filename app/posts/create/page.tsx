'use client';

import { useState } from "react";
import { createPost } from "@/app/actions";
import { useAuth } from "@/app/context/AuthContext"; // Import useAuth

export default function CreatePostPage() {
    const { currentUser } = useAuth(); // Get currentUser from AuthContext
    const [postContent, setPostContent] = useState('');
    const [statusMessage, setStatusMessage] = useState('');

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setStatusMessage('Submitting post...');

        if (!currentUser || !currentUser.uid) {
            setStatusMessage("Please log in to create a post.");
            return;
        }

        if (!postContent.trim()) {
            setStatusMessage("Post content cannot be empty.");
            return;
        }

        try {
            const result = await createPost(postContent, currentUser.uid); // Use currentUser.uid as authorId
            if (result.success) {
                setStatusMessage("Post submitted successfully!");
                setPostContent('');
            } else {
                setStatusMessage(`Error submitting post: ${result.errors?.join(', ')}`);
            }
        } catch (error) {
            console.error("Error creating post:", error);
            setStatusMessage("An unexpected error occurred.");
        }
    };

    if (!currentUser) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center py-10 px-4 bg-background text-foreground">
                <h1 className="text-4xl md:text-5xl font-extrabold text-primary mb-8 text-center drop-shadow-md">Create New Post</h1>
                <p className="text-lg text-center text-red-500">Please log in to create a post.</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center py-10 px-4 bg-background text-foreground">
            <h1 className="text-4xl md:text-5xl font-extrabold text-primary mb-8 text-center drop-shadow-md">Create New Post</h1>
            <form onSubmit={handleSubmit} className="w-full max-w-lg bg-card p-8 rounded-xl shadow-xl border border-border">
                <textarea
                    name="content"
                    placeholder="What is on your mind?"
                    rows={6}
                    className="w-full p-4 mb-4 rounded-lg bg-input border border-border focus:ring-2 focus:ring-accent-dark focus:border-transparent text-foreground placeholder-gray-500 transition-all duration-300 ease-in-out resize-none"
                    required
                    value={postContent}
                    onChange={(e) => setPostContent(e.target.value)}
                ></textarea>
                <button
                    type="submit"
                    className="w-full py-3 px-6 bg-accent text-accent-foreground font-bold rounded-lg shadow-lg hover:shadow-glow-accent transition-all duration-300 ease-in-out transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-card"
                >
                    Post
                </button>
                {statusMessage && (
                    <p className={`mt-4 text-sm ${statusMessage.includes('Error') || statusMessage.includes('log in') ? 'text-red-500' : 'text-green-500'}`}>
                        {statusMessage}
                    </p>
                )}
            </form>
        </div>
    );
}