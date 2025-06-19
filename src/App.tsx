import './app.css';
import AppRouter from './router/Router';
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

function App() {
  return (
    <>
      <AppRouter />
      <ToastContainer />
    </>
  )
}

export default App;
