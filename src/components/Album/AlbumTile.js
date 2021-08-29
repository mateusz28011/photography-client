import Tile from './Tile';
import { HiPhotograph } from 'react-icons/hi';
import { FaChevronLeft } from 'react-icons/fa';

const AlbumTile = ({ name, id, setAlbumId, parent }) => {
  const handleAlbumClick = () => {
    setAlbumId(id);
  };

  return (
    <Tile clickFunc={handleAlbumClick}>
      {parent && (
        <FaChevronLeft
          size='2.5rem'
          className='left-1 top-3 text-blue-600 absolute'
        />
      )}
      <HiPhotograph className='w-10/12 h-3/4 text-blue-600 filter drop-shadow-sm' />
      <div className='text-center my-auto w-52 truncate '>{name}</div>
    </Tile>
  );
};

export default AlbumTile;
