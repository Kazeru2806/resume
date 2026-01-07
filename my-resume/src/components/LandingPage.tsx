import { useEffect, useState } from 'react';
import '../styles/landing.css';

interface LandingPageProps {
    onExplore: () => void;
}

export default function LandingPage({ onExplore }: LandingPageProps) {
    const [showContent, setShowContent] = useState(false);
    const [showButton, setShowButton] = useState(false);

    useEffect(() => {
        const contentTimer = setTimeout(() => {
            setShowContent(true);
        }, 1800);

        const buttonTimer = setTimeout(() => {
            setShowButton(true);
        }, 8100);

        return () => {
            clearTimeout(contentTimer);
            clearTimeout(buttonTimer);
        };
    }, []);

    return (
        <div className={`first-page ${showContent ? 'show' : ''}`}>
            <header className="site-head">
                <div
                    className="header-star"
                    style={{ opacity: showContent ? 1 : 0, transition: 'opacity 0.9s ease' }}
                >
                    <div className="star">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
                <div
                    className="header-line"
                    style={{ opacity: showContent ? 1 : 0, transition: 'opacity 0.9s ease' }}
                ></div>
            </header>

            <div
                className="side-text left"
                style={{ opacity: showContent ? 1 : 0, transition: 'opacity 0.9s ease' }}
            >
                Eumorphia & Nous
            </div>
            <div
                className="side-text right"
                style={{ opacity: showContent ? 1 : 0, transition: 'opacity 0.9s ease' }}
            >
                15°54'11.02" N 105°48'24.09" E ⏺
            </div>

            <div className="sphere"></div>

            <button
                className="explore-btn"
                style={{
                    opacity: showButton ? 1 : 0,
                    pointerEvents: showButton ? 'auto' : 'none',
                    transition: 'opacity 0.5s ease'
                }}
                onClick={onExplore}
                aria-label="Explore Surface"
            >
                EXPLORE SURFACE
            </button>

            <h1
                className="main-title"
                style={{ opacity: showContent ? 1 : 0, transition: 'opacity 0.9s ease' }}
            >
                WINDOM
                <span className="title-fill" aria-hidden="true">WINDOM</span>
            </h1>
        </div>
    );
}