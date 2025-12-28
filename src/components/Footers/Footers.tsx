const Footers = () => {
  return (
    <footer className="flex flex-col md:flex-row gap-3 items-center justify-around w-full py-4 text-sm dark:bg-neutral-950 bg-gray-100 dark:text-white/70">
      <p>Copyright © 2025 Istiak Ahmed Saad. All rights reservered.</p>
      <div className="flex items-center gap-4">
        <a href="#" className="hover:text-white transition-all">
          Contact Us
        </a>
        <div className="h-8 w-px bg-white/20"></div>
        <a href="#" className="hover:text-white transition-all">
          Privacy Policy
        </a>
        <div className="h-8 w-px bg-white/20"></div>
        <a href="#" className="hover:text-white transition-all">
          Trademark Policy
        </a>
      </div>
    </footer>
  );
};

export default Footers;
