import React, { useEffect, useState } from "react";
import './styles.css';
import { useAppSelector, useAppDispatch } from '../../../../redux/hooks';
import Component from "../../Component";
import { setEditMode } from "../../../../redux/slices/computer";
import PartDetails from "../../PartDetails";
import { BiSolidEditAlt } from "react-icons/bi";
import { MdDeleteSweep } from "react-icons/md";
import { MdCreate } from "react-icons/md";
import { MdSaveAs } from "react-icons/md";

import { AiOutlineClose } from "react-icons/ai";

type PartParams = unknown; 

type AccountParams = {
	components: Array<[{type: string; name: string, id: [string]}]>;
	responsible: string;
	location: string;
	history: History;
	compName: string;
}

const Info: React.FC<AccountParams> = ({ components, responsible, location, history, compName}) => {
  const dispatch = useAppDispatch();
  const [currentPart, setCurrentPart] = useState<null | PartParams>(null);
  const { allComponents, editMode } = useAppSelector(state => state.computer);
  const [textArea, setTextArea] = useState('');
  
  const editClickHandler = () => {
    dispatch(setEditMode(!editMode))
  }
  
  // const hoverHandler = () => {
    
  // }
  
  useEffect(() => {
    if(localStorage.getItem('textarea')) {
      setTextArea(window.localStorage.getItem('textarea') || '');
    }
  }, [])

  return (
    <section className="infoContainer">
    <main className='info'>
      <div className='info_list'>
        <div className="info_line">
          <h3>Назва</h3>
          <input className={`${editMode ? "active" : ""}`} value={compName} onChange={() => {}} readOnly={!editMode} />
        </div>
        <div className="info_line">
          <h3>Локація</h3>
          <input className={`${editMode ? "active" : ""}`} value={location} onChange={() => {}} readOnly={!editMode} />
        </div>
        <div className="info_line">
          <h3>Відповідальний</h3>
          <input className={`${editMode ? "active" : ""}`} value={responsible} onChange={() => {}} readOnly={!editMode} />
        </div>
      { components &&
        components.map((componentsOneType, index) => {
          if(componentsOneType?.id && componentsOneType?.id.length > 0) {
            return componentsOneType.id.map(c => {
              return <Component key={c} name={allComponents.find(comp => comp._id === c).name} type={componentsOneType.type} />
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
                <MdSaveAs  className="btnIcon" color="#50577A"  />
              </>
              :
              <>
                <MdSaveAs  className="btnIcon" color="aliceblue"  />
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