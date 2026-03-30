import React from 'react';

export const Loader: React.FC = () => {
    return (
        <div className="loader">
            <div className="loader-brand">
                <svg width="80" height="30" viewBox="0 0 80 30" fill="none" xmlns="http://www.w3.org/2000/svg" className="loader-logo">
                    <text x="0" y="24" fontFamily="system-ui, -apple-system, sans-serif" fontSize="18" fontWeight="700" fill="#D4A017" letterSpacing="0.1em">HYPE BAM</text>
                </svg>
            </div>
        </div>
    );
};

export default Loader;
