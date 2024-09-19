import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import { categories } from '../utils/categories';
import { addEntry, deleteEntry } from '../utils/mutations';

const statuses = ['not started', 'rejected', 'in progress', 'success - next stage'];

export default function EntryModal({ type, user, entry }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(entry?.name || '');
  const [email, setEmail] = useState(entry?.email || '');
  const [description, setDescription] = useState(entry?.description || '');
  const [category, setCategory] = useState(entry?.category || 0);
  const [status, setStatus] = useState(entry?.status || 'not started');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    if (type === 'add') resetForm();
  };

  const resetForm = () => {
    setName('');
    setEmail('');
    setDescription('');
    setCategory(0);
    setStatus('not started');
  };

  const handleAdd = () => {
    const newEntry = {
      name,
      email,
      description,
      user: user?.displayName,
      category,
      status,
      userid: user?.uid,
    };
    addEntry(newEntry).catch(console.error);
    handleClose();
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this entry?")) {
      deleteEntry(entry).catch(console.error);
      handleClose();
    }
  };

  const renderContent = () => {
    switch (type) {
      case 'add':
        return (
          <>
            <TextField
              margin="normal"
              id="name"
              label="Name"
              fullWidth
              variant="standard"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              margin="normal"
              id="email"
              label="Email"
              fullWidth
              variant="standard"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              id="description"
              label="Description"
              fullWidth
              variant="standard"
              multiline
              maxRows={8}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <FormControl fullWidth sx={{ marginTop: '20px' }}>
              <InputLabel id="category-select-label">Category</InputLabel>
              <Select
                labelId="category-select-label"
                id="category-select"
                value={category}
                label="Category"
                onChange={(e) => setCategory(e.target.value)}
              >
                {categories.map((cat) => (
                  <MenuItem key={cat.id} value={cat.id}>
                    {cat.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth sx={{ marginTop: '20px' }}>
              <InputLabel id="status-select-label">Status</InputLabel>
              <Select
                labelId="status-select-label"
                id="status-select"
                value={status}
                label="Status"
                onChange={(e) => setStatus(e.target.value)}
              >
                {statuses.map((stat) => (
                  <MenuItem key={stat} value={stat}>
                    {stat}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </>
        );
      case 'view':
        return (
          <>
            <Typography><strong>Name:</strong> {entry.name}</Typography>
            <Typography><strong>Email:</strong> {entry.email}</Typography>
            <Typography><strong>Description:</strong> {entry.description}</Typography>
            <Typography><strong>Category:</strong> {categories.find(cat => cat.id === entry.category)?.name || 'Unknown'}</Typography>
            <Typography><strong>Status:</strong> {entry.status}</Typography>
          </>
        );
      case 'delete':
        return <p>Are you sure you want to delete this entry?</p>;
      default:
        return null;
    }
  };

  const openButton = () => {
    switch (type) {
      case 'add':
        return <Button variant="contained" onClick={handleClickOpen}>Add Entry</Button>;
      case 'view':
        return <Button variant="contained" onClick={handleClickOpen}>View</Button>;
      case 'delete':
        return <Button color="error" onClick={handleClickOpen}>Delete</Button>;
      default:
        return null;
    }
  };

  return (
    <>
      {openButton()}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{type === "delete" ? "Delete Entry" : type === "add" ? "Add Entry" : "View Entry"}</DialogTitle>
        <DialogContent>
          {renderContent()}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          {type === "delete" ? (
            <Button onClick={handleDelete} color="error">Delete</Button>
          ) : type === "add" ? (
            <Button onClick={handleAdd} variant="contained">Add Entry</Button>
          ) : null}
        </DialogActions>
      </Dialog>
    </>
  );
}