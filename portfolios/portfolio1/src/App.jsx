import { useContext, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ThemeContext } from './context/theme';
import { AppContext } from './context/ParentContext';
import Header from './components/Header/Header';
import About from './components/About/About';
import Projects from './components/Projects/Projects';
import Skills from './components/Skills/Skills';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';
import Loader from './components/Loader/loader';
import './App.css';

const App = () => {
  const [{ themeName }] = useContext(ThemeContext);
  const { setUser } = useContext(AppContext);
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', themeName);
  }, [themeName]);

  useEffect(() => {
    const userId = searchParams.get('id');
    if (!userId) {
      setLoading(false);
      return;
    }

    const controller = new AbortController(); // Create an AbortController
    const { signal } = controller;

    const fetchUserData = async () => {
      try {
        const response = await fetch(`https://career-craft-ai-server.vercel.app/user/find/${userId}`, { signal });
        if (!response.ok) throw new Error('Failed to fetch user data');

        const data = await response.json();
        console.log("Profile data: ", data)
        setUser(data.profile);
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error('Error fetching user:', error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();

    return () => {
      controller.abort(); // Cleanup function to abort request
    };
  }, [searchParams, setUser]);

  if (loading) return <Loader />;

  return (
    <div id="top" className={`${themeName} app`}>
      <Header />

      <main>
        <About />
        <Projects />
        <Skills />
        <Contact />
      </main>

      <ScrollToTop />
      <Footer />
    </div>
  );
};

export default App;