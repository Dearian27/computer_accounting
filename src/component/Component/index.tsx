import { GoPlusCircle } from 'react-icons/go';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { RootState } from '../../../redux/store';
import { parser } from '../../componentParser';
import { componentTypeVariants } from '../ComponentAccount';
import './styles.css';
import { BiLinkExternal } from 'react-icons/bi';
import { setModal } from '../../../redux/slices/computer';

type ComponentParams = {
  name: string,
  type: componentTypeVariants,
  id: string,
  computerId: string,
  withPlus?: boolean,
}

const Component: React.FC<ComponentParams> = ({name, type, id, computerId, withPlus=false}) => {
  const { editMode } = useAppSelector((state: RootState) => state.computer);
  const dispatch = useAppDispatch();

  const openModal = (currentComponentId='') => {
    dispatch(setModal({currentComponentId, isActive: true, type, computerId}));
  }

  return (
    <div className='info_line'>
      <h3>{parser[type]}</h3>
      <button className="btn">
        {name}
        {withPlus &&
        <div className={`modal_btn ${editMode ? 'animate second' : 'none'}`}>
          <GoPlusCircle onClick={() => openModal()} />
        </div>
        }
        <div className={`modal_btn ${editMode ? 'animate' : 'none'}`}>
          <BiLinkExternal onClick={() => openModal(`${(type === 'ram' || type === 'disk') && id ? id : ''}`)} />
        </div>
      </button>
    </div>
  )
}

export default Component;