import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { Snackbar } from '@mui/material';
import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import Statistic_Card from './StatisticCard';

function Trainings() {
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState('');
  const [rowData, setRowData] = useState([]);

  const handleClick = () => {
    setOpen(true);
  };

  const deleteTraining = async (params) => {
    const id = params.data.id;
  
    if (window.confirm('Are you sure?')) {
      try {
        await fetch(`https://traineeapp.azurewebsites.net/api/trainings/${id}`, { method: 'DELETE' });
        setRowData((prevData) => prevData.filter((row) => row.id !== id));
        setMsg('Training deleted');
        setOpen(true);
      } catch (err) {
        setMsg(`Error in deletion: ${err.message}`);
        setOpen(true);
      }
    }
  };
  
  
  
  const fetchData = () => {
    fetch('https://traineeapp.azurewebsites.net/gettrainings')
      .then((response) => {
        return response.json();
      })
      .then((data) => setRowData(data))
      .catch((err) => console.error(err));
  };
  
 
  useEffect(() => {
    fetchData();
  }, []);


 
  const columns = [
   
    { headerName: 'Date',field: 'date', sortable: true, filter: true, floatingFilter: true, width: 300,
      cellRenderer: (params) => ( <span>{dayjs(params.data.date).format('DD.MM.YYYY hh:mm A')}</span>)},
      
    { headerName: 'Duration', field: 'duration', sortable: true, filter: true, floatingFilter: true, width: 270 },
    { headerName: 'Activity', field: 'activity', sortable: true, filter: true, floatingFilter: true,width: 300 },
    { headerName: 'Customer', field: 'customer', sortable: true, filter: true,floatingFilter: true, width: 215,
    cellRenderer: (params) => ( params.data.customer ? `${params.data.customer.firstname} ${params.data.customer.lastname}` : ''),
    valueFormatter: (params) => (params.data.customer ? `${params.data.customer.firstname} ${params.data.customer.lastname}`: '')},

    //Poista asiakas
    {cellRenderer: (params) => ( 
    <button style={{ color: '#565656',background: 'transparent', border: 'none', cursor: 'pointer'}} 
        onClick={() => deleteTraining(params)}>
        <RemoveCircleIcon />
    </button>),width: 250}
  ];
  

  return (
    <>
      <div className="ag-theme-alpine-dark" style={{ height: '700px', width: '103em' }} >
        <AgGridReact
          rowData={rowData}
          columnDefs={columns}
          animateRows={true}
          pagination={true}
          onGridReady={() => fetchData()}
        />
        <Statistic_Card/>
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
