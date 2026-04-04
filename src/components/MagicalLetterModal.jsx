import React from 'react';
import { createPortal } from 'react-dom';

const messages = {
    intro: {
        title: 'The Archive Remains Unread',
        body: 'You have not scrolled through all the passages of the introduction. The Archivist\'s tale awaits your attention.',
        hint: 'Scroll or click to progress through all slides.',
    },
    skills: {
        title: 'Disciplines Left Unsummoned',
        body: 'Not all skill disciplines have been revealed. Some powers remain hidden behind the Snap.',
        hint: 'Click the Snap button to summon each discipline.',
    },
    reveal: {
        title: 'Artifacts Left Buried',
        body: 'You have not shuffled through all the experience artifacts. Some chapters of the grimoire remain sealed.',
        hint: 'Click to shuffle and reveal each experience card.',
    },
    projects: {
        title: 'Spells Left Uncast',
        body: 'Not all project artifacts have been conjured by the wand. Some creations remain veiled in shadow.',
        hint: 'Click to cast the wand and reveal each project.',
    },
};

export default function MagicalLetterModal({ page, onStay, onLeave }) {
    const msg = messages[page];
    if (!msg) return null;

    return createPortal(
        <div className="letter-modal-overlay" onClick={onStay}>
            <div className="letter-modal" onClick={(e) => e.stopPropagation()}>
                <div className="letter-seal">✧</div>
                <div className="letter-border">
                    <h2 className="letter-title">{msg.title}</h2>
                    <p className="letter-body">{msg.body}</p>
                    <p className="letter-hint">✦ {msg.hint}</p>
                    <div className="letter-actions">
                        <button className="letter-btn letter-btn-stay" onClick={onStay}>
                            Return & Explore
                        </button>
                        <button className="letter-btn letter-btn-leave" onClick={onLeave}>
                            Continue Anyway
                        </button>
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
}
