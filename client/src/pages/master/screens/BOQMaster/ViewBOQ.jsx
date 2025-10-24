// client/src/pages/master/screens/BOQMaster/ViewBOQ.jsx
import React, { useState, useEffect,useRef } from 'react'; // Kept React and hooks
import { useNavigate } from 'react-router-dom'; // Kept useNavigate
// Removed CustomTable import
import SecondaryButton from '../../../../components/SecondaryButton'; //Reusable Secondary Button
import { Upload, Download } from 'lucide-react'; // Icons for buttons


const ViewBOQ = () => {
  const navigate = useNavigate(); 
  const scrollableTableRef = useRef(null); // Ref for the scrollable div
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftStart, setScrollLeftStart] = useState(0);
  const handleExport = () => {
    console.log("Export button clicked.");
    alert('Export functionality to be implemented.');
  };

  const handleImport = () => {
    console.log("Import button clicked.");
    alert('Import functionality to be implemented.');
  };
  const handleMouseDown = (e) => {
    if (!scrollableTableRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollableTableRef.current.offsetLeft);
    setScrollLeftStart(scrollableTableRef.current.scrollLeft);
    scrollableTableRef.current.style.cursor = 'grabbing'; // Change cursor
    scrollableTableRef.current.style.userSelect = 'none'; // Prevent text selection
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !scrollableTableRef.current) return;
    e.preventDefault(); // Prevent default drag behavior (like image dragging)
    const x = e.pageX - scrollableTableRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; // Multiplier adjusts scroll speed
    scrollableTableRef.current.scrollLeft = scrollLeftStart - walk;
  };

  const handleMouseUp = () => {
    if (!scrollableTableRef.current) return;
    setIsDragging(false);
    scrollableTableRef.current.style.cursor = 'grab'; // Reset cursor
    scrollableTableRef.current.style.removeProperty('user-select');
  };

  const handleMouseLeave = () => {
    if (isDragging && scrollableTableRef.current) {
        setIsDragging(false);
        scrollableTableRef.current.style.cursor = 'grab'; // Reset cursor
        scrollableTableRef.current.style.removeProperty('user-select');
    }
  };
  const handleMouseUpOrLeave = () => { // Combined Up and Leave handler
    if (isDragging && scrollableTableRef.current) { // Check if dragging before resetting
        setIsDragging(false);
        scrollableTableRef.current.style.cursor = 'grab'; // Reset cursor to grab
        scrollableTableRef.current.style.removeProperty('user-select'); // Allow text selection again
    }
  };
  // --- End Mouse Drag Scroll Handlers ---

  // --- Touch Drag Scroll Handlers (Basic Implementation) ---
   const handleTouchStart = (e) => {
    if (!scrollableTableRef.current) return;
    // Use the first touch point
    const touch = e.touches[0];
    setIsDragging(true);
    setStartX(touch.pageX - scrollableTableRef.current.offsetLeft);
    setScrollLeftStart(scrollableTableRef.current.scrollLeft);
    // Note: Cursor style doesn't apply to touch
    scrollableTableRef.current.style.userSelect = 'none'; // Prevent text selection
  };

  const handleTouchMove = (e) => {
    if (!isDragging || !scrollableTableRef.current || e.touches.length === 0) return;
    // Don't prevent default if vertical scroll might be intended
    // e.preventDefault(); // Might interfere with vertical page scroll
    const touch = e.touches[0];
    const x = touch.pageX - scrollableTableRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; // Adjust scroll speed if needed
    scrollableTableRef.current.scrollLeft = scrollLeftStart - walk;
  };

  const handleTouchEnd = () => {
    if (!scrollableTableRef.current) return;
    setIsDragging(false);
    scrollableTableRef.current.style.removeProperty('user-select');
  };
  
  return (
   <div className="pt-0 px-4 pb-4 bg-white rounded-lg shadow-sm m-4">

      {/* --- Section for Title and Buttons (On the same line) --- */}
      <div className="flex justify-between items-center mt-4 mb-4 flex-wrap gap-2">
        {/* Title: Allows shrinking */}
        <h2 className="text-xl font-semibold text-gray-800 min-w-0">
           Master BOQ - Residential Apartment Construction
        </h2>
        {/* Action Buttons Container: Does not shrink */}
        <div className="flex gap-2 flex-shrink-0">
           <SecondaryButton
             text="Import as CSV"
             icon={Upload}
             onClick={handleImport}
             className="border-gray-300 hover:bg-gray-50" // Basic styling
           />
           <SecondaryButton
             text="Export to CSV"
             icon={Download}
             onClick={handleExport}
             className="border-gray-300 hover:bg-gray-50" // Basic styling
           />
        </div>
      </div>
      <div
        ref={scrollableTableRef} // Assign the ref here
        className={`mt-6 overflow-auto border border-gray-200 rounded-md max-h-[calc(100vh-280px)] ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`} // Add cursor style
        // Attach mouse event listeners
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave} // Use combined handler
        onMouseLeave={handleMouseUpOrLeave} // Use combined handler
        // Attach touch event listeners
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchEnd} // Handle cancellation same as end
      >
        <table className="w-full min-w-[1900px] border-collapse text-sm"> {/* Adjusted min-w slightly */}
          <thead className="sticky top-0 bg-[#FFF9F6] z-10"> {/* Changed background slightly */}
            {/* Top Header Row */}
            <tr className="border-b border-gray-300">
              <th rowSpan={2} className="p-2 border-r border-l border-gray-300 text-left font-semibold text-sm w-16">S NO</th>
              <th rowSpan={2} className="p-2 border-r border-gray-300 text-left font-semibold text-sm w-32">Item Code</th>
              <th rowSpan={2} className="p-2 border-r border-gray-300 text-left font-semibold text-sm min-w-[250px]">Item Description</th>
              <th rowSpan={2} className="p-2 border-r border-gray-300 text-left font-semibold text-sm min-w-[200px]">Item Specification</th>
              <th rowSpan={2} className="p-2 border-r border-gray-300 text-left font-semibold text-sm w-20">UOM</th>
              <th colSpan={2} className="p-2 border-r border-gray-300 text-center font-semibold text-sm">Factory</th>
              <th colSpan={2} className="p-2 border-r border-gray-300 text-center font-semibold text-sm">Office</th>
              <th colSpan={2} className="p-2 border-r border-gray-300 text-center font-semibold text-sm">Other/Utilities</th>
              <th colSpan={2} className="p-2 border-r border-gray-300 text-center font-semibold text-sm">External</th>
              <th rowSpan={2} className="p-2 border-r border-gray-300 text-right font-semibold text-sm w-24">Total QTY</th>
              <th rowSpan={2} className="p-2 border-r border-gray-300 text-right font-semibold text-sm w-28">Rate (Rs)</th>
              <th rowSpan={2} className="p-2 border-r border-gray-300 text-right font-semibold text-sm w-32">Total Amount (Rs)</th>
            </tr>
            {/* Bottom Header Row (Sub-headers) */}
            <tr className="border-b-2 border-gray-400"> {/* Thicker bottom border */}
              {/* Under Factory */}
              <th className="p-2 border-r border-gray-300 text-right font-semibold text-sm w-20">QTY</th>
              <th className="p-2 border-r border-gray-300 text-right font-semibold text-sm w-24">Amount</th>
              {/* Under Office */}
              <th className="p-2 border-r border-gray-300 text-right font-semibold text-sm w-20">QTY</th>
              <th className="p-2 border-r border-gray-300 text-right font-semibold text-sm w-24">Amount</th>
              {/* Under Other/Utilities */}
              <th className="p-2 border-r border-gray-300 text-right font-semibold text-sm w-20">QTY</th>
              <th className="p-2 border-r border-gray-300 text-right font-semibold text-sm w-24">Amount</th>
              {/* Under External */}
              <th className="p-2 border-r border-gray-300 text-right font-semibold text-sm w-20">QTY</th>
              <th className="p-2 border-r border-gray-300 text-right font-semibold text-sm w-24">Amount</th>
            </tr>
          </thead>
          <tbody>
            {/* Table rows (<tr>) with data cells (<td>) will go here later */}
             <tr>
                <td colSpan={19} className="text-center p-10 text-gray-500"> {/* Updated colSpan to 19 */}
                  BOQ data rows will be added here.
                </td>
             </tr>
          </tbody>
        </table>
      </div>
      

        </div>
   
  );
};

export default ViewBOQ;

