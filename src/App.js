
import AppBar from './scenes/global/AppBar';
import Banner from './scenes/global/Banner';
import Footer from './scenes/global/Footer';
import Navbar from './scenes/global/Navbar';
import CopyRight from './scenes/global/CopyRight';
import { Outlet } from 'react-router-dom';

import { Provider } from 'react-redux';
import Store from './state/Store';
import UploadImage from './component/UploadImage';





function App() {
  return (
    <div className="App">
      <Provider store={Store}>

        <AppBar />
        <div className='container'>
          <Banner />
          <Navbar />
          {/* vị trí của con */}
          <Outlet />
          {/* vị trí của con */}
          <Footer />
          <UploadImage />
        </div>
        <CopyRight />

      </Provider>
    </div >
  );
}

export default App;
