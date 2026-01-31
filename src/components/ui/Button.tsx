import React from 'react';
import { ArrowIcon } from '@/components/icons';

interface ButtonProps {
    href: string;
    children: React.ReactNode;
    variant?: 'default' | 'white' | 'light';
    className?: string;
    target?: string;
    rel?: string;
}

/**
 * Reusable animated button component with arrow icons
 */
export const Button: React.FC<ButtonProps> = ({
    href,
    children,
    variant = 'default',
    className = '',
    target = '_blank',
    rel = 'noreferrer'
}) => {
    const bgClass = variant === 'white' ? 'white-bg' : variant === 'light' ? 'light-bg' : '';
    const textClass = variant === 'white' || variant === 'light' ? 'dark-font' : '';
    const buttonClass = variant === 'white' ? 'is-white' : variant === 'light' ? 'is-light' : '';

    return (
        <a
            href={href}
            target={target}
            rel={rel}
            className={`button ${buttonClass} w-inline-block ${className}`}
        >
            <div className="button-cycle is-first">
                <ArrowIcon />
                <div className={`button-cycle-bg ${bgClass}`}></div>
            </div>
            <div className={`button-bg ${bgClass}`}>
                <div className={`button-text ${textClass}`}>{children}</div>
            </div>
            <div className="button-cycle is-second">
                <ArrowIcon />
                <div className={`button-cycle-bg ${bgClass}`}></div>
            </div>
        </a>
    );
};

export default Button;
