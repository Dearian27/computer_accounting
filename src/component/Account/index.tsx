import { useState } from 'react'
import './style.css'

function Account() {
    const [expand, setExpand] = useState(false);
    const [edit, setEdit] = useState(true);
    
		return (
        <div className="account">
					<div style={{display:'flex', justifyContent: 'space-between', alignItems: 'center'}}>
						<div className='computer'>
							<div style={{display: 'flex', gap: 20}}>
								<div className='field'>#40044004</div>
								<div className='field'>
									Юрій Дзюбак
									<img className='icon' src="/user.svg" alt="person" />
								</div>
								<div className='field'>
									Обчислювальний центр
									<img className='icon' src="/pin.svg" alt="person" />
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
									<h3>ОЗП</h3>
									<input value={'Крутий'} />
							</div>

							<div className='info_line'>
									<h3>Корпус</h3>
									<input value={'Крутий'} />
							</div>

							<div className='info_line'>
									<h3>Проц</h3>
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
									<h3>Проц</h3>
									<input value={'Крутий'} />
							</div>
							<div className='info_line'>
									<h3>Відповідальний</h3>
									<input readOnly={edit ? false :true} />
							</div>
<<<<<<< HEAD
					</div>

					<div className='control_buttons'>
							<button>зберегти</button>
							<button>редагувати</button>
							<button>видалити</button>
=======
>>>>>>> 49432ce0ea6c4af5f168b25166979d520adceddf
					</div>
					</div>
					
				}
      </div>
        
    )
}

export default Account;