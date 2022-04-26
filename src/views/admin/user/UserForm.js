import React, {useState} from 'react'
import {
    CButton,
    CCard,
    CCardBody,
    CCol,
    CContainer, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle,
    CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {cilLockLocked, cilUser} from '@coreui/icons'
import {toast} from "react-toastify";
import userApi from "../../../services/userApi";
import {useNavigate} from 'react-router-dom';
import * as yup from "yup";
import {Formik, Form, Field} from 'formik';
import {useDispatch, useSelector} from "react-redux";
import {adminRegisterSuccess, toggleModal} from "../../../store/actions/adminActions";
import Avatar from "./Avatar";
import ImagePreview from "../../../components/table/ImagePreview";


const UserForm = (props,{ form ,field}) => {
    const {title = null, item, typeAction, closeModal} = props;
    const dispatch = useDispatch();
    const FILE_SIZE = '1048576';
    const SUPPORTED_FORMATS = ['image/jpg', 'image/png', 'image/jpeg', 'image/gif'];
    const toggleModalTable = useSelector((state) => state.adminStore.toggleModal);

    const initialValues = {
        name: '',
        user_name: '',
        email: '',
        password: '',
        confirmPassword: '',
        avatar: '',
    };
    if (item) {
        initialValues.name = item.name;
        initialValues.user_name = item.user_name;
        initialValues.email = item.email;
        initialValues.avatar = item.avatar;
    }


    // tạo một validation schema với yup
    const validationSchema = () => {
        return yup.object().shape({
            name: yup
                .string()
                .required("Vui lòng nhập name"),
            user_name: yup
                .string()
                .required("Vui lòng nhập username")
                .min(3, "vui long nhap hon 3 ky tu"),
            email: yup.string()
                .required('Email is required')
                .email('Email is invalid'),
            password: yup.string()
                .concat(!typeAction ? yup.string().required('Password is required') : null)
                .min(6, 'Password must be at least 6 characters')
                .max(40, 'Password must not exceed 40 characters'),
            confirmPassword: yup.string()
                .when('password', (password, schema) => {
                    if (password || !typeAction) return schema.required('Confirm Password is required');
                })
                .oneOf([yup.ref('password'), null], 'Confirm Password does not match'),
            avatar: yup.mixed()
                .test("FILE_SIZE", "Uploaded file is too big.",
                    value => !value || (value && value.size <= FILE_SIZE))
                .test("FILE_FORMAT", "Uploaded file has unsupported format.",
                    value => !value || (value && SUPPORTED_FORMATS.includes(value.type)))

        })
    }

    const registerUserHandler = async (data) => {

        try {
            const formData = new FormData();
            Object.keys(data).forEach(key => formData.append(key, data[key]));
            let res ;
            if (typeAction !=='edit'){
                 res = await userApi.store(formData);
            }else {
                 res = await userApi.update(formData,item.id);
            }

            if (res.status === 200 && res.data) {
                if (res.status === 200 && res.data) {
                    toast.success('Created user successfully');
                    props.submitHandelSuccess(true)
                }
            }
        } catch (error) {
            if (error.response.data.errors.email) {
                toast.error(error.response.data.errors.email[0])
            }
            if (error.response.data.errors.user_name) {
                toast.error(error.response.data.errors.user_name[0])
            }
        }
    }

    const deleteHandler=async ()=>{
        let res = await userApi.destroy(item.id);
        if (res.status === 200 && res.data) {
            toast.success('Destroy user successfully');
            props.submitHandelSuccess(true)
        }
    }
    return (
        <CModal visible={toggleModalTable}>
            <CModalHeader onClick={closeModal}>
                <CModalTitle>{title}</CModalTitle>
            </CModalHeader>
            {
                typeAction !== 'delete' ?
                    <Formik initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={registerUserHandler}>
                        {({touched, errors}) => (

                            <Form className="row g-3 needs-validation">
                                <CModalBody>
                                    <CCardBody className="p-4">
                                        <div className="input-group mb-3">
                                            <span className="input-group-text"><CIcon icon={cilUser}/></span>
                                            <Field name="name" type="text" placeholder="Name"
                                                   className={(touched.name && errors.name) ? 'form-control is-invalid' : 'form-control'}/>
                                            {touched.name && errors.name ? (
                                                <div className="invalid-tooltip">{errors.name}</div>
                                            ) : null}
                                        </div>
                                        <div className="input-group mb-3">
                                            <span className="input-group-text"><CIcon icon={cilUser}/></span>
                                            <Field name="user_name" placeholder="Username" type="text"
                                                   className={(touched.user_name && errors.user_name) ? 'form-control is-invalid' : 'form-control'}/>
                                            {touched.user_name && errors.user_name ? (
                                                <div className="invalid-tooltip">{errors.user_name}</div>
                                            ) : null}
                                        </div>
                                        <div className="input-group mb-3">
                                            <span className="input-group-text"><CIcon icon={cilUser}/></span>
                                            <Field name="email" type="email" placeholder="Email"
                                                   className={(touched.email && errors.email) ? 'form-control is-invalid' : 'form-control'}/>
                                            {touched.email && errors.email ? (
                                                <div className="invalid-tooltip">{errors.email}</div>
                                            ) : null}
                                        </div>
                                        {
                                            typeAction !== 'edit' &&
                                            <>
                                                <div className="input-group mb-3">
                                                    <span className="input-group-text"><CIcon
                                                        icon={cilLockLocked}/></span>
                                                    <Field name="password" placeholder="Password" type="password"
                                                           className={(touched.password && errors.password) ? 'form-control is-invalid' : 'form-control'}/>
                                                    {touched.password && errors.password ? (
                                                        <div className="invalid-tooltip">{errors.password}</div>
                                                    ) : null}
                                                </div>
                                                <div className="input-group mb-3">
                                                    <span className="input-group-text"><CIcon
                                                        icon={cilLockLocked}/></span>
                                                    <Field name="confirmPassword" type="password"
                                                           placeholder="Confirm password"
                                                           className={(touched.confirmPassword && errors.confirmPassword) ? 'form-control is-invalid' : 'form-control'}/>
                                                    {touched.confirmPassword && errors.password ? (
                                                        <div className="invalid-tooltip">{errors.confirmPassword}</div>
                                                    ) : null}
                                                </div>
                                            </>
                                        }
                                        <div className="input-group mb-3">
                                            <Field name="avatar" component={ ImagePreview}/>
                                        </div>

                                    </CCardBody>
                                </CModalBody>
                                <CModalFooter>
                                    <CButton color="secondary" onClick={closeModal}>
                                        Close
                                    </CButton>
                                    <CButton color="primary"
                                             type="submit">{typeAction === 'edit' ? 'Update' : 'Create'} </CButton>
                                </CModalFooter>
                            </Form>
                        )}
                    </Formik> :
                    <>
                        <CModalBody>Modal body text goes here.</CModalBody>
                        <CModalFooter>
                            <CButton color="secondary" onClick={closeModal}>
                                Close
                            </CButton>
                            <CButton color="primary" onClick={deleteHandler}>Delete</CButton>
                        </CModalFooter>
                    </>
            }

        </CModal>
    )
}

export default React.memo(UserForm, (props, nextProps) => {
    if(props.typeAction === nextProps.typeAction) {
        return true
    }
})
