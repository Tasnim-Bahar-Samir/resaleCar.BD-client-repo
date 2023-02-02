
import './App.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './Routes/Routes';
import {Toaster} from 'react-hot-toast'

function App() {
  return (
    <div data-theme ='light' className="App">
      <Toaster/>
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
