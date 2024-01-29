import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import StopWatchButton from './StopWatchButton';
import '@testing-library/jest-dom';

describe('StopWatchButton Component', () => {
    test('renders Stop button when isRunning is true', () => {
        const { getByText } = render(
          <StopWatchButton isRunning={true} onStartStopClick={() => {}} onLapResetClick={() => {}} />
        );
        const stopButton = getByText('Stop');
        expect(stopButton).toBeInTheDocument();
      });
    
      test('renders Start button when isRunning is false', () => {
        const { getByText } = render(
          <StopWatchButton isRunning={false} onStartStopClick={() => {}} onLapResetClick={() => {}} />
        );
        const startButton = getByText('Start');
        expect(startButton).toBeInTheDocument();
      });

  test('calls onStartStopClick when Start/Stop button is clicked', () => {
    const mockStartStopClick = jest.fn();
    const { getByText } = render(
      <StopWatchButton isRunning={true} onStartStopClick={mockStartStopClick} onLapResetClick={() => {}} />
    );
    const stopButton = getByText('Stop');
    fireEvent.click(stopButton);
    expect(mockStartStopClick).toHaveBeenCalled();
  });

  test('calls onLapResetClick when Lap/Reset button is clicked', () => {
    const mockLapResetClick = jest.fn();
    const { getByText } = render(
      <StopWatchButton isRunning={true} onStartStopClick={() => {}} onLapResetClick={mockLapResetClick} />
    );
    const lapButton = getByText('Lap');
    fireEvent.click(lapButton);
    expect(mockLapResetClick).toHaveBeenCalled();
  });
});