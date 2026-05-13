import { useState } from "react";
import Dashboard from "../../component/Dashboatd";
import api from "../../lib/api";
import { useNavigate } from "react-router-dom";

export default function Home(){
    const [query,setQuery] = useState("")
    
    const [loading,setLoading] = useState(false)
    const navigate = useNavigate()

    async function  handleQuery(){
        try {
            setLoading(true)
            const endpoint = "/query/ask"
            
            const {data} = await api.post(endpoint,{query})
            
            localStorage.setItem(
                "responseData",
                JSON.stringify({
                    response:data,
                    query
                })
            )
            navigate('/response')
            
        } catch (error) {
            console.log(error)
            
        }finally{
            setLoading(false)
        }
    }
    
    return (
        <div className="flex min-h-screen">
            <aside>
                <Dashboard></Dashboard>
            </aside>
            <main className="flex items-center justify-center bg-neutral-950 rounded-lg p-1 w-full gap-3 ">
                <input
                className="flex-1 item-center justify-center bg-zinc-900 rounded-lg text-white placeholder-white/70 px-4 py-2 outline-none max-w-md "
                type="text"
                value={query}
                placeholder="Enter Your Query Here"
                onChange={(e)=>setQuery(e.target.value)}
                />
                <button className=" bg-zinc-900 text-blue-500 px-2 py-2 rounded-md font-bold hover:bg-gray-200 transition" onClick={handleQuery}>
                    {loading?"Loading...":"Send"}
                </button>


            </main>
        </div>

        
    )
}