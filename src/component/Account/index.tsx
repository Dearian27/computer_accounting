import { useState } from 'react'
import './style.css'

function Account() {
    const [expand, setExpand] = useState(false);
    return (
        <div className="account">
					<div style={{display:'flex', justifyContent: 'space-between', alignItems: 'center'}}>
						<div className='computer'>
							<div style={{display: 'flex', gap: 20}}>
								<div className='invNumber'>#40044004</div>
								<div className='person'>Юрій Дзюбак</div>
								<div className='person'>22 аудиторія</div>
							</div>
							<div className='computer_name'>Моноблок Apple iMac 24" М1 4.5К 7‑ядер GPU 256GB Green (MJV83UA/A)</div>
						</div>

						<button onClick={() => setExpand(!expand)}>Button</button>
					</div>
        {expand &&    
					<div className='info'>
						<div className='info_list'>
							<div className='info_line'>
									<h3>Корпус</h3>
									<p>Крутий</p>
							</div>

							<div className='info_line'>
									<h3>Корпус</h3>
									<p>Крутий</p>
							</div>

							<div className='info_line'>
									<h3>Корпус</h3>
									<p>Крутий</p>
							</div>

							<div className='info_line'>
									<h3>Корпус</h3>
									<p>Крутий</p>
							</div>

							<div className='info_line'>
									<h3>Проц</h3>
									<p>Також крутий</p>
							</div>
							<div className='info_line'>
									<h3>Монітор</h3>
									<p>Також крутий</p>
							</div>
					
					
					<div className='info_line'>
									<h3>Корпус</h3>
									<p>Крутий</p>
							</div>
							<div className='info_line'>
									<h3>Корпус</h3>
									<p>Крутий</p>
							</div>
							<div className='info_line'>
									<h3>Корпус</h3>
									<p>Крутий</p>
							</div>
							<div className='info_line'>
									<h3>Корпус</h3>
									<p>Крутий</p>
							</div>
							<div className='info_line'>
									<h3>Проц</h3>
									<p>Також крутий</p>
							</div>
							<div className='info_line'>
									<h3>Монітор</h3>
									<p>Також крутий</p>
							</div>
					</div>

					<div className='control_buttons'>
							<button>зберегти</button>
							<button>редагувати</button>
							<button>видалити</button>
					</div>
					</div>
					
				}
      </div>
        
    )
}

export default Account;