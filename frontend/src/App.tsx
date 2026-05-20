import { BrowserRouter , Routes ,Route } from "react-router-dom"
import Signin from "./pages/Auth/Signin"
import Signup from "./pages/Auth/Signup"
import Main from "./pages/Main/Main"

import Home from "./pages/Main/Home"
import  Response  from "./pages/Main/Response"
import HistoryPage from "./component/HIstoryPage"



function App() {

  return (
   <BrowserRouter>
   <Routes>
    <Route path="/" element={<Main/>}/>
    <Route path="/signIn" element={<Signin/>}/>
    <Route path="/signUp" element={<Signup/>} />
    <Route path="/home" element={<Home/>}></Route>
    <Route path="/response" element={<Response/>}></Route>
    <Route path="/historyPage" element={< HistoryPage/>}></Route>
  
   </Routes>
   </BrowserRouter>
  )
}

export default App
