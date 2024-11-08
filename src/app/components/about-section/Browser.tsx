import Image from 'next/image';

import WindowHeader from './WindowHeader';

const Browser = () => {
  return (
    <div
      data-testid="browser-container"
      className="bg-white dark:bg-gray-800 text-gray-800 dark:text-white font-mono p-2 md:p-4 rounded-lg shadow-lg w-full max-w-4xl mx-auto overflow-auto max-h-[100vh] md:max-h-none"
    >
      <WindowHeader title="http://localhost:3000" />
      <div
        data-testid="content-container"
        className="bg-gray-100 dark:bg-gray-900 p-2 md:p-4 rounded-lg"
      >
        <div
          data-testid="flex-container"
          className="flex flex-col md:flex-row items-center gap-4 md:gap-8 p-2 md:p-4"
        >
          <div className="flex-1">
            <h1 className="text-xl md:text-2xl font-bold text-purple-400">
              About Me
            </h1>
            <p className="mt-2 md:mt-4 text-sm md:text-base text-gray-800 dark:text-gray-300">
              Hi! I&apos;m Levi Zepeda, a{' '}
              <span className="text-purple-500 dark:text-purple-400">
                frontend developer
              </span>{' '}
              with backend expertise. I work with{' '}
              <span className="text-purple-500 dark:text-purple-400">
                TypeScript, Tailwind CSS, React, and Next.js
              </span>{' '}
              [and more...], using Git for collaborative projects.
            </p>
            <p className="mt-2 md:mt-4 text-sm md:text-base text-gray-800 dark:text-gray-300">
              I&apos;ve developed{' '}
              <span className="text-purple-500 dark:text-purple-400">
                critical financial platforms
              </span>{' '}
              across Central America, including systems for Uber driver payments
              and{' '}
              <span className="text-purple-500 dark:text-purple-400">
                cross-border operations
              </span>
              . My work is driven by{' '}
              <span className="text-purple-500 dark:text-purple-400">
                autonomy and attention to detail
              </span>
              , always focusing on the end user. Outside of coding, I enjoy{' '}
              <span className="text-purple-500 dark:text-purple-400">
                crossfit, traveling
              </span>
              , and spending time with family, friends, and my pets.
            </p>
          </div>
          <div
            data-testid="image-container"
            className="relative w-48 h-48 md:w-72 md:h-72 rounded-full overflow-hidden flex-shrink-0"
          >
            <Image src="/me.jpg" alt="Levi Zepeda" width={500} height={500} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Browser;
