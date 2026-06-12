import { Link } from "react-router-dom"

export default function Main() {
  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center">
      <section className="max-w-4xl text-center">
         <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
         Welcome to
            <span className="text-blue-500"> Purplexity</span>
        </h1>

        <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
          Dive through the ocean of the internet 🌊 and uncover
          intelligent answers powered by modern AI and real-time data.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/signup"
            
            className="px-6 py-3 rounded-xl bg-white text-black font-semibold hover:scale-105 transition"
          >
            New User? Sign Up
          </Link>

          <Link to = "/signin"
            className="px-6 py-3 rounded-xl border border-gray-700 hover:bg-white hover:text-black transition"
          >
            Already a User? Sign In
          </Link>
        </div>

      </section>

    </main> 
  )
  
}

 