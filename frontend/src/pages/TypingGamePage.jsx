import React, { useState, useEffect, useRef } from 'react';
import api from '../api'; // Assuming api is for making HTTP requests
import { useNavigate } from 'react-router-dom';
import './TypingGamePage.css';

function TypingGamePage() {
  const wordList = [
    'and', 'and', 'and', 'and', 'and', 'and', 'and', 'the', 'the', 'the', 'the', 'the', 'the', 'the', 'is', 'is', 'is', 'is', 'is', 'is',
    'and', 'and', 'and', 'and', 'and', 'and', 'and', 'the', 'the', 'the', 'the', 'the', 'the', 'the', 'is', 'is', 'is', 'is', 'is', 'is',
    'and', 'and', 'and', 'and', 'and', 'and', 'and', 'the', 'the', 'the', 'the', 'the', 'the', 'the', 'is', 'is', 'is', 'is', 'is', 'is',
    'are', 'are', 'are', 'are', 'are', 'was', 'was', 'was', 'was', 'was', 'were', 'were', 'were', 'were', 'were', 'has', 'has', 'has', 'has',
    'are', 'are', 'are', 'are', 'are', 'was', 'was', 'was', 'was', 'was', 'were', 'were', 'were', 'were', 'were', 'has', 'has', 'has', 'has',
    'are', 'are', 'are', 'are', 'are', 'was', 'was', 'was', 'was', 'was', 'were', 'were', 'were', 'were', 'were', 'has', 'has', 'has', 'has',
    'have', 'have', 'have', 'have', 'have', 'do', 'do', 'do',  'do', 'do', 'did', 'did', 'did', 'did', 'did', 'to', 'to', 'to', 'to', 'to',
    'have', 'have', 'have', 'have', 'have', 'do', 'do', 'do',  'do', 'do', 'did', 'did', 'did', 'did', 'did', 'to', 'to', 'to', 'to', 'to',
    'have', 'have', 'have', 'have', 'have', 'do', 'do', 'do',  'do', 'do', 'did', 'did', 'did', 'did', 'did', 'to', 'to', 'to', 'to', 'to',
    'it', 'it', 'it', 'it', 'it', 'a', 'a', 'a', 'a', 'a', 'can', 'can', 'can', 'can', 'can', 'dog', 'dog', 'cat', 'cat', 'car', 'car', 
    'it', 'it', 'it', 'it', 'it', 'a', 'a', 'a', 'a', 'a','it', 'it', 'it', 'it', 'it', 'a', 'a', 'a', 'a', 'a','it', 'it', 'it', 'it', 'it',
    'phone', 'book', 'book', 'pen', 'pen', 'chair', 'table', 'lamp', 'lamp', 'lamp', 'computer', 'screen', 'screen', 'keyboard', 'mouse',
    'camera', 'door', 'window', 'floor', 'ceiling', 'wall', 'pillow', 'blanket', 'blanket', 'clock', 'watch', 'glass', 'bottle', 'cup', 
    'plate', 'fork', 'knife', 'run', 'run', 'run', 'jump', 'jump', 'walk', 'swim', 'read', 'read', 'write', 'write', 'play', 'play', 'play',
    'sing', 'dance', 'dance', 'cook', 'build', 'build', 'watch', 'watch', 'listen', 'listen', 'speak', 'drive', 'drive', 'drive', 'lion',
    'tiger', 'rabbit', 'rabbit', 'fox', 'zebra', 'zebra', 'elephant', 'elephant', 'giraffe', 'monkey', 'dolphin', 'shark', 'shark', 'whale',
    'whale', 'bear', 'bear', 'wolf', 'deer', 'apple', 'banana', 'banana', 'cherry', 'grape', 'orange', 'lemon', 'pear', 'pear', 'watermelon',
    'strawberry', 'carrot', 'carrot', 'potato', 'tomato', 'tomato', 'red', 'blue', 'green', 'yellow', 'yellow', 'orange', 'pink', 'purple',
    'black', 'white', 'white', 'rain', 'rain', 'snow', 'snow', 'sun', 'sun', 'wind', 'cloud', 'cloud', 'storm', 'lake', 'river', 'river',
    'mountain', 'mountain', 'hammer', 'hammer', 'nail', 'screw', 'drill', 'drill', 'saw', 'wrench', 'pliers', 'ladder', 'rope', 'toolbox',
    'chisel', 'spanner', 'tape', 'brush', 'roller', 'glue', 'bus', 'bus', 'bike', 'bike', 'truck', 'scooter', 'scooter', 'ferry', 'boat',
    'ship', 'subway', 'house', 'house', 'building', 'building', 'school', 'school', 'garden', 'garden', 'village', 'office', 'road', 'a',
    'forest', 'forest', 'island', 'island', 'desert', 'ocean', 'beach', 'park', 'city', 'helmet', 'mask', 'mask', 'glasses', 'umbrella',
    'wallet', 'wallet', 'bag', 'backpack', 'ring', 'bracelet', 'bracelet', 'necklace', 'earrings', 'earrings', 'hook', 'thread', 'fabric',
    'cotton', 'wool', 'silk', 'silk', 'leather', 'plastic', 'metal', 'stone', 'brick', 'cement', 'paint', 'paint', 'energy', 'engine',
    'engine', 'fuel', 'oil', 'oil', 'diesel', 'electricity', 'power', 'battery', 'light', 'bulb', 'fan', 'fan', 'heater', 'cooler','train',
    'notebook', 'notebook', 'piano', 'piano', 'violin', 'music', 'drum', 'drum', 'guitar', 'flute', 'trumpet', 'xylophone', 'flower',
    'grass', 'tree', 'tree', 'leaf', 'branch', 'branch', 'river', 'stream', 'valley', 'mountain', 'hill', 'field', 'field', 'cloud', 'rain',
    'snow', 'storm', 'lightning', 'thunder', 'thunder', 'morning', 'afternoon', 'evening', 'evening', 'night', 'day', 'week', 'week',
    'month', 'year', 'hour', 'minute', 'minute', 'second', 'today', 'yesterday', 'tomorrow','paddle', 'pail', 'palette', 'panther', 'parrot', 
    'agenda', 'album', 'anchor', 'angel', 'ankle', 'ant', 'apron', 'arch', 'arrow', 'ash', 'parsley', 'patch', 'peach', 'pebble', 'peg', 
    'avocado', 'badge', 'balloon', 'bamboo', 'basin', 'bat', 'beachball', 'beacon', 'bee', 'beetle', 'luggage', 'lynx', 'machete', 'magnet', 
    'meteor', 'microscope', 'minnow', 'mist', 'moat', 'moss', 'moth', 'motorboat', 'mount', 'mug', 'mushroom', 'lettuce', 'lifeguard', 'a',
    'napkin', 'net', 'nib', 'oar', 'octopus', 'onion', 'opal', 'orchard', 'otter', 'owl', 'ox', 'pad', 'jungle', 'kayak', 'kettle', 'a',
    'bell', 'beret', 'biscuit', 'blender', 'blueberry', 'board', 'bookmark', 'bow', 'brace', 'bricklayer', 'horizon', 'horn', 'hose', 'hut', 
    'broccoli', 'bucket', 'butterfly', 'cabinet', 'cactus', 'calendar', 'camel', 'canoe', 'cape', 'capsule', 'mango', 'mantis', 'margarine', 
    'caravan', 'card', 'castle', 'cauliflower', 'cave', 'chalk', 'chimney', 'circle', 'clay', 'clip', 'clover', 'lime', 'lipstick',  'a',
    'club', 'coach', 'coconut', 'coil', 'colander', 'compass', 'cone', 'cookie', 'cork', 'corn', 'corridor', 'loch', 'locomotive', 'log', 
    'cotton', 'cracker', 'crate', 'crayon', 'crown', 'cube', 'cucumber', 'cupboard', 'curtain', 'cushion', 'mask', 'meadow', 'medal', 
    'dagger', 'daisy', 'dancer', 'dart', 'desk', 'diamond', 'dinosaur', 'dishwasher', 'doll', 'donkey', 'knee', 'knot', 'lantern', 'a',
    'doorway', 'dragon', 'drumstick', 'duck', 'easel', 'eel', 'eggplant', 'elbow', 'elm', 'engineer', 'icicle', 'igloo', 'ink', 'insect', 
    'escalator', 'eyelash', 'eyelid', 'fence', 'fern', 'field', 'fisherman', 'flag', 'flamingo', 'flask', 'laundry', 'leaflet', 'lemonade', 
    'flipflop', 'flute', 'fog', 'fountain', 'frame', 'frost', 'fungus', 'furnace', 'garage', 'garbage', 'iron', 'ivy', 'jelly', 'jewel', 
    'garlic', 'giraffe', 'globe', 'glove', 'gnome', 'goose', 'gourd', 'grill', 'gull', 'guitar', 'gym', 'lighthouse', 'plane','lizard',
    'gyroscope', 'hanger', 'harbor', 'harp', 'hatch', 'hatchet', 'hedgehog', 'helmet', 'hermit', 'hive', 'pelican','kitchen','bridge','a',
    
    
    
  ];
  

  const [fullText, setFullText] = useState([]);
  const [textToType, setTextToType] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [typedWords, setTypedWords] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timerStarted, setTimerStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [selectedTime, setSelectedTime] = useState(60);
  const [gameOver, setGameOver] = useState(false);
  const [wpm, setWpm] = useState(0);
  const [scoreSubmitted, setScoreSubmitted] = useState(false);
  const navigate = useNavigate();
  const inputRef = useRef(null);

  useEffect(() => {
    generateFullText();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    let timer;
    if (timerStarted && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft((prevTime) => prevTime - 1), 1000);
    } else if (timeLeft === 0) {
      endGame();
    }
    return () => clearTimeout(timer);
  }, [timerStarted, timeLeft]);

  const generateFullText = () => {
    const words = [];
    for (let i = 0; i < 300; i++) {
      const randomWord = wordList[Math.floor(Math.random() * wordList.length)];
      words.push(randomWord);
    }
    setFullText(words);
    setCurrentIndex(0);
    setTextToType(words.slice(0, 15));
    setUserInput('');
    setTypedWords([]);
    setGameOver(false);
    setTimerStarted(false);
    setTimeLeft(selectedTime);
    setWpm(0);
    setScoreSubmitted(false);
  };

  const getNextTextToType = () => {
    const newIndex = currentIndex + 15;
    setCurrentIndex(newIndex);
    setTextToType(fullText.slice(newIndex, newIndex + 15));
    setUserInput('');
  };

  const handleInputChange = (e) => {
    if (!timerStarted) {
      setTimerStarted(true);
    }
    const value = e.target.value;
    setUserInput(value);

    const words = value.trim().split(/\s+/);

    // Check if exactly 15 words have been typed and the last character is a space
    if (words.length === 15 && value.endsWith(' ')) {
      const typedSegment = words.slice(0, 15);
      setTypedWords((prevTypedWords) => [...prevTypedWords, ...typedSegment]);
      getNextTextToType();
      // Reset userInput to remove processed words
      setUserInput('');
    }
  };

  const endGame = () => {
    setGameOver(true);
    setTimerStarted(false);
  
    // Calculate results and pass the WPM directly to submitScore
    const finalWpm = calculateResults();
    submitScore(finalWpm);
  };

  const calculateResults = () => {
    // Process any remaining words in userInput
    const remainingWords = userInput.trim().split(/\s+/).filter((word) => word.length > 0);
    const allTypedWords = [...typedWords, ...remainingWords];
  
    let correctWords = 0;
    for (let i = 0; i < allTypedWords.length; i++) {
      if (allTypedWords[i] === fullText[i]) {
        correctWords++;
      }
    }
    const timeElapsed = (selectedTime - timeLeft) / 60;
    const calculatedWpm = timeElapsed > 0 ? Math.round(correctWords / timeElapsed) : 0;
  
    setWpm(calculatedWpm); // Update the state for display purposes
    return calculatedWpm; // Return the WPM for immediate use
  };

  const submitScore = async (finalWpm) => {
    if (scoreSubmitted) return;
    setScoreSubmitted(true);
    try {
      await api.post('/api/typing-game-scores/', { score: finalWpm });
    } catch (error) {
      console.error('Failed to submit score:', error);
      alert('Failed to submit score');
    }
  };

  const handleTimeSelect = (e) => {
    const time = Number(e.target.value);
    setSelectedTime(time);
    setTimeLeft(time);
  };

  const resetGame = () => {
    generateFullText();
    inputRef.current.focus();
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="typing-game-wrapper">
      <div className="typing-game-container">
        <button className="back-button" onClick={handleBack}>
          Back
        </button>
        <h2>Typing Game</h2>
        <div className="game-info">
          <label htmlFor="time-select">Time Left: {timeLeft}s</label>
          <select id="time-select" value={selectedTime} onChange={handleTimeSelect} disabled={timerStarted}>
            <option value={30}>30 seconds</option>
            <option value={60}>60 seconds</option>
          </select>
        </div>
        <p>Type the following text:</p>
        <div className="text-to-type">{textToType.join(' ')}</div>
        <textarea
          ref={inputRef}
          className="typing-input"
          value={userInput}
          onChange={handleInputChange}
          disabled={gameOver}
        ></textarea>
        {gameOver && (
          <div className="results-screen">
            <p>Game Over!</p>
            <p>WPM: {wpm}</p>
            <button className="play-again-button" onClick={resetGame}>
              Restart
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default TypingGamePage;