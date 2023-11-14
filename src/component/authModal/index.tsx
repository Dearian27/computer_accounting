import './style.css';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { RootState } from '../../../redux/store';
import { HiMiniComputerDesktop } from 'react-icons/hi2';
import { IoHardwareChip } from 'react-icons/io5';
import { setPModal } from '../../../redux/slices/user';

const AuthModal: React.FC = () => {

  // const [computerTab, setComputerTab] = useState<boolean>(true);
  const { pModal } = useAppSelector((state: RootState) => state.user);
  const dispatch = useAppDispatch();

  const closeModal = () => {
    dispatch(setPModal(false));
  }
  // console.log(pModal);
  return (
    <div style={{display: false ? 'flex' : 'none'}} className='pmodalWrapper' onClick={closeModal}>
      <section className="modal" onClick={(e) => e.stopPropagation()}>
        
      </section>    
    </div>
  )
}

export default AuthModal;