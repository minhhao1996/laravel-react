const ItemUSer = (props) => {
    const {user} = props;
    let avatar= 'https://avatars.dicebear.com/api/adventurer/your-custom-seed.svg';
    if (user.avatar){
         avatar =`http://127.0.0.1:8000/storage/avatar/`+user.avatar
    }

    return <tr>
        <th scope="row">
            <label className="control control--checkbox">
                <input type="checkbox"/>
                <div className="control__indicator"></div>
            </label>
        </th>
        <td>{user.name}</td>
        <td>
            <img style={{width: 50}} alt="" className="img-thumbnail  " src={avatar}/>
        </td>
        <td>{user.email}</td>
        <td>{user.about}</td>
        <td>{user.location}</td>
        <td>
            <div className="table-actions">
                <button className="btn btn-primary">
                    Edit
                </button>
                <button className="btn btn-danger">
                    Delete
                </button>
            </div>
        </td>
    </tr>
}
export default ItemUSer;