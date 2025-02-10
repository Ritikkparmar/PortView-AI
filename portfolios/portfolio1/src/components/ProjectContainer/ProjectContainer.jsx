import { useContext } from 'react';
import { AppContext } from '../../context/ParentContext';
import uniqid from 'uniqid';
import GitHubIcon from '@mui/icons-material/GitHub';
import LaunchIcon from '@mui/icons-material/Launch';
import './ProjectContainer.css';

const ProjectContainer = ({ projectIndex }) => {
  const { user } = useContext(AppContext);
  const project = user.projects[projectIndex];

  if (!project) return null;

  return (
    <div className="project">
      <h3>{project.name}</h3>
      <p className="project__description">{project.description}</p>

      {project.imgLink && (
        <img src={project.imgLink} alt={project.name} className="project__image" />
      )}

      {project?.stack?.length > 0 && (
        <ul className="project__stack">
          {project.stack.map((item) => (
            <li key={uniqid()} className="project__stack-item">
              {item}
            </li>
          ))}
        </ul>
      )}

      <div className="project__links">
        {project.SourceCode && (
          <a
            href={project.SourceCode}
            aria-label="source code"
            className="link link--icon"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GitHubIcon />
          </a>
        )}

        {project.livePreview && (
          <a
            href={project.livePreview}
            aria-label="live preview"
            className="link link--icon"
            target="_blank"
            rel="noopener noreferrer"
          >
            <LaunchIcon />
          </a>
        )}
      </div>
    </div>
  );
};

export default ProjectContainer;