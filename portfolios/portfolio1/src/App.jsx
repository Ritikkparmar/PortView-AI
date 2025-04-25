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
  const { user, setUser } = useContext(AppContext);
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dataFetched, setDataFetched] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', themeName);
  }, [themeName]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = searchParams.get('id');
        if (!userId) {
          setError('No user ID provided');
          setLoading(false);
          return;
        }

        console.log('Fetching user data for ID:', userId);
        const response = await fetch(`http://localhost:5000/user/find/${userId}`, {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch user data: ${response.status}`);
        }

        const data = await response.json();
        console.log("Raw user data received:", data);

        if (!data) {
          throw new Error('No data received from server');
        }

        if (!data.profile) {
          console.error('Profile data is missing:', data);
          throw new Error('Profile data not found');
        }

        console.log("Setting user profile data:", data.profile);
        setUser(data.profile);
      } catch (error) {
        console.error('Error fetching user:', error);
        setError(error.message);
      } finally {
        setLoading(false);
        setDataFetched(true);
      }
    };

    if (!dataFetched) {
      fetchUserData();
    }
  }, [searchParams, setUser, dataFetched]);

  if (loading) {
    return (
      <div className="loading-container" style={{ 
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#1a1a1a'
      }}>
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-message" style={{ 
        color: 'white', 
        textAlign: 'center', 
        padding: '2rem',
        marginTop: '2rem'
      }}>
        <h2>Error Loading Profile</h2>
        <p>{error}</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="error-message" style={{ 
        color: 'white', 
        textAlign: 'center', 
        padding: '2rem',
        marginTop: '2rem'
      }}>
        <h2>No Profile Data</h2>
        <p>Unable to load profile data. Please try again later.</p>
      </div>
    );
  }

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