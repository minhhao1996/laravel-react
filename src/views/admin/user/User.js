import {useEffect, useState} from "react";
import userApi from "../../../services/userApi";
import {toast} from "react-toastify";
import TableData from "../../../components/table/Table";
import {CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle} from "@coreui/react";
import {useDispatch} from "react-redux";
import { toggleModal} from "../../../store/actions/adminActions";


const User = () => {
    const [users, setUsers] = useState([]);
    const [load, setLoad] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchUsers = async () => {
            let response = await userApi.getAllUsers();
            if (response.status === 200 && response.data) {
                setUsers(response.data.data)
            }
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
    }, [load]);

    const tableUserColumns = [
        {
            label_th: 'checkbox',
            column: 'id',
        },
        {
            label_th: 'Name',
            column: 'name',
            link: true
        },
        {
            label_th: 'Avatar',
            column: 'avatar',
            img_public:'avatar'
        },
        {
            label_th: 'Email',
            column: 'email',
            link: true
        },
        {
            label_th: 'About',
            column: 'about',
        },
        {
            label_th: 'Verify',
            column: 'verify',
        },
    ];
    const operations =[
        {
            name:'edit',
            label:'edit',
            type: 'modal',
            column: 'id',
        },
        {
            name:'delete',
            label:'delete',
            type: 'modal',
            column: 'id',
        },
    ];

    return (
        <div className="card">
            <div className="d-flex justify-content-end m-2">
                <CButton onClick={() => dispatch(toggleModal(true))}>Create</CButton>
            </div>

            <TableData loadData={()=>setLoad(!load)}  dataTable={users} tableColumns={tableUserColumns} operations={operations}/>
        </div>
    )
}
export default User;