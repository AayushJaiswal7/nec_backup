import React from 'react';

const CardComponent = ({ 
  title, 
  icon: Icon, 
  onClick, 
  className = '', 
  children,
  iconProps = {} 
}) => {
  
  const handleClick = (e) => {
    if (onClick) {
      onClick(e);
    }
  };

return (
  <div 
    className={`
      w-28 h-28 
      bg-white rounded-lg 
      flex flex-col justify-between m-2 p-2 
      border border-gray-200 
      hover:border-primaryColor 
      hover:scale-[0.975]
      transition-all duration-200
      cursor-pointer
      ${className}
    `}
    onClick={handleClick}
    role="button"
    tabIndex={0}
    onKeyDown={(e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        handleClick(e);
      }
    }}
  >
    {/* Icon at the top */}
    {Icon && (
      <div className="flex justify-start">
        <Icon 
          size={20} 
          className="text-primaryColor"
          {...iconProps}
        />
      </div>
    )}
    
    {/* Title at the bottom */}
    <div className="flex justify-start">
      <h6 className="text-sm text-start">
        {title}
      </h6>
    </div>
    
    {/* Additional content */}
    {children}
  </div>
);
};

export default CardComponent;