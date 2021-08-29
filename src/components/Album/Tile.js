const Tile = ({ children, clickFunc }) => {
  return (
    <div
      onClick={clickFunc}
      className={
        'bg-white p-3 shadow rounded-lg w-80 h-96 flex flex-col items-center relative' +
        (clickFunc
          ? ' cursor-pointer hover:bg-blue-50 transition-colors duration-100'
          : '')
      }
    >
      {children}
    </div>
  );
};

export default Tile;
