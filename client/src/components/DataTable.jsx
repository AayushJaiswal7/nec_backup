import React from 'react';

/**
 * Specialized DataTable for BOQ-like Structures
 *
 * Renders a table with fixed columns at the start/end and dynamically
 * generated spanned "QTY/Amount" columns in the middle.
 * Manages the specific two-row header structure internally.
 * Supports editable cells via callback.
 *
 * @param {object[]} [fixedStartColumns=[]] - Array of column defs for the start.
 * @param {string} fixedStartColumns[].header - Text for the <th>. Required.
 * @param {string} fixedStartColumns[].dataKey - Key in data objects. Required.
 * @param {boolean} [fixedStartColumns[].editable=false] - Make cells editable.
 * @param {string} [fixedStartColumns[].width] - Tailwind width class.
 * @param {string} [fixedStartColumns[].align='text-left'] - Tailwind text align for <td>.
 * @param {string} [fixedStartColumns[].headerAlign] - Tailwind text align for <th>. Defaults to `align`.
 * @param {function} [fixedStartColumns[].renderCell] - Custom render func `(value, row, rowIndex)`. Overrides `editable`.
 *
 * @param {object[]} [fixedEndColumns=[]] - Array of column defs for the end. Same structure as fixedStartColumns.
 *
 * @param {object[]} [dynamicColumnGroups=[]] - Array representing dynamic groups.
 * @param {string} dynamicColumnGroups[].header - Header text for the spanned group (e.g., "Factory 1"). Required.
 * @param {string} dynamicColumnGroups[].dataKeyPrefix - Prefix for data keys (e.g., "factory_1"). Required. Component expects `${prefix}_qty` and `${prefix}_amount` in data.
 * @param {boolean} [dynamicColumnGroups[].editable=true] - If the QTY/Amount cells are editable.
 * @param {string} [dynamicColumnGroups[].qtyWidth='w-20'] - Width for QTY column.
 * @param {string} [dynamicColumnGroups[].amountWidth='w-24'] - Width for Amount column.
 * @param {string} [dynamicColumnGroups[].qtyAlign='text-right'] - Alignment for QTY cells.
 * @param {string} [dynamicColumnGroups[].amountAlign='text-right'] - Alignment for Amount cells.
 *
 * @param {object[]} data - Array of data objects for rows. Required.
 * @param {string} [rowKeyField] - Property name in data objects for unique row key. Defaults to rowIndex.
 * @param {function} [onCellChange] - Callback `(rowIndex, dataKey, newValue)` when an editable cell changes. Required if any column/group is `editable`.
 * @param {string} [containerClassName] - CSS classes for the wrapping div container.
 * @param {string} [tableClassName] - CSS classes for the <table> element.
 * @param {string} [headerClassName] - CSS classes for the <thead> element.
 * @param {(string|function)} [rowClassName] - CSS classes for <tbody> <tr> elements.
 * @param {string} [noDataMessage='No data available.'] - Message when data is empty.
 */
