import React, { ChangeEvent, useState } from "react";
import './styles.css';
import { useAppSelector, useAppDispatch } from '../../../../redux/hooks';
import Component from "../../Component";
import { ComputerParams, setComputers, setEditMode } from "../../../../redux/slices/computer";
import PartDetails, { historyParams } from "../../PartDetails";
import { MdDeleteSweep } from "react-icons/md";
import { MdCreate } from "react-icons/md";
import { MdSaveAs } from "react-icons/md";

import { AiOutlineClose } from "react-icons/ai";
import axios from "../../../utils/axios";
import { componentTypeVariants } from "../../ComponentAccount";


type AccountParams = {
  id: string;
	components: Array<{type: componentTypeVariants; name: string, id: [string]}>;
	responsible: string;
	location: string;
	history: historyParams;
	compName: string;
}

const Info: React.FC<AccountParams> = ({ id, components, responsible, location, history, compName}) => {
  const dispatch = useAppDispatch();
  const [inputs, setInputs] = useState<{name: string; responsible: string; location: string}>({
    name: compName, responsible, location
  });
  const { allComponents, editMode, computers } = useAppSelector(state => state.computer);
  const [textArea, setTextArea] = useState('');
  
  const inputsChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setInputs((prevInputs) => ({
      ...prevInputs,
      [event.target.name]: event.target.value
    }))
  }
  const editClickHandler = () => {
    dispatch(setEditMode(!editMode))
  }
  const handleSubmit = async() => {
    dispatch(setEditMode(false));
    const { data } = await axios.post(`/computers/update/${id}`, {
      name: inputs.name,
      responsible: inputs.responsible,
      location: inputs.location
    })
    const index = computers.findIndex((comp: ComputerParams) => comp._id === id);
    const newComputers = [...computers];
    newComputers[index] = data.computer;
    dispatch(setComputers(newComputers))
  }

  return (
    <section className="infoContainer">
    <main className='info'>
      <div className='info_list'>
        <div className="info_line">
          <h3>Назва</h3>
          <input className={`${editMode ? "active" : ""}`} name="name" value={inputs.name} onChange={(event) => inputsChangeHandler(event)} readOnly={!editMode} />
        </div>
        <div className="info_line">
          <h3>Локація</h3>
          <input className={`${editMode ? "active" : ""}`} name="location" value={inputs.location} onChange={(event) => inputsChangeHandler(event)} readOnly={!editMode} />
        </div>
        <div className="info_line">
          <h3>Відповідальний</h3>
          <input className={`${editMode ? "active" : ""}`} name="responsible" value={inputs.responsible} onChange={(event) => inputsChangeHandler(event)} readOnly={!editMode} />
        </div>
      { components && allComponents &&
        components.map((componentsOneType, index: number) => {
          if(componentsOneType?.id && componentsOneType?.id.length > 0) {
            return componentsOneType.id.map(c => {
              return <Component key={c} name={componentsOneType.name} type={componentsOneType.type} />
            })
          } else {
            return <Component key={index} name={""} type={componentsOneType.type} />
          }
        })
      }
      </div>
      <div className='panel'>
        <textarea className='notes' value={textArea} onChange={(event) => {setTextArea(event.target.value); localStorage.setItem('textarea', textArea)}} />
        <div className='control_buttons'>
            <button className={`${editMode ? "active" : ""}`}>
            {editMode ? 
              <>
                <MdSaveAs onClick={handleSubmit}  className="btnIcon" color="#50577A"  />
              </>
              :
              <>
                <MdSaveAs  className="btnIcon" color="#6d759b"  />
              </>
              }
            </button>

            <button className={`${editMode ? "red" : ""}`} onClick={() => editClickHandler()}>
              {editMode ? 
              <>
                <AiOutlineClose className="btnIcon" color="aliceblue" />
              </>
              :
              <>
                <MdCreate className="btnIcon" color="aliceblue" />
              </>
              }
              
            </button>
            <button><MdDeleteSweep className="btnIcon" color="aliceblue"/></button>
        </div>
      </div>
    </main>
    <PartDetails history={history} />
    </section>
  )
}
export default Info;