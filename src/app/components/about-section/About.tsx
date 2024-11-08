// components/about-section/About.tsx
'use client';
import { useAbout } from './useAbout';

function About() {
  const {
    sectionRef,
    currentComponent,
    activeComponent,
    animationCompleted,
    handleReset,
  } = useAbout();

  return (
    <section
      ref={sectionRef}
      data-testid="about-section"
      id="about"
      className="relative min-h-screen w-full flex items-center justify-center bg-gray-100 dark:bg-indigo-900"
    >
      <div className="w-full max-w-[1100px] px-4 sm:px-6 lg:px-8 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="relative w-full h-[800px] md:h-[700px] flex flex-col items-center justify-center">
          <div className="h-[calc(100%-4rem)] w-full overflow-auto flex flex-col items-center justify-center">
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
      </div>
    </section>
  );
}

export default About;
