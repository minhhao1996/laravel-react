import React from "react";
import {CButton, CCardBody, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle} from "@coreui/react";
import {AiFillWindows, AiOutlineCloseSquare} from "react-icons/ai";
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as yup from "yup";
import mediaApi from "../../../services/mediaApi";

const Media = (props) => {
    const {modalType, modalCreate, closeModal,folder,submitSuccessHandle} = props;
    const storeFolderHandler = async (data) => {
        try{
            let res = await mediaApi.folderStore(data);
            if (res.status===200){
                submitSuccessHandle();
            }
        }catch (e) {
            console.log(e.response.data)
        }
    }
    const initialValuesCreate = {
        folder_id: folder,
        name: '',
    };
    // tạo một validation schema với yup
    const validationSchemaCreate = () => {
        return yup.object().shape({
            name: yup
                .string()
                .required("Vui lòng nhập name"),
        })
    }
    return <>
        <CModal visible={modalCreate} onClose={() => closeModal()} className="rv-media-container">
            <div className="rv-modals">
                <CModalHeader onClose={() => closeModal()}>
                    <div className="d-flex justify-content-between w-100">
                        <h4 className="modal-title">
                            <AiFillWindows/> Create folder
                        </h4>
                        <button className="btn close" type="button" onClick={() => closeModal()}>
                            <AiOutlineCloseSquare/>
                        </button>
                    </div>
                </CModalHeader>
                <CModalBody className="modal-body">
                    <Formik
                        initialValues={initialValuesCreate}
                        validationSchema={validationSchemaCreate}
                        onSubmit={storeFolderHandler}
                    >
                        {({touched, errors}) => (
                            <Form className="row g-3 needs-validation">
                                <div className="input-group mb-3">
                                    <Field name="name" type="text" placeholder="Name"
                                           className={(touched.name && errors.name) ? 'form-control is-invalid' : 'form-control'}/>
                                    {touched.name && errors.name ? (
                                        <div className="invalid-tooltip">{errors.name}</div>
                                    ) : null}
                                    <button type="submit" className="btn btn-success  w-25">
                                        Submit
                                    </button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                    {/*<form className="rv-form form-add-folder" onSubmit={storeFolderHandler}>*/}
                    {/*    <div className="input-group">*/}
                    {/*        <input type="text" placeholder="Folder name"*/}
                    {/*               name="name_folder" className="form-control"/>*/}
                    {/*        <div className="input-group-prepend">*/}
                    {/*            <button type="submit" className="btn btn-success rv-btn-add-folder">Create</button>*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*</form>*/}
                </CModalBody>
            </div>
        </CModal>
    </>
}
export default Media