import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { setAdminModal, userAccountParams } from "../../../redux/slices/user";
import { RootState } from "../../../redux/store";
import './styles.css';
import User from "../User";
import { useEffect, useState } from "react";
import axios from "../../utils/axios";
import toast from "react-hot-toast";

const AdminModal = () => {
  const dispatch = useAppDispatch();
  const { user, adminModal } = useAppSelector((state: RootState) => state.user);
  const [users, setUsers] = useState<userAccountParams[]>([]);
  const [animateStatus, setAnimateStatus] = useState<string>('');
  
  const closeModal = () => {
    dispatch(setAdminModal(false));
  }

  const getUsers = (id:string = '-1') => {
    setAnimateStatus(id);
    axios.get('/auth/')
    .then((res) => {      
      if(res.data.users) {
        setUsers(res.data.users);
      }
    })
    .catch((error) => {
      toast.error(error.response.data.message);
    })
  }

  useEffect(() => {
    if(adminModal) {
      getUsers();
    }
  }, [adminModal])

  return (
    <div style={{display: adminModal && user?.status === 'admin' ? 'flex' : 'none'}} className='adminModalWrapper' onClick={closeModal}>
      <section className="adminModal" onClick={(e) => e.stopPropagation()}>
        { users.map(user => {
            return <User key={user._id} id={user._id} status={user.status} name={user.name} surname={user.surname} change={getUsers} animate={animateStatus} />
          })          
        }
      </section>
    </div>
  )
}
export default AdminModal;