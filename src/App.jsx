import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import Game from './Game';
import ErrorBoundary from './ErrorBoundary';
import LandingPage from './LandingPage';
import GameContainer from './GameContainer';
import AboutPage from './AboutPage';
import OrientationOverlay from './OrientationOverlay';
import { createWeb3Modal, defaultConfig, useWeb3Modal, useWeb3ModalAccount, useWeb3ModalProvider } from '@web3modal/ethers/react';

const projectId = '809cd54a4116a440b4f28d282bd98563';

const mainnet = {
  chainId: 43114,
  name: 'Avalanche',
  currency: 'AVAX',
  explorerUrl: 'https://snowtrace.io',
  rpcUrl: 'https://api.avax.network/ext/bc/C/rpc'
};

const metadata = {
  name: 'Summer Dash',
  description: 'High-octane runner game on Avalanche',
  url: 'https://summerdash.com', // origin must match your domain & subdomain
  icons: ['https://avatars.githubusercontent.com/u/37784886']
};

const ethersConfig = defaultConfig({
  metadata,
  enableEthersDeterminstic: false,
  enableUniversalProvider: true
});

createWeb3Modal({
  ethersConfig,
  chains: [mainnet],
  projectId,
  enableAnalytics: true // Optional - defaults to your Cloud configuration
});

const CONTRACT_ADDRESS = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

function App() {
  return (
    <ErrorBoundary>
      <AppContent />
    </ErrorBoundary>
  );
}

function AppContent() {
  const [gameState, setGameState] = useState('START'); // START, PLAYING, GAMEOVER
  const [currentView, setCurrentView] = useState('LANDING'); // LANDING, ABOUT
  const [score, setScore] = useState(0);
  const [status, setStatus] = useState('');
  const [prizePool, setPrizePool] = useState('0');

  const { open } = useWeb3Modal();
  const { address, isConnected } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();

  const wallet = address;

  // Fetch Prize Pool
  const fetchPrizePool = async () => {
    setPrizePool('1000');
    if (!walletProvider) return;
    try {
      const provider = new ethers.BrowserProvider(walletProvider);
      const balance = await provider.getBalance(CONTRACT_ADDRESS);
      setPrizePool(ethers.formatEther(balance));
    } catch (err) {
      console.error("Error fetching prize pool:", err);
    }
  };

  useEffect(() => {
    if (isConnected) {
      fetchPrizePool();
      setStatus("Wallet Connected");
    } else {
      setStatus("");
    }
  }, [isConnected, walletProvider]);

  const connectWallet = async () => {
    try {
      await open();
    } catch (error) {
      console.error(error);
      setStatus("Connection failed");
    }
  };

  const [gameKey, setGameKey] = useState(0);

  const startGame = () => {
    setScore(0);
    setGameState('PLAYING');
    setGameKey(prev => prev + 1);
  };

  const payAndPlay = async () => {
    // Mock payment for frontend demo
    setStatus("Mock Payment Successful! GLHF!");
    fetchPrizePool();
    startGame();

    /*
    if (!wallet) return alert("Connect Wallet first!");
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, GameRegistryArtifact.abi, signer);

      setStatus("Paying Entry Fee (1 AVAX)...");
      const tx = await contract.startGame({ value: ethers.parseEther("1.0") });
      await tx.wait();

      setStatus("Entry Paid! GLHF!");
      fetchPrizePool();
      startGame();
    } catch (err) {
      console.error(err);
      setStatus("Payment Failed: " + (err.reason || err.message));
    }
    */
  };

  const handleGameOver = (finalScore) => {
    setScore(finalScore);
    setGameState('GAMEOVER');
  };

  const submitScore = async () => {
    alert(`Score ${score} submitted! (Mock)`);
    setStatus("Score Submitted (Mock)!");

    /*
    if (!wallet) return alert("Connect Wallet first!");
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, GameRegistryArtifact.abi, signer);
      setStatus("Sending transaction...");
      const tx = await contract.submitScore(score);
      await tx.wait();
      setStatus("Score Submitted!");
      alert(`Score ${score} submitted!`);
    } catch (err) {
      console.error(err);
      setStatus("Transaction failed: " + err.message);
    }
    */
  };

  // State Switching Logic
  if (gameState === 'START') {
    if (currentView === 'ABOUT') {
      return (
        <AboutPage
          onBack={() => setCurrentView('LANDING')}
          startGame={startGame}
        />
      );
    }
    return (
      <LandingPage
        startGame={startGame}
        payAndPlay={payAndPlay}
        wallet={wallet}
        connectWallet={connectWallet}
        status={status}
        prizePool={prizePool}
        onOpenAbout={() => setCurrentView('ABOUT')}
      />
    );
  }

  // Active Game (PLAYING or GAMEOVER overlay)
  return (
    <OrientationOverlay>
      <div className="relative w-full h-screen bg-black">
        <GameContainer
          key={gameKey}
          onGameOver={handleGameOver}
          setScore={setScore}
          onExit={() => setGameState('START')}
        />

        {gameState === 'GAMEOVER' && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <div className="flex flex-col gap-4 md:gap-6 text-white items-center text-center p-6 md:p-8 border-4 border-white bg-black shadow-pixel max-w-lg w-full">
              <h1 className="text-4xl md:text-6xl font-black uppercase text-red-600 text-shadow-pixel">GAME OVER</h1>
              <h2 className="text-2xl md:text-4xl font-bold">SCORE: {score}</h2>
              <div className="mt-4 md:mt-8 flex flex-wrap gap-3 md:gap-4 justify-center">
                <button onClick={startGame} className="border-4 border-white bg-primary px-4 md:px-8 py-2 md:py-4 text-base md:text-xl font-black uppercase text-black shadow-pixel hover:shadow-pixel-hover hover:-translate-y-1 transition-transform active:translate-y-1">
                  Try Again
                </button>
                <button onClick={submitScore} className="border-4 border-white bg-white px-4 md:px-8 py-2 md:py-4 text-base md:text-xl font-black uppercase text-black shadow-pixel hover:shadow-pixel-hover hover:-translate-y-1 transition-transform active:translate-y-1">
                  Submit Score
                </button>
                <button onClick={() => setGameState('START')} className="border-4 border-white bg-gray-800 px-4 md:px-8 py-2 md:py-4 text-base md:text-xl font-black uppercase text-white shadow-pixel hover:shadow-pixel-hover hover:-translate-y-1 transition-transform active:translate-y-1">
                  Menu
                </button>
              </div>
              {status && <div className="mt-4 text-xs md:text-sm font-bold text-yellow-500">{status}</div>}
            </div>
          </div>
        )}
      </div>

    </OrientationOverlay>
  );
}


export default App;
