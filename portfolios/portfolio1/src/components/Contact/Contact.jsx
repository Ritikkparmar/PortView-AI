import { useContext } from "react";
import { AppContext } from "../../context/ParentContext"; // Import AppContext
import "./Contact.css";

const Contact = () => {
  const { user } = useContext(AppContext); // Access user data from context

  if (!user?.emailAddress) return null;

  return (
    <section className="section contact center" id="contact">
      <h2 className="section__title">Contact</h2>
      <a href={`mailto:${user.emailAddress}`}>
        <span className="btn btn--outline">Email me</span>
      </a>
    </section>
  );
};

export default Contact;