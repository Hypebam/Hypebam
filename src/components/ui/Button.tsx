import React from 'react';

interface ButtonProps {
    /** Renders an <a>. Omit and pass `type` to render a real <button> instead. */
    href?: string;
    /** Renders a <button> (e.g. a form submit). Mutually exclusive with `href`. */
    type?: 'submit' | 'button' | 'reset';
    disabled?: boolean;
    onClick?: React.MouseEventHandler<HTMLElement>;
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
    type,
    disabled,
    onClick,
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
    const isExternal = !!href && /^https?:\/\//.test(href);
    const finalTarget = target ?? (isExternal ? '_blank' : undefined);
    const finalRel = rel ?? (finalTarget === '_blank' ? 'noopener noreferrer' : undefined);

    /* The three-part guts are shared by both element types. All of the hover
       choreography (pill slides + rotates, first mascot blurs out, second pops
       in on an elastic ease) is plain CSS in main.css keyed off
       `.button:is(:hover, :focus-visible)` — class-based, so it applies to a
       <button> exactly as it does to an <a>. Rendering a real <button> here
       rather than hand-rolling a lookalike is what keeps the form's submit
       animating identically to every other CTA, for free. */
    const inner = (
        <>
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
        </>
    );

    const shared = `button ${buttonClass} w-inline-block ${className}`;

    if (type) {
        return (
            <button
                type={type}
                disabled={disabled}
                onClick={onClick}
                aria-hidden={ariaHidden}
                tabIndex={tabIndex}
                className={shared}
            >
                {inner}
            </button>
        );
    }

    return (
        <a
            href={href}
            target={finalTarget}
            rel={finalRel}
            onClick={onClick}
            aria-hidden={ariaHidden}
            tabIndex={tabIndex}
            className={shared}
        >
            {inner}
        </a>
    );
};

export default Button;
