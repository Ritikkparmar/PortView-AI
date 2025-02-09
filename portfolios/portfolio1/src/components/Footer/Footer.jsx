import { useContext } from "react";
import { AppContext } from "../../context/ParentContext"; // Import AppContext
import "./Footer.css";

const Footer = () => {
  const { user } = useContext(AppContext); // Access user data

  return (
    <footer className="footer">
      <a href="https://github.com/rjshkhr/cleanfolio" className="link footer__link">
        Created By {user.fullName || "Anonymous"}
      </a>
    </footer>
  );
};

export default Footer;