import Header from "./Header";
import './media.css'
import Detail from "./Detail";
import CIcon from "@coreui/icons-react";
import {ImFolder} from "react-icons/im";
import {AiOutlineCheck} from "react-icons/ai";
import React, {useEffect, useState} from "react";
import mediaApi from "../../../services/mediaApi";
import {toast} from "react-toastify";

const Media = (props) => {
    const {folder, loadType, chooseFolderHandler, selectMedia, detailMediaHandler, load, searchMedia} = props
    const [allFolder, setAllFolder] = useState([]);

    useEffect(() => {
        if (searchMedia === '') {
            const fetchMedias = async () => {
                let response = await mediaApi.getMedia(folder, loadType);
                if (response.status === 200 && response.data) {
                    setAllFolder(response.data.folders)
                }
            }
            fetchMedias().catch((error) => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();
                toast.error(resMessage)
            });
        } else {
            const delayDebounceFn = setTimeout(() => {
                const searchTerm = searchMedia.toLowerCase()
                let folderSearch = allFolder.filter(value => {
                    return value.name.toLowerCase().match(new RegExp(searchTerm, 'g'))
                })
                setAllFolder(folderSearch)
            }, 300)
            return () => clearTimeout(delayDebounceFn)
        }

    }, [folder, load, searchMedia])


    return <>
        <main className="rv-media-main d-flex">
            <div className="rv-media-items has-items">
                <div className="rv-media-grid">
                    <ul>
                        {
                            allFolder.length > 0 &&
                            allFolder.map(folder_Item => {
                                return (<li data-context="folder" key={folder_Item.id}
                                            onClick={() => detailMediaHandler(folder_Item)}
                                            onDoubleClick={() => chooseFolderHandler(folder_Item.id)}
                                            className="rv-media-list-title js-media-list-title js-context-menu">
                                    <input type="checkbox" checked={selectMedia.id === folder_Item.id}
                                           className="hidden"
                                           onChange={event => {
                                           }}/>
                                    <div title="hao" className="rv-media-item">
                                        {
                                            selectMedia.id === folder_Item.id &&
                                            <span className="media-item-selected">
                                                 <AiOutlineCheck/>
                                            </span>
                                        }

                                        <div className="rv-media-thumbnail"><i>
                                            <ImFolder/>
                                        </i></div>
                                        <div className="rv-media-description">
                                            <div className="title title">{folder_Item.name}</div>
                                        </div>
                                    </div>
                                </li>)
                            })
                        }

                    </ul>
                </div>
            </div>
            <Detail active={selectMedia}/>
        </main>

    </>
}
export default Media