import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import React,{useState} from 'react';

import DialogTitle from '@mui/material/DialogTitle';

export default function AddCustomor(props){
    const [open, setOpen] = React.useState(false);
    const [person,setPerson]=React.useState({
        firstname:'',lastname:'',streetaddress:'',postcode:'',city:'',email:'',phone:''
    })

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
const handleInputChange =(event)=>{
setPerson({...person,[event.target.name]:event.target.value})
}

const addCustomor=()=>{
    props.saveCustomer(person)
    handleClose()
}

    return(
        <>
           <Button style={{margin:10}}variant="outlined" onClick={handleClickOpen}>
        Add customer
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New customer</DialogTitle>
        <DialogContent>
        
          <TextField
            autoFocus
            margin="dense"
            name="firstname"
            value={person.firstname}
            onChange={e =>handleInputChange(e)}
            label="Firstname"
            fullWidth
            variant="standard"
          />
           <TextField
            margin="dense"
            name="lastname"
            value={person.lastname}
            onChange={e =>handleInputChange(e)}
            label="Lastname"
            fullWidth
            variant="standard"
          />
        <TextField
            margin="dense"
            name="streetaddress"
            value={person.streetaddress}
            onChange={e =>handleInputChange(e)}
            label="Street address"
            fullWidth
            variant="standard"
          />
            <TextField
            margin="dense"
            name="postcode"
            value={person.postcode}
            onChange={e =>handleInputChange(e)}
            label="Postcode"
            fullWidth
            variant="standard"
          />
            <TextField
            margin="dense"
            name="city"
            value={person.city}
            onChange={e =>handleInputChange(e)}
            label="City"
            fullWidth
            variant="standard"
          />
            <TextField
            margin="dense"
            name="email"
            value={person.email}
            onChange={e =>handleInputChange(e)}
            label="Email"
            fullWidth
            variant="standard"
          />

            <TextField
            margin="dense"
            name="phone"
            value={person.phone}
            onChange={e =>handleInputChange(e)}
            label="Phone"
            fullWidth
            variant="standard"
          />

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={addCustomor}>Save</Button>
        </DialogActions>
      </Dialog>
        </>
    )
}