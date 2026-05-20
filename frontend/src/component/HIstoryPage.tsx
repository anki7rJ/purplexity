import { useEffect, useState } from "react"
import api from "../lib/api"

interface HistoryItem{
    query:string
    answer:string
    followUp:string
}
export default  function HistoryPage() {
    const [historyData, setHistoryData] = useState<HistoryItem[]>([])
    async function fetchHistory() {
        try {
            const endpoint = "/history/userHistory"
            const response = await api.get(endpoint)
            setHistoryData(response.data.history.queries)
            
        } catch (error) {
            
        }
    }
    useEffect(()=>{
        fetchHistory()
    },[])

    

 return (
  <div className="min-h-screen bg-zinc-900 text-white px-6 py-8">
    
    
    <div className="mb-10">
      <h1 className="text-5xl font-bold tracking-tight">
        History
      </h1>
      <p className="text-zinc-400 text-lg mt-2">
        Your previous conversations and follow ups 📚
      </p>
    </div>

    
    <div className="flex flex-col gap-8">
      {historyData.map((item, index) => (
        <div
          key={index}
          className="bg-zinc-800/70 border border-zinc-700 rounded-3xl p-8 shadow-xl hover:border-zinc-500 transition-all duration-300"
        >
          
          
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-zinc-200">
              Conversation #{index + 1}
            </h2>

            <span className="bg-zinc-700 px-4 py-1 rounded-full text-sm text-zinc-300">
              Saved
            </span>
          </div>

         
          <div className="mb-6">
            <p className="inline-block bg-blue-500 text-white px-4 py-2 rounded-xl text-lg font-semibold mb-3">
              Query
            </p>

            <div className="bg-zinc-900 border border-zinc-700 rounded-2xl p-5 text-zinc-300 leading-8">
              {item.query}
            </div>
          </div>

          
          <div className="mb-6">
            <p className="inline-block bg-green-500 text-white px-4 py-2 rounded-xl text-lg font-semibold mb-3">
              Answer
            </p>

            <div className="bg-zinc-900 border border-zinc-700 rounded-2xl p-5 text-zinc-300 leading-8">
              {item.answer}
            </div>
          </div>

          
          <div>
            <p className="inline-block bg-purple-500 text-white px-4 py-2 rounded-xl text-lg font-semibold mb-3">
              Follow Ups
            </p>

            <div className="bg-zinc-900 border border-zinc-700 rounded-2xl p-5 text-zinc-300 leading-8">
              {item.followUp || "No follow ups yet"}
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
)
}