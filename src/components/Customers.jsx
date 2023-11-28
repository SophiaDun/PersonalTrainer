import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { Snackbar } from '@mui/material';
import AddTrainning from './AddTrainning';
import AddCustomor from './addCustomor';
import EditCustomer from './editCustomor';
import React, { useState, useEffect } from 'react';

function Customers() {
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState('');
  const [rowData, setRowData] = useState([]);
  const [key, setKey] = useState(0);


  const handleClick = () => {
    setOpen(true);
  };


  const deleteCustomer = async (params) => {
    const selfLink = params.data.links.find(link => link.rel === 'self');
  
    if (!selfLink) {
      console.error('Customer ID not found');
      return;
    }
  
    const id = selfLink.href.split('/').pop();
  
    if (window.confirm('Are you sure?')) {
      try {
        const customerResponse = await fetch(`https://traineeapp.azurewebsites.net/api/customers/${id}`, { method: 'DELETE' });
  
        if (customerResponse.ok) {
         
          
          setKey(prevKey => prevKey + 1); // poistaa asiakkaan rivistä
          setMsg('Customer deleted');
          setOpen(true);
        } else {
          const data = await customerResponse.text();
          setMsg(`Error in deletion: ${customerResponse.status} - ${data}`);
          setOpen(true);
        }
      } catch (err) {
        setMsg(`Error: ${err.message}`);
        setOpen(true);
      }
    }
  };
  
  
  
  
  
  const saveTraining = (trainingData) => {
  

    fetch('https://traineeapp.azurewebsites.net/api/trainings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(trainingData),
    })
      .then((response) => {
        if (response.ok) {
          fetchData(); // Fetch data kun on onnnistunut 
          setMsg('Training saved successfully');
          setOpen(true);
        } else {
          response.text().then((data) => {
            setMsg(`Error in saving training: ${response.status} - ${data}`);
            setOpen(true);
          });
        }
      })
      .catch((err) => {
        console.error('Error in saving training:', err.message);
        setMsg(`Error in saving training: ${err.message}`);
        setOpen(true);
      });
  };
  
  
  
 

  
    

  const saveCustomer = (person) => {
    fetch(`https://traineeapp.azurewebsites.net/api/customers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(person),
    })
      .then(() => fetchData())
      .catch((err) => console.error(err));
  };


const updateCustomer = (editedPerson) => {

  const id = editedPerson.id; // asiakkaan id-numero

  if (id) {
    fetch(`https://traineeapp.azurewebsites.net/api/customers/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editedPerson),
    })
    .then((response) => {
      if (response.ok) {
        setKey((prevKey) => prevKey + 1); //poistaa asiakkaan rivin
      } else {
        console.error(`Error updating customer: ${response.status} - ${response.statusText}`);
        throw new Error('Customer update failed');
      }
    })
    .catch((err) => console.error(err));
  } else {
    console.error('Customer ID is undefined');
  }
};



  

  const fetchData = () => {
    fetch(`https://traineeapp.azurewebsites.net/api/customers`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => setRowData(data.content))
      .catch((error) => console.error('Error fetching data:', error));
  };
  

  useEffect(() => {
    fetchData();
  }, []);

  const columns = [
  
    { headerName: 'Firstname', field: 'firstname', sortable: true, filter: true, floatingFilter: true, maxWidth: 180 },
    { headerName: 'Lastname', field: 'lastname', sortable: true, filter: true, floatingFilter: true, maxWidth: 150 },
    { headerName: 'Streetaddress', field: 'streetaddress', sortable: true, filter: true, floatingFilter: true, maxWidth: 150 },
    { headerName: 'Postcode', field: 'postcode', sortable: true, filter: true, floatingFilter: true, maxWidth: 150 },
    { headerName: 'City', field: 'city', sortable: true, filter: true, floatingFilter: true, maxWidth: 150 },
    { headerName: 'Email', field: 'email', sortable: true, filter: true, floatingFilter: true },
    { headerName: 'Phone', field: 'phone', sortable: true, filter: true, floatingFilter: true },
    {
      cellRenderer: (params) => (
        <EditCustomer
          updateCustomer={updateCustomer}
          editedPerson={params.data}
          id={params.data.id} 
        />
      ),
      width: 120,
    }
    
    ,
    {
      cellRenderer: (params) => (
        <AddTrainning saveTraining={saveTraining} customerUrl={params.data.links.find(link => link.rel === 'self')?.href} />
      ),
      width: 120,
    },
    
    {
      cellRenderer: (params) => (
        <button
          size="small"
          onClick={() => deleteCustomer(params)}
        >
          Delete
        </button>
      ),
      width: 120,
    }
    
  ];

  return (
    <>
      <div className="ag-theme-alpine" style={{ height: '700px', width: '100em', margin: 'auto' }}>
        <AgGridReact
          key={key}
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
        <AddCustomor saveCustomer={saveCustomer} />
      </div>
    </>
  );
}

export default Customers;


