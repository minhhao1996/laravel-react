import {
    cilCloudUpload, cilEyedropper,
    cilLevelUp,
    cilNoteAdd,
    cilReload, cilSearch,
    cilShareAll,
    cilShower,
    cilUser, cilViewColumn,
    cilViewStream
} from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import React from "react";
import Breadcrumb from "./Breadcrumb";
import {CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle} from "@coreui/react";
import {FiEye, FiGlobe, FiTrash} from "react-icons/fi";


const Header =(props)=>{
    const {openModalCreate,reloadMediaHandler,searchMediaHandle}=props
    return <>
        <header className="rv-media-header">
            <div className="rv-media-top-header">
                <div className="rv-media-actions">
                    <label htmlFor="media_aside_collapse" className="btn btn-danger collapse-sidebar">
                        <i className="fa fa-bars"/>
                    </label>
                    <button className="btn btn-success js-dropzone-upload dz-clickable ">
                        <CIcon icon={cilCloudUpload}/>Upload
                    </button>
                    <button type="button"  onClick={openModalCreate}
                            className="btn btn-success">
                        <CIcon icon={cilNoteAdd}/> Create folder
                    </button>
                    <button datatype="refresh" className="btn btn-success js-change-action" onClick={reloadMediaHandler}>
                        <CIcon icon={cilReload}/>Refresh
                    </button>
                    <div role="group" className="btn-group">
                        <CDropdown>
                            <CDropdownToggle className="btn btn-success dropdown-toggle js-rv-media-change-filter-group">
                              <FiEye/>  View in ( <FiGlobe/> All media)
                            </CDropdownToggle>
                            <CDropdownMenu  className="dropdown-menu">
                                <CDropdownItem className="js-rv-media-change-filter"> <FiGlobe/> All media</CDropdownItem>
                                <CDropdownItem className="js-rv-media-change-filter"> <FiTrash/> Trash</CDropdownItem>
                            </CDropdownMenu>
                        </CDropdown>
                    </div>
                    <button data-action="empty_trash" className="btn btn-danger js-files-action hidden">
                        <i className="fa fa-trash"/> Empty trash
                    </button>
                </div>
                <div className="rv-media-search">
                    <div className="input-search-wrapper">
                        <input type="text" placeholder="Search file and folder"
                               onChange={searchMediaHandle}
                               id="search-medias" className="form-control"/>
                        <button type="submit" className="btn btn-link">   <CIcon icon={cilSearch}/></button></div>
                </div>
            </div>
          <Breadcrumb/>
        </header>
    </>
}
export default Header