import { useState } from "react";
import api from "../../lib/api";

type ApiResponse = {
  answer: string;
  followUps: string[];
};

export default function Response() {

  const storedData = localStorage.getItem("responseData");

  const initialData = storedData
    ? JSON.parse(storedData)
    : null;

  const [query, setQuery] = useState(
    initialData?.query || ""
  );

  const [response, setResponse] = useState<ApiResponse | null>(
    initialData?.response || null
  );

  const [loading, setLoading] = useState(false);

  async function handleQuery() {
    if (!query.trim()) return;

    try {
      setLoading(true);

      const { data } = await api.post("/query/ask", {
        query,
      });

      setResponse(data);

      localStorage.setItem(
        "responseData",
        JSON.stringify({
          response: data,
          query,
        })
      );

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-white flex flex-col">

     
      <div className="sticky top-0 z-10 bg-neutral-950 border-b border-white/10 p-4">
        <div className="max-w-4xl mx-auto flex gap-3">

          <input
            type="text"
            value={query}
            placeholder="Ask anything..."
            onChange={(e) => setQuery(e.target.value)}
            className="
              flex-1
              bg-zinc-900
              rounded-xl
              px-4
              py-3
              outline-none
              text-white
              placeholder-white/50
            "
          />

          <button
            onClick={handleQuery}
            className="
              bg-blue-500
              hover:bg-blue-400
              transition
              px-6
              rounded-xl
              font-bold
              text-black
            "
          >
            {loading ? "Loading..." : "Ask"}
          </button>

        </div>
      </div>

      
      <div className="flex-1 p-6">
        <div className="max-w-4xl mx-auto space-y-6">

          {response && (
            <>
              
              <div className="bg-zinc-900 p-4 rounded-xl">
                <p className="text-white/90">
                  {query}
                </p>
              </div>

             
              <div className="bg-zinc-800 p-6 rounded-xl border border-white/10">

                <p className="leading-8 text-white/90">
                  {response.answer}
                </p>

               
                <div className="mt-6">

                  <h3 className="font-semibold text-blue-400 mb-3">
                    Follow Ups
                  </h3>

                  <ul className="space-y-3">
                    {response.followUps.map((item, index) => (
                      <li
                        key={index}
                        className="
                          text-sm
                          text-white/80
                          bg-zinc-900
                          p-3
                          rounded-lg
                          hover:bg-zinc-700
                          transition
                          cursor-pointer
                        "
                        onClick={() => setQuery(item)}
                      >
                        {item}
                      </li>
                    ))}
                  </ul>

                </div>
              </div>
            </>
          )}

        </div>
      </div>
    </div>
  );
}