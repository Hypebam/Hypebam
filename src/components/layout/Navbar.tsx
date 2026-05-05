import React from 'react';
import { Button, SocialLinks } from '@/components/ui';

export const Navbar: React.FC = () => {
    return (
        <div
            data-load-nav=""
            data-animation="default"
            data-collapse="medium"
            data-duration="400"
            data-easing="ease"
            data-easing2="ease"
            role="banner"
            className="navbar w-nav"
        >
            <div className="nav-container">
                <div data-typography-target="navbar-text-fields" className="grid-layout">
                    <div id="w-node-_084a53a4-1315-9fde-31ee-e99a4811c28c-4811c289" className="nav-social-media-inner">
                        <SocialLinks />
                    </div>
                    <div id="w-node-_084a53a4-1315-9fde-31ee-e99a4811c293-4811c289" className="nav-link-inner">
                        <a href="#nutrition" className="nav-link w-inline-block">
                            <div className="nav-text">Nutrition</div>
                        </a>
                        <a href="#benefits" className="nav-link w-inline-block">
                            <div className="nav-text">Benefits</div>
                        </a>
                        <a href="#reviews" className="nav-link w-inline-block">
                            <div className="nav-text">Reviews</div>
                        </a>
                    </div>
                    <Button
                        href="#"
                        variant="white"
                        className="w-node-c4e2d712-b9aa-e56d-102b-73576293bdd9-4811c289"
                    >
                        Shop All
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
