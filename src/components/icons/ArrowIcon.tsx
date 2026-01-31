import React from 'react';

interface ArrowIconProps {
    className?: string;
}

/**
 * Arrow icon used in buttons throughout the site
 */
export const ArrowIcon: React.FC<ArrowIconProps> = ({ className = '' }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 10 10"
        width="100%"
        className={`button-arrow ${className}`}
    >
        <path
            fill="currentColor"
            fillRule="evenodd"
            d="M0 1.827 1.71 0H10v8.22L8.11 10V5.93c0-.992.009-1.89.03-2.695l-6.642 6.58-1.316-1.44 6.641-6.58c-.787.022-1.67.032-2.647.032H0Z"
            clipRule="evenodd"
        />
    </svg>
);

export default ArrowIcon;
