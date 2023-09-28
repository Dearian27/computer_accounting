import { useState } from 'react'
import './style.css'

function Account() {
    const [expand, setExpand] = useState(false);
    return (
        <div className="account">
            <div style={{display:'flex'}}>
                <div className='picture'>Картинка</div>
                <div className='computer_name'>Computer</div>
                <button onClick={() => setExpand(!expand)}>Button</button>
            </div>
          
            {expand &&
      <div className='info'>
        expanded
      </div>
      }
    
        </div>
        
    )
}

export default Account;