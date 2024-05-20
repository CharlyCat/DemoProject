import React from 'react';
import './JobLengthSlider.css';

interface JobLengthSliderProps {
  jobLength: number;
  onJobLengthChange: (newJobLength: number) => void;
}

/**
 * Display job length slider
 * @param jobLength : Current job length
 * @param onJobLengthChange : Function to update job length
 * @returns 
 */
export const JobLengthSlider: React.FC<JobLengthSliderProps> = ({ jobLength, onJobLengthChange }) => {
  return (
    <div className="my-2 jobLengthSlider">
      <label htmlFor="jobLengthSlider" className="form-label">{jobLength} HR/s</label>
      <input
        type="range"
        className="form-range"
        min="1"
        max="5"
        value={jobLength}
        onChange={(event) => onJobLengthChange(parseInt(event.target.value))}
        id="jobLengthSlider"
      />
    </div>
  );
};

