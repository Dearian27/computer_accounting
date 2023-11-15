import { MdSearch } from 'react-icons/md';
import './style.css';
import { ChangeEvent, useEffect, useState } from 'react';
import ComponentAccount from '../ComponentAccount';
import { componentParams, setModal } from '../../../redux/slices/computer';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { RootState } from '../../../redux/store';
import { searchMatchesByComponent } from '../../utils/search';

const Modal: React.FC = () => {
  const [search, setSearch] = useState<string>("");
  const { allComponents, modal } = useAppSelector((state: RootState) => state.computer);
  const [filteredComponents, setFilteredComponents] = useState<componentParams[]>(allComponents);
  const dispatch = useAppDispatch();

	const debouncedHandleSearch = () => {
    if(search) {
      const fComponents = allComponents.filter((component: componentParams) => searchMatchesByComponent(component, search));
      setFilteredComponents(fComponents);
    } else {
      setFilteredComponents(allComponents);
    }
  }

  const closeModal = () => {
    dispatch(setModal({isActive: false, currentComponentId: false, type: '', computerId: ''}));
  }

	useEffect(() => {
			const timeoutId = setTimeout(() => {
				debouncedHandleSearch();
			}, 900);
    return () => clearTimeout(timeoutId);
  }, [search, allComponents]);

  return (
    <div style={{display: modal.isActive ? 'flex' : 'none'}} className='modalWrapper' onClick={closeModal}>
      <section className="modal" onClick={(e) => e.stopPropagation()}>
        <div className='search_wrapper'>
          <input className='search_bar' placeholder='Пошук' type="text" value={search} onChange={(event: ChangeEvent<HTMLInputElement>) => setSearch(event?.target.value)} />
          <MdSearch className="btnIcon" />
        </div>
        <div className='container'>
          { filteredComponents?.filter((component: componentParams) => component.type === modal.type && component.anchor !== modal.computerId).length > 0 ?
              filteredComponents?.filter((component: componentParams) => component.type === modal.type && component.anchor !== modal.computerId).map((component: componentParams) => {
                return <ComponentAccount key={component._id} id={component._id} choosing={true} />
              })
            : <span className='not_found'>Нічого не знайдено</span>
          }
        </div>
      </section>    
    </div>
  )
}

export default Modal;