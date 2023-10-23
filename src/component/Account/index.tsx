import { useState } from 'react';
import './style.css';
import UserImg from '/src/assets/user.svg';
import PinImg from '/src/assets/pin.svg';
import Info from './Info';

function Account() {
    const [expand, setExpand] = useState(false);	

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
					<Info />
				}
      </div>
        
    )
}

export default Account;