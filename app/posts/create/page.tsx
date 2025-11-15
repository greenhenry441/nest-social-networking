'use client';

import { useFormState } from "react-dom";
import { savePost } from "@/app/actions";

export default function CreatePostPage() {
    const [state, formAction] = useFormState(savePost, { errors: [] });

    return (
        <form action={formAction}>
            <input type="text" name="content" placeholder="What is on your mind?" />
            <button type="submit">Post</button>
            {state.errors.length > 0 && (
                <ul>
                    {state.errors.map((error, index) => (
                        <li key={index}>{error}</li>
                    ))}
                </ul>
            )}
        </form>
    );
}
