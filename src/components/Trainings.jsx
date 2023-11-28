import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { Snackbar } from '@mui/material';
import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';


function Trainings() {
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState('');
  const [rowData, setRowData] = useState([]);

  const handleClick = () => {
    setOpen(true);
  };

  const deleteTraining = (params) => {
    const id = params.data.id; 
    if (window.confirm('Are you sure?')) {
      fetch(`https://traineeapp.azurewebsites.net/api/trainings/${id}`, { method: 'DELETE' })
        .then((response) => {
          if (response.ok) {
           
            setRowData(prevData => prevData.filter((row) => row.id !== id));
            setMsg('Training deleted');
            setOpen(true);
          } else {
            response.text().then((data) => {
              setMsg(`Error in deletion: ${response.status} - ${data}`);
              setOpen(true);
            });
          }
        })
        .catch((err) => {
          setMsg(`Error in deletion: ${err.message}`);
          setOpen(true);
        });
    }
  };
  
  
  const fetchData = () => {
    fetch('https://traineeapp.azurewebsites.net/gettrainings')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => setRowData(data))
      .catch((error) => console.error('Error fetching data:', error));
  };
  
  
  
  
  
  
  

  useEffect(() => {
    fetchData();
  }, []);



  const columns = [
    {
      cellRenderer: params => (
        <button size="small" onClick={() => deleteTraining(params)}>
          Delete
        </button>
      ),
      width: 120,
    },
    {
      headerName: 'Date',
      field: 'date',
      sortable: true,
      filter: true,
      floatingFilter: true,
      maxWidth: 180,
      cellRenderer: params => (
        <span>{dayjs(params.data.date).format('DD.MM.YYYY hh:mm A')}</span>
      ),
    },
    { headerName: 'Duration', field: 'duration', sortable: true, filter: true, floatingFilter: true, maxWidth: 150 },
    { headerName: 'Activity', field: 'activity', sortable: true, filter: true, floatingFilter: true, maxWidth: 150 ,},
    {
      headerName: 'Customer',
      field: 'customer',
      sortable: true,
      filter: true,
      floatingFilter: true,
      maxWidth: 250,
      cellRenderer: params => (
        params.data.customer ? `${params.data.customer.firstname} ${params.data.customer.lastname}` : ''
      ),
    },
  ];
  

  return (
    <>
      <div className="ag-theme-alpine" style={{ height: '700px', width: '93em', margin: 'auto' }}>
        <AgGridReact
          rowData={rowData}
          columnDefs={columns}
          animateRows={true}
          pagination={true}
          onGridReady={() => fetchData()}
        />
        <Snackbar
          open={open}
          autoHideDuration={3000}
          onClose={() => setOpen(false)}
          message={msg}
        />
      </div>
    </>
  );
}

export default Trainings;
