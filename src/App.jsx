import React, { useState, useEffect } from 'react';
import Game from './Game';
import { ethers } from 'ethers';
import ErrorBoundary from './ErrorBoundary';
import LandingPage from './LandingPage';
import GameContainer from './GameContainer';
import AboutPage from './AboutPage';

// Contracts will be imported later after compilation and artifact generation
// import GameRegistryArtifact from '../../contracts/artifacts/contracts/GameRegistry.sol/GameRegistry.json';

const CONTRACT_ADDRESS = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
const TESTNET_ID = 88882;
const LOCALHOST_ID = 31337;

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
  const [wallet, setWallet] = useState(null);
  const [status, setStatus] = useState('');
  const [prizePool, setPrizePool] = useState('0');

  // Fetch Prize Pool
  const fetchPrizePool = async () => {
    // Mock prize pool for frontend demo
    setPrizePool('1000');
    /*
    if (!window.ethereum) return;
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const balance = await provider.getBalance(CONTRACT_ADDRESS);
      setPrizePool(ethers.formatEther(balance));
    } catch (err) {
      console.error("Error fetching prize pool:", err);
    }
    */
  };

  useEffect(() => {
    if (wallet) fetchPrizePool();
  }, [wallet]);

  const connectWallet = async () => {
    // Mock wallet connection
    setWallet("0x123...mock");
    setStatus("Wallet Connected (Mock)");

    /*
    if (window.ethereum) {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await provider.send("eth_requestAccounts", []);
        setWallet(accounts[0]);
        setStatus("Wallet Connected");
      } catch (error) {
        console.error(error);
        setStatus("Connection failed");
      }
    } else {
      setStatus("Please install Metamask");
    }
    */
  };

  const startGame = () => {
    setScore(0);
    setGameState('PLAYING');
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
    <div className="relative w-full h-screen bg-black">
      <GameContainer
        onGameOver={handleGameOver}
        setScore={setScore}
      />

      {gameState === 'GAMEOVER' && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="flex flex-col gap-6 text-white items-center text-center p-8 border-4 border-white bg-black shadow-pixel">
            <h1 className="text-6xl font-black uppercase mb-4 text-red-600 text-shadow-pixel">GAME OVER</h1>
            <h2 className="text-4xl font-bold">SCORE: {score}</h2>
            <div className="mt-8 flex flex-wrap gap-4 justify-center">
              <button onClick={startGame} className="border-4 border-white bg-primary px-8 py-4 text-xl font-black uppercase text-black shadow-pixel hover:shadow-pixel-hover hover:-translate-y-1 transition-transform">
                Try Again
              </button>
              <button onClick={submitScore} className="border-4 border-white bg-white px-8 py-4 text-xl font-black uppercase text-black shadow-pixel hover:shadow-pixel-hover hover:-translate-y-1 transition-transform">
                Submit Score
              </button>
              <button onClick={() => setGameState('START')} className="border-4 border-white bg-gray-800 px-8 py-4 text-xl font-black uppercase text-white shadow-pixel hover:shadow-pixel-hover hover:-translate-y-1 transition-transform">
                Back to Menu
              </button>
            </div>
            {status && <div className="mt-4 text-sm font-bold text-yellow-500">{status}</div>}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
