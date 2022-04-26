import React, {useState} from 'react'
import {
    CButton,
    CCard,
    CCardBody,
    CCol,
    CContainer,
    CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {cilLockLocked, cilUser} from '@coreui/icons'
import {toast} from "react-toastify";
import userApi from "../../../services/userApi";
import {useNavigate } from 'react-router-dom';
import * as yup from "yup";
import {Formik, Form, Field} from 'formik';


const Register = () => {

    let navigate = useNavigate();
    const initialValues = {
        name: '',
        user_name: '',
        email: '',
        password: '',
        confirmPassword: '',
    };
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
                .required('Password is required')
                .min(6, 'Password must be at least 6 characters')
                .max(40, 'Password must not exceed 40 characters'),
            confirmPassword: yup.string()
                .required('Confirm Password is required')
                .oneOf([yup.ref('password'), null], 'Confirm Password does not match'),

        })
    }

    const registerUserHandler = async (data) => {


        try {
            let res = await userApi.register(data)
            if (res.status === 200 && res.data) {
                if (res.status === 200 && res.data) {
                    navigate(`/admin/login`);
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
    return (
        <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
            <CContainer>
                <CRow className="justify-content-center">
                    <CCol md={9} lg={7} xl={6}>
                        <CCard className="mx-4">
                            <CCardBody className="p-4">
                                <Formik
                                    initialValues={initialValues}
                                    validationSchema={validationSchema}
                                    onSubmit={registerUserHandler}>
                                    {(formik, isSubmitting) => (
                                        <Form className="row g-3 needs-validation">
                                            <h1>Register</h1>
                                            <p className="text-medium-emphasis">Create your account</p>
                                            <div className="input-group mb-3">
                                                <span className="input-group-text">
                                                    <CIcon icon={cilUser}/>
                                                </span>
                                                <Field name="name"
                                                       className={(formik.touched.name && formik.errors.name) ? 'form-control is-invalid' : 'form-control'}
                                                       type="text"/>
                                                {formik.touched.name && formik.errors.name ? (
                                                    <div className="invalid-tooltip">{formik.errors.name}</div>
                                                ) : null}
                                            </div>
                                            <div className="input-group mb-3">
                                            <span className="input-group-text">
                                                    <CIcon icon={cilUser}/>
                                                </span>
                                                <Field name="user_name"
                                                       className={(formik.touched.user_name && formik.errors.user_name) ? 'form-control is-invalid' : 'form-control'}
                                                       type="text"/>
                                                {formik.touched.user_name && formik.errors.user_name ? (
                                                    <div className="invalid-tooltip">{formik.errors.user_name}</div>
                                                ) : null}
                                            </div>
                                            <div className="input-group mb-3">
                                                <span className="input-group-text">
                                                    <CIcon icon={cilUser}/>
                                                </span>
                                                <Field name="email" type="email"
                                                       className={(formik.touched.email && formik.errors.email) ? 'form-control is-invalid' : 'form-control'}/>
                                                {formik.touched.email && formik.errors.email ? (
                                                    <div className="invalid-tooltip">{formik.errors.email}</div>
                                                ) : null}
                                            </div>
                                            <div className="input-group mb-3">
                                             <span className="input-group-text">
                                                    <CIcon icon={cilLockLocked}/>
                                                </span>
                                                <Field name="password"
                                                       className={(formik.touched.password && formik.errors.password) ? 'form-control is-invalid' : 'form-control'}
                                                       type="password"/>
                                                {formik.touched.password && formik.errors.password ? (
                                                    <div className="invalid-tooltip">{formik.errors.password}</div>
                                                ) : null}
                                            </div>
                                            <div className="input-group mb-3">
                                                <span className="input-group-text">
                                                    <CIcon icon={cilLockLocked}/>
                                                </span>
                                                <Field name="confirmPassword"
                                                       className={(formik.touched.confirmPassword && formik.errors.confirmPassword) ? 'form-control is-invalid' : 'form-control'}
                                                       type="password"/>
                                                {formik.touched.confirmPassword && formik.errors.password ? (
                                                    <div
                                                        className="invalid-tooltip">{formik.errors.confirmPassword}</div>
                                                ) : null}
                                            </div>
                                            <div className="d-grid">
                                                <CButton color="success" type="submit">Create Account</CButton>
                                            </div>
                                        </Form>
                                    )}
                                </Formik>
                            </CCardBody>
                        </CCard>
                    </CCol>
                </CRow>
            </CContainer>
        </div>
    )
}

export default Register
