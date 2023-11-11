import { useAppSelector } from '../../../redux/hooks';
import { RootState } from '../../../redux/store';
import { parser } from '../../componentParser';
import './styles.css';
import { BiLinkExternal } from 'react-icons/bi';

type ComponentParams = {
  name: string,
  type: string
}

const Component: React.FC<ComponentParams> = ({name, type}) => {

  const {  editMode } = useAppSelector((state: RootState) => state.computer);

  return (
    <div className='info_line'>
      <h3>{parser[type]}</h3>
      <button className="btn">
        {name}
        <div className={`modal_btn ${editMode ? 'animate' : 'none'}`}>
          <BiLinkExternal />
        </div>
      </button>
    </div>
  )
}

export default Component;