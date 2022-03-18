import React from "react";
import { Form } from "react-bootstrap"

interface InputProps {
  label: string;
  type: "text" | "email" | "password"
  placeholder: string
  value: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export const Input = ({ label, type, placeholder, onChange, value }: InputProps): React.ReactElement => {
  return (
    <React.Fragment>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        required 
      />
    </React.Fragment>
  )
}
