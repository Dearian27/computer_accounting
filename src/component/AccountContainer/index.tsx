import Account from "../Account";
import './style.css';
function AccountContainer(){
    return( 
        <div className="AccountContainer">
            <Account />
            <Account />
            <Account />
        </div>
    )
}

export default AccountContainer;