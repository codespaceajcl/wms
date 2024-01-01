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
import Loader from '../../../../../Util/Loader';
import { getInventoryAvailableStockReport } from '../../../../../Redux/Action/Admin';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../../../../Util/Helper';

function Row(props) {
    const { index, row, isOpen, onToggle } = props;

    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell align='center'>{index + 1}</TableCell>
                <TableCell align='center'>{row.nomenclature}</TableCell>
                <TableCell align='center'>{row.location}</TableCell>
                <TableCell align='center'>{row.pallot}</TableCell>
                <TableCell align='center'>{row.date}</TableCell>
                <TableCell align='center'>{row.tag}</TableCell>
                <TableCell align='center'>{row.quantity}</TableCell>
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
                                        <TableCell>Serial No</TableCell>
                                        <TableCell>Pallet ID</TableCell>
                                        <TableCell>Status</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow className='expended_row'>
                                        <TableCell>
                                            {row.partNo}
                                        </TableCell>
                                        <TableCell>{row.serialNo}</TableCell>
                                        <TableCell>
                                            {row.pallodId}
                                        </TableCell>
                                        <TableCell className={row.status === 'ok' ? 'make_green' : row.status === 'filled' ? 'make_blue' : 'make_red'}>
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

const AvailableStock = () => {
    const dispatch = useDispatch()

    const { loading, inventoryAvailableStockData } = useSelector((state) => state.getInventoryAvailableStock)

    React.useEffect(() => {
        const formData = new FormData();
        formData.append("email", login.email)
        formData.append("token", login.token)

        dispatch({ type: "GET_INVENTORY_REPORTS_FILTER_RESET" })

        dispatch(getInventoryAvailableStockReport(formData))
    }, [])

    const [openRow, setOpenRow] = React.useState(null);
    const tableHead = ['S.No.', 'NomenClature', 'Location', 'Pallot', 'Date', 'Tag', 'Quantity', 'Warehouse']

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
                    inventoryAvailableStockData?.response?.length > 0 &&
                    <TableBody className='stock_out_tab'>
                        {inventoryAvailableStockData?.response?.map((row, i) => (<Row key={i} index={i} row={row} isOpen={openRow === row} onToggle={() => handleRowToggle(row)} />))}
                    </TableBody>
                }
            </Table>
            {loading && <Loader />}
        </TableContainer>
    );




}

export default React.memo(AvailableStock)