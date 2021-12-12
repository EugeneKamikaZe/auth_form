import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import Input from "../Input/Input";
import s from './AuthForm.module.scss'
import cn from "classnames";
import {data} from "../../data";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {fetchUsers} from "../../store/reducers/ActionCreator";

interface AuthFormProps {
    type: string
}

const AuthForm: React.FC<AuthFormProps> = ({type}) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const [emailDirty, setEmailDirty] = useState(false)
    const [passDirty, setPassDirty] = useState(false)
    const [emailError, setEmailError] = useState('Email can not be empty')
    const [passError, setPassError] = useState('Password can not be empty')
    const [formValid, setFormValid] = useState(false)
    const [singInErr, setSingInErr] = useState(false)
    const [singUpErr, setSingUpErr] = useState(false)
    const [newUser, setNewUser] = useState(false)

    useEffect(() => {
        if (emailError || passError) {
            setFormValid(false)
        } else {
            setFormValid(true)
        }
    }, [emailError, passError])

    // useEffect(() => {
    //     dispatch(fetchUsers())
    // }, [])
    //
    // const dispatch = useAppDispatch()
    // const {users} = useAppSelector(state => state.userReducer)

    const handleEmail = (e: React.ChangeEvent<any>) => {
        setEmail(e.currentTarget.value)

        //eslint-disable-next-line
        const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

        if (!re.test(String(e.currentTarget.value).toLowerCase())) {
            setEmailError("Invalid Email")
        } else {
            setEmailError("")
        }
    }

    const handlePass = (e: React.ChangeEvent<any>) => {
        setPass(e.currentTarget.value)
        if (e.currentTarget.value.length < 6) {
            setPassError('Password must be > 4 char')
            if (!e.currentTarget.value) {
                setPassError('Password can not be empty')
            }
        } else {
            setPassError('')
        }
    }

    const blurHandler = (e: React.FocusEvent<HTMLInputElement>) => {
        switch (e.currentTarget.name) {
            case 'email':
                setEmailDirty(true)
                break
            case 'password':
                setPassDirty(true)
                break
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        if (type === 'signIn') {
            for (const key in data) {
                if (data[key].email === email && data[key].password === pass) {
                    setSingInErr(false)
                    navigate('/registered')
                } else {
                    setSingInErr(true)
                }
            }
        }

        if (type === 'signUp') {
            for (const key in data) {
                if (data[key].email === email && data[key].password === pass) {
                    setSingUpErr(true)
                } else {
                    setNewUser(true)
                    setSingUpErr(false)
                }
            }

            if (newUser) {
                const user = {
                    email: email,
                    password: pass
                }
                data.push(user)
                console.log(data)
                navigate('/registered')
            }
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2 className={s.title}>
                {
                    type === 'signIn' ? "Sign In" : "Sign Up"
                }
            </h2>

            <Input
                inputName="email"
                placeholder="Type email"
                onChange={handleEmail}
                onBlur={blurHandler}
                error={(emailDirty && emailError) && emailError}
            />

            <Input
                inputName="password"
                placeholder="Type password"
                onChange={handlePass}
                password={true}
                onBlur={blurHandler}
                error={(passDirty && passError) && passError}
            />

            {
                type === 'signUp' && (
                    <label htmlFor="confirm" className={s.policy}>
                        <input type="checkbox" id="confirm" required/>
                        Confirm policy
                    </label>
                )
            }

            <button
                disabled={!formValid}
                type="submit"
                className={cn(s.confirm, {[s.signInBtn]: type === 'signIn'}, {[s.signUpBtn]: type === 'signUp'})}
            >
                {
                    type === 'signIn' ? "Authorise" : "Register"
                }
            </button>

            <div className={cn(s.singInErr, {[s.show]: singInErr}, {[s.show]: singUpErr})}>
                {
                    (type === 'signIn' && singInErr) && <p>Invalid login or password</p>
                }
                {
                    (type === 'signUp' && singUpErr) && <p>User already exist</p>
                }
            </div>

        </form>
    );
}

export default AuthForm;
