import './style.css';
import { clearModal, componentParams, setAllComponents, setComputers } from '../../../redux/slices/computer';
import { MdDeleteSweep } from "react-icons/md";
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from '../../utils/axios';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { RootState } from '../../../redux/store';
import { parser } from '../../componentParser';
import { GoPlusCircle } from 'react-icons/go';
import toast from 'react-hot-toast';

type ComponentAccountParams = {
	id: string;
  choosing?: boolean;
}
export type componentTypeVariants = "cpu" | "motherboard" | "gpu" | "case" | "ram" | "disk" | "mouse" | "keyboard" | "power_supply" | "monitor";

const ComponentAccount: React.FC<ComponentAccountParams> = ({ id, choosing=false }) => {
  const { allComponents, modal } = useAppSelector((state: RootState) => state.computer);
  const dispatch = useAppDispatch();
  const params = useParams();
  const currentId = id === 'unique' ? params.id : id;
  const component:componentParams = allComponents.find((component: componentParams) => component._id === currentId);
  const [ computerName, setComputerName ] = useState<string>("");
  const { user } = useAppSelector((state: RootState) => state.user);
  console.log(user)

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

  const addComponent = async () => {
    let res;
    if(modal.currentComponentId) {
      res = await axios.put(`/components/multiple/${modal.computerId}`, {
        type: modal.type,
        currentComponentId: modal.currentComponentId,
        id,
      });
    } else if (modal.type === 'ram' || modal.type === 'disk') {
      res = await axios.put(`/components/add/${modal.computerId}`, {
        type: modal.type,
        id,
      });
    } else {
      res = await axios.put(`/components/${modal.computerId}`, {
        type: modal.type,
        id,
      });
    }
    if(res.status === 200) {
      getComputers();
      toast.success('Компонент додано успішно!'); 
    } else {
      toast.error(res.data.message); 
    }
    dispatch(clearModal(true));
  }
  
  const getComputerName = async () => {
    if(component?.anchor) {
      try {
        const { data } = await axios.get(`/computers/${component.anchor}`);
        if(data.computer.name) setComputerName(data.computer.name);
      } catch (err) {
        console.log(err);
      }
    }
  }

  const deleteHandler = async () => {
    axios.delete(`/components/delete/${component._id}`)
    .then(() => {      
        getComputers();
        toast.success('Компонент видалено успішно!');
    })
    .catch((error) => {
      toast.error(error.response.data.message);
      console.error(error);
    })
	}
	
  useEffect(() => {
    getComputerName();
  }, [])

  return component ?
    <section className="account">
      <div style={{display:'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <div className='component'>
            <span className='grey'>
              {component?.type ? parser[component.type]: ''}
            </span>
          <div className='name'>
            <span style={{fontSize: '24px'}}>
              {component?.name}
            </span>
          </div>
          <div className='anchor'>{computerName ?
            <Link className='link' to={`/${component?.anchor}`}>{computerName}</Link>
            :
            <span className='grey'>Неприкріплена</span>
          }</div>
        </div>

        {!choosing ?  
          <button className='optionBtn' onClick={() => deleteHandler()}>
            <MdDeleteSweep className="btnIcon" color={user ? "aliceblue" : "grey"}/>
          </button>
          :
          <button className='optionBtn' onClick={() => addComponent()}>
            <GoPlusCircle style={{height: 30, width: 30}} className="btnIcon" color="aliceblue"/>
          </button>
        }
      </div>
    </section>
  : <></>
}

export default ComponentAccount;