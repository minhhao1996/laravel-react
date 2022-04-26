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
import UserForm from "../../views/admin/user/UserForm";
import {useDispatch, useSelector} from "react-redux";
import {toggleModal} from "../../store/actions/adminActions";
import {toast} from "react-toastify";
import userApi from "../../services/userApi";
import {wait} from "@testing-library/user-event/dist/utils";

const TableData = (props) => {

    const {dataTable, tableColumns, operations, loadData} = props;
    const [users, setUsers] = useState([]);
    const [item, setItem] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [showing, setShowing] = useState(1);

    const [totalRecords, setTotalRecords] = useState(0);
    const [showingTo, setShowingTo] = useState(1);
    const [showTotalTable, setShowTotalTable] = useState(10);
    const [searchTableKey, setSearchTableKey] = useState('');
    const tableActivitiesLength = ['all', '2', '10', '20', '30'];
    const [isCheckAll, setIsCheckAll] = useState(false);
    const [isCheck, setIsCheck] = useState([]);
    const [typeAction, setTypeAction] = useState('');
    const dispatch = useDispatch()
    useEffect(() => {
        currentDataUser(searchTableKey);
    }, [dataTable, currentPage, showTotalTable]);
    // Get current data of table
    const changeTotalShowHandler = (event) => {
        if (event.target.value !== 'all') {
            setShowTotalTable(parseInt(event.target.value));
            currentDataUser(searchTableKey);
        } else {
            setShowTotalTable(totalRecords);
        }
        return true;
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
        const firstPageIndex = (currentPage - 1) * showTotalTable;
        const lastPageIndex = firstPageIndex + showTotalTable;
        setShowing(firstPageIndex + 1)

        if (dataTable) {
            let data = [...dataTable]
            if (keySearch !== '') {
                data = arraySearch(data, keySearch)
            }
            const users_page = data.slice(firstPageIndex, lastPageIndex);
            setUsers(users_page);
            setTotalRecords(data.length)
            setTotalRecords(data.length)
            let numberShowing = firstPageIndex + showTotalTable;
            setShowingTo(numberShowing)
        }

    }
    const searchUserHandler = async (event) => {
        let searchKey = event.target.value;
        setSearchTableKey(searchKey);
        await currentDataUser(searchKey);
    }

    const submitHandelSuccess = () => {
        closeModal();
    }
    const handleActionTable = (item, type) => {
        dispatch(toggleModal(true));
        setItem(item)
        setTypeAction(type);
    }
    const checkAllTable = (e) => {
        setIsCheckAll(!isCheckAll);
        setIsCheck(users.map(li => li.id));
        if (isCheckAll) {
            setIsCheck([]);
        }
    }

    const handleClickCheckboxTable = (e) => {
        let {id, checked} = e.target;
        if (checked) {
            setIsCheck([...isCheck, parseInt(id)]);
        } else {
            setIsCheck(isCheck.filter(item => item !== parseInt(id)));
        }
    }

    const closeModal = () => {
        dispatch(toggleModal(false));
        setTypeAction('');
        loadData();
        setItem(null)
    }
    const bulkDeleteHandler = () => {
        if (isCheck.length > 0) {
            try {
                isCheck.map(id => {
                    userApi.destroy(id);
                })
                let result = users.filter(item => !isCheck.includes(item.id));
                setIsCheck([]);
                setUsers(result);
                toast.error('Delete successfully')
            } catch (e) {
                toast.error(e.message)
            }
        } else {
            toast.error('Vui long chon item can xoas')
        }
    }
    return <CCard>
        <CCardHeader>
            <CRow className="justify-content-between">
                <CCol xs={4}>
                    <CDropdown>
                        <CDropdownToggle color="secondary">Bulk Actions</CDropdownToggle>
                        <CDropdownMenu>
                            <CDropdownItem onClick={bulkDeleteHandler}>Delete</CDropdownItem>
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
                                <input type="checkbox" onChange={checkAllTable}
                                       checked={isCheckAll}
                                />
                            </label>
                            : item.label_th
                    }
                    </th>)}
                </tr>
                </thead>
                <tbody>
                {
                    users.length > 0 &&
                    users.map((item, index) =>
                        <ItemTable user={item} key={item.id} index={index}
                                   isCheck={isCheck}
                                   handleActionTable={handleActionTable}
                                   handleClickCheckboxTable={handleClickCheckboxTable}
                                   tableColumns={tableColumns} o
                                   perations={operations}/>)
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
        <UserForm closeModal={closeModal} typeAction={typeAction} item={item} title="Created new user"
                  submitHandelSuccess={submitHandelSuccess}/>
    </CCard>
}
export default TableData;