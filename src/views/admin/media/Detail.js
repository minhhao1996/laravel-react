import {ImFolder} from "react-icons/im";
import React from "react";

const Detail =(props)=>{
    return      <div className="rv-media-details">
        <div className="rv-media-thumbnail">
           <i> <ImFolder /></i>
        </div>
        <div className="rv-media-description">
            <div className="rv-media-description">
                <div className="rv-media-name"><p>Name</p> <span>{props.active.name}</span></div>
                <div className="rv-media-name"><p> Uploadted at</p><span title="2021-08-19 03:08:07">{props.active.created_at}</span>
                </div>
                <div className="rv-media-name"><p> Modified at</p><span title="2021-08-19 03:08:07">{props.active.updated_at}</span>
                </div>
            </div>
        </div>
    </div>
}
export default Detail