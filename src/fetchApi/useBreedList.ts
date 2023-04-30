// import { useState, useEffect } from "react";
// const localCache = {};
import {useQuery} from "@tanstack/react-query";
import fetchBreedList from "./fetchBreedList";

const useBreedList = (animal: any) => {
    /* ******** This is the way use with useQuery when we want to fetch data from API ******** 
                useQuery will not fetch data again if we already call, so make app not refetch again
    */
    const results = useQuery(["breeds", animal], fetchBreedList);

    return [results?.data?.breeds ?? [], results.status];

    /*
    * ******** This is the way use with useEffect when we want to fetch data from API  ********
    useEffect will always fetch data again even if we already call the data

    const [breedList, setBreedList] = useState([]);
    const [status, setStatus] = useState("unloaded");

    useEffect(() => {
        if (!animal) {
            setBreedList([]);
        } else if (localCache[animal]) {
            setBreedList(localCache[animal]);
        } else {
            requestBreedList();
        }

        async function requestBreedList() {
            setBreedList([]);
            setStatus("loading");
            const res = await fetch(
                `http://pets-v2.dev-apis.com/breeds?animal=${animal}`
            );
            const json = await res.json();
            localCache[animal] = json.breeds || [];
            setBreedList(localCache[animal]);
            setStatus("loaded");
        }
    }, [animal]);

    return [breedList, status]; */
};

export default useBreedList;
