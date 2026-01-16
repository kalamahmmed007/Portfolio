import { useState, useMemo } from "react";

export default function useTable(data = [], searchKey = "title") {
  const [search, setSearch] = useState("");

  const filteredData = useMemo(() => {
    if (!search) return data;
    return data.filter((item) =>
      item[searchKey]?.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, data, searchKey]);

  return { search, setSearch, filteredData };
}
