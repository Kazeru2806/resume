import { useEffect } from 'react';
import '../styles/intro.css';

interface IntroAnimationProps {
    onComplete: () => void;
}

export default function IntroAnimation({ onComplete }: IntroAnimationProps) {
    useEffect(() => {
        const timer = setTimeout(() => {
            onComplete();
        }, 3600);

        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <div className="intro-screen">
            <div className="star-seed" aria-hidden="true">
                <div className="piece p1"></div>
                <div className="piece p2"></div>
                <div className="piece p3"></div>
                <div className="piece p4"></div>
            </div>
        </div>
    );
}