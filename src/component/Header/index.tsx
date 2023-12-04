import './style.css'
import { MdSearch } from "react-icons/md";
import { MdAddCircle } from "react-icons/md";
import { IoHardwareChip } from "react-icons/io5"; 
import { HiMiniComputerDesktop } from "react-icons/hi2";
import { useLocation, useNavigate } from 'react-router-dom';
import { ChangeEvent, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { setSearchText } from '../../../redux/slices/computer';
import { setAModal, setAdminModal, setPModal, setUser } from '../../../redux/slices/user';
import { RootState } from '../../../redux/store';

function Header() {
	const { user } = useAppSelector((state: RootState) => state.user);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const location = useLocation();
	const [search, setSearch] = useState<string>("");

	const debouncedHandleSearch = () => {
		dispatch(setSearchText(search));
		if(location.pathname.startsWith('/components/')) {
			navigate('/components/');
		} else {
			navigate('/');
		}
	}
	const signOutHandler = () => {
		dispatch(setUser(null));
		localStorage.removeItem('token');
    localStorage.removeItem('user');
	}

	useEffect(() => {
			const timeoutId = setTimeout(() => {
				debouncedHandleSearch();
			}, 1200);
    return () => clearTimeout(timeoutId);
  }, [search]);

	return (
		<div className="header">
			<div style={{display: 'flex', gap: '15px', alignItems: 'center'}}>
				<div className='change_buttons'>
					<button onClick={() => {setSearch('');navigate('/')}} className={`tabBtn ${!location.pathname.startsWith('/components/') ? 'active' : ''}`}>
						{ !location.pathname.startsWith('/components/') ?
							<>
								<HiMiniComputerDesktop className="btnIcon" color="#6d759b" />
							</>
							:
							<>
								<HiMiniComputerDesktop className="btnIcon" />
							</>
						}
					</button>
					<button onClick={() => {setSearch('');navigate('/components/')}} className={`tabBtn ${location.pathname.startsWith('/components/') ? 'active' : ''}`}>
						{ location.pathname.startsWith('/components/') ?
							<>
								<IoHardwareChip  className="btnIcon" color="#6d759b"  />
							</>
							:
							<>
								<IoHardwareChip className="btnIcon"  />
							</>
						}
					</button>
				</div>
				{(user?.status === 'teacher' || user?.status === 'admin') &&
					<button className='add_button' onClick={() => dispatch(setPModal(true))}>
						<MdAddCircle className="btnIcon huge" />
					</button>
				}
				{user?.status === 'admin' &&
					<button onClick={() => dispatch(setAdminModal(true))} className='btnLogin' style={{fontWeight: '900'}}>
						ADMIN
					</button>
				}
			</div>

			<div className='search_line'>
				<input placeholder='Пошук' type="text" value={search} onChange={(event: ChangeEvent<HTMLInputElement>) => setSearch(event?.target.value)} />
				<MdSearch className="btnIcon" />
			</div>
			<div style={{display: 'flex', gap: '15px', alignItems: 'center'}}>
			{user ?
			<>
				<span className='name'>
					{user.name} {user.surname}
				</span>
				<button className='btnLogin' onClick={signOutHandler}>
					Вийти
				</button>
			</>
			:
			<button onClick={() => dispatch(setAModal(true))} className='btnLogin'>
				Увійти
			</button>
			}
			</div>
		</div>
	)
}

export default Header;
