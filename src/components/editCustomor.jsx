import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import React,{ useState } from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import EditIcon from '@mui/icons-material/Edit';


export default function EditCustomer(props) {
    const [open, setOpen] = useState(false);
    const [editedPerson, setEditedPerson] = useState({
        firstname: '',
        lastname: '',
        streetaddress: '',
        postcode: '',
        city: '',
        email: '',
        phone: ''
    });



const handleClickOpen = () => {
    const selfLink = props.editedPerson.links.find(link => link.rel === 'self');
  
    setEditedPerson({
      id: selfLink ? selfLink.href.split('/').pop() : '', // Ottaa asiakkaan ID:een self linkin kautta
      firstname: props.editedPerson.firstname || '',
      lastname: props.editedPerson.lastname || '',
      streetaddress: props.editedPerson.streetaddress || '',
      postcode: props.editedPerson.postcode || '',
      city: props.editedPerson.city || '',
      email: props.editedPerson.email || '',
      phone: props.editedPerson.phone || '',
    });
    setOpen(true);
  };
  
  

    const handleClose = () => {
        setOpen(false);
    };

    const handleInputChange = (event) => {
        setEditedPerson({ ...editedPerson, [event.target.name]: event.target.value });
    };

    const updateCustomer = () => {
        console.log('Edited person:', editedPerson);
    
        // Katsoo onko id olemassa kun ollaan editedPerson kohdassa
        if (editedPerson.id) {
          if (props.updateCustomer) {
            props.updateCustomer(editedPerson);
            handleClose();
          }
        } else {
          console.error('Customer ID is missing in the edited person');
        }
      };
    
   
    return(
        <>
           <button  style={{ color: '#bc8ec7',background: 'transparent', border: 'none', cursor: 'pointer'}} onClick={handleClickOpen}>
           <EditIcon  />
      </button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit person</DialogTitle>
        <DialogContent>
        
        
        <TextField
            autoFocus
            margin="dense"
            name="firstname"
            value={editedPerson.firstname}
            onChange={e =>handleInputChange(e)}
            label="Firstname"
            fullWidth
            variant="standard"
          />
           <TextField
            margin="dense"
            name="lastname"
            value={editedPerson.lastname}
            onChange={e =>handleInputChange(e)}
            label="Lastname"
            fullWidth
            variant="standard"
          />
        <TextField
            margin="dense"
            name="streetaddress"
            value={editedPerson.streetaddress}
            onChange={e =>handleInputChange(e)}
            label="Street address"
            fullWidth
            variant="standard"
          />
            <TextField
            margin="dense"
            name="postcode"
            value={editedPerson.postcode}
            onChange={e =>handleInputChange(e)}
            label="Postcode"
            fullWidth
            variant="standard"
          />
            <TextField
            margin="dense"
            name="city"
            value={editedPerson.city}
            onChange={e =>handleInputChange(e)}
            label="City"
            fullWidth
            variant="standard"
          />
            <TextField
            margin="dense"
            name="email"
            value={editedPerson.email}
            onChange={e =>handleInputChange(e)}
            label="Email"
            fullWidth
            variant="standard"
          />

            <TextField
            margin="dense"
            name="phone"
            value={editedPerson.phone}
            onChange={e =>handleInputChange(e)}
            label="Phone"
            fullWidth
            variant="standard"
          />

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={updateCustomer}>Update person</Button>
        </DialogActions>
      </Dialog>
        </>
    )
}