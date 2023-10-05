import { useEffect, useState } from 'react';
import './style.css';
import UserImg from '/src/assets/user.svg';
import PinImg from '/src/assets/pin.svg';

function Account() {
    const [expand, setExpand] = useState(false);
    const [edit] = useState(true); //, setEdit
		const [textArea, setTextArea] = useState('');
		
		
		useEffect(() => {
			if(localStorage.getItem('textarea')) {
				setTextArea(window.localStorage.getItem('textarea') || '');
			}
		}, [])

		return (
        <div className="account">
					<div style={{display:'flex', justifyContent: 'space-between', alignItems: 'center'}}>
						<div className='computer'>
							<div style={{display: 'flex', gap: 20}}>
								<div className='field'>#40044004</div>
								<div className='field'>
									Юрій Дзюбак
									<img className='icon' src={UserImg} alt="person" />
								</div>
								<div className='field'>
									Обчислювальний центр
									<img className='icon' src={PinImg} alt="person" />
								</div>
							</div>
							<div className='computer_name'>Моноблок Apple iMac 24" М1 4.5К 7‑ядер GPU 256GB Green (MJV83UA/A)</div>
						</div>

						<button onClick={() => setExpand(!expand)}>Button</button>
					</div>
        {expand &&    
					<div className='info'>
						<div className='info_list'>
							<div className='info_line'>
									<h3>Назва</h3>
									<input value={'Крутий'} />
							</div>

							<div className='info_line'>
									<h3>Корпус</h3>
									<input value={'Крутий'} />
							</div>

							<div className='info_line'>
									<h3>Процесор</h3>
									<input value={'Крутий'} />
							</div>

							<div className='info_line'>
									<h3>Відеокарта</h3>
									<input value={'Немає'} />
							</div>

							<div className='info_line'>
									<h3>ОЗП</h3>
									<input value={'Крутий'} />
							</div>
							<div className='info_line'>
									<h3>Монітор</h3>
									<input value={'Крутий'} />
							</div>
					
					
					<div className='info_line'>
									<h3>Корпус</h3>
									<input value={'Крутий'} />
							</div>
							<div className='info_line'>
									<h3>Корпус</h3>
									<input value={'Крутий'} />
							</div>
							<div className='info_line'>
									<h3>Корпус</h3>
									<input value={'Крутий'} />
							</div>
							<div className='info_line'>
									<h3>Корпус</h3>
									<input value={'Крутий'} />
							</div>
							<div className='info_line'>
									<h3>Локація</h3>
									<input value={'Крутий'} />
							</div>
							<div className='info_line'>
									<h3>Відповідальний</h3>
									<input readOnly={edit ? false :true} />
							</div>
					</div>

					<div className='panel'>
						<textarea className='notes' value={textArea} onChange={(event) => {setTextArea(event.target.value); localStorage.setItem('textarea', textArea)}} />
						<div className='control_buttons'>
								<button>зберегти</button>
								<button>редагувати</button>
								<button>видалити</button>
						</div>
					</div>
				</div>
				}
      </div>
        
    )
}

export default Account;