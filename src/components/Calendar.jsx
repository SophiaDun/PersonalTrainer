import React,{ useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';

const Calendar = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://traineeapp.azurewebsites.net/gettrainings');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        // Muuttaa training datan eventiksi
        const formattedEvents = data.map((training) => ({
          title: `${training.activity} - ${training.customer.firstname} ${training.customer.lastname}`,
          start: training.date,
          end: training.endDate,
        }));
        setEvents(formattedEvents);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="calendar"style={{ width: '83.6em' }}> 
      <FullCalendar contentHeight='800px' plugins={[dayGridPlugin, timeGridPlugin]} initialView="timeGridWeek" events={events} />
  </div>
  );
};

export default Calendar;

