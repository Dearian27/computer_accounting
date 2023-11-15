import './style.css';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { RootState } from '../../../redux/store';
import { setPModal } from '../../../redux/slices/user';

const AuthModal: React.FC = () => {

  const [authTab, setAuthTab] = useState<boolean>(true);
  const { authModal } = useAppSelector((state: RootState) => state.user);
  const dispatch = useAppDispatch();

  const closeModal = () => {
    dispatch(setPModal(false));
  }
 

 
  return (
    <div style={{display: authModal ? 'flex' : 'none'}} className='amodalWrapper' onClick={closeModal}>
      { authTab ?
      <section className="amodal" onClick={(e) => e.stopPropagation()}>
        <div className='formbox'> 
        <h2>Вхід</h2>
        <div className='input-box'>
          <input type="email" placeholder='Email' />
        </div>
        <div className='input-box'>
          <input type="password" placeholder='Password' />
        </div>

        <button className='authBtn'>Увійти</button>
        <p>
        <samp className='text'>Немає аккаунта? <span onClick={() => setAuthTab(false)}>Створіть</span>
        </samp>
        </p>
        </div>
      </section>
      :
      <section className="amodal" onClick={(e) => e.stopPropagation()}>
        <div className='formbox'> 
        <h2>Реєстрація</h2>
        
        <div className='input-box'>
          <input type="name" placeholder='Name' />
        </div>

        <div className='input-box'>
          <input type="surname" placeholder='Surname' />
        </div>

        <div className='input-box'>
          <input type="email" placeholder='Email' />
        </div>

        <div className='input-box'>
          <input type="password" placeholder='Password' />
        </div>

        <button className='authBtn'>Створити</button>
        <p>
        <samp className='text'>Маєте аккаунт? <span onClick={() => setAuthTab(true)}>Увійдіть</span></samp>
        </p>
        </div>  
      </section>
      }
    </div>
  )
}

export default AuthModal;