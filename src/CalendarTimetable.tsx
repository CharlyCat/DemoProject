import React, { useState } from 'react';
import { Table } from 'react-bootstrap';
import { DayAvailability } from './GetData';
import 'bootstrap/dist/css/bootstrap.min.css';
import './CalendarTimetable.css';

interface CalendarTimetableProps {
    availabilities: DayAvailability[];
    jobLength: number; // Hours selected
}

const WORK_START_HOUR = 9;
const WORK_END_HOUR = 17;
const HOURS_PER_DAY = [9, 10, 11, 12, 13, 14, 15, 16, 17];

/**
 * Calendar / timetable componet
 * @param availabilities : mock data 
 * @param jobLength : hours selected via slider 
 */
export const CalendarTimetable: React.FC<CalendarTimetableProps> = ({ availabilities, jobLength }) => {
    const [availability, setAvailability] = useState<DayAvailability[]>(availabilities);

    /** 
     * Handles calender slot selection
     * @param timeSlot : Selected timeslot
     * @param daySlot : Selected day
     */
    const handleSlotSelection = (timeSlot: number, daySlot: number) => {
        switch (timeSlot) {
            case WORK_START_HOUR:
                jobLength++
                break;
            case WORK_END_HOUR:
                timeSlot--
                jobLength++
                break;
            default:
                timeSlot--
                jobLength += 2
        }
        setAvailability(prevAvailabilities => {
            let newAvailabilities = { ...prevAvailabilities };
            let selectedDay = newAvailabilities[daySlot];

            if (selectedDay.HoursAvailable.includes(timeSlot)) {
                // Initialize Status array if it doesn't exist
                if (!selectedDay.Status) selectedDay.Status = [];

                // Update the status for the selected slot and the follow-up hours
                for (let i = 0; i < jobLength; i++) {
                    if (selectedDay.HoursAvailable.includes(timeSlot + i)) {
                        selectedDay.Status[timeSlot + i] = 'SELECTED';
                    }
                }
            }

            return newAvailabilities;
        });
    };

    /** 
     * Assist calendar render to display cell status (available, unavailable, selected & full)
     * @param singleDay : Availability hours for current day
     * @param hourIndex : Current hour slot index being rendered
     * @param dayIndex : Current day slot column being rendered
     */
    const checkSlotAvailability = (singleDay: DayAvailability, hourIndex: number, dayIndex: number) => {
        // Retrieves the status of the current hour slot, defaulting to null if not found.
        const status = singleDay.Status?.[hourIndex] ?? null;
        
        // If the current slot is already selected, render it with a success background.
        if (status === 'SELECTED') {
            return <td className='bg-success'>Selected</td>;
        }
    
        // Defines a function to check if all hours in a specified range are available.
        const isAllHoursAvailable = (start: number, end: number) => {
            for (let hour = start; hour <= end; hour++) {
                if (!singleDay.HoursAvailable.includes(hour)) {
                    return false;
                }
            }
            return true;
        };

        let allHoursAvailable = false;
        // Checks if the current hour falls within the standard working hours.
        if (hourIndex >= WORK_START_HOUR && hourIndex+jobLength-1 <= WORK_END_HOUR) {
            // Determines the start index to check for availability based on the current hour and working hours.
            const startCheckIndex = hourIndex === WORK_START_HOUR ? hourIndex : hourIndex - 1;
            // Determines the end index to check for availability, adjusting for job length and working hours.
            const endCheckIndex = hourIndex === WORK_END_HOUR ? hourIndex + jobLength - 1 : hourIndex + jobLength;
             // Checks if all required hours are available within the calculated range.
            allHoursAvailable = isAllHoursAvailable(startCheckIndex, Math.min(endCheckIndex, WORK_END_HOUR));
        }

        // Render status
        if (allHoursAvailable) {
            return (
                <td
                    key={`${dayIndex}-${hourIndex}`}
                    className='bg-body'
                    onClick={() => handleSlotSelection(hourIndex, dayIndex)}
                    style={{ cursor: 'pointer' }}
                >
                    Available
                </td>
            );
        } else if (singleDay.HoursAvailable.includes(hourIndex)) {
            return <td className='bg-secondary'>Unavailable</td>;
        } else {
            return <td className='bg-danger'>Full</td>;
        }
    };

    /**
     * Format the date string into a day of the week e.g. Wednesday, 16th
     */
    const formatDate = (dateStr: string): string => {
        const date = new Date(dateStr);
        const optionsWeekday: Intl.DateTimeFormatOptions = { weekday: 'long' };
        const weekday = date.toLocaleDateString('en-US', optionsWeekday);
        const dayNum = date.getDate();
        let suffix = 'th';
        const j = dayNum % 10, k = dayNum % 100;
        if (j == 1 && k != 11) {
            suffix = 'st';
        } else if (j == 2 && k != 12) {
            suffix = 'nd';
        } else if (j == 3 && k != 13) {
            suffix = 'rd';
        }
        const formattedDate = `${weekday} ${dayNum}${suffix}`;
        return formattedDate;
    }

    //Render table
    return (
        <div className="table-responsive">
            <Table className="table">
                <thead>
                    <tr>
                        <td className='bg-dark' />
                        {availabilities.map((day, dayIndex) => (
                            <td key={dayIndex} className='bg-dark text-white'>
                                {formatDate(day.Date)}
                            </td>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {HOURS_PER_DAY.map((hour, hourIndex) => (
                        <tr key={hourIndex + hour}>
                            <td className="fw-bold">{`${hour}:00-${hour + 1}:00`}</td>
                            {availabilities.map((singleDay, dayIndex) => (
                                checkSlotAvailability(singleDay, hour, dayIndex)
                            ))}
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};
