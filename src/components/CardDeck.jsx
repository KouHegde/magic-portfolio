import React, { useState, useEffect, useRef } from 'react';

const homeLinks = [
    { id: 'intro', label: 'The Archive', desc: 'Who I am and what I do' },
    { id: 'skills', label: 'Disciplines', desc: 'Technologies and tools I wield' },
    { id: 'reveal', label: 'Grimoire', desc: 'Professional experience and history' },
    { id: 'projects', label: 'Artifacts', desc: 'Projects I have conjured' },
    { id: 'contact', label: 'Establish Link', desc: 'Send me a transmission' },
];

export default function CardDeck({ activePage, PageContent, onNext, onPrev, onComplete, onNavigate }) {
    const [isFlipped, setIsFlipped] = useState(false);
    const [curtainOpen, setCurtainOpen] = useState(false);
    const [internalPageContent, setInternalPageContent] = useState(() => PageContent);
    const [pageTransition, setPageTransition] = useState(false);
    const prevPageRef = useRef(activePage);

    useEffect(() => {
        if (prevPageRef.current === activePage) return;
        prevPageRef.current = activePage;

        if (isFlipped && pageTransition) {
            setTimeout(() => {
                setInternalPageContent(() => PageContent);
                setPageTransition(false);
            }, 300);
        } else if (isFlipped && !pageTransition) {
            setPageTransition(true);
            setTimeout(() => {
                setInternalPageContent(() => PageContent);
                setPageTransition(false);
            }, 300);
        } else if (!isFlipped) {
            setInternalPageContent(() => PageContent);
            setCurtainOpen(true);
            setTimeout(() => setIsFlipped(true), 100);
        }
    }, [activePage, PageContent]);

    const handleSectionClick = (pageId) => {
        onNavigate(pageId);
        setTimeout(() => setIsFlipped(true), 100);
    };

    const handleBackToPortal = (e) => {
        e.stopPropagation();
        setIsFlipped(false);
        setCurtainOpen(false);
    };

    const handleCurtainOpen = () => {
        if (!curtainOpen) setCurtainOpen(true);
    };

    const handlePrevPage = (e) => {
        e.stopPropagation();
        setPageTransition(true);
        onPrev();
    };

    const handleNextPage = (e) => {
        e.stopPropagation();
        setPageTransition(true);
        onNext();
    };

    const ActiveComponent = internalPageContent;

    return (
        <div className="card-container-wrapper">
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', height: '100%' }}>
                <div className={`magic-card-outer ${isFlipped ? 'flipped' : ''}`}>

                    <div
                        className={`card-face card-front ${curtainOpen ? 'curtains-open' : ''}`}
                        onClick={handleCurtainOpen}
                    >
                        <div className="smoke-layer"></div>

                        {/* Full closed curtains */}
                        <div className="curtain-full curtain-full-left"></div>
                        <div className="curtain-full curtain-full-right"></div>
                        <div className="curtain-valance"></div>

                        {/* Rope & tassel decoration on closed curtain */}
                        <div className="curtain-rope curtain-rope-left"></div>
                        <div className="curtain-rope curtain-rope-right"></div>

                        {/* Click prompt (visible when closed) */}
                        <div className="curtain-prompt">
                            <div className="prompt-glow"></div>
                            <span className="prompt-icon">✧</span>
                            <p className="prompt-text">Click to raise the curtain</p>
                            <span className="prompt-subtext">The show is about to begin</span>
                        </div>

                        {/* Spotlight beams */}
                        <div className="spotlight spotlight-1"></div>
                        <div className="spotlight spotlight-2"></div>
                        <div className="spotlight spotlight-center"></div>

                        {/* Stage dust particles */}
                        <div className="stage-dust">
                            {Array.from({ length: 40 }).map((_, i) => (
                                <div
                                    key={i}
                                    className="dust-mote"
                                    style={{
                                        '--dx': `${Math.random() * 100}%`,
                                        '--dy': `${Math.random() * 100}%`,
                                        '--drift': `${(Math.random() - 0.5) * 60}px`,
                                        '--dur': `${4 + Math.random() * 6}s`,
                                        '--del': `${Math.random() * 8}s`,
                                        '--sz': `${1 + Math.random() * 3}px`,
                                    }}
                                />
                            ))}
                        </div>

                        <div className="home-content">
                            <div className="home-header">
                                <div className="stage-stars">
                                    <span className="stage-star s1">✦</span>
                                    <span className="stage-star s2">✧</span>
                                    <span className="stage-star s3">✦</span>
                                </div>
                                <p className="home-welcome">Welcome to the show</p>
                                <h1 className="home-title">Koushik Hegde</h1>
                                <p className="home-role">Senior Software Engineer</p>
                                <div className="home-divider"></div>
                            </div>

                            <nav className="home-nav">
                                {homeLinks.map((link, i) => (
                                    <button
                                        key={link.id}
                                        className="home-nav-item"
                                        onClick={(e) => { e.stopPropagation(); handleSectionClick(link.id); }}
                                        style={{ animationDelay: `${1.8 + i * 0.15}s` }}
                                    >
                                        <span className="home-nav-number">{'0' + (i + 1)}</span>
                                        <span className="home-nav-label">{link.label}</span>
                                        <span className="home-nav-desc">{link.desc}</span>
                                        <span className="home-nav-arrow">→</span>
                                    </button>
                                ))}
                            </nav>

                            <div className="home-footer">✧ SELECT AN ACT TO BEGIN ✧</div>
                        </div>
                    </div>

                    <div className="card-face card-back" onClick={(e) => e.stopPropagation()}>
                        <div className={`page-content ${pageTransition ? 'page-swapping' : ''}`}>
                            {ActiveComponent && <ActiveComponent onComplete={onComplete} />}
                        </div>

                        <div className="page-nav-controls">
                            <button className="nav-btn" onClick={handlePrevPage}>
                                ← Prev Page
                            </button>
                            <button className="nav-btn" onClick={handleBackToPortal}>
                                ◈ Home
                            </button>
                            <button className="nav-btn" onClick={handleNextPage} style={{ color: 'var(--color-accent-gold)' }}>
                                Next Page →
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
