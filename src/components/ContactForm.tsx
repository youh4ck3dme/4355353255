
'use client';

import { useState } from 'react';

export const ContactForm = () => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus('submitting');
        // setMessage(''); // Clearing message is handled by setting a new one

        // Basic validation
        if (!name || !phone || !email) {
            setStatus('error');
            setMessage('Polia Meno/Firma, Mobil a Email sú povinné.');
            return;
        }

        // Here you would typically send the data to a server endpoint
        // For this example, we'll just simulate a network request
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            console.log({ name, phone, email, address });
            setStatus('success');
            setMessage('Ďakujeme! Vaša požiadavka bola odoslaná.');
            // Reset form
            setName('');
            setPhone('');
            setEmail('');
            setAddress('');
        } catch (error) {
            setStatus('error');
            setMessage('Pri odosielaní požiadavky nastala chyba. Skúste to prosím neskôr.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-brand-secondary-grey dark:text-slate-300 mb-1">Meno / Firma *</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="w-full p-3 border-2 border-slate-300 dark:border-slate-600 rounded-lg focus:border-brand-bright-green 
                                   focus:ring focus:ring-brand-bright-green/50 outline-none transition-colors 
                                   bg-brand-bg dark:bg-brand-dark-teal dark:text-brand-bg placeholder-brand-secondary-grey"
                    />
                </div>
                <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-brand-secondary-grey dark:text-slate-300 mb-1">Mobil *</label>
                    <input
                        type="tel"
                        id="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                        className="w-full p-3 border-2 border-slate-300 dark:border-slate-600 rounded-lg focus:border-brand-bright-green 
                                   focus:ring focus:ring-brand-bright-green/50 outline-none transition-colors 
                                   bg-brand-bg dark:bg-brand-dark-teal dark:text-brand-bg placeholder-brand-secondary-grey"
                    />
                </div>
            </div>
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-brand-secondary-grey dark:text-slate-300 mb-1">Email *</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full p-3 border-2 border-slate-300 dark:border-slate-600 rounded-lg focus:border-brand-bright-green 
                               focus:ring focus:ring-brand-bright-green/50 outline-none transition-colors 
                               bg-brand-bg dark:bg-brand-dark-teal dark:text-brand-bg placeholder-brand-secondary-grey"
                />
            </div>
            <div>
                <label htmlFor="address" className="block text-sm font-medium text-brand-secondary-grey dark:text-slate-300 mb-1">Adresa</label>
                <input
                    type="text"
                    id="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full p-3 border-2 border-slate-300 dark:border-slate-600 rounded-lg focus:border-brand-bright-green 
                               focus:ring focus:ring-brand-bright-green/50 outline-none transition-colors 
                               bg-brand-bg dark:bg-brand-dark-teal dark:text-brand-bg placeholder-brand-secondary-grey"
                />
            </div>
            <div>
                <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="liquid-glass-button w-full px-8 py-4 bg-brand-bright-green text-brand-dark-teal font-bold rounded-lg hover:bg-opacity-80 transition-colors duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 disabled:bg-opacity-50 disabled:cursor-not-allowed"
                >
                    {status === 'submitting' ? 'Odosielam...' : 'Odoslať požiadavku'}
                </button>
            </div>
            {message && (
                <p className={`text-center font-medium ${status === 'success' ? 'text-green-500' : 'text-red-500'}`}>
                    {message}
                </p>
            )}
        </form>
    );
};
