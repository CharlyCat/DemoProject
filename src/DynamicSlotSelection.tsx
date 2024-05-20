import React, { useState, useEffect } from 'react';
import { CalendarTimetable } from './CalendarTimetable';
import { JobLengthSlider } from './JobLengthSlider';
import { DayAvailability, getData } from './GetData';

/** Handle slot selection */
export const DynamicSlotSelection: React.FC = () => {
    const [selectedSlot, setSelectedSlot] = useState<{ timeIndex: number; dayIndex: number } | null>(null);
    const [jobLength, setJobLength] = useState<number>(1);
    const [availabilities, setAvailabilities] = useState<DayAvailability[]>(getData());

    //TODO : Chrome progress slider colouring not responsive
    // const handleSliderChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    //     const newValue = parseInt(event.target.value);
    //     setJobLength(newValue);
    //     // Calculate the percentage of the slider's value (Chrome)
    //     const max = parseInt(event.target.max, 10); 
    //     const percentage = (newValue / max) * 100;
    //     // Set the CSS variable for the progress bar's width (Chrome)
    //     event.target.style.setProperty('--progress-percentage', `${percentage}%`);
    //   };

    return (
        <div className="container">
            <JobLengthSlider jobLength={jobLength} onJobLengthChange={setJobLength} />
            <CalendarTimetable availabilities={availabilities} jobLength={jobLength} />
        </div>
    );

};
