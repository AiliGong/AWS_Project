import React from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import ClearIcon from '@material-ui/icons/Clear';
import IconButton from '@material-ui/core/IconButton';

const columns = [
  {
    id: 'Contact',
    label: 'Contact',
    minWidth: 120,
    align: 'left',
    format: value => value.toLocaleString('en-US'),
  },
  {
    id: 'date',
    label: 'Date\u00a0',
    minWidth: 80,
    align: 'left',
    format: value => value.toLocaleString('en-US'),
  },
  {
    id: 'description',
    label: 'Description',
    minWidth: 170,
    align: 'left',
    format: value => value.toLocaleString('en-US'),
  },
  {
    id: 'category',
    label: 'category',
    minWidth: 120,
    align: 'left',
    format: value => value.toLocaleString('en-US'),
  },
  {
    id: 'debit',
    label: 'Debit',
    minWidth: 120,
    align: 'right',
    format: value => value.toFixed(2),
  },
  {
    id: 'credit',
    label: 'credit',
    minWidth: 120,
    align: 'right',
    format: value => value.toFixed(2),
  },
];

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const TransactionsTable = ({ transactions, deleteTransaction }) => {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            {columns.map(column => (
              <TableCell
                key={column.id}
                align={column.align}
                style={{ minWidth: column.minWidth }}
              >
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.map(row => (
            <TableRow key={row.id}>
              <TableCell>{row.contact}</TableCell>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.description}</TableCell>
              <TableCell>{row.category}</TableCell>
              <TableCell alight="right">{row.amount}</TableCell>
              <TableCell align="right">{row.debit}</TableCell>
              <TableCell>
                <IconButton
                  color="secondary"
                  onClick={() => deleteTransaction(row.id)}
                >
                  <ClearIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TransactionsTable;
