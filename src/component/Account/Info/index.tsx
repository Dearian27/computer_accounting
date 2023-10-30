import { useEffect, useState } from "react";
import './styles.css';
import { useAppSelector, useAppDispatch } from '../../../../redux/hooks';
import Component from "../../Component";
import { setEditMode } from "../../../../redux/slices/computer";

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

export default function Info() {
  const dispatch = useAppDispatch();
  const [currentPart, setCurrentPart] = useState<null | PartParams>(null);
  const { currentComponent, editMode } = useAppSelector(state => state.computer);
  const [textArea, setTextArea] = useState('');

  const editClickHandler = () => {
    dispatch(setEditMode(!editMode))
  }
  
  const hoverHandler = () => {
    
  }
  
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
          <input className={`${editMode ? "active" : ""}`} value={'value'} />
        </div>
      {
        data.map(comp => {
          return <Component value={comp.value} type={comp.type} />
        })
      }
        <div className="info_line">
          <h3>Локація</h3>
          <input className={`${editMode ? "active" : ""}`} value={'value'} />
        </div>
        <div className="info_line">
          <h3>Відповідальний</h3>
          <input className={`${editMode ? "active" : ""}`} value={'value'} />
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

    <aside className="partDetails">
      { currentComponent ? 
          <>
          <div>
            <span>currentComponent.name</span>
          </div>
          <div className="history">
            <div className="item">history item</div>
            <div className="item">history item</div>
            <div className="item">history item</div>
            <div className="item">history item</div>
            <div className="item">history item</div>
            <div className="item">history item</div>
            <div className="item">history item</div>
          </div>
          </>
        :
        <div className="font none">
          Виберіть деталь
        </div>
      }
    </aside>
    </section>
  )
}