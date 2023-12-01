import React, { useEffect, useState } from 'react';
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

        const formattedEvents = data.map((training) => {
      
          //Tarkistaa onko asiakkaan nimi olemassa, jos ei tule mitään nimen tilalle
          const customerName = training.customer && training.customer.firstname
            ? `${training.customer.firstname} ${training.customer.lastname || ''}`
            : '';

          return {
            title: `${training.activity} - ${customerName}`,
            start: training.date,
         
          };
        });

        setEvents(formattedEvents);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ width: '83.6em', background: 'white' }}>
      <FullCalendar
        eventMinHeight={100}
        eventColor='black'
        contentHeight='1200px'
        plugins={[dayGridPlugin, timeGridPlugin]}
        initialView="timeGridWeek"
        events={events}
        
      />
    </div>
  );
};

export default Calendar;
