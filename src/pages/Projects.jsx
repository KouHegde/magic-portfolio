import React, { useState } from 'react';
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

function SpiderWebText({ text }) {
    return (
        <div className="spider-web-text-wrapper">
            <div className="web-line web-line-1"></div>
            <div className="web-line web-line-2"></div>
            <div className="web-line web-line-3"></div>
            <div className="web-line web-line-4"></div>
            <div className="web-text-glow">{text}</div>
        </div>
    );
}

export default function Projects() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [chainState, setChainState] = useState('chained'); // 'form', 'chained', 'shatter', 'unleashed'
    const [isTransitioning, setIsTransitioning] = useState(false);

    const handleClick = () => {
        if (isTransitioning) return;

        if (chainState === 'chained' || chainState === 'form') {
            if (chainState === 'form') return; // Hard block if still forming

            // Shatter the chains!
            setIsTransitioning(true);
            setChainState('shatter');
            setTimeout(() => {
                setChainState('unleashed');
                setIsTransitioning(false);
            }, 1000);
        } else if (chainState === 'unleashed') {
            // Swap to next project
            setIsTransitioning(true);
            setChainState('form');

            setTimeout(() => {
                setCurrentIndex((prev) => (prev + 1) % projectsData.length);
            }, 300);

            setTimeout(() => {
                setChainState('chained');
                setIsTransitioning(false);
            }, 600);
        }
    };

    const project = projectsData[currentIndex];
    const isCardUnleashed = chainState === 'shatter' || chainState === 'unleashed';

    return (
        <div className="project-page-container" onClick={handleClick}>

            {/* Header Area */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '1rem', marginTop: '1rem' }}>
                <SpiderWebText text={chainState === 'unleashed' ? "CLICK TO BIND NEXT ARTIFACT" : "CLICK TO UNLEASH ARTIFACT"} />
            </div>

            {/* Massive Main Content Area */}
            <div style={{ flex: 1, position: 'relative', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

                {/* The Chain Overlay */}
                {(chainState === 'form' || chainState === 'chained' || chainState === 'shatter') && (
                    <div className={`chain-container ${chainState}`}>
                        <div className="chain-left"></div>
                        <div className="chain-right"></div>
                        <div className="padlock">
                            <div className="padlock-keyhole"></div>
                        </div>
                    </div>
                )}

                {/* The Bound Project Card */}
                <div className={`chained-project-card ${isCardUnleashed ? 'unleashed' : ''}`}>
                    <div className="project-title-xl">{project.name}</div>
                    <div className="project-desc-xl">{project.description}</div>

                    <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-btn-glow"
                        onClick={(e) => {
                            if (!isCardUnleashed) {
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
