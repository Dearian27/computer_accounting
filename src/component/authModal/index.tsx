import './style.css';
import { ChangeEvent, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { RootState } from '../../../redux/store';
import { setAModal, setUser } from '../../../redux/slices/user';
import axios from '../../utils/axios';
import toast from 'react-hot-toast';

type signinInputsParams = {
  email: string,
  password: string,
}
type signupInputsParams = {
  name: string,
  surname: string,
  email: string,
  password: string
}

const AuthModal: React.FC = () => {

  const [authTab, setAuthTab] = useState<boolean>(true);
  const { authModal } = useAppSelector((state: RootState) => state.user);
  const dispatch = useAppDispatch();
  
  const [ signupInputsParams, setSignupInputsParams ] = useState<signupInputsParams>({
    name: '',
    surname: '',
    email: '',
    password: ''
  });
  const [ signinInputsParams, setSigninInputsParams ] = useState<signinInputsParams>({
    email: '',
    password: ''
  });

  const signInInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setSigninInputsParams(() => ({
      ...signinInputsParams,
      [event.target.name]: event.target.value
    }));
  }
  const signUpInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setSignupInputsParams(() => ({
      ...signupInputsParams,
      [event.target.name]: event.target.value
    }));
  }

  const submitSignIn = async() => {
    if(!signinInputsParams.email || !signinInputsParams.password) {
      toast.error("Заповніть форму.");
      return;
    }
    axios.post('/auth/signin', {
      email: signinInputsParams.email,
      password: signinInputsParams.password
    })
    .then((res) => {      
      let name;
      switch(res.data.user.name) {
        case 'Юрій': name = 'Юрію'; break;
        case 'Наталія': name = 'Наталіє'; break;
        case 'Микола': name = 'Миколо'; break;
        case 'Олена': name = 'Олено'; break;
        case 'Олександр': name = 'Олександре'; break;
        case 'Євген': name = 'Євгене'; break;
        default: name = res.data.user.name;
      }
      toast.success('Вітаю, ' + name);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      dispatch(setUser(res.data.user));
      closeModal();
    })
    .catch((error) => {
      toast.error(error.response.data.message);
      console.error(error);
    })
  }
  const submitSignUp = async() => {
    if(!signupInputsParams.email || !signupInputsParams.password || !signupInputsParams.name || !signupInputsParams.surname) {
      toast.error("Заповніть форму.");
      return;
    }
    axios.post('/auth/signup', {
      name: signupInputsParams.name,
      surname: signupInputsParams.surname,
      email: signupInputsParams.email,
      password: signupInputsParams.password
    })
    .then((res) => {      
      let name;
      switch(res.data.user.name) {
        case 'Юрій': name = 'Юрію'; break;
        case 'Наталія': name = 'Наталіє'; break;
        case 'Микола': name = 'Миколо'; break;
        case 'Олена': name = 'Олено'; break;
        case 'Олександр': name = 'Олександре'; break;
        case 'Євген': name = 'Євгене'; break;
        default: name = res.data.user.name;
      }
      toast.success('Вітаю, ' + name);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      dispatch(setUser(res.data.user));
      closeModal();
    })
    .catch((error) => {
      toast.error(error.response.data.message);
      console.error(error);
    })
  }

  const closeModal = () => {
    dispatch(setAModal(false));
  }
 

 
  return (
    <div style={{display: authModal ? 'flex' : 'none'}} className='amodalWrapper' onClick={closeModal}>
      { authTab ?
      <section className="amodal" onClick={(e) => e.stopPropagation()}>
        <div className='formbox'> 
        <h2>Вхід</h2>
        <div className='input-box'>
          <input type="email" placeholder='Пошта' name="email" value={signinInputsParams.email} onChange={(event) => signInInputHandler(event)} />
        </div>
        <div className='input-box'>
          <input type="password" placeholder='Пароль' name="password" value={signinInputsParams.password} onChange={(event) => signInInputHandler(event)} />
        </div>

        <button className='authBtn' onClick={submitSignIn}>Увійти</button>
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
          <input type="name" placeholder="Ім'я" name="name" value={signupInputsParams.name} onChange={(event) => signUpInputHandler(event)} />
        </div>

        <div className='input-box'>
          <input type="surname" placeholder='Прізвище' name='surname' value={signupInputsParams.surname} onChange={(event) => signUpInputHandler(event)} />
        </div>

        <div className='input-box'>
          <input type="email" placeholder='Пошта' name='email' value={signupInputsParams.email} onChange={(event) => signUpInputHandler(event)} />
        </div>

        <div className='input-box'>
          <input type="password" placeholder='Пароль' name='password' value={signupInputsParams.password} onChange={(event) => signUpInputHandler(event)} />
        </div>

        <button className='authBtn' onClick={submitSignUp}>Створити</button>
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