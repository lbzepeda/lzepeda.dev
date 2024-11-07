'use client';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import type { ReactElement } from 'react';

import Browser from './Browser';
import Terminal from './Terminal';

const TRANSITION_DELAY = 300;

function About() {
  const [isInView, setIsInView] = useState(true);
  const [animationCompleted, setAnimationCompleted] = useState(false);
  const sectionRef = useRef(null);

  const components = useMemo(
    () => [
      {
        component: <Terminal isVisible={isInView} key="terminal" />,
        duration: 6000,
      },
      {
        component: <Browser key="browser" />,
        duration: 0,
      },
    ],
    [isInView]
  );

  const [activeComponent, setActiveComponent] = useState({
    index: 0,
    isVisible: true,
  });

  const [currentComponent, setCurrentComponent] = useState<ReactElement>(
    components[0].component
  );

  const handleReset = useCallback(() => {
    setAnimationCompleted(false);
    setActiveComponent((prev) => ({
      ...prev,
      isVisible: false,
    }));

    setTimeout(() => {
      setCurrentComponent(components[0].component);
      setActiveComponent({
        index: 0,
        isVisible: false,
      });

      requestAnimationFrame(() => {
        setActiveComponent({
          index: 0,
          isVisible: true,
        });
      });
    }, TRANSITION_DELAY);
  }, [components]);

  useEffect(() => {
    if (activeComponent.isVisible) {
      setCurrentComponent(components[activeComponent.index].component);
    }
  }, [activeComponent.isVisible, activeComponent.index, components]);

  useEffect(() => {
    const currentRef = sectionRef.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.5,
      }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  useEffect(() => {
    if (!isInView) return;

    const { index } = activeComponent;
    if (index >= components.length - 1) {
      setAnimationCompleted(true);
      return;
    }

    const currentDuration = components[index].duration;

    const timers = [
      setTimeout(
        () => setActiveComponent((prev) => ({ ...prev, isVisible: false })),
        currentDuration
      ),
      setTimeout(() => {
        setActiveComponent({
          index: index + 1,
          isVisible: true,
        });
      }, currentDuration + TRANSITION_DELAY),
    ];

    return () => timers.forEach(clearTimeout);
  }, [activeComponent, components, isInView]);

  return (
    <section
      ref={sectionRef}
      data-testid="about-section"
      id="about"
      className="relative min-h-screen w-full flex items-center justify-center bg-gray-100 dark:bg-indigo-900"
    >
      <div className="w-full max-w-[1100px] px-4 sm:px-6 lg:px-8 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="relative w-full h-[700px] md:h-[550px] flex flex-col items-center justify-center">
          <div className="h-[calc(100%-4rem)] w-full overflow-auto flex items-center justify-center">
            <div
              data-testid="component-wrapper"
              className={`w-full transition-all duration-300 ${
                activeComponent.isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-4'
              }`}
            >
              {currentComponent}
            </div>
          </div>

          <div
            data-testid="reset-button-wrapper"
            className={`transition-all duration-300 mt-4 ${
              animationCompleted
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-4 pointer-events-none'
            }`}
          >
            <button
              onClick={handleReset}
              className="text-slate-600 text-3xl hover:text-purple-500 dark:text-slate-300 dark:hover:text-purple-400 transition-colors"
              aria-label="Reiniciar animación"
            >
              ↺
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
