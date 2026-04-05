import React, { useState, useMemo, useEffect, useRef } from 'react';
import './SkillsAnimation.css';

const skillCategories = [
    {
        title: 'Backend',
        skills: ['Java', 'Spring Boot', 'Spring Cloud Gateway', 'Quarkus', 'WebFlux', 'gRPC', 'REST APIs', 'Cassandra', 'Flink', 'Spark']
    },
    {
        title: 'Cloud & Infrastructure',
        skills: ['Kubernetes', 'AWS', 'GCP', 'CI/CD (Harness)', 'Git', 'Bitbucket']
    },
    {
        title: 'Data & Messaging',
        skills: ['Kafka', 'Redis', 'Elasticsearch', 'SQL', 'Real-time Streaming']
    },
    {
        title: 'Observability & Monitoring',
        skills: ['Grafana', 'Kibana', 'New Relic', 'NRQL', 'Custom Dashboards', 'Alerting']
    },
    {
        title: 'Tools & Automation',
        skills: ['Python', 'Robot Framework', 'IntelliJ Plugin Dev', 'AI/LLM Integration', 'Antigravity', 'Cursor']
    }
];

export default function Skills({ onComplete }) {
    const [snappedCount, setSnappedCount] = useState(0);
    const [hintVisible, setHintVisible] = useState(true);
    const scrollRef = useRef(null);

    useEffect(() => {
        if (snappedCount === skillCategories.length && onComplete) onComplete();
    }, [snappedCount, onComplete]);

    useEffect(() => {
        if (scrollRef.current) {
            // Scroll tracking during explosion
            setTimeout(() => {
                scrollRef.current.scrollTo({
                    top: scrollRef.current.scrollHeight,
                    behavior: 'smooth'
                });
            }, 100);
            // Re-affirm scroll after the card fully expands
            setTimeout(() => {
                scrollRef.current.scrollTo({
                    top: scrollRef.current.scrollHeight,
                    behavior: 'smooth'
                });
            }, 1000);
        }
    }, [snappedCount]);

    // Pre-calculate randomized explosion paths per skill, so re-renders don't shift them mid-air.
    const structuredCategories = useMemo(() => {
        return skillCategories.map(cat => ({
            ...cat,
            skills: cat.skills.map(skill => ({
                title: skill,
                randX: ((Math.random() - 0.5) * 500) + 'px',
                randY: ((Math.random() - 0.5) * 200 - 50) + 'px',
                randRot: ((Math.random() - 0.5) * 60) + 'deg'
            }))
        }));
    }, []);

    const handleSnap = () => {
        setHintVisible(false);
        if (snappedCount < structuredCategories.length) {
            setSnappedCount(prev => prev + 1);
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '0 1rem', position: 'relative' }}>
            <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
                <h2 className="page-title" style={{ marginBottom: '0.5rem', fontSize: '2.4rem' }}>Disciplines of the Void</h2>
                <p style={{ color: '#9ca3af', fontSize: '0.95rem', fontStyle: 'italic', margin: 0, opacity: 0.8 }}>
                    Tap the button below to summon each discipline...
                </p>
                {hintVisible && (
                    <div className="page-hint-banner" style={{ marginTop: '0.8rem' }}>
                        <span className="hint-hand">👇</span>
                        <span>Click the "Snap" button repeatedly to reveal all skills</span>
                    </div>
                )}
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
                {snappedCount < structuredCategories.length ? (
                    <button onClick={handleSnap} className="snap-btn">
                        ✦ Snap ({snappedCount}/{structuredCategories.length}) ✦
                    </button>
                ) : (
                    <div className="vase-final-text tracking-in">✦ Complete Codex Summoned ✦</div>
                )}
            </div>

            <div className="skills-layout-container" ref={scrollRef} style={{ flex: 1, overflowY: 'auto', paddingRight: '15px' }}>

                {structuredCategories.slice(0, snappedCount).map((category, index) => (
                    <div key={`wrapper-${category.title}`} style={{ position: 'relative' }}>

                        {/* Local Explosion targeted at the specific block */}
                        <div className="local-explosion-area">
                            {category.skills.map((skill, sIndex) => (
                                <div
                                    key={`fly-${skill.title}`}
                                    className="flying-skill"
                                    style={{
                                        '--rand-x': skill.randX,
                                        '--rand-y': skill.randY,
                                        '--rand-rot': skill.randRot,
                                        animationDelay: `${sIndex * 0.15}s`
                                    }}
                                >
                                    <span style={{ color: 'var(--color-accent-gold)', marginRight: '4px' }}>✧</span>
                                    {skill.title}
                                </div>
                            ))}
                        </div>

                        {/* The List Block itself */}
                        <div className="category-card" style={{ animationDelay: '1.4s' }}>
                            <h3 className="category-title">{category.title}</h3>
                            <div className="skills-badge-container">
                                {category.skills.map((skill, sIndex) => (
                                    <span
                                        key={skill.title}
                                        className="skill-badge"
                                        style={{ animationDelay: `calc(1.4s + ${sIndex * 0.1}s)` }}
                                    >
                                        <span style={{ color: 'var(--color-accent-gold)', marginRight: '6px', fontSize: '1.1em' }}>✧</span>
                                        {skill.title}
                                    </span>
                                ))}
                            </div>
                        </div>

                    </div>
                ))}
                <div style={{ height: '20px' }}></div>
            </div>
        </div>
    );
}
