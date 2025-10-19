'use client';

import { useState, useMemo } from 'react';
import { Euro, SlidersHorizontal, Clock, Milestone, MapPin } from 'lucide-react';

export const PriceCalculator = () => {
    const [workers, setWorkers] = useState(2);
    const [hours, setHours] = useState(4);
    const [distance, setDistance] = useState(0);
    const [isBratislava, setIsBratislava] = useState(true);
    
    const workerCost = useMemo(() => {
        if (workers === 1) return 40 * hours;
        if (workers === 2) return 50 * hours;
        return 25 * workers * hours; // Assuming 25 per worker for 3+
    }, [workers, hours]);

    const transportCost = useMemo(() => {
        if (isBratislava) return 30;
        return distance * 0.80;
    }, [isBratislava, distance]);

    const totalCost = useMemo(() => {
        const calculated = workerCost + transportCost;
        return Math.max(calculated, 70); // Minimum charge is 70
    }, [workerCost, transportCost]);

    const handleWorkerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setWorkers(Number(e.target.value));
    };

    const handleHoursChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setHours(Number(e.target.value));
    };


    return (
        <div className="text-white">
            <div className="grid md:grid-cols-2 gap-8 mb-8">
                {/* Controls */}
                <div className="space-y-6">
                    <div>
                        <label className="flex items-center text-lg font-semibold mb-2 text-brand-bright-green">
                            <SlidersHorizontal className="h-5 w-5 mr-2" />
                            Počet pracovníkov: <span className="ml-2 font-bold">{workers}</span>
                        </label>
                        <input
                            type="range"
                            min="1"
                            max="5"
                            value={workers}
                            onChange={handleWorkerChange}
                            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer range-lg"
                        />
                        <div className="flex justify-between text-xs text-slate-400">
                            <span>1</span>
                            <span>5+</span>
                        </div>
                    </div>
                    <div>
                        <label className="flex items-center text-lg font-semibold mb-2 text-brand-bright-green">
                            <Clock className="h-5 w-5 mr-2" />
                            Odhadovaný počet hodín: <span className="ml-2 font-bold">{hours}</span>
                        </label>
                         <input
                            type="range"
                            min="1"
                            max="12"
                            value={hours}
                            onChange={handleHoursChange}
                            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
                        />
                        <div className="flex justify-between text-xs text-slate-400">
                            <span>1</span>
                            <span>12</span>
                        </div>
                    </div>
                    <div>
                        <label className="flex items-center text-lg font-semibold mb-2 text-brand-bright-green">
                            <MapPin className="h-5 w-5 mr-2" />
                            Miesto
                        </label>
                        <div className="flex items-center space-x-4">
                            <button 
                                onClick={() => setIsBratislava(true)}
                                className={`w-full p-2 rounded-md font-bold transition-colors ${isBratislava ? 'bg-brand-bright-green text-brand-dark-teal' : 'bg-slate-700'}`}
                            >
                                V Bratislave
                            </button>
                             <button 
                                onClick={() => setIsBratislava(false)}
                                className={`w-full p-2 rounded-md font-bold transition-colors ${!isBratislava ? 'bg-brand-bright-green text-brand-dark-teal' : 'bg-slate-700'}`}
                            >
                                Mimo Bratislavy
                            </button>
                        </div>
                    </div>
                    {!isBratislava && (
                         <div>
                            <label className="flex items-center text-lg font-semibold mb-2 text-brand-bright-green">
                                <Milestone className="h-5 w-5 mr-2" />
                                Vzdialenosť mimo BA (km):
                            </label>
                            <input
                                type="number"
                                value={distance}
                                onChange={(e) => setDistance(Math.max(0, Number(e.target.value)))}
                                className="w-full p-2 rounded-md bg-slate-700 border-slate-600 border-2 focus:ring-brand-bright-green focus:border-brand-bright-green"
                                placeholder="Zadajte počet km"
                            />
                        </div>
                    )}
                </div>
                
                {/* Results */}
                <div className="bg-brand-dark-teal/50 p-6 rounded-lg flex flex-col justify-center items-center text-center border-2 border-brand-bright-green/50">
                    <h3 className="text-xl font-bold text-brand-bright-green mb-2">Odhadovaná cena</h3>
                    <p className="text-5xl font-extrabold text-white mb-4">
                        {totalCost.toFixed(2)} €
                    </p>
                    <div className="text-sm text-slate-300 space-y-1">
                        <p>Práca: {workerCost.toFixed(2)} €</p>
                        <p>Doprava: {transportCost.toFixed(2)} €</p>
                    </div>
                    <p className="mt-4 text-xs text-slate-400">
                        Cena je orientačná. Minimálna suma výjazdu je 70 €.
                        {workers >= 3 && ' Cena za 3+ pracovníkov je predmetom dohody.'}
                    </p>
                </div>
            </div>
        </div>
    );
};
