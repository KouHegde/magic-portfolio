import React, { useState, useEffect } from 'react';

export default function CardDeck({ activePage, PageContent, onNext }) {
    const [isFlipped, setIsFlipped] = useState(false);
    const [internalPageContent, setInternalPageContent] = useState(() => PageContent);

    // Advanced transition effect: updating content when card is hidden
    useEffect(() => {
        // When sidebar is clicked (meaning activePage changes) we gently unflip if flipped
        if (isFlipped) {
            setIsFlipped(false);
            // Wait for unflip animation half-way before swapping content to not break illusion
            setTimeout(() => setInternalPageContent(() => PageContent), 400);
        } else {
            setInternalPageContent(() => PageContent);
        }
    }, [activePage, PageContent]);

    const handleCardClick = () => {
        if (!isFlipped) {
            setIsFlipped(true);
        }
    };

    const handleBackToPortal = (e) => {
        e.stopPropagation();
        setIsFlipped(false);
    };

    const handleNextPage = (e) => {
        e.stopPropagation();
        // Quickly unflip, trigger next, then wait and re-flip
        setIsFlipped(false);
        setTimeout(() => {
            onNext();
            // Auto flip to the new one after a short delay
            setTimeout(() => setIsFlipped(true), 600);
        }, 500);
    };

    // Ensures components re-render fresh
    const ActiveComponent = internalPageContent;

    return (
        <div className="card-container-wrapper">
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', height: '100%' }}>
                <div className={`magic-card-outer ${isFlipped ? 'flipped' : ''}`} onClick={handleCardClick}>

                    {/* Card Front (The Portal) */}
                    <div className="card-face card-front">
                        <div className="smoke-layer"></div>
                        <div className="card-front-content">
                            <div className="portal-icon"></div>
                            <h1 className="card-title">Step into the unknown.</h1>
                            <div className="card-subtitle">Click to reveal</div>
                        </div>
                    </div>

                    {/* Card Back (The Page Content) */}
                    <div className="card-face card-back" onClick={(e) => e.stopPropagation() /* Prevent flipping when interacting inside */}>
                        <div className="page-content">
                            {ActiveComponent && <ActiveComponent />}
                        </div>

                        <div className="page-nav-controls">
                            <button className="nav-btn" onClick={handleBackToPortal}>
                                ← Back to Portal
                            </button>
                            <button className="nav-btn" onClick={handleNextPage} style={{ color: 'var(--color-accent-gold)' }}>
                                Next Page →
                            </button>
                        </div>
                    </div>

                </div>

                {/* Navigation Indicator under the card */}
                <div className="card-indicator">
                    <div className="arrow-up">^</div>
                    <div className="dot"></div>
                    <div className="arrow-down">v</div>
                </div>
            </div>
        </div>
    );
}
