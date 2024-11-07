// hooks/useAbout.ts
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import type { ReactElement } from 'react';

import Browser from '@/app/components/about-section/Browser';
import Terminal from '@/app/components/about-section/Terminal';

// Constants
const TRANSITION_DELAY = 300;

// Types
interface Component {
  component: ReactElement;
  duration: number;
}

interface ActiveComponent {
  index: number;
  isVisible: boolean;
}

export const useAbout = () => {
  const [isInView, setIsInView] = useState(true);
  const [animationCompleted, setAnimationCompleted] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);

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

  const [activeComponent, setActiveComponent] = useState<ActiveComponent>({
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

    const currentDuration = components[activeComponent.index].duration;

    if (activeComponent.index === components.length - 1) {
      const timer = setTimeout(() => {
        setAnimationCompleted(true);
      }, TRANSITION_DELAY);
      return () => clearTimeout(timer);
    }

    const timers = [
      setTimeout(
        () => setActiveComponent((prev) => ({ ...prev, isVisible: false })),
        currentDuration
      ),
      setTimeout(() => {
        setActiveComponent((prev) => ({
          index: prev.index + 1,
          isVisible: true,
        }));
      }, currentDuration + TRANSITION_DELAY),
    ];

    return () => timers.forEach(clearTimeout);
  }, [activeComponent.index, components, isInView]);

  return {
    sectionRef,
    currentComponent,
    activeComponent,
    animationCompleted,
    handleReset,
  };
};
