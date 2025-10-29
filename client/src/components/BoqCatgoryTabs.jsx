import React, { useState, useEffect, useMemo } from 'react';

/**
 * BoqCategoryTabs Component (Using User's *updated* provided structure and pill styling)
 * Renders tab buttons for BOQ categories.
 *
 * @param {Array<object>} items - Array of tab objects, e.g., [{ label: "Civil", value: "civil" }]
 * @param {string} activeTab - The value of the currently active tab (e.g., "civil").
 * @param {function} onTabChange - Callback function executed when a tab is clicked, receives the tab's value.
 * @param {string} [className=""] - Optional additional classes for the outer container.
 */
const BoqCategoryTabs = ({ items = [], activeTab, onTabChange, className = "" }) => {
  // Find the index of the initially active tab value
  const initialActiveIndex = useMemo(() => {
      const index = items.findIndex(item => item.value === activeTab);
      return index >= 0 ? index : 0; // Default to 0 if not found
  }, [items, activeTab]);

  const [internalActiveIndex, setInternalActiveIndex] = useState(initialActiveIndex);

  // Effect to sync internal state if the prop changes from parent
  useEffect(() => {
    const newIndex = items.findIndex(item => item.value === activeTab);
    if (newIndex >= 0 && newIndex !== internalActiveIndex) {
      setInternalActiveIndex(newIndex);
    }
  }, [activeTab, items, internalActiveIndex]);

  if (!items || items.length === 0) {
    return null;
  }

  const handleTabClick = (index, value) => {
    setInternalActiveIndex(index); // Update internal state for immediate visual feedback
    onTabChange(value);       // Notify parent component with the *value*
  };

  return (
    // Outer container - Applying optional className here
    <div className={`p-1 ${className}`}>
        {/* Container with pill styling from user example */}
        <div className="inline-flex gap-2 bg-gray-50 rounded-full p-1">
            {items.map((item, index) => {
                const isActive = index === internalActiveIndex;

                return (
                <button
                    key={item.value} // Use value for key
                    onClick={() => handleTabClick(index, item.value)}
                    // Apply conditional styling for pill active state from user example
                    // Reduced padding from px-12 py-3 to px-6 py-2
                    className={`px-6 py-2 text-sm font-medium transition-all rounded-3xl relative overflow-hidden ${ // Adjusted text-sm for smaller size
                        isActive
                        ? 'text-orange-600 bg-white shadow-sm' // Active styles from user example
                        : 'text-gray-600 hover:text-gray-900' // Inactive styles from user example
                    }`}
                >
                    {item.label}
                    {/* Add the absolute positioned bottom line div for active state */}
                    {isActive && (
                      <div className="absolute bottom-0 -left-6 -right-6 h-0.5 bg-orange-600 rounded-t-3xl" />
                    )}
                </button>
                );
            })}
        </div>
        {/* Removed the content rendering div */}
    </div>
  );
};

export default BoqCategoryTabs;

