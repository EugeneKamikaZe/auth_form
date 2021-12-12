import React, {SetStateAction, useState} from 'react';
import Modal from "../../components/Modal/Modal";
import AuthForm from "../../components/AuthForm/AuthForm";

const Home: React.FC = () => {
    const [modalType, setModalType] = useState('')
    const [modalActive, setModalActive] = useState(false)

    const handleClick = (type: SetStateAction<string>) => {
        return () => {
            setModalActive(true)
            setModalType(type)
        }
    }

    return (
        <>
            <div>
                <button onClick={handleClick('signIn')}>Sing In</button>
                <button onClick={handleClick('signUp')}>Sing Up</button>
            </div>

            <Modal active={modalActive} setActive={setModalActive}>
                <AuthForm type={modalType} />
            </Modal>
        </>
    );
}

export default Home;
