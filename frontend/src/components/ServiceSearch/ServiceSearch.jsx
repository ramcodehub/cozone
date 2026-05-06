// src/components/ServiceSearch/ServiceSearch.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import searchData from "../../config/searchData.js";
import "./ServiceSearch.css";

const ServiceSearch = () => {
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(-1);
  const navigate = useNavigate();

  // 🔹 Fuzzy search
  const fuzzyMatch = (text, input) => {
    let t = text.toLowerCase();
    let i = input.toLowerCase();
    let ti = 0;

    for (let ii = 0; ii < i.length; ii++) {
      ti = t.indexOf(i[ii], ti);
      if (ti === -1) return false;
      ti++;
    }
    return true;
  };

  const results = searchData.filter(
    (item) => query && fuzzyMatch(item.name, query)
  );

  // 🔹 Group by type
  const groupedResults = results.reduce((acc, item) => {
    acc[item.type] = acc[item.type] || [];
    acc[item.type].push(item);
    return acc;
  }, {});

  // 🔹 Keyboard navigation
  const handleKeyDown = (e) => {
    if (!results.length) return;

    if (e.key === "ArrowDown") {
      setActiveIndex((prev) => (prev + 1) % results.length);
    } else if (e.key === "ArrowUp") {
      setActiveIndex((prev) =>
        prev <= 0 ? results.length - 1 : prev - 1
      );
    } else if (e.key === "Enter" && activeIndex >= 0) {
      navigate(results[activeIndex].path);
      setQuery("");
      setActiveIndex(-1);
    }
  };

  // 🔹 Highlight match
  const highlightText = (text) => {
    const regex = new RegExp(`(${query})`, "ig");
    return text.replace(regex, "<mark>$1</mark>");
  };

  return (
    <div className="service-search">
      <input
        type="text"
        placeholder="Search services or pages..."
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setActiveIndex(-1);
        }}
        onKeyDown={handleKeyDown}
        className="search-input"
      />

      <button className="search-btn">Search</button>

      {query && results.length > 0 && (
        <div className="suggestions">
          {Object.keys(groupedResults).map((group) => (
            <div key={group}>
              <div className="group-title">{group}</div>

              {groupedResults[group].map((item, index) => {
                const globalIndex = results.findIndex(
                  (r) => r.name === item.name
                );

                return (
                  <div
                    key={item.name}
                    className={`suggestion-item ${
                      globalIndex === activeIndex ? "active" : ""
                    }`}
                    onClick={() => {
                      navigate(item.path);
                      setQuery("");
                      setActiveIndex(-1);
                    }}
                    dangerouslySetInnerHTML={{
                      __html: highlightText(item.name),
                    }}
                  />
                );
              })}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ServiceSearch;
