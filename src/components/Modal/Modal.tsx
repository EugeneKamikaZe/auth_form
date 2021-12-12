import React from 'react';
import s from './Modal.module.scss'
import cn from 'classnames'
import {ReactComponent as Close} from "../../assets/icon/close.svg";

interface ModalProps {
    active: boolean,
    setActive: (active: boolean) => void
}

const Modal: React.FC<ModalProps> = ({children, active, setActive}) => {
    const handleClick = () => {
        setActive(false)
    }

    return (
        <div className={cn(s.wrapper, {[s.show]: active})} onClick={handleClick}>
            <div className={cn(s.content, {[s.active]: active})} onClick={e => e.stopPropagation()}>
                <span className={s.close} onClick={handleClick}>
                    <Close />
                </span>

                {children}
            </div>
        </div>
    );
};

export default Modal;
