import { useState, MouseEvent } from 'react';
interface IProps {
  images: string[];

}

// const Carousel:FunctionComponent<IProps> = ({ images = ["http://pets-images.dev-apis.com/pets/none.jpg"] }: IProps) => {
const Carousel = ({ images = ["http://pets-images.dev-apis.com/pets/none.jpg"] }: IProps) => {

  const [active, setActive] = useState<number>(0);

  const handleIndexClick = (event: MouseEvent<HTMLImageElement>) => {
    setActive(Number(event.currentTarget.dataset.index));
  };

  return (
    <div className="carousel">
      <img src={images[active]} alt="animal" />
      <div className="carousel-smaller">
        {images.map((photo, index) => (
          // eslint-disable-next-line
          <img
            key={photo}
            src={photo}
            className={index === active ? "active" : ""}
            alt="animal thumbnail"
            onClick={handleIndexClick}
            data-index={index}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
/*
* *  Clase Component * * * 

import { Component } from "react";

class Carousel extends Component<IProps> {
  state = {
    active: 0,
  };

  static defaultProps = {
    images: ["http://pets-images.dev-apis.com/pets/none.jpg"],
  };

  handleIndexClick = (event: MouseEvent<HTMLElement>) => {
    if (!(event.target instanceof HTMLElement)) {
      return;
    }

    if (event.target.dataset.index) {
      this.setState({
        active: +event.target.dataset.index,
      });
    }
  };

  render() {
    const { active } = this.state;
    const { images } = this.props;
    return (
      <div className="carousel">
        <img src={images[active]} alt="animal" />
        <div className="carousel-smaller">
          {images.map((photo, index) => (
            // eslint-disable-next-line
            <img
              key={photo}
              src={photo}
              className={index === active ? "active" : ""}
              alt="animal thumbnail"
              onClick={this.handleIndexClick}
              data-index={index}
            />
          ))}
        </div>
      </div>
    );
  }
}


*/