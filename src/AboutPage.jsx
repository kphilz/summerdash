import React from 'react';

const AboutPage = ({ onBack, startGame }) => {
    return (
        <div className="min-h-screen bg-background-light font-display antialiased text-secondary selection:bg-primary selection:text-secondary">
            {/* Navbar - Simplified */}
            <nav className="sticky top-0 z-50 w-full border-b-4 border-secondary bg-white/90 backdrop-blur-md">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
                    <div className="flex items-center gap-3 cursor-pointer" onClick={onBack}>
                        <div className="flex size-10 items-center justify-center bg-secondary text-primary rounded-sm pixel-shadow">
                            <span className="material-symbols-outlined text-3xl">arrow_back</span>
                        </div>
                        <h2 className="text-2xl font-bold tracking-tight uppercase">Back to Base</h2>
                    </div>
                    <button
                        onClick={startGame}
                        className="hidden md:flex bg-primary text-secondary px-6 py-2 font-bold uppercase tracking-wider text-sm border-2 border-secondary pixel-shadow pixel-shadow-hover transition-all duration-200"
                    >
                        Play Now
                    </button>
                </div>
            </nav>

            {/* Main Content */}
            <div className="mx-auto max-w-5xl px-6 py-12 md:py-20">

                {/* Header */}
                <div className="mb-16 text-center">
                    <div className="inline-block bg-secondary text-primary px-4 py-1 text-sm font-bold uppercase mb-4 pixel-shadow">
                        Archive File #8821
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black uppercase leading-none mb-6">
                        The World of <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-green-600">Summer Dash</span>
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto font-body">
                        In the decentralized future of 21XX, the blockchain isn't just a ledger—it's a physical reality.
                    </p>
                </div>

                {/* Lore Section */}
                <section className="mb-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="relative group">
                        <div className="absolute inset-0 bg-primary translate-x-2 translate-y-2 border-2 border-secondary"></div>
                        <div className="relative bg-white border-2 border-secondary p-8 pixel-shadow">
                            <h3 className="text-2xl font-black uppercase mb-4">The Glitch Protocol</h3>
                            <p className="text-gray-700 font-body leading-relaxed mb-4">
                                The City is corrupt. A massive "Glitch" is consuming the data-structures that hold society together.
                                As a runner, you are a specialized program designed to navigate the unstable sectors.
                            </p>
                            <p className="text-gray-700 font-body leading-relaxed">
                                Your mission is simple: <strong>Run fast. Validate blocks. Don't get deleted.</strong>
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-6">
                        <div className="flex gap-4 items-start">
                            <span className="material-symbols-outlined text-4xl text-primary bg-secondary p-2">warning</span>
                            <div>
                                <h4 className="font-bold uppercase text-lg">Unstable Sectors</h4>
                                <p className="text-gray-600 text-sm">The world procedurally generates obstacles. No two runs are identical.</p>
                            </div>
                        </div>
                        <div className="flex gap-4 items-start">
                            <span className="material-symbols-outlined text-4xl text-primary bg-secondary p-2">token</span>
                            <div>
                                <h4 className="font-bold uppercase text-lg">Proof of Speed</h4>
                                <p className="text-gray-600 text-sm">Speed isn't just survival; it's currency. Top players earn real AVAX tokens.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Biomes Cards */}
                <section className="mb-20">
                    <h2 className="text-4xl font-black uppercase mb-12 border-b-4 border-secondary pb-4 inline-block">
                        Known Biomes
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            { name: 'City Core', desc: 'The starting zone. High traffic, low glitch density.', icon: 'apartment' },
                            { name: 'Toxic Sewers', desc: 'Corrupted data streams flow here. Avoid the slime.', icon: 'water_drop' },
                            { name: 'Deep Space', desc: 'Zero gravity simulation. Jumps align differently.', icon: 'rocket_launch' },
                            { name: 'Magma Flats', desc: 'Superheated hardware sector. Don\'t stay grounded too long.', icon: 'device_thermostat' },
                            { name: 'Ice Caverns', desc: 'Cooling systems overdrive. Friction is reduced.', icon: 'ac_unit' },
                            { name: 'Digital Forest', desc: 'Overgrowth of legacy code. Dense obstacles.', icon: 'forest' },
                            { name: 'The Void', desc: 'Endgame territory. Pure chaos.', icon: 'visibility_off' }
                        ].map((biome, i) => (
                            <div key={i} className="bg-gray-50 border-2 border-secondary p-6 hover:-translate-y-1 transition-transform cursor-default">
                                <div className="flex justify-between items-start mb-4">
                                    <span className="material-symbols-outlined text-4xl text-gray-400">{biome.icon}</span>
                                    <span className="font-mono text-xs text-gray-500 font-bold">SECTOR 0{i + 1}</span>
                                </div>
                                <h3 className="font-bold uppercase text-lg mb-2">{biome.name}</h3>
                                <p className="text-sm text-gray-600 font-body">{biome.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Classes */}
                <section>
                    <h2 className="text-4xl font-black uppercase mb-12 border-b-4 border-secondary pb-4 inline-block">
                        Runner Classes
                    </h2>
                    <div className="flex flex-col gap-8">
                        {/* Speedster */}
                        <div className="bg-white border-2 border-secondary p-6 md:p-8 flex flex-col md:flex-row gap-8 items-center pixel-shadow">
                            <div className="size-32 bg-sunny-yellow border-2 border-secondary flex items-center justify-center shrink-0">
                                <span className="material-symbols-outlined text-6xl">directions_run</span>
                            </div>
                            <div className="flex-1 text-center md:text-left">
                                <h3 className="text-2xl font-black uppercase mb-2">Speedster</h3>
                                <p className="text-gray-600 font-body mb-4">The default rig for most runners. Lightweight chassis with balanced hydraulics.</p>
                                <div className="flex gap-4 justify-center md:justify-start font-mono text-sm">
                                    <span className="bg-secondary text-white px-2 py-1">SPD: High</span>
                                    <span className="bg-gray-200 px-2 py-1">JMP: Double</span>
                                    <span className="bg-gray-200 px-2 py-1">DEF: Low</span>
                                </div>
                            </div>
                        </div>

                        {/* Tank */}
                        <div className="bg-white border-2 border-secondary p-6 md:p-8 flex flex-col md:flex-row gap-8 items-center pixel-shadow">
                            <div className="size-32 bg-sky-blue border-2 border-secondary flex items-center justify-center shrink-0">
                                <span className="material-symbols-outlined text-6xl">shield</span>
                            </div>
                            <div className="flex-1 text-center md:text-left">
                                <h3 className="text-2xl font-black uppercase mb-2">Tank</h3>
                                <p className="text-gray-600 font-body mb-4">Heavily armored unit. Can tank one hit without losing speed, but accelerates slower.</p>
                                <div className="flex gap-4 justify-center md:justify-start font-mono text-sm">
                                    <span className="bg-gray-200 px-2 py-1">SPD: Med</span>
                                    <span className="bg-gray-200 px-2 py-1">JMP: Single</span>
                                    <span className="bg-secondary text-white px-2 py-1">DEF: High</span>
                                </div>
                            </div>
                        </div>

                        {/* Technician */}
                        <div className="bg-white border-2 border-secondary p-6 md:p-8 flex flex-col md:flex-row gap-8 items-center pixel-shadow">
                            <div className="size-32 bg-grass-green border-2 border-secondary flex items-center justify-center shrink-0">
                                <span className="material-symbols-outlined text-6xl">build</span>
                            </div>
                            <div className="flex-1 text-center md:text-left">
                                <h3 className="text-2xl font-black uppercase mb-2">Technician</h3>
                                <p className="text-gray-600 font-body mb-4">Gadget specialist. Boosts last 2x longer. Ideal for high-score farming.</p>
                                <div className="flex gap-4 justify-center md:justify-start font-mono text-sm">
                                    <span className="bg-gray-200 px-2 py-1">SPD: Med</span>
                                    <span className="bg-secondary text-white px-2 py-1">TECH: Max</span>
                                    <span className="bg-gray-200 px-2 py-1">DEF: Med</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </div>
            {/* Footer */}
            <footer className="bg-secondary text-white py-12 px-6 mt-20 text-center">
                <p className="font-mono text-xs text-gray-500">End of File.</p>
            </footer>
        </div>
    );
};

export default AboutPage;
