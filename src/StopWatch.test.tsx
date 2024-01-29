import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Stopwatch from './StopWatch';

jest.useFakeTimers(); //This is used to mimic the timer I made in the Stopwatch Component that uses NodeJS.TimeOut 

describe('Stopwatch Component', () => {
  test('renders Stopwatch component', () => {
    const { getByText } = render(<Stopwatch />);
    const timeDisplay = getByText('00:00:00.00');
    expect(timeDisplay).toBeInTheDocument();
  });

  test('handles Lap button click', () => {
    const { getByText } = render(<Stopwatch />);
    const lapButton = getByText('Lap');
    fireEvent.click(lapButton);
    const lapNumberHeader = getByText('Lap #');
    expect(lapNumberHeader).toBeInTheDocument();
  });

  test('handles Reset button click', () => {
    const { getByText } = render(<Stopwatch />);
    const resetButton = getByText('Reset');
    fireEvent.click(resetButton);
    const timeDisplay = getByText('00:00:00.00');
    expect(timeDisplay).toBeInTheDocument();
  });

  test('updates time display when Start button is clicked', () => {
    const { getByText } = render(<Stopwatch />);
    const startButton = getByText('Start');
    fireEvent.click(startButton);
    jest.advanceTimersByTime(1000);
    const timeDisplay = getByText(/(\d{2}:\d{2}:\d{2}.\d{2})/);
    expect(timeDisplay).toBeInTheDocument();
  });

  test('clears interval when Stop button is clicked', () => {
    const { getByText } = render(<Stopwatch />);
    const startButton = getByText('Start');
    fireEvent.click(startButton);
    fireEvent.click(getByText('Stop'));
    const timeDisplay = getByText('00:00:00.00');
    expect(timeDisplay).toBeInTheDocument();
  });
});
