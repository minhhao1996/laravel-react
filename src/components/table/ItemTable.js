import {Link} from "react-router-dom";
import React, {useEffect, useState} from "react";

const ItemUSer = (props) => {
    let {user, tableColumns,operations,isCheck,handleClickCheckboxTable} = props;

    const checkbox = (id, key) => {
        return (<td key={key}><label className="control control--checkbox">
            <input type="checkbox" id={id}  checked={isCheck.includes(id)}
                   onChange={handleClickCheckboxTable} />
        </label></td>)
    }
    const link = (href, text, key) => {
        return (<td key={key}>
            <Link to={href}>{text}</Link>
        </td>)
    }
    const image = (key, src) => {
        return (<td key={key}>
            <img src={src} alt={src} style={{width: 50}}/>
        </td>)
    }
    const operationsTable = () => {
        return <button className="btn btn-primary">
            Edit
        </button>
    }

    const rows = tableColumns.map((item, key) => {
        const keyTd = key + '-' + 'item.id';
        let column_table = item.column;
        if (item.label_th === 'checkbox') {
            return checkbox(user.id, keyTd)
        }
        if (item.link) {
            let href = `/admin/users/${user.id}`;
            return link(href, user[column_table], keyTd)
        }
        if (item.link) {
            let href = `/admin/users/${user.id}`;
            return link(href, user[column_table], keyTd)
        }
        if (item.img_public) {
            let avatar = 'https://avatars.dicebear.com/api/adventurer/your-custom-seed.svg';
            if (user.avatar) {
                avatar = user.avatar
            }
            return image(keyTd, avatar)
        }
        return <td key={keyTd}>{user[column_table]}</td>
    });
    return <tr>
        {rows}
        <td>
            <div className="table-actions">
                {
                    // operations.map
                }
                <button className="btn btn-primary" onClick={()=>props.handleActionTable(user,'edit')}>
                    Edit
                </button>
                <button className="btn btn-danger" onClick={()=>props.handleActionTable(user,'delete')}>
                    Delete
                </button>
            </div>
        </td>
    </tr>
}
export default ItemUSer;

