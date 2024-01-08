import { HashLink as Link } from "react-router-hash-link";
import React from 'react';


export const Contact = () => {
    return (
        
        <div className="contactContainer">
            <div>
                <h1> Contact me:</h1>
            </div>
            <div className="contactInfo">
                <h3>Email: <a href="mailto:aaron.morgan742@gmail.com">aaron.morgan742@gmail.com</a></h3>
            </div>
            <div className="contactButtons">
                <button className="contactButton">
                    <a href="https://github.com/Aaron-Morgan98" target="_blank" rel="noopener noreferrer">GitHub</a>
                </button>
                <button className="contactButton">
                    <a href="https://uk.linkedin.com/in/aaron-morgan742" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                </button>
            </div>
        </div>
    );
};



