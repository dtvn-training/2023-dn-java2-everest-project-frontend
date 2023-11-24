import React from "react";
import "./InputField.css";

const InputField = ({ field, form, type, placeholder }) => (
  <div className="input-container">
    <input
      id={field.name}
      name={field.name}
      type={type}
      placeholder={placeholder}
      onChange={form.handleChange}
      onBlur={form.handleBlur}
      value={field.value}
    />
    {form.errors[field.name] && form.touched[field.name] ? (
      <p>{form.errors[field.name]}</p>
    ) : null}
  </div>
);

export default InputField;
