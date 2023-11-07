import { useAppSelector } from '../../../redux/hooks';
import { RootState } from '../../../redux/store';
import './styles.css';
import { BiLinkExternal } from 'react-icons/bi';

export default function Component({name, type}) {

  const {  editMode } = useAppSelector((state: RootState) => state.computer);

  return (
    <div className='info_line'>
      <h3>{type}</h3>
      <button>
        {name}
        <div className={`modal_btn ${editMode ? 'animate' : 'none'}`}>
          <BiLinkExternal />
        </div>
      </button>

    </div>
  )
}
