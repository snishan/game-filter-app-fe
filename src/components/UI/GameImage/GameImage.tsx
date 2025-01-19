import React from 'react';
import './styles.scss';

interface GameImageProps {
  imageUrl: string;
  imageName: string;
  loading: "lazy" | "eager";
}

const GameImage: React.FC<GameImageProps> = ({ imageUrl, imageName, loading = 'lazy' }) => {
  return (
    <div className="image-hover-container ">
      <img src={imageUrl} alt={imageName} className="image " loading={loading} />
      <div className="overlay">
        <span className="image-name">{imageName}</span>
      </div>
    </div>
  );
};

export default GameImage;