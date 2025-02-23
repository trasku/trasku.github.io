import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Howl } from "howler";
import "./App.css";

function App() {
  const [knocks, setKnocks] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [suomu, setSuomu] = useState(0);
  const [torvi, setTorvi] = useState(0);

  // Vaihtaa alapalkin tilan
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // Sound Effects
  const knockSound = new Howl({ src: ["/knock.mp3"] });
  const backgroundMusic = new Howl({ src: ["/background.mp3"], volume: 0.5, loop: true });
  const hornSound = new Howl({ src: ["/pikkukalle.mp3"] });

  useEffect(() => {
    backgroundMusic.play(); // Start playing the music when the component mounts

    // Cleanup function that runs when the component is unmounted
    return () => {
      backgroundMusic.stop(); // Stop the music when the component is unmounted
    };
  }, []); // Empty dependency array means this runs only on mount/unmount

  const handleKnock = () => {
    knockSound.play(); // Play knock sound
    setKnocks(knocks + 1); // Simple knock increment
  };
  
  const handleSuomuClick = () => {
    setKnocks(knocks - 50);
    setSuomu(1);
  };

  const handleTorviClick = () => { 
    setKnocks(knocks - 100);
    setTorvi(1);
  }


  // Auto-knocker logic (just knocks every second)
  useEffect(() => {
    const interval = setInterval(() => {
      if (suomu) {
        setKnocks((prevKnocks) => prevKnocks + 1); // Increment knock every second
        knockSound.play(); // Play knock sound
      }
    }, 1000); // Auto-knocker every second
    return () => clearInterval(interval);
  }, [suomu]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (torvi) {
        setKnocks((prevKnocks) => prevKnocks + 30); // Increment knock every second
        hornSound.play();
      }
    }, 10000);
    return () => clearInterval(interval);
  }, [torvi]);

  return (
    <div>
      <div className="background"></div>
      <div className="container">
        <h2 className="counter">Koputuksia: {knocks}</h2>
        <img src="/kellari.png" alt="Kellari" classname="kellari" />
          <div className="door-wrapper">
            <button className="door"
              onClick={handleKnock}>
              <img src="/ovi.png" alt="Ovi"/>
            </button>
          </div>

          <div>
            <img src="/suomu_ukkeli.png" alt="suomu_ukkeli" className="suomu_ukkeli" style={{opacity: suomu}}/>
            <img src="/torvisoittaja.png" alt="torvisoittaja" className="torvisoittaja" style={{opacity: torvi}}/>
          </div>
        
        </div>
        <button className={`toggle-button ${isOpen ? "open" : ""}`} onClick={toggleSidebar}>
          {isOpen ? "Takaisin" : "Pyydä apua"}
        </button>
        {/* Alapalkki, joka avautuu ja sulkeutuu */}
        <div className={`sidebar ${isOpen ? "open" : ""}`}>
          <ul>
            <li>Suomu: 50 koputusta <button onClick={handleSuomuClick} disabled={knocks < 50 || suomu}>Osta</button></li>
            <li>Torvi: 100 koputusta <button onClick={handleTorviClick} disabled={knocks < 100 || torvi}>Osta</button></li>
            <li>Linkki 2</li>
            <li>Linkki 3</li>
          </ul>
        </div>
    </div>
  );
}

export default App;
