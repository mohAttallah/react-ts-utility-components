import React from 'react';
import moment from 'moment';

const handleAddToCalendar = () => {
    const event = {
        start: new Date(),
        end: moment().add(1, 'days').toDate(),
        title: 'Example Event',
        description: 'This is an example event description.',
    };

    const { title, start, end, description } = event as any;

    const startDate = new Date(start);
    const endDate = new Date(end);

    const calendarData = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'BEGIN:VEVENT',
        `SUMMARY:${title}`,
        `DTSTART:${startDate.toISOString().replace(/[-:]/g, '')}`,
        `DTEND:${endDate.toISOString().replace(/[-:]/g, '')}`,
        `DESCRIPTION:${description || ''}`,
        'END:VEVENT',
        'END:VCALENDAR',
    ].join('\n');

    const blob = new Blob([calendarData], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'event.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

const CalendarButton: React.FC = () => {
    return (
        <div >
            <button onClick={handleAddToCalendar}>Add to Calendar</button>
        </div>
    );
};

export default CalendarButton;
