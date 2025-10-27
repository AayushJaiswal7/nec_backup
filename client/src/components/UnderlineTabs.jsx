import React, { createContext, useContext, useMemo, useState } from 'react';

// Create context to manage tab state
const UnderlineTabsContext = createContext(null);

/**
 * Main wrapper for UnderlineTabs. Manages the active tab state.
 * @param {string} [value] - Controlled active tab value.
 * @param {string} [defaultValue] - Initial active tab value (uncontrolled).
 * @param {function} [onValueChange] - Callback when tab changes (for controlled).
 * @param {ReactNode} children - Should include UnderlineTabsList.
 * @param {string} [className] - Optional classes for the outer div.
 */
export function UnderlineTabs({
  value,
  defaultValue,
  onValueChange,
  children,
  className = "",
}) {
  const [internalValue, setInternalValue] = useState(defaultValue || "");
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;

  const setValue = (val) => {
    if (!isControlled) {
      setInternalValue(val);
    }
    if (onValueChange) {
      onValueChange(val);
    }
  };

  const contextValue = useMemo(() => ({
    value: currentValue,
    setValue,
  }), [currentValue]); // Only depends on currentValue

  return (
    <UnderlineTabsContext.Provider value={contextValue}>
      <div className={className}>
        {children}
      </div>
    </UnderlineTabsContext.Provider>
  );
}

/**
 * Container for the list of UnderlineTab buttons.
 * @param {ReactNode} children - Should be UnderlineTab components.
 * @param {string} [className] - Optional classes for the list container div.
 */
export function UnderlineTabsList({ children, className = "" }) {
  return (
    // Add bottom border for the underline effect baseline
    // Adjust padding/margin as needed
    <div className={`flex border-b border-gray-300 ${className}`}>
      {children}
    </div>
  );
}

/**
 * An individual tab button within UnderlineTabsList.
 * @param {string} value - Unique identifier for this tab. Required.
 * @param {ReactNode} children - The label/content for the tab.
 * @param {function} [onClick] - Optional additional click handler.
 * @param {string} [className] - Optional classes for the button.
 */
export function UnderlineTab({ value, children, onClick, className = "" }) {
  const context = useContext(UnderlineTabsContext);
  if (!context) {
    throw new Error("UnderlineTab must be used within UnderlineTabs");
  }

  const isActive = context.value === value;

  const handleClick = (e) => {
    context.setValue(value);
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <button
      type="button"
      role="tab"
      aria-selected={isActive}
      onClick={handleClick}
      // Apply different styles based on isActive state
      className={`
        px-3 py-2 sm:px-4 sm:py-3  /* Responsive padding */
        text-sm font-medium
        border-b-2 /* Reserve space for border */
        transition-colors duration-150 ease-in-out
        focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primaryColor /* Focus state */
        ${isActive
          ? 'border-primaryColor text-primaryColor font-semibold' // Active state: orange border and text
          : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-400' // Inactive state
        }
        -mb-px /* Overlap border with TabsList border */
        whitespace-nowrap /* Prevent text wrapping */
        ${className}
      `}
    >
      {children}
    </button>
  );
}

// Default export the main component
export default UnderlineTabs;
