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
import userApi from "../../../services/userApi";
import {toast} from "react-toastify";
import Pagination from "../../../components/table/Pagination";
import ItemTable from "./ItemTable";

const TableData = (props) => {
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [showing, setShowing] = useState(1);

    const [totalRecords, setTotalRecords] = useState(0);
    const [showingTo, setShowingTo] = useState(0);
    const [showTotalUsers, setShowTotalUsers] = useState(1);
    const [searchUser, setSearchUser] = useState('');
    const tableActivitiesLength = ['all', '1', '10', '20', '30']
    useEffect(() => {
        const fetchUsers = async () => {
            await currentDataUser(searchUser);
        }
        fetchUsers().catch((error) => {
            const resMessage =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            toast.error(resMessage)
        });
    }, [currentPage, showTotalUsers]);
    // Get current data of table
    const changeTotalShowHandler = (event) => {
        if (event.target.value !== 'all') {
            setShowTotalUsers(parseInt(event.target.value));
        } else {
            setShowTotalUsers(200);
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
    const currentDataUser = async (keySearch = '') => {
        let response = await userApi.getAllUsers();
        if (response.status === 200 && response.data) {
            let data = response.data.data;

            if (keySearch !== '') {
                data = arraySearch(data, keySearch)
            }
            const firstPageIndex = (currentPage - 1) * showTotalUsers;
            const lastPageIndex = firstPageIndex + showTotalUsers;
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
        setSearchUser(searchKey);
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
                    <th scope="col">
                        <label className="control control--checkbox">
                            <input type="checkbox" className="js-check-all"/>
                            <div className="control__indicator"></div>
                        </label>
                    </th>
                    <th scope="col">Name</th>
                    <th scope="col">Avatar</th>
                    <th scope="col">Email</th>
                    <th scope="col">About</th>
                    <th scope="col">Location</th>
                    <th scope="col">OPERATIONS</th>
                </tr>
                </thead>
                <tbody>
                {
                    users.length > 0 &&
                    users.map((item, index) => <ItemTable user={item} key={item.id} index={index}/>)
                }
                </tbody>
            </table>
        </CCardBody>
        <CCardFooter>
            <div>
                <CRow className="">
                    <CCol xs={1} style={{minWidth: 100}}>
                        <select className="form-control" aria-label="Large select example"
                                value={showTotalUsers}
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
                        {showTotalUsers !== 'all' &&
                        <Pagination
                            totalRecords={totalRecords}
                            currentPage={currentPage}
                            pageLimit={showTotalUsers}
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