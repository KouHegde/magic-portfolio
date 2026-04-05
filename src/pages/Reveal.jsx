import React, { useState } from 'react';
import SortingHat from '../components/SortingHat';
import './RevealAnimation.css';

const experiences = [
    {
        company: "Cisco (Webex)",
        title: "Senior Software Engineer",
        period: "07/2024 - Present",
        bullets: [
            "Architected EPIC-integration microservice, reducing latency by 15% for 50K+ daily requests.",
            "Engineered scalable chat transcript system with sentiment analysis, cutting manual intervention by 40%.",
            "Modernized API gateway infrastructure (Java 11 → 17), achieving 25% throughput improvement and 18% memory reduction.",
            "Developed production MCP server with Elasticsearch integration and LogAnalyser agent.",
            "Consolidated independent gateways into a unified REST/gRPC/WebFlux platform.",
            "Led Grafana/Kibana dashboard implementation, drastically reducing MTTR by 60%."
        ]
    },
    {
        company: "Cleartrip (Flipkart)",
        title: "Software Development Engineer",
        period: "05/2022 - 07/2024",
        bullets: [
            "Optimized Autosuggest Service natively, generating 60% faster responses and 3x peak volume capacity.",
            "Designed highly efficient agile-code image storage, cutting load times by 2.3s for over 2M+ users.",
            "Enabled multi-fare integration yielding a $5M+ revenue lift via Google Flights and Skyscanner.",
            "Migrated authentication systems seamlessly while injecting robust Kafka cache invalidation.",
            "Deployed advanced Redis caching strategies, improving response timelines for millions of internal notifications."
        ]
    },
    {
        company: "Zebra Tech & L3 Harris",
        title: "Software Engineer & Intern",
        period: "02/2020 - 05/2022",
        bullets: [
            "Engineered Bluetooth/VPN testing automation using Python and Robot Framework, expanding coverage by 65%.",
            "Overhauled VMware-hosted test infrastructure to significantly reduce certification simulation turnaround times.",
            "Developed an RTU sensor data pipeline attached to a Python HMI for critical naval defense applications.",
            "Enabled continuous real-time ship system diagnostics and robust metrics monitoring."
        ]
    }
];

function MagicalSparks({ activeId }) {
    if (!activeId) return null;

    return (
        <div key={activeId} className="sparks-container">
            {[...Array(60)].map((_, i) => {
                const angle = (Math.random() * Math.PI * 2);
                const distance = 200 + Math.random() * 350;
                const tx = `${Math.cos(angle) * distance}px`;
                const ty = `${Math.sin(angle) * distance - 80}px`;
                const duration = 2.0 + Math.random() * 1.0;

                return (
                    <div
                        key={i}
                        className="magic-spark"
                        style={{
                            '--tx': tx,
                            '--ty': ty,
                            animationDuration: `${duration}s`
                        }}
                    />
                );
            })}
        </div>
    );
}

export default function Reveal({ onComplete }) {
    const [deck, setDeck] = useState([0, 1, 2]);
    const [fastShufflingCard, setFastShufflingCard] = useState(null);
    const [isShufflingSequence, setIsShufflingSequence] = useState(false);
    const [sparkId, setSparkId] = useState(0);
    const [seenCards, setSeenCards] = useState(new Set([0]));
    const [hintVisible, setHintVisible] = useState(true);

    const handleShuffle = () => {
        if (isShufflingSequence) return;
        setHintVisible(false);
        setIsShufflingSequence(true);
        setSparkId(prev => prev + 1);

        const visualShuffles = 5 + Math.floor(Math.random() * 2);
        const shuffleInterval = 220;
        let count = 0;

        const nextTarget = (deck[0] + 1) % experiences.length;

        const doOneShuffle = () => {
            setDeck(currentDeck => {
                const topCard = currentDeck[0];
                setFastShufflingCard(topCard);
                const newDeck = [...currentDeck];
                newDeck.push(newDeck.shift());
                return newDeck;
            });

            count++;
            if (count < visualShuffles) {
                setTimeout(() => {
                    setFastShufflingCard(null);
                    setTimeout(doOneShuffle, 40);
                }, shuffleInterval - 40);
            } else {
                setTimeout(() => {
                    setFastShufflingCard(null);
                    const finalOrder = [];
                    for (let i = 0; i < experiences.length; i++) {
                        finalOrder.push((nextTarget + i) % experiences.length);
                    }
                    setDeck(finalOrder);
                    setSeenCards(prev => {
                        const updated = new Set(prev);
                        updated.add(nextTarget);
                        if (updated.size === experiences.length && onComplete) onComplete();
                        return updated;
                    });
                    setIsShufflingSequence(false);
                }, shuffleInterval);
            }
        };

        doOneShuffle();
    };

    const getVisualStyles = (visualPos) => {
        if (visualPos === 0) return { transform: 'translateY(0) scale(1)', zIndex: 3, filter: 'brightness(1)' };
        if (visualPos === 1) return { transform: 'translateY(8px) scale(0.96)', zIndex: 2, filter: 'brightness(0.6)' };
        if (visualPos === 2) return { transform: 'translateY(16px) scale(0.92)', zIndex: 1, filter: 'brightness(0.3)' };
        return { opacity: 0 };
    };

    return (
        <div style={{ height: '100%', padding: '0 1rem', display: 'flex', flexDirection: 'column' }} onClick={handleShuffle}>
            <h2 className="page-title" style={{ marginBottom: '0.5rem', marginTop: '0.5rem' }}>Backend Magician</h2>
            <p style={{ color: 'var(--color-accent-gold)', fontStyle: 'italic', marginBottom: '0.5rem', fontSize: '0.95rem', textAlign: 'center' }}>
                A grimoire of my professional conjurations.
            </p>
            {hintVisible && (
                <div style={{ marginBottom: '1rem' }}>
                    <SortingHat message="Click anywhere to shuffle the deck and reveal the next experience..." />
                </div>
            )}

            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', position: 'relative' }}>

                <MagicalSparks activeId={sparkId} />

                <div className="deck-container">
                    {experiences.map((exp, originalIndex) => {
                        const visualPos = deck.indexOf(originalIndex);
                        const isShuffling = fastShufflingCard === originalIndex;

                        return (
                            <div
                                key={originalIndex}
                                className={`experience-card ${isShuffling ? 'fast-shuffle-card' : ''}`}
                                style={!isShuffling ? getVisualStyles(visualPos) : {}}
                            >
                                <div className="card-header">
                                    <span className="period">{exp.period}</span>
                                    <h3>{exp.title}</h3>
                                    <div className="company">{exp.company}</div>
                                </div>
                                <ul className="card-bullets">
                                    {exp.bullets.map((bullet, i) => (
                                        <li key={i}>{bullet}</li>
                                    ))}
                                </ul>
                            </div>
                        );
                    })}

                    <div className="deck-instruction">
                        CLICK ANYWHERE TO REVEAL NEXT ARTIFACT
                    </div>
                </div>
            </div>
        </div>
    );
}
