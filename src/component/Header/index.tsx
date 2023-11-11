import './style.css'
import { MdSearch } from "react-icons/md";
import { MdAddCircle } from "react-icons/md";
import { IoHardwareChip } from "react-icons/io5"; 
import { HiMiniComputerDesktop } from "react-icons/hi2";
import { useLocation, useNavigate } from 'react-router-dom';
import { ChangeEvent, useEffect, useState } from 'react';
import { useAppDispatch } from '../../../redux/hooks';
import { setSearchText } from '../../../redux/slices/computer';

function Header() {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const location = useLocation();
	const [search, setSearch] = useState<string>("");

	const debouncedHandleSearch = () => {
		console.log(search);
		dispatch(setSearchText(search));
		if(location.pathname.startsWith('/components/')) {
			navigate('/components/');
		} else {
			navigate('/');
		}
	}

	useEffect(() => {
			const timeoutId = setTimeout(() => {
				debouncedHandleSearch();
			}, 1200);
    return () => clearTimeout(timeoutId);
  }, [search]);

	return (
		<div className="header">
			<div className='change_buttons'>
				<button className={`tabBtn ${!location.pathname.startsWith('/components/') ? 'active' : ''}`}>
					{ !location.pathname.startsWith('/components/') ?
						<>
							<HiMiniComputerDesktop className="btnIcon" color="#6d759b" />
						</>
						:
						<>
							<HiMiniComputerDesktop onClick={() => navigate('/')} className="btnIcon" />
						</>
					}
				</button>
				<button className={`tabBtn ${location.pathname.startsWith('/components/') ? 'active' : ''}`}>
					{ location.pathname.startsWith('/components/') ?
						<>
							<IoHardwareChip  className="btnIcon" color="#6d759b"  />
						</>
						:
						<>
							<IoHardwareChip onClick={() => navigate('/components/')}  className="btnIcon"  />
						</>
					}
				</button>
			</div>
			<div className='search_line'>
				<input type="text" value={search} onChange={(event: ChangeEvent<HTMLInputElement>) => setSearch(event?.target.value)} />
				<MdSearch className="btnIcon" />
			</div>
			<button className='add_button'>
				<MdAddCircle className="btnIcon" />
			</button>	
		</div>
	)
}

export default Header;
