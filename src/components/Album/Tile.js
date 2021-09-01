const Tile = ({ children, clickFunc }) => {
  return (
    <div
      onClick={clickFunc}
      className={
        'bg-white p-3 shadow rounded-lg w-80 min-h-tile flex flex-col items-center relative' +
        (clickFunc
          ? ' cursor-pointer hover:bg-blue-100 transition-colors duration-100'
          : '')
      }
    >
      {children}
    </div>
  );
};

export default Tile;
