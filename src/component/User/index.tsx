import { MdDeleteSweep } from 'react-icons/md';
import './style.css';
import { FaRegArrowAltCircleDown } from "react-icons/fa";
import { FaRegArrowAltCircleUp } from "react-icons/fa";
import axios from '../../utils/axios';
import toast from 'react-hot-toast';

type userProps = {
  name: string,
  surname: string,
  id: string,
  status: string,
  change: (id: string) => void,
  animate: string,
}


const User: React.FC<userProps> = ({name, surname, status, id, change, animate}) => {
  
  const deleteUser = () => {
    axios.delete(`/auth/delete/${id}`)
    .then((res) => {      
      toast.success(res.data.message);
      change(id);
    })
    .catch((error) => {
      toast.error(error.response.data.message);
    })
  }

  const promoteUser = () => {
    axios.post(`/auth/promote/${id}`)
    .then((res) => {      
      toast.success(res.data.message);
      change(id);
    })
    .catch((error) => {
      console.log(error.response)
      toast.error(error.response.data.message);
      console.error(error);
    })
  }
  const lowUser = async() => {
    axios.post(`/auth/low/${id}`)
    .then((res) => {      
      toast.success(res.data.message);
      change(id);
    })
    .catch((error) => {
      toast.error(error.response.data.message);
      console.error(error);
    })
  }

  return (
    <button className="user">
      <div className='values'>
        <span className={`status ${status === 'teacher' && animate === id ? 'teacher' : status === 'viewer' && animate === id ? 'viewer' : ''}`}>
          {status === 'teacher' ? 'Вчитель' : status === 'admin' ? 'Адмін' : 'Переглядач'}
        </span>
        <span className='name'>
          {name} {surname}
        </span>
      </div>

      <div className='buttons'>
      { status !== 'admin' &&
      <>
        { status === 'teacher' ?
          <div className="item">
            <FaRegArrowAltCircleDown className="icon" onClick={() => lowUser()} />
          </div>
          :
          <div className="item">
            <FaRegArrowAltCircleUp className="icon" onClick={() => promoteUser()} />
          </div>
        }
        <div className="item">
          <MdDeleteSweep className="icon" onClick={() => deleteUser()} />
        </div>
      </>
      }
      </div>
    </button>
  )
}
export default User;