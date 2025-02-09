import { useContext } from 'react';
import { AppContext } from '../../context/ParentContext';
import ProjectContainer from '../ProjectContainer/ProjectContainer';
import './Projects.css';

const Projects = () => {
  const { user } = useContext(AppContext);
  const projects = user?.projects || [];

  if (!projects.length) return null;

  return (
    <section id="projects" className="section projects">
      <h2 className="section__title">Projects</h2>

      <div className="projects__grid">
        {projects.map((_, index) => (
          <ProjectContainer key={index} projectIndex={index} />
        ))}
      </div>
    </section>
  );
};

export default Projects;