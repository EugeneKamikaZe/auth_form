import React from 'react';
import s from './Input.module.scss'

interface InputProps {
    inputName: string,
    placeholder: string,
    onChange: React.ChangeEventHandler<HTMLInputElement> | undefined,
    onBlur: React.ChangeEventHandler<HTMLInputElement> | undefined,
    password?: boolean,
    error: string | boolean
}

const Input: React.FC<InputProps> = ({inputName, onChange, onBlur, placeholder, password= false, error}) => {
    return (
        <>
            <label htmlFor={inputName} className={s.label}>
                {inputName}
                <input
                    type={password ? "password" : "text"}
                    name={inputName}
                    onChange={onChange}
                    onBlur={onBlur}
                    placeholder={placeholder}
                />
                {
                    error &&
                        <p className={s.error}>{error}</p>
                }
            </label>
        </>
    );
};

export default Input;