const DataTable = ({
    fixedStartColumns = [],
    fixedEndColumns = [],
    dynamicColumnGroups = [],
    data = [],
    rowKeyField,
    onCellChange,
    containerClassName = "", // Removed defaults, controlled by parent
    tableClassName = "w-full border-collapse text-sm",
    headerClassName = "sticky top-0 bg-[#FFF9F6] z-10", // Example BOQ header bg
    rowClassName = "",
    noDataMessage = "No data available.",
}) => {

    // --- Render Header ---
    const renderTableHeader = () => {
        const topRow = [];
        const bottomRow = [];
        let totalLeafColumns = 0;

        // 1. Fixed Start Columns (Top Row)
        fixedStartColumns.forEach(col => {
            topRow.push(
                <th
                    key={col.dataKey}
                    rowSpan={2}
                    className={`p-2 border-r border-l border-gray-300 font-semibold text-sm ${col.headerAlign || col.align || 'text-left'} ${col.width || ''}`}
                    style={{ minWidth: col.minWidth || col.width || 'auto' }} // Added minWidth support
                >
                    {col.header}
                </th>
            );
            totalLeafColumns++;
        });

        // 2. Dynamic Group Columns (Top Row and Bottom Row)
        dynamicColumnGroups.forEach(group => {
            // Top row header (spanned)
            topRow.push(
                <th
                    key={`${group.dataKeyPrefix}-group`}
                    colSpan={2}
                    className={`p-2 border-r border-l border-gray-300 font-semibold text-sm text-center`} // Dynamic groups are centered
                >
                    {group.header}
                </th>
            );
            // Bottom row headers (QTY and Amount)
            bottomRow.push(
                <th
                    key={`${group.dataKeyPrefix}-qty`}
                    className={`p-2 border-r border-gray-300 font-semibold text-sm sticky top-[41px] bg-[#FFF9F6] z-10 ${group.qtyAlign || 'text-right'} ${group.qtyWidth || 'w-20'}`} // Default width/align
                    style={{ minWidth: group.qtyWidth || '5rem' }}
                >
                    QTY
                </th>
            );
            bottomRow.push(
                <th
                    key={`${group.dataKeyPrefix}-amount`}
                    className={`p-2 border-r border-gray-300 font-semibold text-sm sticky top-[41px] bg-[#FFF9F6] z-10 ${group.amountAlign || 'text-right'} ${group.amountWidth || 'w-24'}`} // Default width/align
                    style={{ minWidth: group.amountWidth || '6rem' }}
                >
                    Amount
                </th>
            );
            totalLeafColumns += 2;
        });

        // 3. Fixed End Columns (Top Row)
        fixedEndColumns.forEach(col => {
            topRow.push(
                <th
                    key={col.dataKey}
                    rowSpan={2}
                    className={`p-2 border-r border-l border-gray-300 font-semibold text-sm ${col.headerAlign || col.align || 'text-left'} ${col.width || ''}`}
                    style={{ minWidth: col.minWidth || col.width || 'auto' }}
                >
                    {col.header}
                </th>
            );
            totalLeafColumns++;
        });

        return {
            headerContent: (
                <>
                    <tr className="border-b border-gray-300">{topRow}</tr>
                    {bottomRow.length > 0 && <tr className="border-b-2 border-gray-400">{bottomRow}</tr>}
                </>
            ),
            totalLeafColumns
        };
    };

    const { headerContent, totalLeafColumns } = renderTableHeader();

    // --- Render Single Cell --- Helper Function
    const renderCellContent = (col, row, rowIndex, isDynamic = false, dynamicGroup = null) => {
        const dataKey = isDynamic ? `${dynamicGroup.dataKeyPrefix}_${col.subKey}` : col.dataKey;
        const cellValue = row[dataKey];
        const isEditable = isDynamic ? (dynamicGroup.editable !== false) : col.editable; // Dynamic defaults to true if not specified
        const alignClass = isDynamic ? (col.subKey === 'qty' ? (dynamicGroup.qtyAlign || 'text-right') : (dynamicGroup.amountAlign || 'text-right')) : (col.align || 'text-left');

        // Check for custom render function first (only for fixed columns)
        if (!isDynamic && typeof col.renderCell === 'function') {
            return <div className="p-2">{col.renderCell(cellValue, row, rowIndex)}</div>;
        }
        // Check if editable
        else if (isEditable && onCellChange) {
            return (
                <input
                    type={col.inputType || "text"}
                    value={cellValue ?? ''}
                    onChange={(e) => onCellChange(rowIndex, dataKey, e.target.value)}
                    className={`w-full h-full px-2 py-2 border border-transparent bg-transparent focus:border-gray-300 focus:bg-white outline-none ${alignClass}`}
                />
            );
        }
        // Otherwise, render plain text
        else {
            return (
                <div className={`p-2 whitespace-nowrap ${alignClass}`}>
                    {cellValue ?? ''}
                </div>
            );
        }
    };


    // --- Render Body ---
    const renderTableBody = () => {
        if (data.length === 0) {
            return (
                <tr>
                    <td
                        colSpan={totalLeafColumns} // Use calculated total leaf columns
                        className="text-center p-10 text-gray-500"
                    >
                        {noDataMessage}
                    </td>
                </tr>
            );
        }

        return data.map((row, rowIndex) => {
            const rowKey = rowKeyField && row[rowKeyField] !== undefined ? row[rowKeyField] : rowIndex;
            let computedRowClassName = "";
            if (typeof rowClassName === 'function') {
                computedRowClassName = rowClassName(row, rowIndex) || "";
            } else if (typeof rowClassName === 'string') {
                computedRowClassName = rowClassName;
            }

            const cells = [];

            // 1. Fixed Start Cells
            fixedStartColumns.forEach(col => {
                cells.push(
                    <td
                        key={`${rowKey}-${col.dataKey}`}
                        className={`p-0 border-r border-l border-gray-300 ${col.width || ''}`}
                        style={{ minWidth: col.minWidth || col.width || 'auto' }}
                    >
                        {renderCellContent(col, row, rowIndex)}
                    </td>
                );
            });

            // 2. Dynamic Group Cells
            dynamicColumnGroups.forEach(group => {
                // QTY Cell
                cells.push(
                    <td
                        key={`${rowKey}-${group.dataKeyPrefix}-qty`}
                        className={`p-0 border-r border-l border-gray-300 ${group.qtyWidth || 'w-20'}`}
                        style={{ minWidth: group.qtyWidth || '5rem' }}
                    >
                        {renderCellContent({ subKey: 'qty' }, row, rowIndex, true, group)}
                    </td>
                );
                // Amount Cell
                cells.push(
                    <td
                        key={`${rowKey}-${group.dataKeyPrefix}-amount`}
                        className={`p-0 border-r border-l border-gray-300 ${group.amountWidth || 'w-24'}`}
                        style={{ minWidth: group.amountWidth || '6rem' }}
                    >
                        {renderCellContent({ subKey: 'amount' }, row, rowIndex, true, group)}
                    </td>
                );
            });

            // 3. Fixed End Cells
            fixedEndColumns.forEach(col => {
                 cells.push(
                    <td
                        key={`${rowKey}-${col.dataKey}`}
                        className={`p-0 border-r border-l border-gray-300 ${col.width || ''}`}
                        style={{ minWidth: col.minWidth || col.width || 'auto' }}
                    >
                        {renderCellContent(col, row, rowIndex)}
                    </td>
                );
            });


            return (
                <tr key={rowKey} className={`border-b border-gray-200 hover:bg-gray-50 ${computedRowClassName}`}>
                    {cells}
                </tr>
            );
        });
    };

    return (
  <div className={`w-full overflow-x-auto ${containerClassName}`}>
    <table className="min-w-[1200px] border-collapse text-sm">
      <thead className={headerClassName}>
        {headerContent}
      </thead>
      <tbody>
        {renderTableBody()}
      </tbody>
    </table>
  </div>
);
};

export default DataTable;

