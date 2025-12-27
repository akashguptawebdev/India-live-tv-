const Footer = () => {
  return (
    <footer className="app-footer">
      <div className="footer-inner">
        <p>© {new Date().getFullYear()} IPTV Player</p>
        <div className="footer-links">
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="#">Contact</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
