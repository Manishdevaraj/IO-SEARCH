import { Route, Routes } from "react-router-dom"
import SearchPage from "./Pages/SearchPage"
import AdminPage from "./Pages/AdminPage"
import LiveLogs from "./Pages/LiveLogs"

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<SearchPage/>}/>
        <Route path="/admin" element={<AdminPage/>}/>
        <Route path="/logs" element={<LiveLogs/>}/>


      </Routes>
    </>
  )
}

export default App