import {createContext} from "react";
import {Pet} from "./APIResponsesTypes";

const AdoptedPetContext = createContext<
    [Pet | null, (adoptedPet: Pet | null) => void]
>([
    {// We can assign default value or null 

        id: 1337,
        name: "Fido",
        animal: "dog",
        description: "Lorem ipsum",
        breed: "Beagle",
        images: [],
        city: "Seattle",
        state: "WA",
    },
    () => {},
]);
/*
Example if you don't want to have default values, you can set to null

const AdoptedPetContext = createContext<[Pet | null, (adoptedPet: Pet | null) => void] | null>(null);
*/
export default AdoptedPetContext;
