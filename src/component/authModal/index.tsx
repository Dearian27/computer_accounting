import './style.css';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { RootState } from '../../../redux/store';
import { setPModal } from '../../../redux/slices/user';
import { Link } from 'react-router-dom';

const AuthModal: React.FC = () => {

  const [authTab, setAuthTab] = useState<boolean>(true);
  const { authModal } = useAppSelector((state: RootState) => state.user);
  const dispatch = useAppDispatch();

  const closeModal = () => {
    dispatch(setPModal(false));
  }
  // console.log(pModal);
  return (
    <div style={{display: authModal ? 'none' : 'flex'}} className='pmodalWrapper' onClick={closeModal}>
      { authTab ?
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
      :
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
        <samp className='text'>Немає аккаунта? <span>Створіть</span></samp>
        </p>
        </div>  
      </section>
      }
    </div>
  )
}

export default AuthModal;