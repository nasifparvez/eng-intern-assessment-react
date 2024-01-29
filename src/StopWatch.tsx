import React, { useState, useEffect } from 'react';
import StopWatchButton from './StopWatchButton';

/**
 * Stopwatch Component 
 * 
 * Renders the Stopwatch Display as well as displays the table for displaying lap information under the buttons and reacts to the functionality of the buttons.
 * @date 1/29/2024 
 *
 * @export
 * @returns {JSX.Element}
 */
export default function StopWatch() {
  //Initial values of state variables to manage stopwatch data
  const [startTime, setStartTime] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [laps, setLaps] = useState<any[]>([]); 
  const [running, setRunning] = useState(false);
  const [previousLapTime, setPreviousLapTime] = useState(Date.now());
  const [lapTableVisible, setLapTableVisible] = useState(false);
  /**
   * Effect to update elapsed time at regular intervals when the stopwatch is running.
   */
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (running) {
      setStartTime(Date.now() - elapsedTime);
      timer = setInterval(() => {
        setElapsedTime(Date.now() - startTime);
      }, 10);
    }
    return () => {
      clearInterval(timer);
    };
  }, [running, elapsedTime, startTime]);

  /**
   * Resets the stopwatch to its initial state when the Reset Button is clicked.
   */
  const handleReset = () => {
    setStartTime(0);
    setElapsedTime(0);
    setLaps([]);
    setRunning(false);
    setPreviousLapTime(0);
    setLapTableVisible(false);
  };
  /**
   * Handles recording a lap in the stopwatch.
   */
  const handleLap = () => {
    const currentTime = Date.now();
    let lapTime: string;
  
    if (laps.length === 0) {
      lapTime = formatTime(elapsedTime);
      setLapTableVisible(true); 
    } else {
      lapTime = formatTime(currentTime - previousLapTime);
    }
    setLaps((prevLaps) => [...prevLaps, { lap: formatTime(elapsedTime), lapDiff: lapTime }]);
    setPreviousLapTime(currentTime);
  };


  /**
   * Formats the time in milliseconds to proper numbers in a time display so we can see the time from hours to milliseconds (HH:MM:SS.MM)
   * 
   * @param {number} time - The time in milliseconds.
   * @returns {string} - The formatted time string.
   */
  const formatTime = (time: number) => {
    const totalMilliseconds = Math.floor(time);
    const hours = Math.floor(totalMilliseconds / 3600000);
    const minutes = Math.floor((totalMilliseconds % 3600000) / 60000);
    const seconds = Math.floor((totalMilliseconds % 60000) / 1000);
    const milliseconds = totalMilliseconds % 1000;
  
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(milliseconds).padStart(3, '0').slice(0, 2)}`;
  };
  

  return (
    <div className='container'>
      <div className='centered'>
        <div className='timeDisplay'>
          {formatTime(elapsedTime)}
        </div>
        {/*Need to render the Stopwatch button in here so the UX/UI is properly formatted*/}
        <StopWatchButton
          isRunning={running}
          onStartStopClick={() => setRunning(!running)}
          onLapResetClick={running ? handleLap : handleReset}
        />
        {lapTableVisible && (
            <table className = 'lapsTable'>
              <thead>
                <tr>
                  <th className='lapNumberHeader'>Lap #</th>
                  <th className='lapTimeHeader'>Lap Time</th>
                  <th className='overtimeHeader'>Overall Time</th>
                </tr>
              </thead>
              <tbody>
                {laps.map((lap, index) => (
                  <tr key={index}>
                    <td className='lapNumberData'>{index + 1}</td>
                    <td className='lapTimeData'>{lap.lapDiff}</td>
                    <td className='overallTimeData'>{lap.lap}</td>
                  </tr>
                ))}
              </tbody>
            </table>
        )}
      </div>
    </div>
  );
}