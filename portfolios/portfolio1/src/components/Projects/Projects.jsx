import { useContext } from 'react';
import { AppContext } from '../../context/ParentContext';
import uniqid from 'uniqid';
import { FaGithub } from 'react-icons/fa';
import { FiExternalLink } from 'react-icons/fi';
import './Projects.css';

const Projects = () => {
  const { user } = useContext(AppContext);
  console.log("User data in Projects:", user);

  if (!user || !user.projects || user.projects.length === 0) {
    return null;
  }

  return (
    <section id='projects' className='section projects'>
      <h2 className='section__title'>Projects</h2>

      <div className='projects__grid'>
        {user.projects.map((project) => (
          <div key={uniqid()} className='project'>
            {project.imgLink && (
              <div className='project__image-container'>
                <img src={project.imgLink} alt={project.name} className='project__image' />
              </div>
            )}

            <h3>{project.name}</h3>

            <p className='project__description'>{project.description}</p>
            {project.stack && (
              <ul className='project__stack'>
                {project.stack.map((item) => (
                  <li key={uniqid()} className='project__stack-item'>
                    {item}
                  </li>
                ))}
              </ul>
            )}

            <div className='project__links'>
              {project.SourceCode && (
                <a
                  href={project.SourceCode}
                  aria-label='source code'
                  className='link link--icon'
                  target='_blank'
                  rel='noreferrer'
                >
                  <FaGithub />
                </a>
              )}

              {project.livePreview && (
                <a
                  href={project.livePreview}
                  aria-label='live preview'
                  className='link link--icon'
                  target='_blank'
                  rel='noreferrer'
                >
                  <FiExternalLink />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;