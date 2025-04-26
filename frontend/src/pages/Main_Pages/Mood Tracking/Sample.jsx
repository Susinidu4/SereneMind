// Sample.jsx
import React from 'react';

export const Sample = () => {
    return (
        <div className='p-4'>
            <h1>Mental Health Suggestions</h1>
            <ul>
                {mential_health_suggesion.map((suggestion, index) => (
                    <li key={index} className='border mb-4 '>
                        <h2>{suggestion.title}</h2>
                        <p>{suggestion.plain}</p>
                        <p>Time Duration: {suggestion["time duration per day"]}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}