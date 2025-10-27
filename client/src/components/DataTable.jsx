import React, { useMemo } from 'react';

/**
 * Reusable DataTable Component
 *
 * Renders a table based on column definitions and data.
 * Supports column visibility (visible by default unless explicitly false),
 * editable cells (via callback), custom cell rendering, and custom header rendering.
 *
 * @param {object[]} columns - Array of column definition objects. Required.
 * @param {string} columns[].header - Text for the table header (<th>). Required.
 * @param {string} columns[].dataKey - Key in data objects for cell value. Required.
 * @param {boolean} [columns[].visible=true] - Set to false to hide the column. Columns are visible by default.
 * @param {boolean} [columns[].editable=false] - If true and onCellChange is provided, renders cell as input.
 * @param {string} [columns[].width] - Tailwind width class for the column (<th> and <td>).
 * @param {string} [columns[].align='text-left'] - Tailwind text align for cell content (<td>).
 * @param {string} [columns[].headerAlign] - Tailwind text align for header (<th>). Defaults to `align`.
 * @param {function} [columns[].renderCell] - Custom render function `(value, row, rowIndex)` for cell content. Overrides `editable`.
 * @param {(object|function)} [columns[].cellProps] - Additional props for the <td> element. Can be an object or `(value, row, rowIndex) => object`.
 * @param {(object|function)} [columns[].headerProps] - Additional props for the <th> element. Can be an object or `(column) => object`.
 * @param {object[]} data - Array of data objects for rows. Required.
 * @param {string} [rowKeyField] - Property name in data objects for unique row key. Defaults to rowIndex.
 * @param {function} [onCellChange] - Callback `(rowIndex, dataKey, newValue)` when an editable cell changes. Required if any column is `editable`.
 * @param {function} [renderHeader] - Function `(visibleColumns) => JSX` to render the entire `<thead>` content. Use for complex/nested headers.
 * @param {string} [containerClassName] - CSS classes for the wrapping div container.
 * @param {string} [tableClassName] - CSS classes for the <table> element.
 * @param {string} [headerClassName] - CSS classes for the <thead> element.
 * @param {(string|function)} [rowClassName] - CSS classes for <tbody> <tr> elements. Can be string or `(row, rowIndex) => string`.
 * @param {string} [noDataMessage='No data available.'] - Message when data is empty.
 */
const DataTable = ({
  columns = [],
  data = [],
  rowKeyField,
  onCellChange,
  renderHeader,
  containerClassName = "overflow-auto border border-gray-200 rounded-md", // Default container styles
  tableClassName = "w-full border-collapse text-sm",                 // Default table styles
  headerClassName = "sticky top-0 bg-gray-100 z-10",                  // Default header styles
  rowClassName = "",
  noDataMessage = "No data available.",
}) => {

  // Filter columns based on the 'visible' property (defaults to true if missing)
  const visibleColumns = useMemo(() => columns.filter(col => col.visible !== false), [columns]);

  // --- Render Header ---
  const renderTableHeader = () => {
    // Use custom renderer if provided
    if (renderHeader && typeof renderHeader === 'function') {
      // Pass only the *visible* columns to the custom header renderer
      return renderHeader(visibleColumns);
    }

    // Default simple header (single row)
    return (
      <tr className="border-b border-gray-300">
        {visibleColumns.map((col) => {
          const headerProps = typeof col.headerProps === 'function' ? col.headerProps(col) : col.headerProps || {};
          return (
            <th
              key={col.dataKey}
              className={`p-0 border-r border-l border-gray-300 ${col.align || 'text-left'}`}
              style={{ width: col.width ? col.width : 'auto', minWidth: col.minWidth || col.width || 'auto' }}
            >
              {col.header}
            </th>
          );
        })}
      </tr>
    );
  };
  

  // --- Render Body ---
  const renderTableBody = () => {
    if (data.length === 0) {
      return (
        <tr>
          <td
            colSpan={visibleColumns.length} // Span across only visible columns
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


      return (
        <tr key={rowKey} className={`border-b border-gray-200 hover:bg-gray-50 ${computedRowClassName}`}>
          {/* Map over only visible columns for data cells */}
          {visibleColumns.map((col) => {
            const cellValue = row[col.dataKey];
            const cellProps = typeof col.cellProps === 'function' ? col.cellProps(cellValue, row, rowIndex) : col.cellProps || {};

            return (
              <td
                key={`${rowKey}-${col.dataKey}`}
                className={`p-0 border-r border-l border-gray-300 ${col.width || ''} ${col.align || 'text-left'}`} // Padding moved to inner elements
                {...cellProps}
              >
                {/* Apply padding directly to the content wrapper or input */}
                {typeof col.renderCell === 'function' ? (
                  <div className="p-2"> {/* Add padding wrapper for custom render */}
                    {col.renderCell(cellValue, row, rowIndex)}
                  </div>
                ) : col.editable && onCellChange ? ( // Check if editable AND handler exists
                  <input
                    type={col.inputType || "text"} // Allow specifying input type in column def
                    value={cellValue ?? ''} // Handle null/undefined values gracefully
                    onChange={(e) => onCellChange(rowIndex, col.dataKey, e.target.value)}
                    className={`w-full h-full px-2 py-2 border border-transparent bg-transparent focus:border-gray-300 focus:bg-white outline-none ${col.align || 'text-left'}`} // Apply alignment to input too, ensure it fills cell
                  // Add other input props like onBlur, disabled if needed via cellProps potentially
                  />
                ) : (
                  <div className="p-2 whitespace-nowrap">
                    {cellValue ?? ''}
                  </div>
                )}
              </td>
            );
          })}
        </tr>
      );
    });
  };

  return (
    <div className={`w-full  min-w-0 ${containerClassName || ''}`}>
      <div className="w-full overflow-x-auto">
        <table className={`${tableClassName} `}>
          <thead className={headerClassName}>
            {renderTableHeader()}
          </thead>
          <tbody>{renderTableBody()}</tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;

