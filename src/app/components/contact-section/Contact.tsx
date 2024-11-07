'use client';
import { ExternalLink, FileDown, Linkedin, Mail } from 'lucide-react';
import React from 'react';

const Contact: React.FC = () => {
  const email = 'levi.zepeda06@gmail.com';
  const linkedIn = 'https://www.linkedin.com/in/levi-zepeda-96090494/';

  return (
    <section
      data-testid="contact-section"
      id="contact"
      className="relative py-24 bg-white dark:bg-gray-900 overflow-hidden"
    >
      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Let&apos;s Connect
          </h2>

          <div className="w-24 h-1 bg-emerald-500 mx-auto mb-8 rounded-full" />

          <p className="text-xl mb-12 text-gray-600 dark:text-gray-300 leading-relaxed">
            I&apos;m always excited to connect with fellow developers, discuss
            innovative projects, or explore new opportunities in the tech world.
          </p>

          <div className="flex flex-col items-center space-y-8">
            <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
              <a
                href={`mailto:${email}`}
                className="group relative flex items-center gap-3 px-8 py-4 text-lg font-medium text-white bg-emerald-600 rounded-xl hover:bg-emerald-700 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-emerald-500/25"
              >
                <Mail className="w-5 h-5" />
                <span>Send me an email</span>
                <ExternalLink className="w-4 h-4 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
              </a>

              <a
                href="/levizepeda cv.pdf"
                download
                className="group relative flex items-center gap-3 px-8 py-4 text-lg font-medium text-emerald-600 border-2 border-emerald-600 rounded-xl hover:text-white hover:bg-emerald-600 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-emerald-500/25"
              >
                <FileDown className="w-5 h-5" />
                <span>Download Resume</span>
                <ExternalLink className="w-4 h-4 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
              </a>
            </div>

            <div className="flex flex-col items-center space-y-4">
              <p className="text-gray-500 dark:text-gray-400 text-center">
                Or find me on social media
              </p>

              <div className="flex gap-6 justify-center">
                <a
                  href={linkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col items-center gap-2 p-3 text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-all duration-300 hover:scale-110"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin className="w-7 h-7" />
                  <span className="text-sm font-medium opacity-0 group-hover:opacity-100 -translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    LinkedIn
                  </span>
                </a>
              </div>
            </div>

            <div className="pt-8 text-center">
              <p className="text-lg text-gray-500 dark:text-gray-400">
                Email me at{' '}
                <a
                  href={`mailto:${email}`}
                  className="text-emerald-600 dark:text-emerald-400 hover:underline font-medium"
                >
                  {email}
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
