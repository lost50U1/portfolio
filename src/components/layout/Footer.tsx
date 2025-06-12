const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-border relative z-10 mt-12 border-t py-8">
      <div className="container mx-auto">
        <div className="text-foreground/70 text-center">
          <p>© {currentYear} Biruk&apos;s Portfolio. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
