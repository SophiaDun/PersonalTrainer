import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { Snackbar } from '@mui/material';
import AddTrainning from './AddTrainning';
import AddCustomor from './AddCustomor';
import EditCustomer from './EditCustomor';
import React,{ useState, useEffect } from 'react';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { CSVLink } from "react-csv";
import { FloatButton } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';


function Customers() {
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState('');
  const [rowData, setRowData] = useState([]);
  const [key, setKey] = useState(0);

  
  const handleClick = () => {
    setOpen(true);
  };


  const deleteCustomer = async (params) => {
    const selfLink = params.data.links.find((link) => link.rel === 'self');
    const id = selfLink?.href.split('/').pop();
 if (window.confirm('Are you sure?')) {
      try {
        await fetch(`https://traineeapp.azurewebsites.net/api/customers/${id}`, { method: 'DELETE' });
        setKey((prevKey) => prevKey + 1);
        setMsg('Customer deleted');
        setOpen(true);
      } catch (err) {
        setMsg(`Error in deletion: ${err.message}`);
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
      .then(() => {
        fetchData();
        setMsg('Saved training');
        setOpen(true);
      })
      .catch((err) => console.error(err));
  };
  



  const saveCustomer = (person) => {
    fetch(`https://traineeapp.azurewebsites.net/api/customers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(person),
    })
    .then(() => {
      fetchData();
      setMsg('Saved new customer');
      setOpen(true);
    })
    .catch((err) => console.error(err));
  };



  const updateCustomer = (editedPerson) => {
    const id = editedPerson.id;
  
    fetch(`https://traineeapp.azurewebsites.net/api/customers/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editedPerson),
    })
      .then((response) => {
        if (response.ok) {
          setKey((prevKey) => prevKey + 1);
          setMsg('Updated customer');
          setOpen(true);
        } else {
          return Promise.reject(`Error updating customer: ${response.status} - ${response.statusText}`);
        }
      })
      .catch((err) => console.error(err));
  };
  
  



  const fetchData = () => {
    fetch(`https://traineeapp.azurewebsites.net/api/customers`)
      .then((response) => {
        return response.json();
      })
      .then((data) => setRowData(data.content))
      .catch((err) => console.error(err));
  };


  useEffect(() => {
    fetchData();
  }, []);



  const headers = [
    { label: 'First Name', key: 'firstname' },
    { label: 'Last Name', key: 'lastname' },
    { label: 'Street Address', key: 'streetaddress' },
    { label: 'Postcode', key: 'postcode' },
    { label: 'City', key: 'city' },
    { label: 'Email', key: 'email' },
    { label: 'Phone', key: 'phone' },
  ];



  const columns = [

    { headerName: 'Firstname', field: 'firstname', sortable: true, filter: true, floatingFilter: true, maxWidth: 150 },
    { headerName: 'Lastname', field: 'lastname', sortable: true, filter: true, floatingFilter: true, maxWidth: 150 },
    { headerName: 'Streetaddress', field: 'streetaddress', sortable: true, filter: true, floatingFilter: true, width: 200 },
    { headerName: 'Postcode', field: 'postcode', sortable: true, filter: true, floatingFilter: true, maxWidth: 150 },
    { headerName: 'City', field: 'city', sortable: true, filter: true, floatingFilter: true, maxWidth: 150 },
    { headerName: 'Email', field: 'email', sortable: true, filter: true, floatingFilter: true, width: 210 },
    { headerName: 'Phone', field: 'phone', sortable: true, filter: true, floatingFilter: true, maxWidth: 130 },
    
    { cellRenderer: (params) => (
        <EditCustomer
          updateCustomer={updateCustomer}
          editedPerson={params.data}
          id={params.data.id}
        />), width: 60},

    
    { cellRenderer: (params) => (
        <AddTrainning 
        saveTraining={saveTraining} 
        customerUrl={params.data.links.find(link => 
        link.rel === 'self')?.href} />
      ), width: 68 },

    {
      cellRenderer: (params) => (
        <button

          style={{ color: '#565656', background: 'transparent', border: 'none', cursor: 'pointer' }}
          onClick={() => deleteCustomer(params)}
        >
          <RemoveCircleIcon />
        </button>
      ),
      width: 70,
    }

  ];

  return (
    <>

      <div className="ag-theme-alpine-dark" style={{ height: '700px', width: '103em' }} >
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
       
<CSVLink data={rowData} headers={headers} filename={'customer_data.csv'}>
<FloatButton
       
        tooltip={<div>Export CSV</div>}
        shape="circle"
        type="black"
        style={{right: 260,bottom:70}}
        icon={<DownloadOutlined style={{ color: '#ffffff', background: 'transparent', border: 'none', cursor: 'pointer' }} />}
      />
    
</CSVLink>



        <AddCustomor saveCustomer={saveCustomer} />
      </div>

    </>
  );
}

export default Customers;

