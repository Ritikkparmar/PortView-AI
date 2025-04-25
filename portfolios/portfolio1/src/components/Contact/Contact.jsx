import { useContext } from "react";
import { AppContext } from "../../context/ParentContext"; // Import AppContext
import "./Contact.css";

const Contact = () => {
  const { user } = useContext(AppContext); // Access user data from context
  console.log("User data in Contact:", user);

  if (!user || !user.emailAddress) {
    return null;
  }

  return (
    <section className="section contact center" id="contact">
      <h2 className="section__title">Contact</h2>
      <div className="contact__info">
        {user.emailAddress && (
          <p>
            <span>Email: </span>
            <a href={`mailto:${user.emailAddress}`}>{user.emailAddress}</a>
          </p>
        )}
        {user.phoneNumber && (
          <p>
            <span>Phone: </span>
            <a href={`tel:${user.phoneNumber}`}>{user.phoneNumber}</a>
          </p>
        )}
        {user.socialLinks?.website && (
          <p>
            <span>Website: </span>
            <a href={user.socialLinks.website} target='_blank' rel='noreferrer'>
              {user.socialLinks.website}
            </a>
          </p>
        )}
      </div>
    </section>
  );
};

export default Contact;