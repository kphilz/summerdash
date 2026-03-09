import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { useAppKitAccount, useAppKit, useAppKitProvider } from '@reown/appkit/react';
import Game from './Game';
import ErrorBoundary from './ErrorBoundary';
import LandingPage from './LandingPage';
import GameContainer from './GameContainer';
import AboutPage from './AboutPage';
import OrientationOverlay from './OrientationOverlay';
import ProfilePage from './ProfilePage';

const CONTRACT_ADDRESS = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
const TESTNET_ID = 88882;
const LOCALHOST_ID = 31337;

const generateRandomUsername = () => {
  const prefixes = ['Runner', 'Glitch', 'Cyber', 'Dash', 'Block', 'Avax', 'Sewer', 'Sky'];
  const suffix = Math.floor(1000 + Math.random() * 9000);
  return `${prefixes[Math.floor(Math.random() * prefixes.length)]}_${suffix}`;
};

const calculateLevelFromXP = (totalPoints) => {
  if (totalPoints < 20000) return 0;
  let level = 1;
  let target = 20000;
  while (totalPoints >= target * 2 && level < 20) {
    target *= 2;
    level++;
  }
  return level;
};

function App() {
  return (
    <ErrorBoundary>
      <AppContent />
    </ErrorBoundary>
  );
}

