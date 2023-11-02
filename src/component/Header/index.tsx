import './style.css'

import { MdSearch } from "react-icons/md";
import { MdAddCircle } from "react-icons/md";
import { IoHardwareChip } from "react-icons/io5"; 
import { HiMiniComputerDesktop } from "react-icons/hi2";


function Header() {
      
    return (
        <div className="header">
        <div className='change_buttons'>
            <button>
                <IoHardwareChip className="btnIcon" />
            </button>
            <button>
                <HiMiniComputerDesktop className="btnIcon" />
            </button>
        
        </div>
        <div className='search_line'>
        <input type="text" />
        <MdSearch className="btnIcon" />
        </div>
        <button className='add_button'><MdAddCircle className="btnIcon" /></button>
        
        </div>
    )
}

export default Header;
