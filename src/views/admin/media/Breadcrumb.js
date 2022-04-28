
import React from "react";
import {FaUserSecret,FaThLarge} from "react-icons/fa";


const Breadcrumb = (props) => {
    return <>
        <div className="rv-media-bottom-header">
            <div className="rv-media-breadcrumb">
                <ul className="breadcrumb">
                    <li>
                        <a href="#" className="js-change-folder">
                        <FaUserSecret/> All media</a>
                    </li>
                </ul>
            </div>
            <div className="rv-media-tools">
                <div>
                    <div id="dropdown-1" className="dropdown b-dropdown m-md-2 btn-group">
                        <button id="dropdown-1__BV_toggle_" aria-haspopup="true" aria-expanded="false" type="button"
                                className="btn dropdown-toggle btn-secondary">Sort
                        </button>
                        <ul role="menu" tabIndex="-1" className="dropdown-menu">
                            <li role="presentation" className="">
                                <a role="menuitem" href="#" target="_self" className="dropdown-item">
                                    <i className="fas fa-sort-alpha-up"></i> File name - ASC
                            </a></li>
                            <li role="presentation" className=""><a role="menuitem" href="#" target="_self"
                                                                    className="dropdown-item"><i
                                className="fas fa-sort-alpha-down"></i>File name - DESC
                            </a></li>
                            <li role="presentation" className=""><a role="menuitem" href="#" target="_self"
                                                                    className="dropdown-item"><i
                                className="fas fa-sort-numeric-up"></i> Uploaded date - ASC
                            </a></li>
                            <li role="presentation" className=""><a role="menuitem" href="#" target="_self"
                                                                    className="dropdown-item"><i
                                className="fas fa-sort-numeric-down"></i>Uploaded date - DESC
                            </a></li>
                            <li role="presentation" className=""><a role="menuitem" href="#" target="_self"
                                                                    className="dropdown-item"><i
                                className="fas fa-sort-numeric-up"></i> Size - ASC
                            </a></li>
                            <li role="presentation" className=""><a role="menuitem" href="#" target="_self"
                                                                    className="dropdown-item"><i
                                className="fas fa-sort-numeric-down"></i> Size - DESC
                            </a></li>
                        </ul>
                    </div>
                </div>
                <div role="group" className="btn-group js-rv-media-change-view-type">
                    <button type="button" data-type="tiles" className="btn btn-secondary active">
                       <span> <FaThLarge/></span>
                    </button>
                </div>
            </div>
        </div>
    </>
}
export default Breadcrumb