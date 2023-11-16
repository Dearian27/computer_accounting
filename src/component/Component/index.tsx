import { GoPlusCircle } from 'react-icons/go';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { RootState } from '../../../redux/store';
import { parser } from '../../componentParser';
import { componentTypeVariants } from '../ComponentAccount';
import './styles.css';
import { BiLinkExternal } from 'react-icons/bi';
import { setAllComponents, setComputers, setModal } from '../../../redux/slices/computer';
import { MdDeleteSweep } from 'react-icons/md';
import axios from '../../utils/axios';
import toast from 'react-hot-toast';

type ComponentParams = {
  name: string,
  type: componentTypeVariants,
  id: string,
  computerId: string,
  withPlus?: boolean,
}

const Component: React.FC<ComponentParams> = ({name, type, id, computerId, withPlus=false}) => {
  const { user } = useAppSelector((state: RootState) => state.user);
  const { editMode } = useAppSelector((state: RootState) => state.computer);
  const dispatch = useAppDispatch();
  console.log(user.status)

  const openModal = (currentComponentId='') => {
    dispatch(setModal({currentComponentId, isActive: true, type, computerId}));
  }
  const getComputers = async() => {
		try {
			const res = await axios.get('/computers/');
			dispatch(setComputers(res.data.computers));
			
			const res2 = await axios.get('/components/');
			dispatch(setAllComponents(res2.data.components));
		} catch(err) {
			console.error(err);
		}
	}
  const deleteHandler = async () => {
    axios.delete(`/components/delete/${id}`)
    .then(() => {      
        getComputers();
        toast.success('Компонент видалено успішно!');
    })
    .catch((error) => {
      toast.error(error.response.data.message);
      console.error(error);
    })
	}

  return (
    <div className='info_line'>
      <h3>{parser[type]}</h3>
      <button className="btn">
        {name}
        { (user?.status === 'admin' || user?.status === 'teacher') && 
          <div className={`modal_btn ${'animate'}`}>
            {name &&
              <button className={`item ${editMode ? 'animate' : 'none'}`} onClick={() => deleteHandler()}>
                <MdDeleteSweep className="btnIcon" color={user ? "aliceblue" : "grey"}/>
              </button>
            }
            {withPlus &&
            <div className={`item ${editMode ? 'animate' : 'none'}`}>
              <GoPlusCircle onClick={() => openModal()} />
            </div>
            }
            <div className={`item ${editMode ? 'animate' : 'none'}`}>
              <BiLinkExternal onClick={() => openModal(`${(type === 'ram' || type === 'disk') && id ? id : ''}`)} />
            </div>
          </div>
        }
      </button>
    </div>
  )
}

export default Component;