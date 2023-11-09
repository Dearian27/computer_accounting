import { useState } from 'react';
import './style.css';
import Info from './Info';
import { FaLocationDot } from 'react-icons/fa6';
import { BiSolidUser } from 'react-icons/bi';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { setActive } from '../../../redux/slices/computer';

type AccountParams = {
	id: string;
	components: Array<[{type: string; name: string}]>;
	responsible: string;
	location: string;
	history: string;
	compName: string;
}

const Account: React.FC<AccountParams> = ({ id, components, responsible, location, history, compName}) => {
  const { active } = useAppSelector(state => state.computer);
	console.log(active);
	const dispatch = useAppDispatch();
	
	const expandHandler = () => {
		dispatch(setActive(id));
	}
	
		return (
        <section id={id} className="account">
					<div style={{display:'flex', justifyContent: 'space-between', alignItems: 'center'}}>
						<div className='computer'>
							<div style={{display: 'flex', gap: 20}}>
								{/* <div className='field'>#40044004</div> */}
								<div className='field'>
									{responsible || 'Немає'}
									{/* Юрій Дзюбак */}
									<BiSolidUser className='icon' />
									{/* <img className='icon' src={UserImg} alt="person" /> */}
								</div>
								<div className='field'>
									{location || 'Немає'}
									{/* Обчислювальний центр */}
									<FaLocationDot className='icon' />
									{/* <img className='icon' src={PinImg} alt="person" /> */}
								</div>
							</div>
							<div className='computer_name'>{compName}</div>
							{/* <div className='computer_name'>Моноблок Apple iMac 24" М1 4.5К 7‑ядер GPU 256GB Green (MJV83UA/A)</div> */}
						</div>

						<button onClick={() => expandHandler()}>Button</button>
					</div>
        {active.includes(id) &&
					<Info id={id} components={components} responsible={responsible} location={location} history={history} compName={compName} />
				}
      </section>
        
    )
}

export default Account;