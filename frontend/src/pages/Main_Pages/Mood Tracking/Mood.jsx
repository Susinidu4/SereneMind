import React, { useState } from "react";
import axios from "axios";

export const Mood = () => {
    const [mood, setMood] = useState("");
    const [suggestion, setSuggestion] = useState("");

    const emojis = ["😊", "😔", "😡", "😴", "😢"];

    const getSuggestion = async () => {
        try {
            const response = await axios.post("http://127.0.0.1:5000/analyze", { mood });
            setSuggestion(response.data.suggestion);
        } catch (error) {
            console.error("Error fetching suggestion", error);
        }
    };

    return (
        <div>
            <h2>Select Your Mood</h2>
            {emojis.map((emoji) => (
                <button key={emoji} onClick={() => setMood(emoji)}>{emoji}</button>
            ))}
            <button onClick={getSuggestion} disabled={!mood}>Get Suggestion</button>
            {suggestion && <p><strong>Suggestion:</strong> {suggestion}</p>}
        </div>
    );
};


