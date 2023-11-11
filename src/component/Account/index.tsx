import './style.css';
import Info from './Info';
import { FaLocationDot } from 'react-icons/fa6';
import { BiSolidUser } from 'react-icons/bi';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { setActive } from '../../../redux/slices/computer';
import { historyParams } from '../PartDetails';
import { componentTypeVariants } from '../ComponentAccount';

type AccountParams = {
	id: string;
	components: Array<{type: componentTypeVariants; name: string, id: [string]}>;
	responsible: string;
	location: string;
	history: historyParams;
	compName: string;
}

const Account: React.FC<AccountParams> = ({ id, components, responsible, location, history, compName}) => {
  const { active } = useAppSelector(state => state.computer);

	const dispatch = useAppDispatch();
	const expandHandler = () => {
		dispatch(setActive(id));
	}
	
		return (
        <section id={id} className="account">
					<div style={{display:'flex', justifyContent: 'space-between', alignItems: 'center'}}>
						<div className='computer'>
							<div style={{display: 'flex', gap: 20}}>
								<div className='field'>
									{responsible || 'Немає'}
									<BiSolidUser className='icon' />
								</div>
								<div className='field'>
									{location || 'Немає'}
									<FaLocationDot className='icon' />
								</div>
							</div>
							<div className='computer_name'>{compName}</div>
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