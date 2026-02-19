/* eslint-disable react/no-unknown-property */
import React from 'react';

const LandingPage = ({ startGame, payAndPlay, wallet, connectWallet, prizePool, onOpenAbout }) => {

    const handlePlayClick = () => {
        if (!wallet) {
            connectWallet();
        } else {
            startGame();
        }
    };

    return (
        <div className="bg-background-light text-secondary font-display antialiased overflow-x-hidden">
            {/* Navbar */}
            <nav className="sticky top-0 z-50 w-full border-b-4 border-secondary bg-white/90 backdrop-blur-md">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
                    <div className="flex items-center gap-3">
                        <div className="flex size-10 items-center justify-center bg-secondary text-primary rounded-sm pixel-shadow">
                            <span className="material-symbols-outlined text-3xl">videogame_asset</span>
                        </div>
                        <h2 className="text-2xl font-bold tracking-tight uppercase">Summer Dash</h2>
                    </div>
                    <div className="hidden md:flex items-center gap-8 font-bold text-sm uppercase tracking-wide">
                        <button onClick={onOpenAbout} className="hover:text-primary transition-colors uppercase">About Game</button>
                        <a className="hover:text-primary transition-colors" href="#leaderboard">Leaderboard</a>
                        <a className="hover:text-primary transition-colors" href="#avalanche">Avalanche Token</a>
                    </div>
                    <button
                        onClick={handlePlayClick}
                        className="hidden md:flex bg-primary text-secondary px-6 py-2 font-bold uppercase tracking-wider text-sm border-2 border-secondary pixel-shadow pixel-shadow-hover transition-all duration-200"
                    >
                        {wallet ? "Play Now" : "Connect Wallet"}
                    </button>
                    <button className="md:hidden text-secondary">
                        <span className="material-symbols-outlined text-3xl">menu</span>
                    </button>
                </div>
            </nav>

            {/* Main Layout with Pathway */}
            <div className="relative mx-auto max-w-7xl flex flex-col md:flex-row">
                {/* The Pathway (Left Sidebar decorative on desktop) */}
                <div className="hidden md:flex w-24 flex-col items-center pt-10 shrink-0 relative">
                    <div className="sticky top-32 flex flex-col items-center h-[calc(100vh-8rem)]">
                        <div className="size-4 bg-primary rounded-full mb-2 animate-pulse"></div>
                        <div className="w-1 h-full pathway-dashed opacity-50"></div>
                        <div className="size-4 border-2 border-primary bg-white rounded-full mt-2"></div>
                    </div>
                </div>

                {/* Content Area */}
                <div className="flex-1 min-w-0">
                    {/* Hero Section */}
                    <section className="relative px-6 py-16 md:py-24 lg:py-32 overflow-hidden">
                        <div className="absolute top-0 right-0 -z-10 w-full h-full opacity-10 bg-pixel-pattern"></div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            <div className="flex flex-col gap-6 z-10">
                                <div className="inline-flex items-center gap-2 bg-secondary text-primary px-3 py-1 text-xs font-bold uppercase w-fit transform -rotate-2 pixel-shadow">
                                    <span className="material-symbols-outlined text-sm">bolt</span>
                                    <span>Live on Avalanche</span>
                                </div>
                                <h1 className="text-5xl md:text-7xl font-black leading-[0.9] tracking-tighter uppercase">
                                    Escape the <br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-green-600">Glitch.</span><br />
                                    Run Forever.
                                </h1>
                                <p className="text-lg text-gray-600 font-medium max-w-md font-body leading-relaxed">
                                    Navigate through <strong>7 Glitched Biomes</strong> ranging from Cyber-Sewers to Deep Space.
                                    Collect fragments to restore the timeline and win from the <strong>{prizePool || '0'} AVAX</strong> Prize Pool.
                                </p>

                                <div className="flex flex-col sm:flex-row gap-4 mt-4">
                                    <button
                                        onClick={startGame}
                                        className="bg-primary text-secondary h-14 px-8 text-lg font-bold uppercase tracking-wider border-2 border-secondary pixel-shadow pixel-shadow-hover transition-all duration-200 flex items-center justify-center gap-2"
                                    >
                                        <span className="material-symbols-outlined">play_arrow</span>
                                        Practice Mode
                                    </button>
                                    <button
                                        onClick={payAndPlay}
                                        className="bg-white text-secondary h-14 px-8 text-lg font-bold uppercase tracking-wider border-2 border-secondary hover:bg-gray-50 transition-all duration-200 flex items-center justify-center gap-2"
                                    >
                                        <span className="material-symbols-outlined">trophy</span>
                                        Ranked (1 AVAX)
                                    </button>
                                </div>
                                <div className="text-xs font-bold uppercase text-gray-400 tracking-widest mt-2">
                                    Current Prize Pool: <span className="text-primary">{prizePool} AVAX</span>
                                </div>
                            </div>
                            <div className="relative h-[400px] w-full bg-accent-gray border-4 border-secondary pixel-shadow group">
                                {/* Decorative abstract game scene */}
                                <div className="absolute inset-0 bg-cover bg-center" data-alt="Abstract pixel art city skyline with retro gaming vibes" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuA6KQiIbyroJB168YG_dn97nHeBMN15KxSPtsMSR0MF4tVV9Fb9lqBZX2nSUImtGZEiXUAGjx8MI62asWkMIEHVt6XbpD89UK9OJICDuJl9f0wy5EMg5yCD-GeZchZX2Ul7tI-8M-dwYM7tayamE0tRZmgoYbOaaDR5voQIMevcnV8XTd4io27mVtLeyk2MVUmadeW8fh908m-Cdg5c4ju6fIELgFVd4XBJRm9FMv6f4kT7NV1ROVnRVyeFx8xdb2827xXAVV5XQxna")', imageRendering: 'pixelated' }}>
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 to-transparent flex items-end p-6">
                                    <div className="bg-white p-4 border-2 border-secondary w-full">
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-xs font-bold uppercase text-gray-500">Current Runner</span>
                                            <span className="text-xs font-bold text-primary bg-secondary px-2 py-0.5">LVL 99</span>
                                        </div>
                                        <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                                            <div className="h-full bg-primary w-3/4"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* About The Game Section */}
                    <section className="px-6 py-20 bg-secondary text-white border-b-4 border-primary">
                        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                            <div className="flex flex-col gap-6">
                                <div className="inline-flex items-center gap-2 text-primary font-bold uppercase tracking-widest text-sm">
                                    <span className="w-8 h-0.5 bg-primary"></span>
                                    System Overview
                                </div>
                                <h2 className="text-4xl md:text-5xl font-black uppercase leading-none">
                                    Survive The <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-green-600">Infinite Run</span>
                                </h2>
                                <p className="text-gray-300 font-body text-lg leading-relaxed">
                                    <strong>Summer Dash</strong> is a high-octane infinite runner where speed is your only weapon.
                                    You play as a rogue data-packet trying to escape a collapsing digital city.
                                </p>
                                <ul className="space-y-4 font-body">
                                    <li className="flex items-start gap-4">
                                        <div className="size-8 bg-primary text-secondary flex items-center justify-center font-bold shrink-0 pixel-shadow">1</div>
                                        <div>
                                            <h4 className="font-bold uppercase text-primary">Dodge & Weave</h4>
                                            <p className="text-gray-400 text-sm">Jump over spikes, pits, and glitch-barriers. Timing is everything.</p>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-4">
                                        <div className="size-8 bg-primary text-secondary flex items-center justify-center font-bold shrink-0 pixel-shadow">2</div>
                                        <div>
                                            <h4 className="font-bold uppercase text-primary">Evolve</h4>
                                            <p className="text-gray-400 text-sm">Survive long enough to shift biomes—from the Toxic Sewers to the Void of Space.</p>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-4">
                                        <div className="size-8 bg-primary text-secondary flex items-center justify-center font-bold shrink-0 pixel-shadow">3</div>
                                        <div>
                                            <h4 className="font-bold uppercase text-primary">Win Real Rewards</h4>
                                            <p className="text-gray-400 text-sm">Score high on the leaderboard to claim your share of the AVAX prize pool.</p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div className="relative">
                                {/* Visual Representation of Gameplay */}
                                <div className="aspect-video bg-black border-4 border-white pixel-shadow p-2 relative overflow-hidden group">
                                    <div className="absolute inset-0 bg-[url('/classic_bg.png')] bg-cover opacity-50"></div>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="flex flex-col items-center gap-2 animate-pulse">
                                            <span className="material-symbols-outlined text-6xl text-primary">videogame_asset</span>
                                            <span className="font-black uppercase text-white tracking-widest">Gameplay Preview</span>
                                        </div>
                                    </div>
                                    {/* Decorative UI elements */}
                                    <div className="absolute top-2 left-2 text-xs font-mono text-white">SCORE: 004210</div>
                                    <div className="absolute top-2 right-2 text-xs font-mono text-white">LVL 03</div>
                                </div>
                                {/* Keyboard Hints */}
                                <div className="flex gap-4 mt-6 justify-center">
                                    <div className="flex items-center gap-2 text-sm text-gray-400 font-mono">
                                        <span className="border border-gray-600 px-2 py-1 rounded bg-black text-white">SPACE</span>
                                        <span>to JUMP</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-gray-400 font-mono">
                                        <span className="border border-gray-600 px-2 py-1 rounded bg-black text-white">HOLD</span>
                                        <span>for HIGHER</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Features Section */}
                    <section className="px-6 py-20 bg-white relative" id="features">
                        <div className="flex flex-col gap-12">
                            <div className="flex flex-col gap-4 max-w-2xl">
                                <h2 className="text-4xl font-black uppercase tracking-tight">The Simulation</h2>
                                <p className="text-gray-600 font-body text-lg">
                                    The world is crumbling. Only the fastest survive. Master the mechanics to top the leaderboard.
                                </p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {/* Card 1 */}
                                <div className="group bg-sunny-yellow border-2 border-secondary p-6 hover:bg-white transition-colors duration-300 relative overflow-hidden">
                                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                        <span className="material-symbols-outlined text-8xl">directions_run</span>
                                    </div>
                                    <div className="size-12 bg-white flex items-center justify-center border-2 border-secondary mb-4 pixel-shadow">
                                        <span className="material-symbols-outlined text-secondary">sprint</span>
                                    </div>
                                    <h3 className="text-xl font-bold uppercase mb-2">Speedster</h3>
                                    <p className="text-black/80 font-body text-sm">Lightweight and agile. Built for pure speed and high-stakes sprinting.</p>
                                </div>
                                {/* Card 2 */}
                                <div className="group bg-sky-blue border-2 border-secondary p-6 hover:bg-white transition-colors duration-300 relative overflow-hidden">
                                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                        <span className="material-symbols-outlined text-8xl">landscape</span>
                                    </div>
                                    <div className="size-12 bg-white flex items-center justify-center border-2 border-secondary mb-4 pixel-shadow">
                                        <span className="material-symbols-outlined text-secondary">public</span>
                                    </div>
                                    <h3 className="text-xl font-bold uppercase mb-2">7 Unique Biomes</h3>
                                    <p className="text-black/80 font-body text-sm">Survive the toxic Sewers, navigate Deep Space, and freeze in the Ice Caverns.</p>
                                </div>
                                {/* Card 3 */}
                                <div className="group bg-grass-green border-2 border-secondary p-6 hover:bg-white transition-colors duration-300 relative overflow-hidden">
                                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                        <span className="material-symbols-outlined text-8xl">bolt</span>
                                    </div>
                                    <div className="size-12 bg-white flex items-center justify-center border-2 border-secondary mb-4 pixel-shadow">
                                        <span className="material-symbols-outlined text-secondary">offline_bolt</span>
                                    </div>
                                    <h3 className="text-xl font-bold uppercase mb-2">Turbo Boosts</h3>
                                    <p className="text-black/80 font-body text-sm">Collect neon power-ups to trigger temporary invincibility and hyper-speed.</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Avalanche Integration */}
                    <section className="px-6 py-20 bg-secondary text-white relative overflow-hidden" id="avalanche">
                        {/* Background decorative elements */}
                        <div className="absolute top-10 right-10 size-64 bg-primary/20 rounded-full blur-3xl pointer-events-none"></div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
                            <div className="order-2 lg:order-1 relative">
                                {/* Floating Cards visual */}
                                <div className="relative z-10 bg-white text-secondary p-4 border-4 border-primary pixel-shadow transform rotate-2 max-w-sm mx-auto">
                                    <div className="aspect-square bg-gray-100 mb-4 border-2 border-gray-200 flex items-center justify-center" data-alt="8-bit pixel art of a soccer jersey collectible">
                                        <span className="material-symbols-outlined text-6xl text-gray-300">checkroom</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="font-bold uppercase">Jersey #04</span>
                                        <span className="bg-secondary text-primary px-2 py-0.5 text-xs font-bold">NFT</span>
                                    </div>
                                </div>
                                <div className="absolute top-12 -left-4 lg:left-0 z-0 bg-gray-800 text-white p-4 border-2 border-gray-600 transform -rotate-3 max-w-sm w-full opacity-80 scale-90">
                                    <div className="h-4 bg-gray-600 w-full mb-2"></div>
                                    <div className="h-4 bg-gray-600 w-1/2"></div>
                                </div>
                            </div>
                            <div className="order-1 lg:order-2 flex flex-col gap-6">
                                <div className="inline-flex items-center gap-2 text-primary font-bold uppercase tracking-widest text-sm">
                                    <span className="w-8 h-0.5 bg-primary"></span>
                                    Powered by Avalanche
                                </div>
                                <h2 className="text-4xl md:text-5xl font-black uppercase leading-none">
                                    Your Skill.<br />
                                    <span className="text-primary">Verified On-Chain.</span>
                                </h2>
                                <p className="text-gray-300 font-body text-lg leading-relaxed">
                                    Every run is a transaction. Every high score is a block. Summer Dash utilizes the Avalanche Network to ensure fairness and transparency in our weekly tournaments.
                                </p>
                                <ul className="flex flex-col gap-3 mt-4">
                                    <li className="flex items-center gap-3">
                                        <span className="material-symbols-outlined text-primary">verified</span>
                                        <span className="font-bold">Transparent Prize Pools</span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <span className="material-symbols-outlined text-primary">swap_horiz</span>
                                        <span className="font-bold">Instant Wallet Connect</span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <span className="material-symbols-outlined text-primary">trophy</span>
                                        <span className="font-bold">Immutable Leaderboard History</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* Leaderboard Section */}
                    <section className="px-6 py-24 bg-white" id="leaderboard">
                        <div className="max-w-4xl mx-auto flex flex-col items-center">
                            <h2 className="text-4xl font-black uppercase mb-12 text-center bg-secondary text-white px-8 py-2 inline-block transform -skew-x-12">
                                <span className="transform skew-x-12 inline-block">Global Leaderboard</span>
                            </h2>
                            <div className="w-full border-4 border-secondary bg-white pixel-shadow">
                                {/* Table Header */}
                                <div className="grid grid-cols-12 gap-4 p-4 bg-secondary text-white border-b-4 border-secondary font-bold uppercase text-sm tracking-wider">
                                    <div className="col-span-2 text-center">Rank</div>
                                    <div className="col-span-6">Runner</div>
                                    <div className="col-span-4 text-right">Score</div>
                                </div>
                                {/* Row 1 */}
                                <div className="grid grid-cols-12 gap-4 p-4 border-b border-gray-200 items-center hover:bg-primary/10 transition-colors">
                                    <div className="col-span-2 text-center flex justify-center">
                                        <div className="size-8 bg-yellow-400 border-2 border-black flex items-center justify-center font-bold">1</div>
                                    </div>
                                    <div className="col-span-6 flex items-center gap-3">
                                        <span className="font-bold font-body">CyberNinja_99</span>
                                    </div>
                                    <div className="col-span-4 text-right font-mono font-bold text-lg">8,942,000</div>
                                </div>
                                {/* Row 2 */}
                                <div className="grid grid-cols-12 gap-4 p-4 border-b border-gray-200 items-center hover:bg-primary/10 transition-colors">
                                    <div className="col-span-2 text-center flex justify-center">
                                        <div className="size-8 bg-gray-300 border-2 border-black flex items-center justify-center font-bold">2</div>
                                    </div>
                                    <div className="col-span-6 flex items-center gap-3">
                                        <span className="font-bold font-body">PixelHunter</span>
                                    </div>
                                    <div className="col-span-4 text-right font-mono font-bold text-lg">7,521,400</div>
                                </div>
                                {/* Placeholder Row */}
                                <div className="p-4 text-center text-gray-500 text-sm font-bold">
                                    ... Connect Wallet to see your rank ...
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* CTA Footer */}
                    <section className="px-6 py-20 bg-accent-gray border-t-4 border-secondary">
                        <div className="flex flex-col items-center text-center gap-8">
                            <h2 className="text-3xl md:text-5xl font-black uppercase max-w-2xl leading-tight">
                                Enter the simulation.
                            </h2>
                            <p className="text-gray-600 max-w-lg font-body">
                                The track is infinite. The rewards are real. Start your run today.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                                <button
                                    onClick={startGame}
                                    className="bg-secondary text-primary h-14 px-8 text-lg font-bold uppercase tracking-wider border-2 border-secondary pixel-shadow hover:bg-gray-800 transition-all duration-200 flex items-center justify-center gap-3"
                                >
                                    <span className="material-symbols-outlined">play_arrow</span>
                                    Play Practice Mode
                                </button>
                                <button
                                    onClick={payAndPlay}
                                    className="bg-white text-secondary h-14 px-8 text-lg font-bold uppercase tracking-wider border-2 border-secondary pixel-shadow hover:bg-gray-50 transition-all duration-200 flex items-center justify-center gap-3"
                                >
                                    <span className="material-symbols-outlined">trophy</span>
                                    Ranked (1 AVAX Entry)
                                </button>
                            </div>
                        </div>
                    </section>

                    {/* Footer */}
                    <footer className="bg-secondary text-white py-12 px-6">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                            <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary">videogame_asset</span>
                                <span className="font-bold uppercase tracking-widest">Summer Dash</span>
                            </div>
                            <div className="flex gap-6 text-sm text-gray-400 font-body">
                                <a className="hover:text-primary transition-colors" href="#">Privacy</a>
                                <a className="hover:text-primary transition-colors" href="#">Terms</a>
                                <a className="hover:text-primary transition-colors" href="#">Support</a>
                            </div>
                            <div className="mt-8 md:mt-0 text-center text-xs text-gray-600 font-mono">
                                Powered by Avalanche Network
                            </div>
                        </div>
                    </footer>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
