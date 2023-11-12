import './style.css';
import { ComputerParams, clearModal, componentParams, setAllComponents, setComputers } from '../../../redux/slices/computer';
import { MdDeleteSweep } from "react-icons/md";
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from '../../utils/axios';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { RootState } from '../../../redux/store';
import { parser } from '../../componentParser';
import { GoPlusCircle } from 'react-icons/go';

type ComponentAccountParams = {
	id: string;
  choosing?: boolean;
}
export type componentTypeVariants = "cpu" | "motherboard" | "gpu" | "case" | "ram" | "disk" | "mouse" | "keyboard" | "power_supply" | "monitor";

const ComponentAccount: React.FC<ComponentAccountParams> = ({ id, choosing=false }) => {
  const { allComponents, modal, computers } = useAppSelector((state: RootState) => state.computer);
  const dispatch = useAppDispatch();
  const params = useParams();
  const currentId = id === 'unique' ? params.id : id;
  const component:componentParams = allComponents.find((component: componentParams) => component._id === currentId);
  const [ computerName, setComputerName ] = useState<string>("");
  const addComponent = async () => {
    const res = await axios.post(`/components/${modal.computerId}`, {
      type: modal.type,
      currentComponentId: modal.currentComponentId || '',
      id,
    });
    if(res.status === 200) {
      const index = computers.findIndex((comp: ComputerParams) => comp._id === modal.computerId);
      const newComputers = [...computers];
      newComputers[index] = res.data.computer;
      dispatch(setComputers(newComputers));
    }
    if(res.status === 404) {
      console.log('not found');
      // return;
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
    try {
      const res = await axios.delete(`/components/delete/${component._id}`);
      if(res.status === 200) {
        const newComponents = [...allComponents];
        const index = newComponents.findIndex(component => component._id === currentId);
        newComponents.splice(index, 1);
        dispatch(setAllComponents(newComponents)); 
      }
    } catch (err) {
      console.log(err);
    }
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

        {choosing ?  
          <button className='optionBtn' onClick={() => deleteHandler()}>
            <MdDeleteSweep className="btnIcon" color="aliceblue"/>
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