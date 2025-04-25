import { useContext } from 'react';
import { AppContext } from '../../context/ParentContext';
import uniqid from 'uniqid';
import './Skills.css';

const Skills = () => {
  const { user } = useContext(AppContext);
  console.log("User data in Skills:", user);

  if (!user || !user.skills || user.skills.length === 0) {
    return null;
  }

  return (
    <section className='section skills' id='skills'>
      <h2 className='section__title'>Skills</h2>
      <ul className='skills__list'>
        {user.skills.map((skill) => (
          <li key={uniqid()} className='skills__list-item btn btn--plain'>
            {skill}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Skills;