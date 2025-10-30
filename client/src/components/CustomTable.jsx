import React from "react";
import DataTable from "react-data-table-component";
import CustomPagination from "./CustomPagination";

const CustomTable = ({
    data,
    columns,
    paginationPerPage = 10,
    paginationServer = false,
    paginationTotalRows,
    paginationDefaultPage = 1,
    onChangePage,
    onChangeRowsPerPage,
}) => {
    const customStyles = {
        tableWrapper: {
            style:
            {
                minHeight: "50vh"//height->minHeight

            }
        },

        rows: {
            style: {
                backgroundColor: "#fff",
                borderRadius: "2px",
                margin: "1px 0",
                boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
                minHeight: "50px",
            },
        },
        headRow: {
            style: {
                backgroundColor: "#FFEFE7",
                fontWeight: "bold",
                borderBottom: "none",
                color: "#374151",
                minHeight: "48px",
            },
        },
        headCells: {
            style: {
                fontSize: "14px",
                fontWeight: 600,
                paddingLeft: "16px",
                paddingRight: "16px",
                //added
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
                overflow: "hidden",
            },
        },
        cells: {
            style: {
                fontSize: "14px",
                fontWeight: 500,
                paddingLeft: "16px",
                paddingRight: "16px",
                //added
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
                overflow: "hidden",
            },
        },
        pagination: {
            style: {
                display: "none",
            },
        },
    };

    return (
        // <div className="relative flex flex-col h-[600px] max-h-[1000px]">
        <div className="relative flex flex-col text-sm sm:text-[15px] w-full">
            {/* 👇 critical wrapper for scroll on smaller screens */}
            <div
                className="w-full overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 hover:scrollbar-thumb-gray-500 rounded-lg"
            >
                <div className="min-w-[768px] lg:min-w-[1024px]">
                    {/* added div here */}
                    <DataTable
                        columns={columns}
                        data={data}
                        pagination={false}
                        customStyles={customStyles}
                        paginationServer={paginationServer}
                        paginationPerPage={paginationPerPage}
                        paginationTotalRows={paginationTotalRows}
                        paginationDefaultPage={paginationDefaultPage}
                        onChangePage={onChangePage}
                        onChangeRowsPerPage={onChangeRowsPerPage}
                        selectableRowsHighlight
                        persistTableHead
                        noDataComponent={
                            <div className="text-center py-40 text-sm text-green-800">
                                No records found.
                            </div>
                        }
                    />
                </div>
            </div>


            {paginationTotalRows > paginationPerPage && (
                <div className="relative border-t border-gray-300 p-3 bg-white">
                    <CustomPagination
                        rowsPerPage={paginationPerPage}
                        rowCount={paginationTotalRows}
                        onChangePage={onChangePage}
                        currentPage={paginationDefaultPage}
                    />
                </div>
            )}
        </div>
    );
};

export default CustomTable;
