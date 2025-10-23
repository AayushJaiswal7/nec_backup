const ButtonComponent = ({ title, onClick, icon: Icon, width, iconPosition = 1, type }) => { // 0 - Left, 1 - Right
  return (
    <>
      {/* This is a button component reusable purpose */}

      <button
        onClick={onClick}
        type={type}
        className={`bg-primaryColor text-white text-sm px-4 py-2 rounded flex justify-center items-center m-2 ${width}`}
      >
        {iconPosition === 0 && Icon && <Icon size={14} className="mr-2" />}
        {title}
        {iconPosition === 1 && Icon && <Icon size={14} className="ml-2" />}
      </button>
    </>
  );
};

export default ButtonComponent;