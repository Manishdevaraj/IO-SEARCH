//@ts-nocheck
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
interface SearchBarProps {
  query: string;
  setQuery: (value: string) => void;
  handleSearch: () => void;
  icon:boolean
}
const SearchBar: React.FC<SearchBarProps> = ({query, setQuery,handleSearch,icon}) => {

  return (
    <>
        {/* Logo/Heading */}
      {icon&&<h1 className="text-4xl md:text-5xl font-extrabold text-[#58A6FF] mb-8">
        ioSearch 🔍
      </h1>}

      {/* Search Input + Button */}
      <div className="flex w-full  max-w-xl items-center gap-2">
        <Input
          className="bg-[#161B22] border border-[#30363D] text-white placeholder:text-[#8B949E] w-full"
          placeholder="Search the internet..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <Button
          className="bg-[#1F6FEB] hover:bg-[#388BFD] text-white cursor-pointer"
          onClick={handleSearch}
        >
          Search
        </Button>
      </div>
    </>
  )
}

export default SearchBar