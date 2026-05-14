import { useState } from "react"
import api from "../lib/api"
import { useNavigate } from "react-router-dom"



interface AuthPageProps{
    isSignin:boolean
}

export default function Authpage( {isSignin}:AuthPageProps ){
    const navigate = useNavigate()

    const [name,setName] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [confirmPassword , setConfirmPassword] = useState("")
    const[error,setError] = useState("")
    const [loading,setLoading] = useState(false)

    const handleSubmit = async (e:React.FormEvent)=>{
        e.preventDefault()
        setError("")
        setLoading(true)


        try {
            const endpoint = isSignin ?"/auth/signin":"/auth/signup"

            const body = isSignin?{email,password}:{email,password,name,confirmPassword}

            const {data} = await api.post(endpoint,body)

            if(isSignin){
                localStorage.setItem("token",data.token)
                navigate('/home')
                
            }else{
                navigate('/signIn')
            }
            
            
            
        } catch (error:any) {
            setError(error.response?.data?.message || "Something went wrong")
            
        }finally {
            setLoading(false)
        }

    }

    
    return (
        
        <div className="bg-neutral-950 min-h-screen flex flex-col items-center justify-center gap-6 relative">
 

        <div className="text-center">
          <h1 className="text-3xl font-bold text-white">
            Welcome Back
          </h1>
      
          <p className="text-zinc-400 mt-2 text-m font-bold">
            {isSignin
              ? "Login to continue your journey and access your account."
              : "Create account to start Your journey"}
          </p>
        </div>
      
        <form
          onSubmit={handleSubmit}
          className="bg-zinc-900 p-8 rounded-2xl flex flex-col gap-4 w-[350px]"
        >
      
          {!isSignin && (
            <input
              value={name}
              type="text"
              className="text-white border rounded-2xl p-2 bg-transparent"
              placeholder="Enter name"
              onChange={(e)=>setName(e.target.value)}
            />
          )}
      
          <input
          value={email}
            className="text-white border rounded-2xl p-2 bg-transparent"
            type="email"
            placeholder="Enter Email"
            onChange={(e)=>setEmail(e.target.value)}
          />
      
          <input
          value={password}
            className="text-white border rounded-2xl p-2 bg-transparent"
            type="password"
            placeholder="Enter Password"
            onChange={(e)=>setPassword(e.target.value)}
          />
      
          {!isSignin && (
            <input
            value={confirmPassword}
              type="password"
              placeholder="Confirm Password"
              className="text-white border rounded-2xl p-2 bg-transparent"
              onChange={(e)=>setConfirmPassword(e.target.value)}
            />
          )}
      
          <button
            type="submit"
            className="bg-blue-500 rounded-3xl p-2 text-2xl font-bold hover:bg-blue-300 transition"
          >
            {loading ? "Please wait..." : isSignin ? "Login" : "Create Account"}
          </button>

          {error && (
            <p className="text-sm font-semibold text-red-400">
              {error}
            </p>
          )}
      
        </form>
      </div>
    
        
       
    )

   
}
