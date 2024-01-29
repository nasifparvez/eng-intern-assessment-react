import React from 'react';
import './StopWatchButton.css'

/**
 * StopWatchButton Component
 * 
 * A Component where the buttons controlling of the Stopwatch are rendered
 * 
 * @date 1/29/2024 
 *
 * @interface StopWatchButtonProps
 * @typedef {StopWatchButtonProps}
 */
interface StopWatchButtonProps {
  /**
   * Indicates whether or not stopwatch is running
   * @date 1/29/2024 
   *
   * @type {boolean}
   */
  isRunning: boolean;
  /**
   * Callback function to toggle the button state and functionality from a start button to a stop button
   * @date 1/29/2024 
   *
   * @type {() => void}
   */
  onStartStopClick: () => void;
  /**
   * Callback function to toggle the button state and functionality from a lap button to a reset button
   * @date 1/29/2024 
   *
   * @type {() => void}
   */
  onLapResetClick: () => void;
}
/**
 *
 * @export
 * @param {StopWatchButtonProps} param0 -- the properties of the StopWatchButton component
 * @param {boolean} param0.isRunning -- determines whether the stopwatch is currently running 
 * @param {() => void} param0.onStartStopClick -- callback function to either start and stop the watch and changes the state of the button
 * @param {() => void} param0.onLapResetClick -- callback function to switch to a lap button, to record the lap and its time or a reset button which resets the timer
 * @returns {JSX.Element}}
 */
export default function StopWatchButton({
  isRunning, 
  onStartStopClick, 
  onLapResetClick,
}: StopWatchButtonProps) {


  return (
    <div className='buttonContainer'>
      <button
        className={isRunning ? 'stopButton' : 'startButton'}
        onClick={onStartStopClick}
      >
        {isRunning ? 'Stop' : 'Start'}
      </button>
      <button className={ isRunning ? 'lapButton' : 'resetButton'} onClick={onLapResetClick}>  
        {isRunning ? '\u00a0\u00a0Lap\u00a0\u00a0' : 'Reset'} {/*  \u00a0 is a non breaking space character which allows us to keep the Lap and Reset button the same size when change states*/}

      </button>
    </div>
  );
}
