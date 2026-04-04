import React, { useState } from 'react';

const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY || '';

const inputStyle = {
    width: '100%',
    padding: '1rem',
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.1)',
    color: 'white',
    borderRadius: '4px',
    marginBottom: '1rem',
    fontFamily: 'var(--font-sans)',
    letterSpacing: '2px',
    fontSize: '0.85rem',
    outline: 'none',
    transition: 'border-color 0.3s ease',
};

const inputFocusColor = 'rgba(226, 192, 68, 0.5)';

export default function Contact() {
    const [form, setForm] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState('idle');
    const [focusedField, setFocusedField] = useState(null);

    const handleChange = (e) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!WEB3FORMS_KEY) {
            setStatus('misconfigured');
            return;
        }
        setStatus('sending');

        try {
            const res = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    access_key: WEB3FORMS_KEY,
                    subject: `Portfolio Contact from ${form.name}`,
                    from_name: form.name,
                    name: form.name,
                    email: form.email,
                    message: form.message,
                    botcheck: '',
                }),
            });

            const data = await res.json();
            if (data.success) {
                setStatus('success');
                setForm({ name: '', email: '', message: '' });
            } else {
                setStatus('error');
            }
        } catch {
            setStatus('error');
        }
    };

    const getInputStyle = (field) => ({
        ...inputStyle,
        borderColor: focusedField === field ? inputFocusColor : 'rgba(255,255,255,0.1)',
    });

    if (status === 'success') {
        return (
            <div>
                <h2 className="page-title">Link Established</h2>
                <p className="page-text" style={{ marginTop: '2rem' }}>
                    Transmission received. The frequencies have aligned — expect a response from the void.
                </p>
                <button
                    onClick={() => setStatus('idle')}
                    style={{
                        marginTop: '2rem',
                        padding: '0.8rem 2rem',
                        background: 'none',
                        border: '1px solid var(--color-accent-gold)',
                        color: 'var(--color-accent-gold)',
                        borderRadius: '4px',
                        fontFamily: 'var(--font-sans)',
                        letterSpacing: '3px',
                        fontSize: '0.75rem',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                    }}
                >
                    SEND ANOTHER
                </button>
            </div>
        );
    }

    return (
        <div>
            <h2 className="page-title">Establish Link</h2>
            <p className="page-text">
                Send a transmission into the void. If the frequencies align, I will respond.
            </p>

            <form onSubmit={handleSubmit} style={{ marginTop: '2rem' }}>
                <input type="hidden" name="botcheck" value="" />

                <input
                    type="text"
                    name="name"
                    required
                    placeholder="YOUR DESIGNATION (NAME)"
                    value={form.name}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('name')}
                    onBlur={() => setFocusedField(null)}
                    style={getInputStyle('name')}
                />

                <input
                    type="email"
                    name="email"
                    required
                    placeholder="RETURN FREQUENCY (EMAIL)"
                    value={form.email}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    style={getInputStyle('email')}
                />

                <textarea
                    name="message"
                    required
                    placeholder="YOUR TRANSMISSION (MESSAGE)"
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('message')}
                    onBlur={() => setFocusedField(null)}
                    style={{
                        ...getInputStyle('message'),
                        resize: 'vertical',
                        minHeight: '120px',
                    }}
                />

                <button
                    type="submit"
                    disabled={status === 'sending'}
                    style={{
                        width: '100%',
                        padding: '1rem',
                        background: status === 'sending' ? 'rgba(226, 192, 68, 0.5)' : 'var(--color-accent-gold)',
                        color: '#000',
                        border: 'none',
                        borderRadius: '4px',
                        fontWeight: 'bold',
                        fontFamily: 'var(--font-sans)',
                        letterSpacing: '2px',
                        cursor: status === 'sending' ? 'wait' : 'pointer',
                        transition: 'all 0.3s ease',
                        fontSize: '0.85rem',
                    }}
                >
                    {status === 'sending' ? 'TRANSMITTING...' : 'INITIATE CONTACT'}
                </button>

                {status === 'error' && (
                    <p style={{ color: '#ef4444', marginTop: '1rem', fontSize: '0.85rem', letterSpacing: '1px' }}>
                        Transmission failed. Please try again.
                    </p>
                )}

                {status === 'misconfigured' && (
                    <p style={{ color: '#f59e0b', marginTop: '1rem', fontSize: '0.85rem', letterSpacing: '1px' }}>
                        Contact form is not configured yet. Set VITE_WEB3FORMS_KEY in your .env file.
                    </p>
                )}
            </form>
        </div>
    );
}
