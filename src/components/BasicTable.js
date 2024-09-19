import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { categories } from '../utils/categories';
import EntryModal from './EntryModal';

export default function BasicTable({ entries, user }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Category</TableCell>
            <TableCell align="right">Status</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {entries.map((entry) => (
            <TableRow
              key={entry.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {entry.name}
              </TableCell>
              <TableCell align="right">{entry.email}</TableCell>
              <TableCell align="right">
                {categories.find(cat => cat.id === entry.category)?.name || 'Unknown'}
              </TableCell>
              <TableCell align="right">{entry.status}</TableCell>
              <TableCell align="right">
                <EntryModal type="view" user={user} entry={entry} />
                <EntryModal type="delete" user={user} entry={entry} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}