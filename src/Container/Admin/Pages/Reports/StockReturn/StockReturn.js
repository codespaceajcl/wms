import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { FaChevronRight, FaChevronDown } from "react-icons/fa";
import stockInApi from "../../../../../Apis/StockIn.json";

function Row(props) {
    const { row, isOpen, onToggle } = props;

    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell align='center'>{row.sno}</TableCell>
                <TableCell align='center'>{row.Code}</TableCell>
                <TableCell align='center'>{row.Action}</TableCell>
                <TableCell align='center'>{row.Vehicle_No}</TableCell>
                <TableCell align='center'>{row.Suppllier}</TableCell>
                <TableCell align='center'>{row.Date}</TableCell>
                <TableCell align='center'>{row.Business_Type}</TableCell>
                <TableCell align='center'>{row.Warehouse} <span aria-label="expand row"
                    onClick={onToggle} className='show_warehouse_chevron'>
                    {isOpen ? <FaChevronDown /> : <FaChevronRight />}
                </span></TableCell>
            </TableRow>
            <TableRow className='stock_expended_row'>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
                    <Collapse in={isOpen} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Part No</TableCell>
                                        <TableCell>Description</TableCell>
                                        <TableCell>Serial No</TableCell>
                                        <TableCell>Pallet ID</TableCell>
                                        <TableCell>Status</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.detail.map((d) => (
                                        <TableRow key={d.partno} className='expended_row'>
                                            <TableCell>
                                                {d.partno}
                                            </TableCell>
                                            <TableCell>{d.description}</TableCell>
                                            <TableCell>{d.serialno}</TableCell>
                                            <TableCell>
                                                {d.palletno}
                                            </TableCell>
                                            <TableCell className={d.status === 'ok' ? 'make_green' : d.status === 'Filled' ? 'make_blue' : 'make_red'}>
                                                {d.status}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

export default function StockReturn() {
    const [openRow, setOpenRow] = React.useState(null);
    const tableHead = ['#', 'Transaction Code', 'Action By', 'Vehicle No', 'Suppllier', 'Date', 'Business Type', 'Warehouse']

    const handleRowToggle = (row) => {
        setOpenRow((prevRow) => (prevRow === row ? null : row));
    };

    return (
        <TableContainer>
            <Table aria-label="collapsible table" className='stock_out_table'>
                <TableHead>
                    <TableRow className='super_head'>
                        {tableHead.map((th) => (<TableCell align='center'>{th}</TableCell>))}
                    </TableRow>
                </TableHead>
                <TableBody className='stock_out_tab'>
                    {stockInApi.map((row) => (<Row key={row.sno} row={row} isOpen={openRow === row} onToggle={() => handleRowToggle(row)} />))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}