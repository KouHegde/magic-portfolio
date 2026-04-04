import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import CardDeck from './components/CardDeck';
import Intro from './pages/Intro';
import Reveal from './pages/Reveal';
import Projects from './pages/Projects';
import Skills from './pages/Skills';
import Contact from './pages/Contact';

function App() {
    const [activePage, setActivePage] = useState('intro');

    const pages = {
        intro: { component: Intro, title: 'Intro' },
        reveal: { component: Reveal, title: 'Reveal' },
        projects: { component: Projects, title: 'Projects' },
        skills: { component: Skills, title: 'Skills' },
        contact: { component: Contact, title: 'Contact' }
    };

    const handleNext = () => {
        const keys = Object.keys(pages);
        const currentIndex = keys.indexOf(activePage);
        const nextIndex = (currentIndex + 1) % keys.length;
        setActivePage(keys[nextIndex]);
    };

    return (
        <div className="app-container">
            <div className="main-content">
                <header className="header">
                    <span className="header-icon">✧</span>
                    <span>ASTRA ARCHIVE</span>
                </header>

                <CardDeck
                    activePage={activePage}
                    PageContent={pages[activePage].component}
                    onNext={handleNext}
                />

            </div>
            <Sidebar activePage={activePage} setActivePage={setActivePage} />
        </div>
    );
}

export default App;
