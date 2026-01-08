import { useState } from 'react';
import IntroAnimation from './components/IntroAnimation';
import LandingPage from './components/LandingPage';
import ResumePage from './components/ResumePage';
import './index.css';

type AppStage = 'intro' | 'landing' | 'tiles' | 'resume';

export default function App() {
  const [stage, setStage] = useState<AppStage>('intro');

  const handleIntroComplete = () => {
    setStage('landing');
  };

  const handleExplore = () => {
    setStage('tiles');
    setTimeout(() => {
      setStage('resume');
    }, 900);
  };

  return (
    <>
      {stage === 'intro' && <IntroAnimation onComplete={handleIntroComplete} />}

      {stage !== 'intro' && stage !== 'resume' && (
        <>
          {stage === 'tiles' && (
            <div className="ripple active"></div>
          )}
          <LandingPage onExplore={handleExplore} />
        </>
      )}

      {stage === 'tiles' && (
        <div className="tiles active">
          {Array.from({ length: 60 }).map((_, i) => (
            <div
              key={i}
              style={{ animationDelay: `${Math.min(i % 10, 10) * 0.05}s` }}
            />
          ))}
        </div>
      )}

      {stage === 'resume' && <ResumePage />}
    </>
  );
}