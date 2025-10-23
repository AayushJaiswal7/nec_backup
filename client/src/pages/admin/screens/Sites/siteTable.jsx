import { useState } from "react";
import { SquarePen ,Trash2 } from "lucide-react";

import CustomTable from "../../../../components/CustomTable";

const SiteTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;
  const [sites, setSites] = useState([
    {
      siteId: 1,
      siteCode: 53522,
      siteName: "John Peterson",
      branch: "Banglore",
      siteManager: "John Paul",
      siteAddress: "4, Avanue Street",
      city: "Chennai",
      state: "Tamil Nadu",
      postalCode: "600019",
      country: "India",
      gpsLocation: "21:829;3432",
    },
  ]);
  const handleDelete = (id) => {
    setSites(sites.filter((r) => r.siteId !== id));
  };

  const columns = [
    {
      name: "S.No",
      selector: (row) => row.siteId,
      sortable: true,
    },
    {
      name: "Site Code",
      selector: (row) => row.siteCode,
      sortable: true,
    },
    {
      name: "Site Name",
      selector: (row) => row.siteName,
      sortable: true,
    },
    {
      name: "Branch",
      selector: (row) => row.branch,
      sortable: true,
    },
    {
      name: "Site Manager",
      selector: (row) => row.siteManager,
      sortable: true,
    },
    {
      name: "Site Address",
      selector: (row) => row.siteAddress,
      sortable: true,
    },
    {
      name: "City",
      selector: (row) => row.city,
      sortable: true,
    },
    {
      name: "State",
      selector: (row) => row.state,
      sortable: true,
    },
    {
      name: "Postal Code",
      selector: (row) => row.postalCode,
      sortable: true,
    },
    {
      name: "Country",
      selector: (row) => row.country,
      sortable: true,
    },
    {
      name: "GPS Location",
      selector: (row) => row.gpsLocation,
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="flex justify-center gap-3">
          <button className="text-orange-600 hover:text-orange-800">
            <SquarePen size={18} />
          </button>
          <button
            onClick={() => handleDelete(row.siteId)}
            className="text-red-500 hover:text-red-700"
          >
            <Trash2 size={18} />
          </button>
        </div>
      ),
      width: "120px",
    },
  ];

  const paginatedData = sites.slice(
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
            paginationTotalRows={sites.length}
            paginationPerPage={rowsPerPage}
            paginationDefaultPage={currentPage}
            onChangePage={(page) => setCurrentPage(page)}
          />
        </div>
      </div>
    </>
  );
};
export default SiteTable;
