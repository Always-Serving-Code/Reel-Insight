import { useSearchParams } from "react-router-dom";

export default function FilmsSorter() {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortQuery = searchParams.get("sort_by") ?? "date_watched";

  function handleChange(e: any) {
    setSearchParams({ sort_by: e.target.value });
  }

  return (
    <div className="dropdown-container">
      <label>
        <span className="dropdown-sortby">Sort by:</span>
        <select className="dropdown" value={sortQuery} onChange={handleChange}>
          <option value="date_watched">Recently watched</option>
          <option value="rating">Most popular</option>
          <option value="release_year">Newest</option>
          <option value="title">Title</option>
          <option value="runtime">Runtime</option>
        </select>
      </label>
    </div>
  );
}
