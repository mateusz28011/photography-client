const Success = ({ success }) => {
  return success ? (
    <div className='bg-green-100 px-2 py-1 my-3 rounded'>
      <div className='capitalize-first text-green-500 font-medium whitespace-pre-line'>
        {success}
      </div>
    </div>
  ) : null;
};

export default Success;
