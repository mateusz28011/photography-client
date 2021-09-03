const Tile = ({ children, clickFunc }) => {
  return (
    <div
      onClick={clickFunc}
      className={
        'bg-white p-3 shadow auto-rows-fr rounded-lg flex flex-col items-center relative text-sm ssm:text-lg' +
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
