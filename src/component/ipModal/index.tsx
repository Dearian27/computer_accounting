import './style.css';
import { ChangeEvent, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { RootState } from '../../../redux/store';
import { setIPModal } from '../../../redux/slices/user';

const IPModal: React.FC = () => {

  const [ipValue, setIpValue] = useState(window.localStorage.getItem('server_ip') || '');
  const { ipModal } = useAppSelector((state: RootState) => state.user);
  const dispatch = useAppDispatch();
  
  const closeModal = () => {
    dispatch(setIPModal(false));
  }
  const changeIP = () => {
    localStorage.setItem('server_ip', ipValue);
    closeModal();
  }
  const changeInputValue = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.replace(/\s/g, "");
    setIpValue(value);
  }

  return (
    <div style={{display: ipModal ? 'flex' : 'none'}} className='amodalWrapper' onClick={closeModal}>
      <section className="ipmodal" onClick={(e) => e.stopPropagation()}>
        <div className="formbox">
          <h2>Зміна адреси сервера</h2>
          <div className='input-box'>
            <input type="name" placeholder="192.168.0.1" value={ipValue} onChange={(event) => changeInputValue(event)} />
          </div>
          <button className='btn' onClick={changeIP}>
            Змінити
          </button>
          <p className='tip'>
            <span className='red'>*</span>Потрібно вписати адресу разом із крапками
          </p>
        </div>
      </section>
    </div>
  )
}

export default IPModal;