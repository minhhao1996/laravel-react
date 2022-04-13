import React, {useState} from 'react'
import {Link, useHistory} from 'react-router-dom'
import {
    CButton,
    CCard,
    CCardBody,
    CCardGroup,
    CCol,
    CContainer,
    CForm, CFormFeedback,
    CFormInput,
    CInputGroup,
    CInputGroupText,
    CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {cilLockLocked, cilUser} from '@coreui/icons'
import {toast} from "react-toastify";
import userApi from "../../../services/userApi";
import {useDispatch} from "react-redux";
import {adminLoginSuccess} from "../../../store/actions/adminActions";

const Login = (props) => {
    const [validated, setValidated] = useState(false);
    const [enteredName, setEnteredName] = useState('');
    const [enteredPassword, setEnterPassword] = useState('');
    const dispatch = useDispatch();

    const handleSubmitLogin = async (event) => {
        event.preventDefault()
        const form = event.currentTarget
        if (form.checkValidity() === false) {
            event.stopPropagation()
            toast.error('Errors ')
            setValidated(true);
        } else {
            let data = {
                login: enteredName,
                password: enteredPassword
            }
            try {
               let res= await userApi.login(data);
                if (res.status === 200 && res.data) {
                    dispatch(adminLoginSuccess(res.data))
                }


            } catch (error) {

                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();
                toast.error(resMessage)
                setValidated(false);
            }
        }
    }
    return (
        <div className="bg-light min-vh-100 d-flex flex-row align-items-center">

            <CContainer>
                <CRow className="justify-content-center">
                    <CCol md={8}>
                        <CCardGroup>
                            <CCard className="p-4">
                                <CCardBody>
                                    <CForm
                                        className="row g-3 needs-validation"
                                        noValidate
                                        validated={validated}
                                        onSubmit={handleSubmitLogin}>
                                        <h1>Login</h1>
                                        <p className="text-medium-emphasis">Sign In to your account</p>
                                        <CInputGroup className="mb-3">
                                            <CInputGroupText>
                                                <CIcon icon={cilUser}/>
                                            </CInputGroupText>
                                            <CFormInput placeholder="Username" autoComplete="username" required
                                                        onChange={(e) => {
                                                            setEnteredName(e.target.value);
                                                        }}
                                                        value={enteredName}/>
                                            <CFormFeedback tooltip invalid>
                                                The user is required
                                            </CFormFeedback>
                                        </CInputGroup>
                                        <CInputGroup className="mb-4">
                                            <CInputGroupText>
                                                <CIcon icon={cilLockLocked}/>
                                            </CInputGroupText>
                                            <CFormInput
                                                type="password"
                                                placeholder="Password"
                                                autoComplete="current-password"
                                                required
                                                onChange={(e) => {
                                                    setEnterPassword(e.target.value);
                                                }}
                                                value={enteredPassword}
                                            />
                                            <CFormFeedback tooltip invalid>
                                                The password is required
                                            </CFormFeedback>
                                        </CInputGroup>
                                        <CRow>
                                            <CCol xs={6}>
                                                <CButton color="primary" className="px-4" type="submit">
                                                    Login
                                                </CButton>
                                            </CCol>
                                            <CCol xs={6} className="text-right">
                                                <CButton color="link" className="px-0">
                                                    Forgot password?
                                                </CButton>
                                            </CCol>
                                        </CRow>
                                    </CForm>
                                </CCardBody>
                            </CCard>
                            <CCard className="text-white bg-primary py-5" style={{width: '44%'}}>
                                <CCardBody className="text-center">
                                    <div>
                                        <h2>Sign up</h2>
                                        <p>
                                            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                                            tempor incididunt ut labore et dolore magna aliqua.
                                        </p>
                                        <Link to="/admin/register">
                                            <CButton color="primary" className="mt-3" active tabIndex={-1}>
                                                Register Now!
                                            </CButton>
                                        </Link>
                                    </div>
                                </CCardBody>
                            </CCard>
                        </CCardGroup>
                    </CCol>
                </CRow>
            </CContainer>
        </div>
    )
}

export default Login
