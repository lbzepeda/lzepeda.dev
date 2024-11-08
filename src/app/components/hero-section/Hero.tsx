'use client';
import { useCallback, useEffect, useState } from 'react';

import { titles } from './Titles';

function Hero() {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const getFullText = useCallback(
    (index: number) =>
      titles[index].textParts.map((part) => part.text).join(''),
    []
  );

  useEffect(() => {
    const typeSpeed = 100;
    const deleteSpeed = 50;
    const pauseTime = 2000;

    const currentFullText = getFullText(currentIndex);
    let timeoutId: ReturnType<typeof setTimeout>;

    if (!isDeleting && currentText.length < currentFullText.length) {
      timeoutId = setTimeout(() => {
        setCurrentText(currentFullText.slice(0, currentText.length + 1));
      }, typeSpeed);
    } else if (isDeleting && currentText.length > 0) {
      timeoutId = setTimeout(() => {
        setCurrentText(currentFullText.slice(0, currentText.length - 1));
      }, deleteSpeed);
    } else if (!isDeleting && currentText.length === currentFullText.length) {
      // if is the last text, we don't activate the deletion
      if (currentIndex === titles.length - 1) {
        setIsComplete(true);
        return;
      }
      timeoutId = setTimeout(() => {
        setIsDeleting(true);
      }, pauseTime);
    } else if (isDeleting && currentText.length === 0) {
      setIsDeleting(false);
      // Move to the next text without using module
      setCurrentIndex(currentIndex + 1);
    }

    return () => clearTimeout(timeoutId);
  }, [currentText, isDeleting, currentIndex, getFullText]);

  const renderTitle = () => {
    const parts = titles[currentIndex].textParts;
    let currentPosition = 0;
    return parts.map((part, index) => {
      const start = currentPosition;
      const end = currentPosition + part.text.length;
      currentPosition = end;
      const displayedText = currentText.slice(start, end);
      return (
        <span key={index} className={part.className}>
          {displayedText}
        </span>
      );
    });
  };

  return (
    <section
      data-testid="hero-section"
      id="home"
      className="min-h-screen w-full flex items-center justify-center bg-white dark:bg-slate-900"
    >
      <div className="w-full max-w-[1100px] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start gap-6">
          {/* Container for title and subtitle */}
          <div className="flex flex-col gap-2">
            <div
              data-testid="title-container"
              className="group font-mono text-4xl md:text-6xl font-bold relative"
            >
              {renderTitle()}
              {!isComplete && (
                <span className="animate-pulse text-slate-900 dark:text-white">
                  |
                </span>
              )}
            </div>
            <span className="text-2xl md:text-3xl font-bold text-slate-600 dark:text-slate-300">
              Frontend developer
            </span>
          </div>

          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl">
            As a frontend developer, I specialize in building{' '}
            <span className="text-purple-500 dark:text-purple-400">robust</span>{' '}
            digital experiences through{' '}
            <span className="text-purple-500 dark:text-purple-400">clean</span>{' '}
            and{' '}
            <span className="text-purple-500 dark:text-purple-400">
              purposeful
            </span>{' '}
            interfaces, placing great emphasis on{' '}
            <span className="text-purple-500 dark:text-purple-400">
              user experience
            </span>{' '}
            and{' '}
            <span className="text-purple-500 dark:text-purple-400">
              accessibility
            </span>
            .
          </p>
        </div>
      </div>
    </section>
  );
}

export default Hero;
