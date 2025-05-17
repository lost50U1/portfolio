import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border py-8 relative z-10 mt-12">
      <div className="container mx-auto">
        <div className="text-center text-foreground/70">
          <p>© {currentYear} Biruk's Portfolio. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
