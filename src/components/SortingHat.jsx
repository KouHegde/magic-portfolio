import React from 'react';

export default function SortingHat({ message }) {
    return (
        <div className="sorting-hat-wrapper">
            <div className="sorting-hat-speech">
                <span className="sorting-hat-speech-text">{message}</span>
            </div>
            <div className="sorting-hat-container">
                <div className="sorting-hat-sparkles">
                    {[...Array(6)].map((_, i) => (
                        <span
                            key={i}
                            className="hat-sparkle"
                            style={{
                                '--sparkle-x': `${15 + Math.random() * 70}%`,
                                '--sparkle-y': `${5 + Math.random() * 60}%`,
                                '--sparkle-delay': `${i * 0.6}s`,
                                '--sparkle-size': `${3 + Math.random() * 4}px`,
                            }}
                        >✦</span>
                    ))}
                </div>
                <svg
                    className="sorting-hat-svg"
                    viewBox="0 0 160 150"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <defs>
                        <linearGradient id="hatGrad" x1="0.3" y1="0" x2="0.8" y2="1">
                            <stop offset="0%" stopColor="#5a3d1a" />
                            <stop offset="30%" stopColor="#3d2a0f" />
                            <stop offset="60%" stopColor="#2c1e08" />
                            <stop offset="100%" stopColor="#1a1005" />
                        </linearGradient>
                        <linearGradient id="hatHighlight" x1="0" y1="0" x2="0.5" y2="1">
                            <stop offset="0%" stopColor="rgba(226,192,68,0.25)" />
                            <stop offset="100%" stopColor="rgba(226,192,68,0)" />
                        </linearGradient>
                        <radialGradient id="brimGrad" cx="0.5" cy="0.5" r="0.5">
                            <stop offset="0%" stopColor="#3d2a0f" />
                            <stop offset="100%" stopColor="#1a1005" />
                        </radialGradient>
                        <filter id="hatGlow">
                            <feGaussianBlur stdDeviation="2" result="blur" />
                            <feMerge>
                                <feMergeNode in="blur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                    </defs>

                    {/* Hat body */}
                    <path
                        d="M72 8 C68 8, 58 18, 50 35 C44 48, 40 58, 42 68 C38 72, 30 78, 24 85 C20 88, 14 92, 10 98 C6 102, 5 108, 8 112 L152 112 C155 108, 154 102, 150 98 C146 92, 140 88, 136 85 C130 78, 118 72, 116 68 C114 58, 108 42, 100 30 C94 18, 88 10, 85 6 C82 2, 76 6, 72 8Z"
                        fill="url(#hatGrad)"
                        stroke="#8b6914"
                        strokeWidth="0.8"
                    />

                    {/* Highlight sheen */}
                    <path
                        d="M72 8 C68 8, 58 18, 50 35 C44 48, 40 58, 42 68 C38 72, 30 78, 24 85 C20 88, 14 92, 10 98 C6 102, 5 108, 8 112 L80 112 C78 90, 60 60, 72 8Z"
                        fill="url(#hatHighlight)"
                    />

                    {/* Droopy tip */}
                    <path
                        d="M85 6 C90 4, 96 6, 102 14 C108 22, 116 20, 120 16 C118 22, 112 28, 105 30 C100 30, 94 18, 85 6Z"
                        fill="#4a3210"
                        stroke="#8b6914"
                        strokeWidth="0.6"
                    />

                    {/* Tip star */}
                    <text
                        x="120" y="18"
                        fill="#e2c044"
                        fontSize="10"
                        textAnchor="middle"
                        filter="url(#hatGlow)"
                        className="hat-tip-star"
                    >✦</text>

                    {/* Wrinkle folds */}
                    <path d="M48 50 C58 44, 72 52, 85 46 C95 42, 105 48, 112 44"
                        fill="none" stroke="rgba(139,105,20,0.4)" strokeWidth="1.2" strokeLinecap="round" />
                    <path d="M44 62 C54 58, 64 64, 78 58 C88 54, 100 60, 110 56"
                        fill="none" stroke="rgba(139,105,20,0.3)" strokeWidth="1" strokeLinecap="round" />
                    <path d="M38 76 C50 72, 60 78, 75 73 C90 68, 105 74, 120 70"
                        fill="none" stroke="rgba(139,105,20,0.25)" strokeWidth="0.8" strokeLinecap="round" />

                    {/* Mouth — SMIL animated for all browsers */}
                    <path
                        d="M50 88 C58 94, 68 96, 80 93 C90 90, 98 92, 108 88"
                        fill="none"
                        stroke="#c9a84c"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                    >
                        <animate
                            attributeName="d"
                            dur="1.6s"
                            repeatCount="indefinite"
                            values="
                                M50 88 C58 94, 68 96, 80 93 C90 90, 98 92, 108 88;
                                M50 88 C58 85, 68 84, 80 86 C90 84, 98 85, 108 88;
                                M50 88 C58 96, 68 98, 80 95 C90 93, 98 95, 108 88;
                                M50 88 C58 85, 68 84, 80 86 C90 84, 98 85, 108 88;
                                M50 88 C58 94, 68 96, 80 93 C90 90, 98 92, 108 88"
                            keyTimes="0;0.1;0.2;0.3;0.4"
                        />
                    </path>

                    {/* Worn patches */}
                    <ellipse cx="65" cy="55" rx="8" ry="5"
                        fill="rgba(90,61,26,0.4)" transform="rotate(-10 65 55)" />
                    <ellipse cx="100" cy="65" rx="6" ry="4"
                        fill="rgba(90,61,26,0.3)" transform="rotate(15 100 65)" />

                    {/* Left eye — SMIL blink */}
                    <ellipse cx="62" cy="82" rx="2.5" ry="2.8" fill="#e2c044">
                        <animate
                            attributeName="ry"
                            dur="4s"
                            repeatCount="indefinite"
                            values="2.8;2.8;0.4;2.8;2.8"
                            keyTimes="0;0.42;0.44;0.46;1"
                        />
                    </ellipse>

                    {/* Right eye — SMIL blink */}
                    <ellipse cx="96" cy="80" rx="2.2" ry="2.6" fill="#e2c044">
                        <animate
                            attributeName="ry"
                            dur="4s"
                            repeatCount="indefinite"
                            values="2.6;2.6;0.3;2.6;2.6"
                            keyTimes="0;0.42;0.44;0.46;1"
                            begin="0.15s"
                        />
                    </ellipse>

                    {/* Eye glints */}
                    <circle cx="63" cy="81" r="0.8" fill="rgba(255,255,255,0.6)" />
                    <circle cx="97" cy="79" r="0.7" fill="rgba(255,255,255,0.6)" />

                    {/* Wide brim */}
                    <ellipse
                        cx="80" cy="112"
                        rx="76" ry="14"
                        fill="url(#brimGrad)"
                        stroke="#8b6914"
                        strokeWidth="0.8"
                    />
                    <ellipse
                        cx="80" cy="110"
                        rx="72" ry="10"
                        fill="none"
                        stroke="rgba(226,192,68,0.15)"
                        strokeWidth="0.5"
                    />

                    {/* Band with buckle */}
                    <rect x="20" y="104" width="120" height="10" rx="2"
                        fill="rgba(139,105,20,0.3)" />
                    <rect x="68" y="103" width="24" height="12" rx="2"
                        fill="none" stroke="#e2c044" strokeWidth="1.2" />
                    <rect x="74" y="105" width="12" height="8" rx="1.5"
                        fill="#e2c044" opacity="0.5" />
                </svg>
            </div>
        </div>
    );
}
