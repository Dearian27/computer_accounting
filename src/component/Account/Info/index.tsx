import React, { useEffect, useState } from "react";
import './styles.css';
import { useAppSelector, useAppDispatch } from '../../../../redux/hooks';
import Component from "../../Component";
import { setEditMode } from "../../../../redux/slices/computer";
import PartDetails from "../../PartDetails";

type PartParams = unknown; 
type ComputerParams = {
  type: string,
  value: string,
}

const data: ComputerParams[] = [
  {type: 'Назва', value: 'Крутий'},
  {type: 'Корпус', value: 'Крутий'},
  {type: 'Процесор', value: 'Крутий'},
  {type: 'Відеокарта', value: 'Крутий'},
  {type: 'ОЗП', value: 'Крутий'},
  {type: 'Монітор', value: 'Крутий'},
  {type: 'Корпус', value: 'Крутий'},
  {type: 'Корпус', value: 'Крутий'},
  {type: 'Корпус', value: 'Крутий'},
  {type: 'Корпус', value: 'Крутий'},
  {type: 'Корпус', value: 'Крутий'},
  // {type: 'Локація', value: 'Крутий'},
  // {type: 'Відповідальний', value: 'Крутий'},
]

type AccountParams = {
	components: Array<{type: string; name: string}>;
	responsible: string;
	location: string;
	history: string;
	compName: string;
}

const Info: React.FC<AccountParams> = ({ components, responsible, location, history, compName}) => {
  const dispatch = useAppDispatch();
  const [currentPart, setCurrentPart] = useState<null | PartParams>(null);
  const { currentComponent, editMode } = useAppSelector(state => state.computer);
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
          <input className={`${editMode ? "active" : ""}`} value={compName} />
        </div>
      {
        components.map(comp => {
          return <Component value={comp.name} type={comp.type} />
        })
      }
        <div className="info_line">
          <h3>Локація</h3>
          <input className={`${editMode ? "active" : ""}`} value={location} />
        </div>
        <div className="info_line">
          <h3>Відповідальний</h3>
          <input className={`${editMode ? "active" : ""}`} value={responsible} />
        </div>
      </div>
      <div className='panel'>
        <textarea className='notes' value={textArea} onChange={(event) => {setTextArea(event.target.value); localStorage.setItem('textarea', textArea)}} />
        <div className='control_buttons'>
            <button className={`${editMode ? "active" : ""}`}>Зберегти</button>
            <button onClick={() => editClickHandler()}>{editMode ? "Відхилити" : "Редагувати"}</button>
            <button>Видалити</button>
        </div>
      </div>
    </main>
    <PartDetails />
    </section>
  )
}
export default Info;