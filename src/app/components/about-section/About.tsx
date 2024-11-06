'use client';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import Browser from './Browser';
import Editor from './Editor';
import { Terminal } from './Terminal';

const About = () => {
  const [currentComponent, setCurrentComponent] = useState<
    'editor' | 'terminal' | 'browser'
  >('editor');
  const [isInView, setIsInView] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const progressInterval = useRef<NodeJS.Timeout | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const aboutMeCode = `import { Profile } from '@/components/ui'

const AboutMe = () => (
    <section class="about-container">
        <h1 class="about-title">About Me</h1>
        
        <div class="about-content">
            <p class="about-text">
             I'm Levi Zepeda, a Frontend dev {...}
            </p>
        </div>

        <Profile />
    </section>
)`;

  const progressStyle = useMemo(
    () => ({
      width: `${progress}%`,
    }),
    [progress]
  );

  useEffect(() => {
    if (isInView && !isPaused) {
      const startProgress = () => {
        if (progressInterval.current) clearInterval(progressInterval.current);

        progressInterval.current = setInterval(() => {
          setProgress((prev) => {
            const nextProgress = prev + 0.5;

            // First update the progress before starting the transition
            if (currentComponent === 'editor' && nextProgress >= 33) {
              if (!isAnimating) {
                setIsAnimating(true);
                setTimeout(() => {
                  setCurrentComponent('terminal');
                  setIsAnimating(false);
                }, 500);
              }
              return 33;
            }

            if (currentComponent === 'terminal' && nextProgress >= 110) {
              if (!isAnimating) {
                setIsAnimating(true);
                setTimeout(() => {
                  setCurrentComponent('browser');
                  setIsAnimating(false);
                }, 500);
              }
              return 66;
            }

            if (nextProgress >= 100) {
              return 100;
            }

            return nextProgress;
          });
        }, 50);
      };

      startProgress();
    }

    // Cleanup interval
    return () => {
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
    };
  }, [isInView, isPaused, currentComponent, isAnimating]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isPaused) {
          setIsInView(true);
        }
      },
      { threshold: 0.5 }
    );

    const section = document.getElementById('about');
    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, [isPaused]);

  const handleTerminalComplete = useCallback(() => {
    if (!isPaused) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentComponent('browser');
        setIsAnimating(false);
      }, 500);
    }
  }, [isPaused]);

  const handleReset = useCallback(() => {
    setIsAnimating(true);
    if (progressInterval.current) {
      clearInterval(progressInterval.current);
    }
    setTimeout(() => {
      setCurrentComponent('editor');
      setProgress(0);
      setIsAnimating(false);
      setIsInView(true);
      setIsPaused(false);
    }, 500);
  }, []);

  const togglePause = useCallback(() => {
    setIsPaused((prev) => !prev);
  }, []);

  const renderCurrentComponent = () => {
    switch (currentComponent) {
      case 'editor':
        return <Editor code={aboutMeCode} />;
      case 'terminal':
        return <Terminal onComplete={handleTerminalComplete} />;
      case 'browser':
        return <Browser />;
      default:
        return null;
    }
  };

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative min-h-screen w-full flex flex-col items-center justify-center bg-gray-200 dark:bg-indigo-950 p-4 overflow-hidden"
    >
      {/* Main container with responsive height */}
      <div className="w-full max-w-4xl h-[700px] md:h-[550px] relative">
        {/* Current component container with scroll if necessary */}
        <div
          className={`w-full h-[calc(100%-4rem)] transition-all duration-500 overflow-auto px-2 md:px-0 ${
            isAnimating
              ? 'opacity-0 transform -translate-y-4'
              : 'opacity-100 transform translate-y-0'
          }`}
        >
          {/* Only wrap content on mobile for centering */}
          <div className="h-full md:h-auto flex flex-col justify-center md:block">
            {renderCurrentComponent()}
          </div>
        </div>

        {/* Progress Bar and Controls with absolute position */}
        <div className="absolute bottom-0 left-0 right-0">
          <div className="flex items-center gap-4 bg-gray-300/20 hover:bg-gray-300/90 dark:bg-gray-700/20 dark:hover:bg-gray-700/90 backdrop-blur-sm p-2 rounded-lg shadow-lg transition-all duration-300">
            {/* Controls */}
            <div className="flex gap-2">
              <button
                onClick={togglePause}
                className="text-slate-600/50 hover:text-purple-500 dark:text-slate-300/50 dark:hover:text-purple-400 text-lg transition-colors"
                aria-label={isPaused ? 'Resume animation' : 'Pause animation'}
              >
                {isPaused ? '▶' : '॥'}
              </button>
              <button
                onClick={handleReset}
                className="text-slate-600/50 hover:text-purple-500 dark:text-slate-300/50 dark:hover:text-purple-400 text-lg transition-colors"
                aria-label="Reset animation"
              >
                ↺
              </button>
            </div>

            {/* Progress Bar */}
            <div className="flex-1 h-1 bg-gray-200/50 dark:bg-gray-600/50 rounded-full overflow-hidden">
              <div
                className="h-full bg-slate-600/50 hover:bg-slate-600 dark:bg-slate-400/50 dark:hover:bg-slate-400 transition-all duration-300 ease-linear"
                style={progressStyle}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
