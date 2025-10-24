import React from 'react';

// Reusable component to render a single BOQ row and its children recursively
const BoqTableRow = ({ item, level = 0 }) => {
    // Calculate indentation based on the level for the description
    const indentationClass = `pl-${4 + level * 4}`; // e.g., pl-4, pl-8, pl-12

    return (
        <React.Fragment>
            {/* The main row for the current item */}
            <tr className={`hover:bg-gray-50 ${level > 0 ? 'bg-gray-50/50' : 'bg-white'}`}>
                {/* Apply border and padding to each cell */}
                <td className="px-3 py-2 whitespace-nowrap border">{item.sno}</td>
                <td className="px-3 py-2 whitespace-nowrap border">{item.itemCode}</td>
                <td className={`px-3 py-2 border ${indentationClass}`}>{item.description}</td>
                <td className="px-3 py-2 whitespace-nowrap border">{item.spec}</td>
                <td className="px-3 py-2 whitespace-nowrap border">{item.uom}</td>
                {/* Factory */}
                <td className="px-3 py-2 whitespace-nowrap border text-right">{item.factoryQty}</td>
                <td className="px-3 py-2 whitespace-nowrap border text-right">{item.factoryAmt}</td>
                {/* Office */}
                <td className="px-3 py-2 whitespace-nowrap border text-right">{item.officeQty}</td>
                <td className="px-3 py-2 whitespace-nowrap border text-right">{item.officeAmt}</td>
                {/* Other/Utilities */}
                <td className="px-3 py-2 whitespace-nowrap border text-right">{item.otherQty}</td>
                <td className="px-3 py-2 whitespace-nowrap border text-right">{item.otherAmt}</td>
                {/* External/Vendor */}
                <td className="px-3 py-2 whitespace-nowrap border text-right">{item.vendorQty}</td>
                <td className="px-3 py-2 whitespace-nowrap border text-right">{item.vendorAmt}</td>
                {/* Totals */}
                <td className="px-3 py-2 whitespace-nowrap border text-right font-medium">{item.totalQty}</td>
                <td className="px-3 py-2 whitespace-nowrap border text-right">{item.unitRate}</td>
                <td className="px-3 py-2 whitespace-nowrap border text-right font-medium">{item.totalAmt}</td>
            </tr>

            {/* Recursively render children if they exist */}
            {item.children && item.children.length > 0 && (
                item.children.map(child => (
                    // Pass the child item and the *next* level
                    <BoqTableRow key={child.id} item={child} level={level + 1} />
                ))
            )}
        </React.Fragment>
    );
};

export default BoqTableRow;
