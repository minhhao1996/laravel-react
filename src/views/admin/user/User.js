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
import ItemUSer from "./ItemUser";
import {useEffect, useState,useMemo } from "react";
import userApi from "../../../services/userApi";
import {toast} from "react-toastify";
import Pagination from "../../../components/Pagination";

const User = (props) => {
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalRecords, setTotalRecords] = useState(0);
    const [showTotalUsers, setShowTotalUsers] = useState(10);
    const tableActivitiesLength = ['all','1', '10', '20', '30']
    // useEffect(() => {
    //     const fetchUsers = async () => {
    //         let response = await userApi.getAllUsers();
    //         if (response.status === 200 && response.data) {
    //             setUsers(response.data.data);
    //
    //             setTotalRecords(response.data.data.length);
    //
    //         }
    //     }
    //     fetchUsers().catch((error) => {
    //         const resMessage =
    //             (error.response &&
    //                 error.response.data &&
    //                 error.response.data.message) ||
    //             error.message ||
    //             error.toString();
    //         toast.error(resMessage)
    //     });
    // }, []);
    const changeTotalShowHandler = (event) => {
        setShowTotalUsers(event.target.value);
    }
    const currentTableData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * showTotalUsers;
        const lastPageIndex = firstPageIndex + showTotalUsers;
        return users.slice(firstPageIndex, lastPageIndex);
    }, [currentPage]);

    const pageVisited= currentPage *showTotalUsers
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
                    <CFormInput/>
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
                    users.slice(pageVisited,pageVisited+showTotalUsers).map((item, index) => <ItemUSer user={item} key={item.id} index={index}/>)
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
                                    <option  value={item} key={index}>{item !== 'all' ? item : 'All'}</option>)
                            }
                        </select>
                    </CCol>
                    <CCol className="align-self-center">Showing 1 to 10 of 43 entries</CCol>
                    <CCol xs={5}>
                        {showTotalUsers !== 'all' &&
                        <Pagination
                            totalRecords={100}
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
export default User;