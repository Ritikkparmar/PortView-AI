import Navbar from "../Navbar/Navbar";
import "./Header.css";

const Header = () => {
  const homepage = "your-homepage-link-here"; // Replace with actual homepage link if needed

  return (
    <header className="header center">
      <h3>
        {homepage ? (
          <a href={homepage} className="link">
            Portfolio
          </a>
        ) : (
          "Portfolio"
        )}
      </h3>
      <Navbar />
    </header>
  );
};

export default Header;