function AppContent() {
  const [gameState, setGameState] = useState('START'); // START, PLAYING, GAMEOVER
  const [currentView, setCurrentView] = useState('LANDING'); // LANDING, ABOUT, PROFILE
  const [score, setScore] = useState(0);
  const [runCoins, setRunCoins] = useState(0);
  const [runObstacles, setRunObstacles] = useState(0);
  const [status, setStatus] = useState('');
  const [prizePool, setPrizePool] = useState('0');
  const [showSubmissionToast, setShowSubmissionToast] = useState(false);
  const [scoreSubmitted, setScoreSubmitted] = useState(false);

  // User Statistics & Session State
  const [user, setUser] = useState(null);

  // Reown AppKit Hooks
  const { address, isConnected } = useAppKitAccount();
  const { open } = useAppKit();
  const { walletProvider } = useAppKitProvider('eip155');

  const wallet = isConnected ? address : null;

  // Load/Save User Profile
  useEffect(() => {
    if (isConnected && address) {
      const savedStats = JSON.parse(localStorage.getItem(`sd_user_${address.toLowerCase()}`));
      if (savedStats) {
        const syncedUser = {
          ...savedStats,
          globalLevel: calculateLevelFromXP(savedStats.totalPoints || 0)
        };
        setUser(syncedUser);
      } else {
        const newUser = {
          address,
          username: generateRandomUsername(),
          usernameChanged: false,
          totalPoints: 0,
          globalLevel: calculateLevelFromXP(0),
          sessions: []
        };
        setUser(newUser);
        localStorage.setItem(`sd_user_${address.toLowerCase()}`, JSON.stringify(newUser));
      }
    } else {
      setUser(null);
    }
  }, [isConnected, address]);

  const updateUsername = (name) => {
    if (!user) return;
    const updatedUser = { ...user, username: name, usernameChanged: true };
    setUser(updatedUser);
    localStorage.setItem(`sd_user_${address.toLowerCase()}`, JSON.stringify(updatedUser));
  };

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
  }, [isConnected]);

  const connectWallet = async () => {
    try {
      await open();
    } catch (error) {
      console.error("Connection failed:", error);
      setStatus("Connection failed");
    }
  };

  const [gameKey, setGameKey] = useState(0);

  // Manage body scroll based on game state
  useEffect(() => {
    if (gameState === 'PLAYING') {
      document.body.classList.add('game-active');
    } else {
      document.body.classList.remove('game-active');
    }
  }, [gameState]);

  const startGame = () => {
    setScore(0);
    setScoreSubmitted(false);
    setGameState('PLAYING');
    setGameKey(prev => prev + 1);
    setStatus("");
  };

  const payAndPlay = async () => {
    if (!isConnected) return alert("Connect Wallet first!");

    try {
      const provider = new ethers.BrowserProvider(walletProvider);
      const signer = await provider.getSigner();

      // Since ABI is not yet provided, we'll keep it as a documented step
      // or implement a simple sendTransaction for demo if needed.
      // But for now, we'll follow the pattern in the file.

      setStatus("Mocking Payment for Demo (SDK Integrated)...");
      // In production: const tx = await contract.startGame({ value: ethers.parseEther("1.0") });

      setTimeout(() => {
        setStatus("Payment Successful! GLHF!");
        fetchPrizePool();
        startGame();
      }, 1000);

    } catch (err) {
      console.error(err);
      setStatus("Payment Failed: " + (err.reason || err.message));
    }
  };

  const [lastLevelReached, setLastLevelReached] = useState(1);
  const handleGameOver = (scoreInfo) => {
    // Receive { score (obstacles), coins } from Game.jsx
    const totalPoints = (scoreInfo.score || 0) + (scoreInfo.coins || 0);

    setScore(totalPoints);
    setRunCoins(scoreInfo.coins || 0);
    setRunObstacles(scoreInfo.score || 0);

    // Simple logic to detect level from score if Game doesn't send it yet
    const estimatedLevel = Math.max(1, Math.floor((scoreInfo.score || 0) / 50) + 1);
    setLastLevelReached(estimatedLevel);
    setGameState('GAMEOVER');
  };

  const submitScore = async () => {
    if (!isConnected) {
      connectWallet();
      return;
    }

    try {
      setStatus("Awaiting Signature...");
      const provider = new ethers.BrowserProvider(walletProvider);
      const signer = await provider.getSigner();

      // Show proof of score for MVP video
      const message = `Summer Dash: Submit High Score\nScore: ${score}\nDate: ${new Date().toLocaleDateString()}`;
      await signer.signMessage(message);

      setStatus("Score Verified!");
      setShowSubmissionToast(true);
      setScoreSubmitted(true);
      setTimeout(() => setShowSubmissionToast(false), 3000);

      if (user) {
        const newSession = {
          date: new Date().toISOString(),
          score: score,
          level: lastLevelReached
        };

        const updatedUser = {
          ...user,
          totalPoints: user.totalPoints + score,
          globalLevel: calculateLevelFromXP(user.totalPoints + score),
          sessions: [...(user.sessions || []), newSession]
        };

        setUser(updatedUser);
        localStorage.setItem(`sd_user_${address.toLowerCase()}`, JSON.stringify(updatedUser));
      }
    } catch (err) {
      console.error(err);
      setStatus("Submission Cancelled");
    }
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
    if (currentView === 'PROFILE' && user) {
      return (
        <ProfilePage
          user={user}
          onBack={() => setCurrentView('LANDING')}
          onUpdateUsername={updateUsername}
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
        onOpenProfile={() => setCurrentView('PROFILE')}
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
              <div className="flex flex-col gap-2 w-full max-w-xs">
                <div className="flex justify-between w-full border-b border-white/20 pb-1">
                  <span className="text-xs font-bold opacity-70 uppercase tracking-widest">OBSTACLES:</span>
                  <span className="text-xl font-bold">{runObstacles}</span>
                </div>
                <div className="flex justify-between w-full border-b border-white/20 pb-1">
                  <span className="text-xs font-bold opacity-70 uppercase tracking-widest text-primary">COINS:</span>
                  <span className="text-xl font-bold text-primary">{runCoins}</span>
                </div>
                <h2 className="text-2xl md:text-5xl font-black mt-4 uppercase text-white">SCORE: {score}</h2>
              </div>
              <div className="mt-4 md:mt-8 flex flex-wrap gap-3 md:gap-4 justify-center">
                <button onClick={startGame} className="border-4 border-white bg-primary px-4 md:px-8 py-2 md:py-4 text-base md:text-xl font-black uppercase text-black shadow-pixel hover:shadow-pixel-hover hover:-translate-y-1 transition-transform active:translate-y-1">
                  Try Again
                </button>
                {!scoreSubmitted && (
                  <button onClick={submitScore} className="border-4 border-white bg-white px-4 md:px-8 py-2 md:py-4 text-base md:text-xl font-black uppercase text-black shadow-pixel hover:shadow-pixel-hover hover:-translate-y-1 transition-transform active:translate-y-1">
                    {isConnected ? "Submit Score" : "Connect Wallet"}
                  </button>
                )}
                <button onClick={() => setGameState('START')} className="border-4 border-white bg-gray-600 px-4 md:px-8 py-2 md:py-4 text-base md:text-xl font-black uppercase text-white shadow-pixel hover:shadow-pixel-hover hover:-translate-y-1 transition-transform active:translate-y-1">
                  Home
                </button>
              </div>

              {/* Score Submission Toast */}
              {showSubmissionToast && (
                <div className="absolute top-10 left-1/2 -translate-x-1/2 z-[100] animate-in slide-in-from-top duration-500 w-full px-4">
                  <div className="bg-primary border-4 border-white px-8 py-4 shadow-pixel flex items-center gap-4 max-w-sm mx-auto">
                    <span className="material-symbols-outlined text-black text-3xl font-black">verified</span>
                    <p className="text-black font-black uppercase text-xl">Score {score} submitted!</p>
                  </div>
                </div>
              )}

              {status && <div className="mt-4 text-xs md:text-sm font-bold text-yellow-500">{status}</div>}
            </div>
          </div>
        )}
      </div>

    </OrientationOverlay>
  );
}


export default App;
