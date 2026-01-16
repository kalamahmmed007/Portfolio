import { useState, useMemo } from "react";

export default function usePagination(data = [], pageSize = 10) {
  const [page, setPage] = useState(1);
  const pageCount = Math.ceil(data.length / pageSize);

  const paginatedData = useMemo(() => {
    const start = (page - 1) * pageSize;
    return data.slice(start, start + pageSize);
  }, [page, data, pageSize]);

  const nextPage = () => setPage((p) => Math.min(p + 1, pageCount));
  const prevPage = () => setPage((p) => Math.max(p - 1, 1));
  const goToPage = (num) => setPage(Math.min(Math.max(1, num), pageCount));

  return { page, pageCount, paginatedData, nextPage, prevPage, goToPage, setPage };
}
