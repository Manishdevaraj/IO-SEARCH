import { useState } from "react";
import SearchBar from "@/components/SearchBar";
import { getai, Search } from "@/api";
import { Pagination, PaginationContent, PaginationItem, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

const itemsPerPage = 20;

const SearchPage = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loader, setLoader] = useState(false);
  const [aiSummary, setAiSummary] = useState(null);
  const [page, setPage] = useState(1);
  const [trigger, settrigger] = useState(true);


  const totalPages = Math.ceil(results.length / itemsPerPage);
  const paginatedResults = results.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoader(true);
    try {
      const res = await Search(query);
      if (res && Array.isArray(res)) {
        setResults(res);
        setPage(1); // Reset to first page on new search
      } else {
        setResults([]);
      }
      const ai=await getai(query);
      setAiSummary(ai);
    } catch (err) {
      console.error("Search failed:", err);
      setResults([]);
    } finally {
      setLoader(false);
      settrigger(false);
    }
  };

  return (
    <>
      {/* Initial UI */}
      {!loader && trigger && (
        <div className="min-h-screen bg-[#0D1117] text-white flex flex-col justify-center items-center px-4">
          <SearchBar handleSearch={handleSearch} setQuery={setQuery} query={query} icon={true} />
          <div className="mt-6 text-center text-sm text-[#8B949E] space-y-1">
            <p>⚖️ We respect all websites' <code>robots.txt</code> and crawl only what is allowed.</p>
            <p>Powered by Meilisearch • Built by Manish 🚀</p>
            <div className="flex gap-4 justify-center mt-2">
              <a href="https://manish-devaraj.vercel.app/" className="hover:underline text-[#58A6FF]" target="_blank" rel="noopener noreferrer">🌐 Portfolio</a>
              <a href="https://www.linkedin.com/in/manishdevaraj/" className="hover:underline text-[#58A6FF]" target="_blank" rel="noopener noreferrer">🧑‍💼 LinkedIn</a>
              <a href="https://github.com/manishdevaraj" className="hover:underline text-[#58A6FF]" target="_blank" rel="noopener noreferrer">💻 GitHub</a>
            </div>
          </div>
        </div>
      )}

      {/* Result UI */}
      {!loader && !trigger && (
        <div className="min-h-screen bg-[#0D1117] text-white px-4 py-6">
          <div className="flex items-center justify-center">
            <SearchBar handleSearch={handleSearch} setQuery={setQuery} query={query} icon={false} />
             <div className="flex gap-4 justify-center mt-2">
              <a href="https://manish-devaraj.vercel.app/" className="hover:underline text-[#58A6FF]" target="_blank" rel="noopener noreferrer">🌐 Portfolio</a>
              <a href="https://www.linkedin.com/in/manishdevaraj/" className="hover:underline text-[#58A6FF]" target="_blank" rel="noopener noreferrer">🧑‍💼 LinkedIn</a>
              <a href="https://github.com/manishdevaraj" className="hover:underline text-[#58A6FF]" target="_blank" rel="noopener noreferrer">💻 GitHub</a>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
            {/* AI Summary */}
            <div className="order-1 h-fit lg:order-2 bg-[#161B22] rounded-2xl shadow p-4 text-white">
              <div className="text-center mb-3">
                <h1 className="text-2xl font-bold text-purple-400">AI Summary</h1>
                <p className="text-sm text-gray-400">Smart insights powered by AI</p>
              </div>
              <div className="text-sm max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-[#0D1117] px-2">
                <p>{aiSummary || "Generating summary from results..."}</p>
              </div>
            </div>
             {results.length === 0 && (
  <div className="col-span-full order-3 mt-6 text-center bg-[#161B22] border border-purple-600 rounded-2xl p-6 shadow-md">
    <h2 className="text-2xl font-semibold text-purple-400 mb-2">Query Queued</h2>
    <p className="text-sm text-gray-400">
      IO Bot has added your search to the crawl queue. We’re actively exploring the web
      to find and index fresh, relevant results for you.
    </p>
    <p className="text-xs text-gray-600 mt-2 italic">
      Come back in a few minutes to check updated results.
    </p>
  </div>
)}

            {/* Search Results */}
            <div className="order-2 lg:order-1 lg:col-span-2 space-y-6">
              {paginatedResults.map((item, index) => (
                <div key={index} className="bg-[#161B22] p-5 rounded-xl shadow hover:shadow-lg transition-all duration-200">
                  <div className="flex items-center gap-2 mb-2">
                    {item.favicon && <img src={item.favicon} alt="favicon" className="w-5 h-5" />}
                    <a href={item.url} className="text-[#58A6FF] text-sm hover:underline break-all" target="_blank" rel="noopener noreferrer">
                      {item.url}
                    </a>
                  </div>
                  <h2 className="text-lg font-bold text-[#C9D1D9]">{item.title}</h2>
                  <p className="text-sm text-[#8B949E] mt-1">{item.description}</p>
                </div>
              ))}

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="flex justify-center pt-4">
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious
                          onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                          className={page === 1 ? "pointer-events-none opacity-50" : ""}
                        />
                      </PaginationItem>
                      <PaginationItem>
                        <span className="text-sm text-white px-2 pt-2">Page {page} of {totalPages}</span>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationNext
                          onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
                          className={page === totalPages ? "pointer-events-none opacity-50" : ""}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Loader UI */}
      {loader && (
        <div className="min-h-screen bg-[#0D1117] flex flex-col items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#58A6FF] mb-8">ioSearch 🔍</h1>
          <img src="/loader.svg" alt="loader" className="w-50" />
          <span className="font-extrabold text-[#58A6FF]">We are working</span>
        </div>
      )}
    </>
  );
};

export default SearchPage;
