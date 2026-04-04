import React, { useState, useCallback } from 'react';
import Sidebar from './components/Sidebar';
import CardDeck from './components/CardDeck';
import MagicalLetterModal from './components/MagicalLetterModal';
import Intro from './pages/Intro';
import Reveal from './pages/Reveal';
import Projects from './pages/Projects';
import Skills from './pages/Skills';
import Contact from './pages/Contact';

function App() {
    const [activePage, setActivePage] = useState('intro');
    const [completedPages, setCompletedPages] = useState(new Set(['contact']));
    const [pendingNav, setPendingNav] = useState(null);

    const pages = {
        intro: { component: Intro, title: 'Intro' },
        skills: { component: Skills, title: 'Skills' },
        reveal: { component: Reveal, title: 'Reveal' },
        projects: { component: Projects, title: 'Projects' },
        contact: { component: Contact, title: 'Contact' }
    };

    const markComplete = useCallback((pageId) => {
        setCompletedPages(prev => {
            const updated = new Set(prev);
            updated.add(pageId);
            return updated;
        });
    }, []);

    const tryNavigate = (navAction) => {
        if (completedPages.has(activePage)) {
            navAction();
        } else {
            setPendingNav(() => navAction);
        }
    };

    const handleNext = () => {
        const keys = Object.keys(pages);
        const currentIndex = keys.indexOf(activePage);
        const nextIndex = (currentIndex + 1) % keys.length;
        setActivePage(keys[nextIndex]);
    };

    const handlePrev = () => {
        const keys = Object.keys(pages);
        const currentIndex = keys.indexOf(activePage);
        const prevIndex = (currentIndex - 1 + keys.length) % keys.length;
        setActivePage(keys[prevIndex]);
    };

    const handleSidebarNav = (pageId) => {
        if (pageId === activePage) return;
        tryNavigate(() => setActivePage(pageId));
    };

    const handleModalStay = () => {
        setPendingNav(null);
    };

    const handleModalLeave = () => {
        if (pendingNav) pendingNav();
        setPendingNav(null);
    };

    return (
        <div className="app-container">
            <div className="main-content">
                <CardDeck
                    activePage={activePage}
                    PageContent={pages[activePage].component}
                    onNext={() => tryNavigate(handleNext)}
                    onPrev={() => tryNavigate(handlePrev)}
                    onComplete={() => markComplete(activePage)}
                    onNavigate={(pageId) => setActivePage(pageId)}
                />
            </div>
            <Sidebar activePage={activePage} setActivePage={handleSidebarNav} />

            {pendingNav && (
                <MagicalLetterModal
                    page={activePage}
                    onStay={handleModalStay}
                    onLeave={handleModalLeave}
                />
            )}
        </div>
    );
}

export default App;
