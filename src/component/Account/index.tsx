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
						<ul className='info_list'>
							<li>
									<h3>Корпус</h3>
									<p>Крутий</p>
							</li>
							<li>
									<h3>Корпус</h3>
									<p>Крутий</p>
							</li>
							<li>
									<h3>Корпус</h3>
									<p>Крутий</p>
							</li>
							<li>
									<h3>Корпус</h3>
									<p>Крутий</p>
							</li>
							<li>
									<h3>Проц</h3>
									<p>Також крутий</p>
							</li>
							<li>
									<h3>Монітор</h3>
									<p>Також крутий</p>
							</li>
					</ul>
					<ul className='info_list'>
					<li>
									<h3>Корпус</h3>
									<p>Крутий</p>
							</li>
							<li>
									<h3>Корпус</h3>
									<p>Крутий</p>
							</li>
							<li>
									<h3>Корпус</h3>
									<p>Крутий</p>
							</li>
							<li>
									<h3>Корпус</h3>
									<p>Крутий</p>
							</li>
							<li>
									<h3>Проц</h3>
									<p>Також крутий</p>
							</li>
							<li>
									<h3>Монітор</h3>
									<p>Також крутий</p>
							</li>
						</ul>
					</div>
				}
      </div>
        
    )
}

export default Account;