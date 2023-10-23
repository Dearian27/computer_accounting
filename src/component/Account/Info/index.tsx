import { useEffect, useState } from "react";
import './styles.css';


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
  {type: 'Корпус2', value: 'Крутий'},
  {type: 'Корпус', value: 'Крутий'},
  {type: 'Локація', value: 'Крутий'},
  {type: 'Відповідальний', value: 'Крутий'},
]

export default function Info() {

  const [currentPart, setCurrentPart] = useState<null | PartParams>(null);

  // const [edit] = useState(true); //, setEdit
  const [textArea, setTextArea] = useState('');
  useEffect(() => {
    if(localStorage.getItem('textarea')) {
      setTextArea(window.localStorage.getItem('textarea') || '');
    }
  }, [])


  return (
    <section className="infoContainer">
    <main className='info'>
      <div className='info_list'>
      {
        data.map(comp => {
          return <div className='info_line'>
            <h3>{comp.type}</h3>
            <input value={comp.value} />
          </div>
        })
      }
      </div>
      <div className='panel'>
        <textarea className='notes' value={textArea} onChange={(event) => {setTextArea(event.target.value); localStorage.setItem('textarea', textArea)}} />
        <div className='control_buttons'>
            <button>зберегти</button>
            <button>редагувати</button>
            <button>видалити</button>
        </div>
      </div>
    </main>

    <aside className="partDetails">
      { currentPart ? 
          <></>
        :
        <div className="font none">
          Виберіть деталь
        </div>
      }
    </aside>
    </section>
  )
}