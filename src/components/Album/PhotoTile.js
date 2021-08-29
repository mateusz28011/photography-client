import Tile from './Tile';

const PhotoTile = ({ thumbnailUrl, url, title }) => {
  return (
    <Tile>
      <img
        src={thumbnailUrl}
        alt={title}
        className='rounded mx-auto shadow-sm mb-3'
      />
      <div className='text-center my-auto w-52 truncate '>{title}</div>
    </Tile>
  );
};

export default PhotoTile;
