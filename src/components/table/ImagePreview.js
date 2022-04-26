import React, {useState} from "react";

const ImageFile = ( { form ,field}) => {

    const [id, setId] = useState('someUniqueId');
    const [imageURI, setImageURI] = useState(null);

    const buildImgTag = (img = null) => {
        if (imageURI !== null)
            img = imageURI;
            return (<div className="row">
                <div className="small-9 small-centered columns ">
                    <img className="thumbnail" style={{maxHeight: 50, maxWidth: 100, objectFit: "contain"}} src={img}></img>
                </div>
            </div>);
    }

    const readURI = (e) => {
        if (e.target.files && e.target.files[0]) {
            let reader = new FileReader();
            reader.onload = function (ev) {
                setImageURI(ev.target.result);
            }.bind(this);
            reader.readAsDataURL(e.target.files[0]);

        }
    }

    const handleChange = (e) => {
         form.setFieldValue(field.name, e.target.files[0])
         readURI(e); // maybe call this with webworker or async library?
        // if (props.onChange !== undefined)
        //     props.onChange(e); // propagate to parent component
    }

    const imgTag = buildImgTag(field.value);

    return <div className="d-flex justify-content-between">
        <label htmlFor={id} className="button-preview ">Upload an image</label>
        <input
            id={id}
            type="file"
            accept="image/*"
            onChange={e =>handleChange(e)}
            className="show-for-sr hidden"/>
        {imgTag}
    </div>;
}
export default ImageFile
