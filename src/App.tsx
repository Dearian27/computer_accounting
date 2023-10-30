import Header from './component/Header';
import AccountContainer from './component/AccountContainer';
import './App.css'
import { Provider } from 'react-redux';
import { store } from '../redux/store';

function App() {
  return (
    <Provider store={store}>
      <main style={{backgroundColor: '#404258'}}>
        <Header />
        <AccountContainer />
      </main>
    </Provider>
  )
}

export default App;
