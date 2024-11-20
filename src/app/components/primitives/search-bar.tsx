import { SearchIcon } from "@/public/assets/icons";

export const SearchBar = ({ onSearch }: { onSearch: (query: string) => void }) => (
  <div className="relative h-full">
    <SearchIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
    <input
      type="text"
      placeholder="Search"
      className="w-full h-full rounded-lg font-light border-[1.5px] border-[#DBE2E8] bg-white py-2 pl-10 pr-4 text-gray-900 placeholder-[#5A5B5C] focus:border focus:border-purple-primary focus:outline-none focus:ring-1 focus:ring-purple-primary"
      onChange={(e) => onSearch(e.target.value)}
    />
  </div>
);
