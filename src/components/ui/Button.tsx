import React from 'react';

interface ButtonProps {
    href: string;
    children: React.ReactNode;
    variant?: 'default' | 'white' | 'light';
    className?: string;
    target?: string;
    rel?: string;
    'aria-hidden'?: boolean | 'true' | 'false';
    tabIndex?: number;
}

const BrandIcon = () => (
    <img
        src="/img/original-flavor-icon.png"
        alt=""
        aria-hidden="true"
        draggable={false}
        className="button-arrow"
    />
);

export const Button: React.FC<ButtonProps> = ({
    href,
    children,
    variant = 'default',
    className = '',
    target,
    rel,
    'aria-hidden': ariaHidden,
    tabIndex
}) => {
    const bgClass = variant === 'white' ? 'white-bg' : variant === 'light' ? 'light-bg' : '';
    const textClass = variant === 'white' || variant === 'light' ? 'dark-font' : '';
    const buttonClass = variant === 'white' ? 'is-white' : variant === 'light' ? 'is-light' : '';

    // Same-page/placeholder links must NOT open a new tab. Only real external
    // URLs get target=_blank (with the required rel hardening) unless the
    // caller passes an explicit target.
    const isExternal = /^https?:\/\//.test(href);
    const finalTarget = target ?? (isExternal ? '_blank' : undefined);
    const finalRel = rel ?? (finalTarget === '_blank' ? 'noopener noreferrer' : undefined);

    return (
        <a
            href={href}
            target={finalTarget}
            rel={finalRel}
            aria-hidden={ariaHidden}
            tabIndex={tabIndex}
            className={`button ${buttonClass} w-inline-block ${className}`}
        >
            <div className="button-cycle is-first">
                <BrandIcon />
                <div className={`button-cycle-bg ${bgClass}`}></div>
            </div>
            <div className={`button-bg ${bgClass}`}>
                <div className={`button-text ${textClass}`}>{children}</div>
            </div>
            <div className="button-cycle is-second">
                <BrandIcon />
                <div className={`button-cycle-bg ${bgClass}`}></div>
            </div>
        </a>
    );
};

export default Button;
