'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

const roles = [
  'Frontend', 'Backend', 'DevOps', 'Full Stack', 'AI Engineer', 
  'Data Analyst', 'AI and Data Scientist', 'Android', 'iOS', 'PostgreSQL', 
  'Blockchain', 'QA', 'Software Architect', 'Cyber Security', 'UX Design', 
  'Game Developer', 'Technical Writer', 'MLOps', 'Product Manager', 
  'Engineering Manager', 'Developer Relations', 'DSA', "Prompt Engineering"
];

const roleLinks: Record<string, string> = {
  'Frontend': 'https://roadmap.sh/pdfs/roadmaps/frontend.pdf',
  'Backend': 'https://docs.google.com/backend',
  'DevOps': 'https://docs.google.com/devops',
  // Add links for all roles...
};

export default function Hero() {
  const router = useRouter();

  const handleRoleClick = (role: string) => {
    const url = roleLinks[role] || 'https://docs.google.com/default';
    window.open(url, '_blank');
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center text-white p-6">
      <h1 className="text-4xl font-bold mb-6 text-center">Role-based Roadmaps</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full max-w-5xl">
        {roles.map((role, index) => (
          <motion.button
            key={role}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="h-16 w-full border-2 hover:border-none rounded-lg flex items-center justify-between px-4 font-semibold cursor-pointer transition-all hover:bg-[#7d47ea]"
            onClick={() => handleRoleClick(role)}
          >
            {role}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
