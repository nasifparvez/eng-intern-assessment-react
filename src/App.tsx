import React from 'react';
import Stopwatch from './StopWatch';
import StopwatchButton from './StopWatchButton';
import './styles.css'

/**
 * App Component
 * 
 * 
 * A component that renders the Stopwatch component
 * 
 * @date 1/29/2024 
 *
 * @export
 * @returns {JSX.Element}
 */
export default function App() {
    return(
        <div>
            <Stopwatch/>
        </div>
    )
}
