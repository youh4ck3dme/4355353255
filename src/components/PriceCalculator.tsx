
'use client';

import { useState, useMemo } from 'react';
import { Users, Clock, Milestone, MapPin, Euro } from 'lucide-react';

export const PriceCalculator = () => {
    const [workers, setWorkers] = useState(2);
    const [hours, setHours] = useState(4);
    const [distance, setDistance] = useState(0);
    const [isBratislava, setIsBratislava] = useState(true);
    
    const workerCost = useMemo(() => {
        if (workers === 1) return 40 * hours;
        if (workers === 2) return 50 * hours;
        // Approximation for 3+ workers, as final price is by agreement
        return (15 * workers + 25) * hours; 
    }, [workers, hours]);

    const transportCost = useMemo(() => {
        if (isBratislava) return 30;
        return distance * 0.80;
    }, [isBratislava, distance]);

    const totalCost = useMemo(() => {
        const calculated = workerCost + transportCost;
        return Math.max(calculated, 70); // Minimum charge is 70
    }, [workerCost, transportCost]);

    return (
        <div className="text-white">
            <div className="grid md:grid-cols-2 gap-8 mb-8">
                {/* Controls */}
                <div className="space-y-6">
                    <div>
                        <label className="flex items-center text-lg font-semibold mb-2 text-brand-bright-green">
                            <Users className="h-5 w-5 mr-2" />
                            Počet pracovníkov: <span className="ml-2 font-bold">{workers}</span>
                        </label>
                        <input
                            type="range"
                            min="1"
                            max="5"
                            value={workers}
                            onChange={(e) => setWorkers(Number(e.target.value))}
                            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer range-lg"
                        />
                        <div className="flex justify-between text-xs text-slate-400 px-1">
                            <span>1</span>
                            <span>2</span>
                            <span>3</span>
                            <span>4</span>
                            <span>5+</span>
                        </div>
                    </div>
                    <div>
                        <label className="flex items-center text-lg font-semibold mb-2 text-brand-bright-green">
                            <Clock className="h-5 w-5 mr-2" />
                            Odhadovaný čas (hodiny): <span className="ml-2 font-bold">{hours}</span>
                        </label>
                         <input
                            type="range"
                            min="1"
                            max="12"
                            value={hours}
                            onChange={(e) => setHours(Number(e.target.value))}
                            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
                        />
                        <div className="flex justify-between text-xs text-slate-400 px-1">
                            <span>1</span>
                            <span>12</span>
                        </div>
                    </div>
                    <div>
                        <label className="flex items-center text-lg font-semibold mb-2 text-brand-bright-green">
                            <MapPin className="h-5 w-5 mr-2" />
                            Lokalita sťahovania
                        </label>
                        <div className="flex items-center space-x-4">
                            <button 
                                onClick={() => setIsBratislava(true)}
                                className={`w-full p-2 rounded-md font-bold transition-colors ${isBratislava ? 'bg-brand-bright-green text-brand-dark-teal' : 'bg-slate-700 hover:bg-slate-600'}`}
                            >
                                V Bratislave
                            </button>
                             <button 
                                onClick={() => setIsBratislava(false)}
                                className={`w-full p-2 rounded-md font-bold transition-colors ${!isBratislava ? 'bg-brand-bright-green text-brand-dark-teal' : 'bg-slate-700 hover:bg-slate-600'}`}
                            >
                                Mimo Bratislavy
                            </button>
                        </div>
                    </div>
                    {!isBratislava && (
                         <div>
                            <label htmlFor="distance-input" className="flex items-center text-lg font-semibold mb-2 text-brand-bright-green">
                                <Milestone className="h-5 w-5 mr-2" />
                                Vzdialenosť mimo BA (km):
                            </label>
                            <input
                                id="distance-input"
                                type="number"
                                value={distance}
                                onChange={(e) => setDistance(Math.max(0, Number(e.target.value)))}
                                className="w-full p-2 rounded-md bg-slate-800 border-slate-600 border-2 text-white focus:ring-brand-bright-green focus:border-brand-bright-green"
                                placeholder="Zadajte počet km"
                            />
                        </div>
                    )}
                </div>
                
                {/* Results */}
                <div className="bg-brand-dark-teal/50 p-6 rounded-lg flex flex-col justify-center items-center text-center border-2 border-brand-bright-green/50">
                    <h3 className="text-xl font-bold text-brand-bright-green mb-2">Odhadovaná cena</h3>
                    <p className="text-5xl font-extrabold text-white mb-4 flex items-center">
                        ~{totalCost.toFixed(0)} <Euro size={40} className="ml-2" />
                    </p>
                    <div className="text-sm text-slate-300 space-y-1">
                        <p>Práca: {workerCost.toFixed(2)} €</p>
                        <p>Doprava: {transportCost.toFixed(2)} €</p>
                    </div>
                    <p className="mt-4 text-xs text-slate-400 text-balance">
                        Cena je orientačná. Minimálny výjazd je 70€.
                        {workers >= 3 && ' Cena za 3+ pracovníkov je predmetom dohody.'}
                    </p>
                </div>
            </div>
        </div>
    );
};
