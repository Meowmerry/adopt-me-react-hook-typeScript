import Pet from "./Pet";

const Results = ({ pets }:any) => {
  return (
    <div className=" grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {!pets.length ? (
        <h1>No Pets Found</h1>
      ) : (
        pets.map((pet:any) => {
          return (
            <Pet
              // {...pet} --> this one is not good to do
              animal={pet.animal}
              id={pet.id}
              key={pet.id}
              name={pet.name}
              breed={pet.breed}
              images={pet.images}
              location={`${pet.city}, ${pet.state}`}
            />
          );
        })
      )}
    </div>
  );
};

export default Results;
