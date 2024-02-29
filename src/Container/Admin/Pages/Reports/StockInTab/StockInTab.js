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
import { useDispatch, useSelector } from 'react-redux';
import { getStockInReport } from '../../../../../Redux/Action/Admin';
import { login } from '../../../../../Util/Helper';
import Loader from '../../../../../Util/Loader';

function Row(props) {
    const { index, row, isOpen, onToggle } = props;

    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell align='center'>{index + 1}</TableCell>
                <TableCell align='center'>{row.transactionalNumber}</TableCell>
                <TableCell align='center'>{row.transactionBy}</TableCell>
                <TableCell align='center'>{row.truckNumber}</TableCell>
                <TableCell align='center'>{row.supplier}</TableCell>
                <TableCell align='center'>{row.date}</TableCell>
                <TableCell align='center'>{row.businessType}</TableCell>
                <TableCell align='center'>{row.warehouse} <span aria-label="expand row"
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
                                    <TableRow key={row.partNo} className='expended_row'>
                                        <TableCell>
                                            {row.partNo}
                                        </TableCell>
                                        <TableCell>{row.description}</TableCell>
                                        <TableCell>{row.serialNo}</TableCell>
                                        <TableCell>
                                            {row.palletId}
                                        </TableCell>
                                        <TableCell className={row.status === 'ok' ? 'make_green' : row.status === 'Filled' ? 'make_blue' : 'make_red'}>
                                            {row.status}
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

export default function StockInTab() {
    const [openRow, setOpenRow] = React.useState(null);
    const tableHead = ['S.No.', 'Transaction Code', 'Action By', 'Truck No', 'Suppllier', 'Date', 'Company', 'Warehouse']


    const dispatch = useDispatch()

    const { loading, getStockInData } = useSelector((state) => state.inventoryStockInData)
    const { loading: stockInLoading, getStockInFilterData } = useSelector((state) => state.inventoryStockInFilterData)

    React.useEffect(() => {
        const formData = new FormData();
        formData.append("email", login.email)
        formData.append("token", login.token)

        dispatch({ type: "GET_INVENTORY_REPORTS_FILTER_RESET" })

        dispatch(getStockInReport(formData))
    }, [])

    React.useEffect(() => {
        if (getStockInFilterData?.response?.length > 0) {
            dispatch({ type: "GET_STOCK_IN_RESET" })
        }
    }, [getStockInFilterData])

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
                {
                    (!loading | !stockInLoading) && <>
                        {
                            getStockInFilterData?.response ? <>
                                {
                                    getStockInFilterData?.response?.length > 0 &&
                                    <TableBody className='stock_out_tab'>
                                        {getStockInFilterData?.response.map((row, i) => (<Row key={i} index={i} row={row} isOpen={openRow === row} onToggle={() => handleRowToggle(row)} />))}
                                    </TableBody>
                                }
                            </> : <>
                                {
                                    getStockInData?.response?.length > 0 &&
                                    <TableBody className='stock_out_tab'>
                                        {getStockInData?.response.map((row, i) => (<Row key={i} index={i} row={row} isOpen={openRow === row} onToggle={() => handleRowToggle(row)} />))}
                                    </TableBody>
                                }
                            </>
                        }
                    </>
                }
            </Table>
            {(loading | stockInLoading) && <Loader />}
        </TableContainer>
    );
}