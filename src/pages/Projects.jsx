import React, { useState } from 'react';
import SortingHat from '../components/SortingHat';
import './ProjectsAnimation.css';

const projectsData = [
    {
        id: 1,
        name: "SecureClaw",
        description: "Secure your bots in one click. An innovative daemon wrapper shielding AI agents with comprehensive execution and threat-monitoring.",
        url: "https://github.com/KouHegde/SecureClaw"
    },
    {
        id: 2,
        name: "Analyzer",
        description: "Understand what your agent is writing. Perform rigorous security checks, generate visual architecture graphs, and enforce powerful CI/CD gating.",
        url: "https://github.com/KouHegde/Analyzer"
    },
    {
        id: 3,
        name: "Agent-Framework",
        description: "A centralized architecture designed to seamlessly combine and multiplex multiple MCP servers required to instantiate complex AI agents.",
        url: "https://github.com/KouHegde/agent-framewrok"
    },
    {
        id: 4,
        name: "Agent-Brain",
        description: "The core cognitive processor and memory engine driving the centralized Agent Framework computations.",
        url: "https://github.com/KouHegde/Agent-brain"
    },
    {
        id: 5,
        name: "ConceptBoost",
        description: "Call it before you send. An integrated IntelliJ plugin augmenting IDE capabilities directly into the AI coding pipeline.",
        url: "https://github.com/KouHegde/conceptboost-intellij-plugin"
    }
];

const runeSymbols = ['⚝', '◈', '✶', '⎈', '⬡', '☽', '⟡', '✧', '⊛', '⌬'];

function WandMagic({ active }) {
    if (!active) return null;

    return (
        <div className="wand-magic-container">
            {/* Arcane runes that fly out spinning */}
            {[...Array(10)].map((_, i) => {
                const angle = (i / 10) * Math.PI * 2 + (Math.random() - 0.5) * 0.6;
                const dist = 120 + Math.random() * 200;
                return (
                    <div
                        key={`rune-${i}`}
                        className="arcane-rune"
                        style={{
                            '--rx': `${Math.cos(angle) * dist}px`,
                            '--ry': `${Math.sin(angle) * dist}px`,
                            '--spin': `${360 + Math.random() * 720}deg`,
                            animationDelay: `${i * 0.06}s`,
                        }}
                    >
                        {runeSymbols[i]}
                    </div>
                );
            })}

            {/* Golden embers that drift upward */}
            {[...Array(20)].map((_, i) => {
                const spread = (Math.random() - 0.5) * 300;
                const rise = -(100 + Math.random() * 250);
                return (
                    <div
                        key={`ember-${i}`}
                        className="golden-ember"
                        style={{
                            '--ex': `${spread}px`,
                            '--ey': `${rise}px`,
                            animationDelay: `${Math.random() * 0.5}s`,
                            animationDuration: `${1.2 + Math.random() * 0.8}s`,
                        }}
                    />
                );
            })}

            {/* Light arc trail */}
            <div className="spell-arc"></div>
        </div>
    );
}

export default function Projects({ onComplete }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [wandState, setWandState] = useState('ready');
    const [isCasting, setIsCasting] = useState(false);
    const [sparkKey, setSparkKey] = useState(0);
    const [seenProjects, setSeenProjects] = useState(new Set());
    const [hintVisible, setHintVisible] = useState(true);

    const handleClick = () => {
        if (isCasting) return;
        setHintVisible(false);

        if (wandState === 'ready') {
            setIsCasting(true);
            setWandState('casting');
            setSparkKey(prev => prev + 1);

            setTimeout(() => {
                setWandState('revealed');
                setSeenProjects(prev => {
                    const updated = new Set(prev);
                    updated.add(currentIndex);
                    if (updated.size === projectsData.length && onComplete) onComplete();
                    return updated;
                });
                setIsCasting(false);
            }, 1200);
        } else if (wandState === 'revealed') {
            setIsCasting(true);
            setWandState('dismiss');

            setTimeout(() => {
                setCurrentIndex((prev) => (prev + 1) % projectsData.length);
                setWandState('ready');
                setIsCasting(false);
            }, 800);
        }
    };

    const project = projectsData[currentIndex];
    const isRevealed = wandState === 'revealed';

    return (
        <div className="project-page-container" onClick={handleClick}>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '0.5rem', marginTop: '1rem' }}>
                <div className="wand-instruction">
                    {isRevealed ? '✦ CLICK TO CONJURE NEXT ARTIFACT ✦' : '✦ CLICK TO CAST THE SPELL ✦'}
                </div>
                {hintVisible && (
                    <div style={{ marginTop: '0.5rem' }}>
                        <SortingHat message="Click anywhere to wave the wand and reveal each project..." />
                    </div>
                )}
            </div>

            <div style={{ flex: 1, position: 'relative', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

                {/* Magic Wand */}
                <div className={`wand-wrapper ${wandState}`}>
                    <div className="magic-wand">
                        <div className="wand-handle"></div>
                        <div className="wand-shaft"></div>
                        <div className="wand-tip">✦</div>
                    </div>
                    <WandMagic key={sparkKey} active={wandState === 'casting'} />
                </div>

                {/* Project Card */}
                <div className={`project-card-magic ${isRevealed ? 'revealed' : ''} ${wandState === 'dismiss' ? 'dismissing' : ''}`}>
                    <div className="project-title-xl">{project.name}</div>
                    <div className="project-desc-xl">{project.description}</div>

                    <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-btn-glow"
                        onClick={(e) => {
                            if (!isRevealed) {
                                e.preventDefault();
                            } else {
                                e.stopPropagation();
                            }
                        }}
                    >
                        Inspect Repository
                    </a>
                </div>
            </div>

            <div style={{ textAlign: 'center', color: 'var(--color-accent-gold-dim)', fontStyle: 'italic', letterSpacing: '4px', fontSize: '0.75rem', marginTop: '1.5rem', marginBottom: '0.5rem' }}>
                ARTIFACT {currentIndex + 1} OF {projectsData.length}
            </div>
        </div>
    );
}
