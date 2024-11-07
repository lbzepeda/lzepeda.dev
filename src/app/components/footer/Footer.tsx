function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <p className="text-sm text-center text-gray-600 dark:text-gray-400">
          © {currentYear} Levi Zepeda. Built with ❤️ using Next.js & Tailwind
        </p>
      </div>
    </footer>
  );
}

export default Footer;
