import { Link } from "react-router-dom"

export default function Main() {
  return (
    <div
      className="
      min-h-screen
      flex
      items-center
      justify-center
      bg-neutral-950
      text-white
      relative
      overflow-hidden
    "
    >
      
      {/* Background Glow */}
      <div className="absolute w-[500px] h-[500px] bg-blue-500/20 blur-3xl rounded-full top-[-100px] left-[-100px]" />

      <div className="absolute w-[400px] h-[400px] bg-purple-500/20 blur-3xl rounded-full bottom-[-100px] right-[-100px]" />

      {/* Background Image */}
      

      {/* Main Content */}
      <div
        className="
        relative
        z-10
        w-[90%]
        max-w-4xl
        text-center
        flex
        flex-col
        items-center
        gap-10
      "
      >

        {/* Heading */}
        <div className="space-y-5">
          <h1 className="text-6xl font-extrabold tracking-tight">
            Welcome to
            <span className="text-blue-500"> Purplexity</span>
          </h1>

          <p className="text-zinc-300 text-xl max-w-2xl leading-relaxed">
            Dive through the ocean of the internet 🌊 and uncover
            intelligent answers powered by modern AI and real-time data.
          </p>
        </div>

        {/* Card */}
        <div
          className="
          bg-white/5
          backdrop-blur-lg
          border
          border-white/10
          rounded-3xl
          p-10
          w-full
          max-w-2xl
          shadow-2xl
        "
        >

          <div className="flex items-center justify-between mb-8">
            <p className="text-xl font-semibold">
              Don't have an account?
            </p>

            <Link to="/signUp">
              <button
                className="
                hover:shadow-blue-500/50 hover:shadow-lg
                bg-blue-500
                hover:bg-blue-400
                transition
                px-6
                py-3
                rounded-xl
                text-black
                font-bold
                hover:scale-105
                duration-300
              "
              >
                Sign Up
              </button>
            </Link>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-xl font-semibold">
              Already have an account?
            </p>

            <Link to="/signIn">
              <button
                className="
                hover:shadow-blue-500/50 hover:shadow-lg
                bg-purple-500
                hover:bg-purple-400
                transition
                px-6
                py-3
                rounded-xl
                text-black
                font-bold
                hover:scale-105
                duration-300
              "
              >
                Sign In
              </button>
            </Link>
          </div>

        </div>
      </div>
    </div>
  )
}