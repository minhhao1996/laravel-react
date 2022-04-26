import React from "react";
import {Field} from "formik";

export default ({ form, field }) => (
    <>
        <input
            name={field.name}
            type="file"
            accept="image/*"
            className={( form.errors.avatar) ? 'form-control is-invalid' : 'form-control'}
            onChange={e => form.setFieldValue(field.name, e.target.files[0])}
        />
        {form.touched.name && form.errors.name ? (
            <div className="invalid-tooltip">{form.errors.name}</div>
        ) : null}
    </>

);