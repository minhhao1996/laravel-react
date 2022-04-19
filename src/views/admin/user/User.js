import {useEffect, useState} from "react";
import userApi from "../../../services/userApi";
import {toast} from "react-toastify";
import TableData from "../../../components/table/Table";
import {Link} from "react-router-dom";
import {CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle} from "@coreui/react";

const User = () => {
    const [users, setUsers] = useState([]);
    const [visible, setVisible] = useState(false)
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
    }, []);

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
    ]
    return (
        <div className="card">
            <div className="d-flex justify-content-end m-2">
                <CButton onClick={() => setVisible(!visible)}>Launch demo modal</CButton>
            </div>
            <CModal visible={visible} onClose={() => setVisible(false)}>
                <CModalHeader onClose={() => setVisible(false)}>
                    <CModalTitle>Modal title</CModalTitle>
                </CModalHeader>
                <CModalBody>Woohoo, you're reading this text in a modal!</CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={() => setVisible(false)}>
                        Close
                    </CButton>
                    <CButton color="primary">Save changes</CButton>
                </CModalFooter>
            </CModal>
            <TableData dataTable={users} tableColumns={tableUserColumns} operations={operations}/>
        </div>
    )
}
export default User;