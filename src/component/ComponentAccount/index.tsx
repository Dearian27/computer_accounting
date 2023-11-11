import './style.css';
import { componentParams, setAllComponents } from '../../../redux/slices/computer';
import { MdDeleteSweep } from "react-icons/md";
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from '../../utils/axios';
import { useAppSelector } from '../../../redux/hooks';
import { RootState } from '../../../redux/store';
import { parser } from '../../componentParser';
import { useDispatch } from 'react-redux';

type ComponentAccountParams = {
	id: string;
}
export type componentTypeVariants = "cpu" | "motherboard" | "gpu" | "case" | "ram" | "disk" | "mouse" | "keyboard" | "power_supply" | "monitor";

const ComponentAccount: React.FC<ComponentAccountParams> = ({ id }) => {
  const { allComponents } = useAppSelector((state: RootState) => state.computer);
  const dispatch = useDispatch();
  const params = useParams();
  const currentId = id === 'unique' ? params.id : id;
  const component:componentParams = allComponents.find((component: componentParams) => component._id === currentId);
  const [ computerName, setComputerName ] = useState();
  
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
        <button className='deleteBtn' onClick={() => deleteHandler()}>
          <MdDeleteSweep className="btnIcon" color="aliceblue"/>
        </button>
      </div>
    </section>
  : <></>
}

export default ComponentAccount;