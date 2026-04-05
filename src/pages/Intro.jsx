import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import './IntroAnimation.css';

const introLines = [
    <>I am a Senior Software Engineer—an architect of scalable realms and distributed architectures. With over 6 years of deep study, I have mastered the <strong style={{ color: 'var(--color-accent-gold)' }}>Java</strong> incantations and <strong style={{ color: 'var(--color-accent-gold)' }}>Spring Boot</strong> rituals to forge clean, maintainable backend systems.</>,

    <>My grimoire includes event-driven spellcraft via <strong style={{ color: 'var(--color-accent-gold)' }}>Kafka</strong>, strategic caching, and the modernization of complex API gateways.</>,

    <>During my campaigns across the <strong style={{ color: 'white' }}>Cisco</strong> and <strong style={{ color: 'white' }}>Flipkart</strong> realms, my architectural transformations reduced latency by up to 40%, cut recovery times (MTTR) in half, and conjured over $5M+ in revenue impact.</>,

    <>Beyond the backend, I employ <strong style={{ color: 'var(--color-accent-gold)' }}>Selenium</strong> and <strong style={{ color: 'var(--color-accent-gold)' }}>Robot Framework</strong> to automate the mundane and ensure absolute reliability. I prefer battle-tested, production-ready constructs over pure theoretical alchemy.</>,

    <><div style={{ borderLeft: '2px solid var(--color-accent-gold)', paddingLeft: '1.2rem', fontStyle: 'italic', color: 'var(--color-accent-gold)' }}>Proceed with intention. The artifacts enclosed contain a perfect balance of system design thinking and implementation mastery.</div></>
];

function TransitionSmoke({ active }) {
    if (!active) return null;
    return createPortal(
        <div className="global-transition-smoke"></div>,
        document.body
    );
}

function MindReaderModal({ active }) {
    return createPortal(
        <div className={`mind-reader-modal ${active ? 'visible' : ''}`}>
            <div className="mind-reader-content">
                <div className="eye-icon">👁️</div>
                <h3 style={{ margin: '1rem 0 0.5rem', color: 'var(--color-accent-gold)', fontFamily: 'var(--font-serif)', fontSize: '2rem' }}>I am reading your mind...</h3>
                <p style={{ color: '#aaa', fontSize: '1rem', letterSpacing: '1px' }}>Please absorb the current passage fully before proceeding.</p>
            </div>
        </div>,
        document.body
    );
}

function WavyText({ text }) {
    return (
        <div className="wavy-text-container">
            {text.split('').map((char, index) => (
                <span key={index} style={{ animationDelay: `${index * 0.05}s` }}>
                    {char}
                </span>
            ))}
        </div>
    );
}

export default function Intro({ onComplete }) {
    const [currentLine, setCurrentLine] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [isLocked, setIsLocked] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [hintVisible, setHintVisible] = useState(true);

    const containerRef = useRef(null);

    useEffect(() => {
        if (currentLine === introLines.length - 1 && onComplete) onComplete();
    }, [currentLine, onComplete]);

    useEffect(() => {
        const timer = setTimeout(() => setIsLocked(false), 3000);
        return () => clearTimeout(timer);
    }, []);

    const triggerModal = () => {
        if (!showModal) {
            setShowModal(true);
            setTimeout(() => setShowModal(false), 2500);
        }
    };

    useEffect(() => {
        let accumulatedDelta = 0;

        const handleSlideAttempt = (delta) => {
            if (isTransitioning) return;

            accumulatedDelta += delta;

            if (accumulatedDelta > 30) {
                accumulatedDelta = 0;
                if (currentLine === introLines.length - 1) return;
                if (isLocked) { triggerModal(); return; }
                performTransition(currentLine + 1);
            } else if (accumulatedDelta < -30) {
                accumulatedDelta = 0;
                if (currentLine === 0) return;
                if (isLocked) { triggerModal(); return; }
                performTransition(currentLine - 1);
            }
        };

        const handleWheel = (e) => {
            e.preventDefault();
            handleSlideAttempt(e.deltaY);
        };

        let touchStartY = 0;
        const handleTouchStart = (e) => {
            touchStartY = e.touches[0].clientY;
        };
        const handleTouchEnd = (e) => {
            const deltaY = touchStartY - e.changedTouches[0].clientY;
            handleSlideAttempt(deltaY * 2);
        };

        const container = containerRef.current;
        if (container) {
            container.addEventListener('wheel', handleWheel, { passive: false });
            container.addEventListener('touchstart', handleTouchStart, { passive: false });
            container.addEventListener('touchend', handleTouchEnd, { passive: false });
        }
        return () => {
            if (container) {
                container.removeEventListener('wheel', handleWheel);
                container.removeEventListener('touchstart', handleTouchStart);
                container.removeEventListener('touchend', handleTouchEnd);
            }
        }
    }, [currentLine, isTransitioning, isLocked, showModal]);

    const performTransition = (newLine) => {
        setHintVisible(false);
        setIsTransitioning(true);

        // At the absolute peak of the smoke thickness (1.2s), swap the text to the next state!
        setTimeout(() => {
            setCurrentLine(newLine);
            setIsTransitioning(false); // Text begins fading IN gracefully as the smoke thins out
        }, 1200);

        // After the transition clears completely, enforce the reading lock.
        setTimeout(() => {
            setIsLocked(true);
            // Unlock after exactly 2.5s of reading time.
            setTimeout(() => setIsLocked(false), 2500);
        }, 2400); // 2.4s (wait for smoke to completely end)
    };

    const handleContainerClick = () => {
        if (isTransitioning) return;
        if (currentLine === introLines.length - 1) return;
        if (isLocked) { triggerModal(); return; }
        performTransition(currentLine + 1);
    };

    return (
        <div ref={containerRef} style={{ height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden', padding: '0 2rem' }}>

            <TransitionSmoke active={isTransitioning} />
            <MindReaderModal active={showModal} />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem', flexShrink: 0 }}>
                <h2 className="page-title" style={{ margin: 0 }}>The Archive</h2>
            </div>

            {hintVisible && (
                <div className="page-hint-banner">
                    <span className="hint-hand">👆</span>
                    <span>Scroll down or click below to read each passage</span>
                </div>
            )}

            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

                <div style={{ height: '65%', width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
                    <div
                        className="page-text"
                        style={{
                            fontSize: '1.25rem',
                            lineHeight: '2.1',
                            transition: 'all 1.2s ease-in-out',
                            opacity: isTransitioning ? 0 : 1,
                            transform: isTransitioning ? 'scale(0.95) translateY(10px)' : 'scale(1) translateY(0)',
                            textShadow: isTransitioning ? '0 0 20px rgba(226,192,68,0.8)' : 'none',
                            textAlign: 'left'
                        }}
                    >
                        {introLines[currentLine]}
                    </div>
                </div>

            </div>

            <div
                onClick={handleContainerClick}
                style={{
                    textAlign: 'center',
                    color: 'var(--color-accent-gold-dim)',
                    fontSize: '0.75rem',
                    letterSpacing: '3px',
                    transition: 'all 0.5s ease',
                    opacity: isTransitioning ? 0 : 0.8,
                    marginBottom: '1rem',
                    cursor: isLocked ? 'not-allowed' : 'pointer',
                    flexShrink: 0
                }}
            >
                {currentLine + 1} / {introLines.length} {isLocked ? ' — FORMING...' : ' — CLICK OR SLIDE TO PROGRESS'}
            </div>

        </div>
    );
}
