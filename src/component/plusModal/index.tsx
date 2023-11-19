import './style.css';
import { ChangeEvent, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { RootState } from '../../../redux/store';
import { HiMiniComputerDesktop } from 'react-icons/hi2';
import { IoHardwareChip } from 'react-icons/io5';
import { setPModal } from '../../../redux/slices/user';
import axios from '../../utils/axios';
import { setAllComponents, setComputers } from '../../../redux/slices/computer';
import { parser, typeVariants, typeVariantsUkr } from '../../componentParser';
import toast from 'react-hot-toast';

type computerInputsParams = {
  name: string,
  location: string,
  responsible: string
}

const PlusModal: React.FC = () => {

  const keys: typeVariants[] = Object.keys(parser) as typeVariants[];
  const [ computerInputs, setComputerInputs ] = useState<computerInputsParams>({
    name: '',
    location: '',
    responsible: ''
  });
  const [ componentName, setComponentName ] = useState<string>('');
  const [ componentType, setComponentType ] = useState<typeVariantsUkr>('Процесор');
  const [computerTab, setComputerTab] = useState<boolean>(true);
  const { pModal } = useAppSelector((state: RootState) => state.user);
  const dispatch = useAppDispatch();


  const getComputers = async() => {
		try {
			const res = await axios.get('/computers/');
			dispatch(setComputers(res.data.computers));
			
			const res2 = await axios.get('/components/');
			dispatch(setAllComponents(res2.data.components));
		} catch(err) {
			console.error(err);
		}
	}

  const computerInputsChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setComputerInputs(() => ({
      ...computerInputs,
      [event.target.name]: event.target.value
    }))
  }

  const handleCreateComputer = async() => {
    if(!computerInputs.name) {
      return;
    }
    const res = await axios.post('/computers/', {
      name: computerInputs.name,
      location: computerInputs.location,
      responsible: computerInputs.responsible
    });
    if(res.status === 200) {
      console.log(res);
      toast.success(res.data.message);
      getComputers();
    } else {
      toast.error(res.data.message);
    }
    closeModal();
  }

  const handleCreateComponent = async() => {
    const translatedType: typeVariants | undefined = keys.find((key:typeVariants) => parser[key] === componentType);
    if(!translatedType) {
      return;
    }
    if(!componentName) {
      return;
    }
    const res = await axios.post('/components/create', {
      name: componentName,
      type: translatedType
    });
    if(res.status === 200) {
      console.log(res);

      getComputers();
    }
    closeModal();
  }

  const closeModal = () => {
    dispatch(setPModal(false));
  }

  return (
    <div style={{display: pModal ? 'flex' : 'none'}} className='pmodalWrapper' onClick={closeModal}>
      <form onSubmit={e => e.preventDefault()} className="plusmodal" onClick={(e) => e.stopPropagation()}>
        <div className="top">
          <div className='change_buttons'>
            <button type='button' onClick={() => setComputerTab(true)} className={`tabBtn ${computerTab ? 'active' : ''}`}>
              { computerTab ?
                <>
                  <HiMiniComputerDesktop className="btnIcon" color="#6d759b" />
                </>
                :
                <>
                  <HiMiniComputerDesktop className="btnIcon" />
                </>
              }
            </button>
            <button type='button' onClick={() => setComputerTab(false)} className={`tabBtn ${!computerTab ? 'active' : ''}`}>
              { !computerTab ?
                <>
                  <IoHardwareChip  className="btnIcon" color="#6d759b"  />
                </>
                :
                <>
                  <IoHardwareChip className="btnIcon"  />
                </>
              }
            </button>
          </div>
          <h1 className='h1'>{computerTab ? "Створення Комп'ютера" : "Створення Компонента"}</h1>
        </div>
        
        {computerTab ?
          <div className='pModalContainer'>
            <input className="computerInput" placeholder='Назва' name="name" value={computerInputs.name} onChange={(event) => computerInputsChangeHandler(event)}/>
            <input className="computerInput" placeholder='Локація' name="location" value={computerInputs.location} onChange={(event) => computerInputsChangeHandler(event)}/>
            <input className="computerInput" placeholder='Відповідальний' name="responsible" value={computerInputs.responsible} onChange={(event) => computerInputsChangeHandler(event)}/>
            <button type='submit' onClick={handleCreateComputer} className='submitBtn'>
              Створити
            </button>
          </div>
        : <div className='pModalContainer'>
          <input className="computerInput" placeholder='Назва' value={componentName} onChange={(event) => setComponentName(event.target.value)}/>
          <select value={componentType} onChange={(e:ChangeEvent<HTMLSelectElement>) => setComponentType(e.target.value as typeVariantsUkr)} className='computerInput'>
            {keys.map((type: typeVariants, index) => {
              return <option key={index}>{parser[type]}</option>
            })}
          </select>
          <button onClick={handleCreateComponent} type='submit' className='submitBtn'>
            Створити
          </button>
        </div>
        }
      </form>    
    </div>
  )
}

export default PlusModal;