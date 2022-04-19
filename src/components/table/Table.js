import {
    CCard,
    CCardBody,
    CCardFooter,
    CCardHeader, CCol,
    CDropdown,
    CDropdownItem,
    CDropdownMenu,
    CDropdownToggle, CFormInput, CFormSelect, CPagination, CPaginationItem, CRow
} from "@coreui/react";

import {useEffect, useState} from "react";
import Pagination from "../../components/table/Pagination";
import ItemTable from "./ItemTable";

const TableData = (props) => {
    const {dataTable, tableColumns,operations } = props;
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [showing, setShowing] = useState(1);

    const [totalRecords, setTotalRecords] = useState(0);
    const [showingTo, setShowingTo] = useState(0);
    const [showTotalTable, setShowTotalTable] = useState(1);
    const [searchTableKey, setSearchTableKey] = useState('');
    const tableActivitiesLength = ['all', '1', '10', '20', '30']
    useEffect(() => {
        currentDataUser(searchTableKey);
    }, [dataTable, currentPage, showTotalTable]);
    // Get current data of table
    const changeTotalShowHandler = (event) => {
        if (event.target.value !== 'all') {
            setShowTotalTable(parseInt(event.target.value));
        } else {
            setShowTotalTable(200);
        }
        setCurrentPage(1)
    }
    // Handler search
    const arraySearch = (array, keyword) => {
        const searchTerm = keyword.toLowerCase()
        return array.filter(value => {
            return value.name.toLowerCase().match(new RegExp(searchTerm, 'g'))
        })
    }
    // Get current data of table
    const currentDataUser = (keySearch = '') => {

        if (dataTable) {
            let data = dataTable;
            if (keySearch !== '') {
                data = arraySearch(data, keySearch)
            }
            const firstPageIndex = (currentPage - 1) * showTotalTable;
            const lastPageIndex = firstPageIndex + showTotalTable;
            const users_page = data.slice(firstPageIndex, lastPageIndex);
            setUsers(users_page);
            setTotalRecords(data.length);
            if (currentPage)
                setShowing(firstPageIndex + 1)
            setShowingTo(lastPageIndex > totalRecords ? totalRecords : lastPageIndex)
        }
    }
    const searchUserHandler = async (event) => {
        let searchKey = event.target.value;
        setSearchTableKey(searchKey);
        await currentDataUser(searchKey);
    }

    return <CCard>
        <CCardHeader>
            <CRow className="justify-content-between">
                <CCol xs={4}>
                    <CDropdown>
                        <CDropdownToggle color="secondary">Bulk Actions</CDropdownToggle>
                        <CDropdownMenu>
                            <CDropdownItem href="#">Action</CDropdownItem>
                            <CDropdownItem href="#">Another action</CDropdownItem>
                            <CDropdownItem href="#">Something else here</CDropdownItem>
                        </CDropdownMenu>
                    </CDropdown>
                </CCol>
                <CCol xs={3}>
                    <CFormInput onChange={(event) => searchUserHandler(event)}/>
                </CCol>
            </CRow>

        </CCardHeader>
        <CCardBody>
            <table className="table table-striped table-responsive custom-table">
                <thead>
                <tr>
                    {tableColumns.map((item, key) => <th scope="col" key={key}>{
                        item.label_th === 'checkbox' ?
                            <label className="control control--checkbox">
                                <input type="checkbox"/>
                            </label>
                            : item.label_th
                        }
                    </th>)}
                </tr>
                </thead>
                <tbody>
                {
                    users.length > 0 &&
                    users.map((item, index) => <ItemTable user={item} key={item.id} index={index} tableColumns={tableColumns} operations={operations}/>)
                }
                </tbody>
            </table>
        </CCardBody>
        <CCardFooter>
            <div>
                <CRow className="">
                    <CCol xs={1} style={{minWidth: 100}}>
                        <select className="form-control" aria-label="Large select example"
                                value={showTotalTable}
                                onChange={(event) => changeTotalShowHandler(event)}>
                            {
                                tableActivitiesLength.map((item, index) =>
                                    <option value={item} key={index}>{item !== 'all' ? item : 'All'}</option>)
                            }
                        </select>
                    </CCol>
                    <CCol
                        className="align-self-center">Showing {showing} to {showingTo} of {totalRecords} entries</CCol>
                    <CCol xs={5}>
                        {showTotalTable !== 'all' &&
                        <Pagination
                            totalRecords={totalRecords}
                            currentPage={currentPage}
                            pageLimit={showTotalTable}
                            pageNeighbours={1}
                            onPageChange={page => setCurrentPage(page)}
                        />
                        }
                    </CCol>
                </CRow>
            </div>
        </CCardFooter>
    </CCard>
}
export default TableData;