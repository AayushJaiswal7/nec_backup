const SecondaryButton = ({ text, onClick, icon: Icon }) => {
  return (
    <>
      {/* This is a button component reusable purpose */}

      <button
        onClick={onClick}
        className="text-black text-sm px-4 py-2 rounded flex items-center m-2 border border-black"
      >
        {Icon && <Icon size={14} className="mr-2" />}
        {text}
      </button>
    </>
  );
};

export default SecondaryButton;