import Header from './component/Header';
import AccountContainer from './component/AccountContainer';
import './App.css'
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import { IconContext } from "react-icons";
import Modal from './component/Modal';
import PlusModal from './component/plusModal';

function App() {
  return (
    <Provider store={store}>
      <IconContext.Provider value={{ color: "white", className: "btnIcon"}}>
        <main style={{backgroundColor: '#404258'}}>
          <Header />
          <AccountContainer />
        </main>
        <Modal />
        <PlusModal />
      </IconContext.Provider>
    </Provider>
  )
}

export default App;
