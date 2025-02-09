import { useContext } from "react";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { AppContext } from "../../context/ParentContext"; // Import AppContext
import "./About.css";

const About = () => {
  const { user } = useContext(AppContext); // Access user data from context

  const { fullName, role, bio, resume, socialLinks } = user;

  return (
    <div className="about center">
      {fullName && (
        <h1>
          Hi, I am <span className="about__name">{fullName}.</span>
        </h1>
      )}

      {role && <h2 className="about__role">A {role}.</h2>}
      <p className="about__desc">{bio}</p>

      <div className="about__contact center">
        {resume && (
          <a href={resume} target="_blank" rel="noopener noreferrer">
            <span className="btn btn--outline">Resume</span>
          </a>
        )}

        {socialLinks?.github && (
          <a
            href={socialLinks.github}
            aria-label="github"
            className="link link--icon"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GitHubIcon />
          </a>
        )}

        {socialLinks?.linkedin && (
          <a
            href={socialLinks.linkedin}
            aria-label="linkedin"
            className="link link--icon"
            target="_blank"
            rel="noopener noreferrer"
          >
            <LinkedInIcon />
          </a>
        )}
      </div>
    </div>
  );
};

export default About;