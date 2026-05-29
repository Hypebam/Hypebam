import React from 'react';

interface SocialLink {
    href: string;
    icon: string;
    alt: string;
}

interface SocialLinksProps {
    links?: SocialLink[];
    variant?: 'default' | 'white';
}

const defaultLinks: SocialLink[] = [
    {
        href: 'https://www.instagram.com/hypebam/',
        icon: '/img/cdn/688651ae6f6e0e5669c9d465_instagram.svg',
        alt: 'Instagram'
    },
    {
        href: 'https://www.tiktok.com/@hypebam',
        icon: '/img/cdn/688651aeea8f52f9e4d418f2_tiktok.svg',
        alt: 'TikTok'
    },
    {
        href: 'https://www.youtube.com/@hypebam',
        icon: '/img/cdn/68d40d4b080c864fb3ec6e0f_youtube-svgrepo-com.svg',
        alt: 'YouTube'
    }
];

export const SocialLinks: React.FC<SocialLinksProps> = ({
    links = defaultLinks,
    variant = 'default'
}) => {
    const circleClass = variant === 'white' ? 'is-white' : '';

    return (
        <>
            {links.map((link, index) => (
                <a
                    key={index}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="social-media-link w-inline-block"
                >
                    <div className={`social-media-circle ${circleClass}`}>
                        <img
                            src={link.icon}
                            loading="eager"
                            width="24"
                            height="24"
                            alt={link.alt}
                            className="social-media-icon"
                        />
                    </div>
                </a>
            ))}
        </>
    );
};

export default SocialLinks;
