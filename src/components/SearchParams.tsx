import {
  useState,
  useContext,
  useDeferredValue,
  useMemo,
  useTransition,
} from "react";
import Results from "./Results";
import useBreedList from "../fetchApi/useBreedList";
import { useQuery } from "@tanstack/react-query";
import fetchSearch from "../fetchApi/fetchSearch";
import AdoptedPetContext from "../fetchApi/AdoptedPetContext";
import {Animal} from "../fetchApi/APIResponsesTypes";
const ANIMALS: Animal[] = ["bird", "cat", "dog", "rabbit", "reptile"];

const SearchParams = () => {
  // const [pets, setPets] = useState([]);
  // const [location, setLocation] = useState("");
  // const [animal, setAnimal] = useState("");
  // const [breed, setBreed] = useState("");
  // const [breeds] = useBreedList(animal);

  // useEffect(() => {
  //   requestPets();
  // }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // async function requestPets() {
  //   const res = await fetch(
  //     `http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`
  //   );
  //   const json = await res.json();

  //   setPets(json.pets);
  // }

  const [requestParams, setRequestParams] = useState({
    location: "",
    animal: "",
    breed: "",
  });
  const [adoptedPet] = useContext<any>(AdoptedPetContext);
  const [animal, setAnimal] = useState("" as Animal);
  const [breeds] = useBreedList(animal);
  const [isPending, startTransition] = useTransition();

  const results = useQuery(["search", requestParams], fetchSearch);
  const pets = results?.data?.pets ?? [];
  // useDeferredValue is useful when a lot of things are happening.
  // This is a performance trick and should only be used when you actually have a performance issue.
  const deferredPets = useDeferredValue(pets);
  const renderedPets = useMemo(
    () => <Results pets={deferredPets} />,
    [deferredPets]
  );
  return (
    <div className="my-0 mx-auto w-11/12">
      <form
        // onSubmit={(e) => {
        //   e.preventDefault();
        //   requestPets();
        // }}
        className="mb-10 flex flex-col items-center justify-center rounded-lg bg-gray-200 p-10 shadow-lg"
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          const obj = {
            animal: formData.get("animal")?.toString() ?? "",
            breed: formData.get("breed")?.toString() ?? "",
            location: formData.get("location")?.toString() ?? "",
          };
          startTransition(() => {
            setRequestParams(obj);
          });
        }}
      >
        {adoptedPet ? (
          <div className="pet image-container">
            <img src={adoptedPet.images[0]} alt={adoptedPet.name} />
          </div>
        ) : null}
        <label htmlFor="location">
          Location
          <input
            type="text"
            id="location"
            name="location"
            placeholder="Location"
            className="search-input"
            // value={location}
            // onChange={(e) => setLocation(e.target.value)}
          />
        </label>
        <label htmlFor="animal">
          Animal
          <select
            id="animal"
            name="animal"
            className="search-input"
            // value={animal}
            onChange={(e) => {
              setAnimal(e.target.value as Animal);
              // setBreed("");
            }}
            onBlur={(e) => {
              setAnimal(e.target.value as Animal);
              // setBreed("");
            }}
          >
            <option />
            {ANIMALS.map((animal) => (
              <option key={animal} value={animal}>
                {animal}
              </option>
            ))}
          </select>
        </label>

        <label htmlFor="breed">
          Breed
          <select
            disabled={!breeds.length}
            id="breed"
            name="breed"
            className="search-input grayed-out-disable"
            // value={breed}
            // onChange={(e) => setBreed(e.target.value)}
            // onBlur={(e) => setBreed(e.target.value)}
          >
            <option />
            {breeds.map((breed:any) => (
              <option key={breed} value={breed}>
                {breed}
              </option>
            ))}
          </select>
        </label>
        {isPending ? (
          <div className="mini loading-pane">
            <h2 className="loader">🌀</h2>
          </div>
        ) : (
          <button className="color rounded border-none bg-blue-500 px-6 py-2 text-white hover:opacity-50">
            Submit
          </button>
        )}
      </form>
      {renderedPets}
      {/* <Results pets={pets} /> */}
    </div>
  );
};

export default SearchParams;
