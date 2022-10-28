import React, { useState, useRef } from 'react';
import './App.css';
const App = () => {
  const [timer, setTimer] = useState(3595)
  const [isActive, setIsActive] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const increment = useRef(null)

  const handleStart = () => {
    setIsActive(true)
    setIsPaused(true)
    increment.current = setInterval(() => {
      setTimer((timer) => timer + 1)
    }, 1000)
  }

  const handlePause = () => {
    clearInterval(increment.current)
    setIsPaused(false)
  }

  const handleResume = () => {
    setIsPaused(true)
    increment.current = setInterval(() => {
      setTimer((timer) => timer + 1)
    }, 1000)
  }

  const handleReset = () => {
    clearInterval(increment.current)
    setIsActive(false)
    setIsPaused(false)
    setTimer(0)
  }

  const formatTime = () => {
    const getSeconds = `0${(timer % 60)}`.slice(-2)
    const minutes = `${Math.floor(timer / 60)}`
    const getMinutes = `0${minutes % 60}`.slice(-2)
    const getHours = `0${Math.floor(timer / 3600)}`.slice(-2)
    return `${getHours} : ${getMinutes} : ${getSeconds}`
  }
  return (
    <div className="App">
      <h3>React Stopwatch</h3>
      <div className='stopwatch-card'>
        <h4>{formatTime()}</h4>
        <div className='buttons'>
          {
            !isActive && !isPaused ?
              <button className='btn btn-info mx-1' onClick={handleStart}>Start</button>
              : (
                isPaused ? <button className='btn btn-secondary mx-1' onClick={handlePause}>Pause</button> :
                  <button className='btn btn-primary mx-1' onClick={handleResume}>Resume</button>
              )
          }
          <button className='btn btn-danger mx-1' onClick={handleReset} disabled={!isActive}>Reset</button>
        </div>
      </div>
    </div>
  );
}

export default App;