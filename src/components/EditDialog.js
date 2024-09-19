import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { categories } from '../utils/categories';

const EditDialog = ({ open, onClose, entry, onSave }) => {
  const [name, setName] = useState(entry.name || '');
  const [email, setEmail] = useState(entry.email || '');
  const [description, setDescription] = useState(entry.description || '');
  const [category, setCategory] = useState(entry.category || 0);

  useEffect(() => {
    setName(entry.name || '');
    setEmail(entry.email || '');
    setDescription(entry.description || '');
    setCategory(entry.category || 0);
  }, [entry]);

  const handleSave = () => {
    onSave({ ...entry, name, email, description, category });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Entry</DialogTitle>
      <DialogContent>
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
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave} variant="contained">Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditDialog;