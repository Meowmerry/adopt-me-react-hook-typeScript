// const Pet = (props) => {
//   return React.createElement("div", {}, [
//     React.createElement("h1", {}, props.name),
//     React.createElement("h2", {}, props.animal),
//     React.createElement("h2", {}, props.breed),
//   ]);
// };

import { Link } from "react-router-dom";
import {Animal} from "../fetchApi/APIResponsesTypes";
interface IProps {
  name: string;
  animal: Animal;
  breed: string;
  images: string[];
  location: string;
  id:number;
}
// const Pet:FunctionComponent<IProps> = (props:IProps) => {
  const Pet = (props:IProps) => {
  const { name, animal, breed, images, location, id } = props;

  let hero = "http://pets-images.dev-apis.com/pets/none.jpg";
  if (images.length) {
    hero = images[0];
  }

  return (
    <Link to={`/details/${id}`} className=" relative block">
      <div className="image-container">
        <img src={hero} alt={name} />
      </div>
      <div className="pd-4 absolute bottom-0 left-0 bg-gradient-to-tr from-white to-transparent p-2">
        <h1>{name}</h1>
        <h2>{`${animal} — ${breed} — ${location}`}</h2>
      </div>
    </Link>
  );
};

export default Pet;
