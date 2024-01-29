import React, { useCallback, useEffect, useState } from "react";
import { Card } from "../Aseests/Cards";
import axios from "axios";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";

const Home = () => {
  const [series, setSeries] = useState([]);
  const [filter, setFilter] = React.useState("popular");
  const [page, setPage] = useState(1);

  useEffect(() => {
    // getTrendingSerieData();
    getFilteredSerieData();
  }, [filter, page]);

  async function getTrendingSerieData() {
    try {
      // const ApiKey = "5bf89b1ac4dec1f2a3dacb6b4b926527"
      let resp = await axios.get(
        `https://api.themoviedb.org/3/discover/tv?api_key=5bf89b1ac4dec1f2a3dacb6b4b926527`
      );
      /*console.log(resp.data.results);*/
      setSeries(resp.data.results);
      // console.log(series);
    } catch (e) {
      console.log(e);
    } finally {
    }
  }
  async function getFilteredSerieData() {
    try {
      if (filter === "favorites") {
        getFavories();
      } else {
        let resp = await axios.get(
          `https://api.themoviedb.org/3/tv/${filter}?api_key=5bf89b1ac4dec1f2a3dacb6b4b926527&page=${page}`
        );
        setSeries(resp.data.results);
      }
    } catch (e) {
      console.log(e);
    }
  }

  async function getFavories() {
    let token = sessionStorage.getItem("token");
    axios
      .get(`http://localhost:8000/api/user/favorite-series`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log("res", res);
        if (res.data && Array.isArray(res.data.series)) {
          setSeries(res.data.series);
        }
      })
      .catch((err) => console.log(err));
  }

  const handleNext = useCallback(() => {
    setPage((prevPage) => prevPage + 1);
  }, []);

  const handlePrevious = useCallback(() => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  }, []);

  return (
    <div className=" container m-auto flex flex-col items-center justify-center mt-24 gap-8">
      <div className="flex flex-row gap-4 items-center z-[1]">
        <h2 className="text-white text-2xl font-medium">Liste séries</h2>
        <div className="bg-slate-50 xl:w-[910px] md:w-[400px] md-auto h-[1px]"></div>
        {/* <PrimaryButtonsIcon text='Filtre' iconRight={FilterIcon} /> */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Filtrer</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            {/* <DropdownMenuLabel>Panel Position</DropdownMenuLabel> */}
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup value={filter} onValueChange={setFilter}>
              <DropdownMenuRadioItem value="top_rated">
                Mieux classées
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="airing_today">
                Dérnieres sorties
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="favorites">
                Favories
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="relative">
        <div className="relative grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7 z-10">
          {series.map((serie, i) => (
            <Card fromDB={false} serie={serie} />
          ))}
        </div>
        {/* Background overlay with absolute positioning */}
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-indigo-900 via-purple-800 to-indigo-900 opacity-75 filter blur-3xl"></div>
      </div>
      <div className="flex gap-7">
        <Pagination className="text-white cursor-pointer">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious onClick={handlePrevious} />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink>{page}</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext onClick={handleNext} />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default Home;
