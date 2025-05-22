import { useEffect, useState } from "react";
import Navbar from "/src/Components-Common/Navbar";
import Filter from "/src/pages/search/components/Filter";
import Results from "/src/pages/search/components/Results";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [results, setResults] = useState({});

  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get("id");
  const discount = searchParams.get("discount");
  const selectedPrescription = searchParams.get("selectedPrescription");

  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [debounceQuery, setDebounceQuery] = useState("");
  const [searchMedicines, setSearchMedicines] = useState([]);

  const [quantities, setQuantities] = useState({});
  const [cartCount, setCartCount] = useState(
    Object.keys(quantities).length || 0
  );

  console.log(discount);
  const backend = import.meta.env.VITE_BACKEND;

  const [filters, setFilters] = useState({
    deliveryOptions: "none",
    distance: "none",
    dosageForm: "none",
  });

  function medicineSearch(id) {
    console.log(discount);
    navigate(`/search?id=${id}&discount=${discount}`);

    setSearchQuery("");
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceQuery(searchQuery);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  useEffect(() => {
    if (debounceQuery) {
      console.log("Search Start!");

      fetch(
        `${backend}/api/home/search?query=${debounceQuery}&prescriptionID=${
          selectedPrescription == "null" || selectedPrescription == null
            ? -1
            : selectedPrescription
        }`,
        {
          credentials: "include",
        }
      )
        .then((res) => res.text())
        .then((res) =>
          console.log("Result is ", setSearchMedicines(JSON.parse(res)))
        );
    }
  }, [debounceQuery]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    setCartCount(Object.keys(quantities).length);
  }, [quantities]);

  const increaseQuantity = (id) => {
    setQuantities((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));

    fetch(
      `${backend}/api/updateCartQuantity?memberID=${"ENM$Hduu5wFX"}&itemID=${id}&operation=${encodeURIComponent(
        "+"
      )}`,
      {
        method: "POST",
        credentials: "include",
      }
    ).then((res) => console.log(res.status));
  };

  const decreaseQuantity = (id) => {
    setQuantities((prev) => {
      const newQuantity = (prev[id] || 0) - 1;
      if (newQuantity <= 0) {
        const { [id]: _, ...rest } = prev; // Remove item from state if 0
        return rest;
      }
      return { ...prev, [id]: newQuantity };
    });

    fetch(
      `${backend}/api/updateCartQuantity?memberID=${"ENM$Hduu5wFX"}&itemID=${id}&operation=${encodeURIComponent(
        "-"
      )}`,
      {
        method: "POST",
        credentials: "include",
      }
    ).then((res) => console.log(res.status));
  };

  useEffect(() => {
    fetch(`${backend}/api/getCartMap?memberId=${"ENM$Hduu5wFX"}`, {
      credentials: "include",
    })
      .then((res) => res.text())
      .then((res) => JSON.parse(res))
      .then((res) => {
        console.log(res);
        setQuantities(res);
      });
  }, []);

  useEffect(() => {
    if (id == undefined) return;

    fetch(`${backend}/api/home/detailedSearch?medId=${id}`, {
      credentials: "include",
    })
      .then((res) => res.text())
      .then((res) => {
        console.log(JSON.parse(res));
        setResults(JSON.parse(res));
      });
  }, [id]);

  return (
    <div className="flex flex-col justify-between h-screen overflow-hidden">
      <Navbar index={0} className="flex-none" cartCount={cartCount} />

      <div className="grid grid-cols-6 gap-6 w-full flex-1 h-full ">
        <div className="col-span-1 bg-gray-100">
          <Filter setFilters={setFilters} />
        </div>

        <div className="col-span-5 flex flex-col p-4 overflow-scroll h-full">
          <div className="flex flex-col">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearch}
              placeholder="Search for Medicines"
              className="flex-1 outline-none px-4 py-3 text-gray-700 rounded-full mb-4 shadow-lg"
            />
            {/* <button
                type="submit"
                className="bg-[#035c67] hover:bg-[#aaa] text-white rounded-full px-4 py-2 transition duration-300"
              >
                Search
              </button> */}
            {debounceQuery && searchMedicines.length > 0 && (
              <ul className="absolute z-10 bg-white w-[80%] mt-12 rounded-lg border border-gray-300 rounded-b-lg mt-1 z-10 shadow-lg">
                {searchMedicines.map((result) => (
                  <li
                    key={result.id}
                    className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                    onClick={() => medicineSearch(result.id)}
                  >
                    <div className="flex items-center">
                      <img
                        src={`${result.medImage}`} // Replace with actual path
                        alt={result.name}
                        className="w-8 h-8 object-cover mr-2"
                      />
                      <div>
                        <div className="font-semibold">{result.name}</div>
                        <div className="text-sm text-gray-600">
                          {result.description}
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="flex-1 h-full mb-44">
            <Results
              results={results}
              discount={discount}
              quantities={quantities}
              setQuantities={setQuantities}
              increaseQuantity={increaseQuantity}
              decreaseQuantity={decreaseQuantity}
              filters={filters}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
