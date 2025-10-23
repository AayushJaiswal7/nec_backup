import { useState } from "react";
import CustomTable from "../../../../components/CustomTable";

const UserTable = () => {

    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 10;

    const columns = [
        {
            name: "S.No",
            selector: row => row.userId,
            sortable: true,
        },
        {
            name: "User ID",
            selector: row => row.userId,
            sortable: true,
        },
        {
            name: "User Name",
            selector: row => row.username,
            sortable: true,
        },
        {
            name: "Role",
            selector: row => row.role,
            sortable: true,
        },
        {
            name: "Branch",
            selector: row => row.branch,
            sortable: true,
        },
        {
            name: "Department",
            selector: row => row.department,
            sortable: true,
        },
        {
            name: "Site",
            selector: row => row.site,
            sortable: true,
        },
        {
            name: "Mail ID",
            selector: row => row.mailId,
            sortable: true,
        },
        {
            name: "Contact No.",
            selector: row => row.contactNo,
            sortable: true,
        },
        {
            name: "Valid From",
            selector: row => row.validFrom,
            sortable: true,
        },
        {
            name: "Valid To",
            selector: row => row.validTo,
            sortable: true,
        },
        {
            name: "Status",
            selector: row => row.status,
            sortable: true,
        },
        {
            name: "Action",
            selector: row => row.action,
            sortable: true,
        },
    ]

    const data = Array(15).fill().map((_, i) => ({
            userId: i + 1000,
            username: `User ${i + 1}`,
            role: "Role A",
            branch: "Branch A",
            department: "Department A",
            site: "Site A",
            mailId: `user${i + 1}@example.com`,
            contactNo: "1234567890",
            validFrom: "2023-01-01",
            validTo: "2023-06-30",
            status: "Active",
            action: "Edit",
        }));

    // Slice data for current page
    const paginatedData = data.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
    );


    return (
        <>
            <div>
                <div className="m-2 mt-5">
                    <CustomTable
                        data={paginatedData}
                        columns={columns}
                        paginationTotalRows={data.length}
                        paginationPerPage={rowsPerPage}
                        paginationDefaultPage={currentPage}
                        onChangePage={(page) => setCurrentPage(page)}
                    />
                </div>
            </div>
        </>

    )
}

export default UserTable;