import { MdDeleteSweep } from 'react-icons/md';
import './style.css';
import { FaRegArrowAltCircleDown } from "react-icons/fa";
import { FaRegArrowAltCircleUp } from "react-icons/fa";
import axios from '../../utils/axios';
import toast from 'react-hot-toast';

type userProps = {
  name: string,
  id: string,
  status: string,
  change: () => void,
}


const User: React.FC<userProps> = ({name, status, id, change}) => {

  const deleteUser = async() => {
    // axios.delete();
  }
  const promoteUser = async() => {
    axios.put(`/auth/promote/${id}`)
    .then((res) => {      
      toast.success(res.data.message);
      getUsers();
    })
    .catch((error) => {
      toast.error(error.response.data.message);
      console.error(error);
    })
  }
  const lowUser = async() => {
    axios.put(`/auth/low/${id}`)
    .then((res) => {      
      toast.success(res.data.message);
      getUsers();
    })
    .catch((error) => {
      toast.error(error.response.data.message);
      console.error(error);
    })
  }

  return (
    <button className="user">
      <div className='values'>
        <span className='status'>
          {status === 'teacher' ? 'Вчитель' : status === 'admin' ? 'Адмін' : 'Переглядач'}
        </span>
        <span className='name'>
          {name}
        </span>
      </div>

      <div className='buttons'>
        { status === 'teacher' ?
        <div className="item">
          <FaRegArrowAltCircleDown className="icon" onClick={() => lowUser()} />
        </div>
        : status === 'viewer' &&
        <div className="item">
          <FaRegArrowAltCircleUp className="icon" onClick={() => promoteUser()} />
        </div>
        }
        <div className="item">
          <MdDeleteSweep className="icon" onClick={() => deleteUser()} />
        </div>
      </div>
    </button>
  )
}
export default User;