import Header from "./Header";
import './media.css'
import Main from "./Main";
import Modal from "./Modal";
import {useState} from "react";
const Media =(props)=>{
    const [modalType,setModalType] = useState('');
    const [modalCreate,setModalCreate] = useState(false);
    const [folder,setFolder] = useState(0);
    const [load,setLoad] = useState(false);
    const [loadType,setLoadType] = useState('all');
    const [selectMedia, setSelectMedia] = useState({})
    const [searchMedia, setSearchMedia] = useState('')
    const modalTypeHandle=(type)=>{

    }

    const reloadMediaHandler=()=>{
        setFolder(0);
        setLoad(false);
        setLoadType('all');
        setSelectMedia({})
        setSearchMedia('')
    }
    const openModalCreate=()=>{
        setModalCreate(!modalCreate);
        setModalType('create');
    }

    const submitSuccessHandle=()=>{
        setLoad(true);
        setModalCreate(false);
    }

    const searchMediaHandle =(e)=>{
        console.log(e.target.value)
    }
    return <>
        <div className="rv-media-container">
            <div className="rv-media-main-wrapper card">
                <Header openModalCreate={()=>openModalCreate()}
                        reloadMediaHandler={reloadMediaHandler}
                        searchMediaHandle={(e)=>setSearchMedia(e.target.value)}/>
                <Main folder={folder} loadType={loadType}
                      load={load}
                      searchMedia={searchMedia}
                      selectMedia={selectMedia}
                      detailMediaHandler={(select)=>setSelectMedia(select)}
                      chooseFolderHandler={(id)=>setFolder(id)}/>
            </div>
        </div>
        <Modal modalType={modalType}
               folder={folder} modalCreate={modalCreate}
               closeModal={()=>setModalCreate(false)}
               submitSuccessHandle={submitSuccessHandle}
               modalTypeHandle={modalTypeHandle}/>
    </>
}
export default Media