import {CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle} from "@coreui/react";


const ModalCommon=(props)=>{
   const  {visible,closeModal, modalHandle,content=null,title=null} = props
    return(
        <CModal visible={visible} >
            <CModalHeader onClose={closeModal}>
                <CModalTitle>{title}</CModalTitle>
            </CModalHeader>
            <CModalBody>
                {content}
            </CModalBody>
            <CModalFooter>
                <CButton color="secondary" onClick={ closeModal}>
                    Close
                </CButton>
                <CButton color="primary" onClick={ modalHandle}>Save changes</CButton>
            </CModalFooter>
        </CModal>
    )
}
export default ModalCommon