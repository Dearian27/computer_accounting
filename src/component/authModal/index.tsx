import './style.css';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { RootState } from '../../../redux/store';
import { HiMiniComputerDesktop } from 'react-icons/hi2';
import { IoHardwareChip } from 'react-icons/io5';
import { setPModal } from '../../../redux/slices/user';

const AuthModal: React.FC = () => {

  const [computerTab, setComputerTab] = useState<boolean>(true);
  const { pModal } = useAppSelector((state: RootState) => state.user);
  const dispatch = useAppDispatch();

  const closeModal = () => {
    dispatch(setPModal(false));
  }
  // console.log(pModal);
  return (
<<<<<<< HEAD
    <div style={{display: pModal ? 'none' : 'flex'}} className='pmodalWrapper' onClick={closeModal}>
=======
    <div style={{display: false ? 'flex' : 'none'}} className='pmodalWrapper' onClick={closeModal}>
>>>>>>> 6b0e7cf5a456552d823a86f81b6603baa396c53a
      <section className="modal" onClick={(e) => e.stopPropagation()}>
      <div className='formbox'> 
      <h2>Вхід</h2>
      <div className='input-box'>
        <input type="email" placeholder='Email' />
      </div>
      <div className='input-box'>
        <input type="password" placeholder='Password' />
      </div>

      <button className='signInBtn'>Увійти</button>
      <p>
      <samp className='text'>Немає аккаунта? <a href="">Створіть</a></samp>
      </p>
       </div>  
       
      </section>    
    </div>
  )
}

export default AuthModal;