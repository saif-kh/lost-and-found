import { Close, Search } from "@mui/icons-material";
import React, { useRef } from "react";
import abstract from "../styles/abstract.module.css";

function SearchBar({ resetTitle, changeTitle, setPage }) {
  const ref = useRef(null);

  function submit() {
    const value = ref.current.value;
    changeTitle(value);
    setPage(0);
  }

  function reset() {
    resetTitle();
    ref.current.value = "";
  }

  return (
    <div className={abstract.search_bar_container}>
      <input type="text" placeholder="Search by name" ref={ref} />
      <button className={abstract.search_bar_reset} onClick={reset}>
        <Close />
      </button>
      <button className={abstract.search_bar_search} onClick={submit}>
        <Search />
      </button>
    </div>
  );
}

export default SearchBar;
