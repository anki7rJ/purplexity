import { useNavigate } from "react-router-dom"
import api from "../lib/api"
import { useState } from "react"



export default function Dashboard(){
    const navigate = useNavigate()
    const [error,setError] = useState("")

    async  function handleLogout(){
        setError("")
        try {
            const endpoint = "/auth/logout"
             await api.post(endpoint)
            navigate('/signIn')
            
        } catch (error:any) {
            setError(error.response?.data?.message || "Something went wrong")

        }


    }
    async function handleHistory(){
        navigate('/historyPage')
    }
    return (
        <div className="h-screen bg-zinc-900 w-70 sticky top-0 flex flex-col justify-between ">
           
          
          <div className="text-white flex flex-col gap-2 p-4 mt-4">
              
              <button className="hover:cursor-pointer hover:text-gray-400" onClick={handleHistory}>History</button>
              
          </div>

           <div className="p-4">
            <button className="text-white hover:text-gray-400" onClick={handleLogout}>Logout</button>
           </div>
          {error && (
            <p className="text-sm font-semibold text-red-400">
              {error}
            </p>
          )}
            
        </div>
        
    


    )
}