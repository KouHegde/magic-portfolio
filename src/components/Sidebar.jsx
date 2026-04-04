import React from 'react';
import { Sparkles, FileText, FolderOpen, Star, Mail, Layout } from 'lucide-react';

const navItems = [
    { id: 'intro', label: 'Intro', icon: FileText },
    { id: 'reveal', label: 'Reveal', icon: Sparkles },
    { id: 'projects', label: 'Projects', icon: FolderOpen },
    { id: 'skills', label: 'Skills', icon: Star },
    { id: 'contact', label: 'Contact', icon: Mail }
];

export default function Sidebar({ activePage, setActivePage }) {
    return (
        <aside className="sidebar">
            <h2 className="sidebar-title">THE ARCHIVIST</h2>

            <nav className="nav-links">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    return (
                        <div
                            key={item.id}
                            className={`nav-link ${activePage === item.id ? 'active' : ''}`}
                            onClick={() => setActivePage(item.id)}
                        >
                            <span>{item.label}</span>
                            <span className="nav-icon"><Icon size={18} /></span>
                        </div>
                    );
                })}
            </nav>

            <div className="sidebar-footer">
                EST. MMXXIV
            </div>
        </aside>
    );
}
