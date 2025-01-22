import { useState } from "react";
import PropTypes from "prop-types";
import EntryDetails from "./modal/EntryDetails";
import LoanEntryModal from "./modal/LoanEntryModal"; // Import the LoanEntryModal
import Pagination from "./Pagination";

const Table = ({ tableData, updateEntry }) => {
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [isEntryDetailsOpen, setIsEntryDetailsOpen] = useState(false);
  const [isLoanEntryModalOpen, setIsLoanEntryModalOpen] = useState(false); // State for LoanEntryModal
  const [currentPage, setCurrentPage] = useState(1); // Pagination state
  const [selectedRows, setSelectedRows] = useState([]); // Track selected rows
  const rowsPerPage = 25; // Number of rows per page

  // Sort table data so that new entries appear at the top
  const sortedTableData = [...tableData].sort((a, b) => b.id - a.id);

  // Pagination logic
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = sortedTableData.slice(indexOfFirstRow, indexOfLastRow);

  // Handle row click to open details modal
  const handleRowClick = (entry) => {
    console.log("modal opening", entry);
    setSelectedEntry(entry);

    // Check the entry type and open the appropriate modal
    if (entry.type === "Loan") {
      setIsLoanEntryModalOpen(true); // Open LoanEntryModal for Loan entries
    } else {
      setIsEntryDetailsOpen(true); // Open EntryDetails for other entries
    }
  };

  // Handle row selection
  const handleRowSelect = (id) => {
    if (selectedRows.includes(id)) {
      // Deselect the row
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
    } else {
      // Select the row
      setSelectedRows([...selectedRows, id]);
    }
  };

  // Handle "Select All" functionality
  const handleSelectAll = () => {
    if (selectedRows.length === currentRows.length) {
      // Deselect all rows
      setSelectedRows([]);
    } else {
      // Select all rows in the current page
      setSelectedRows(currentRows.map((row) => row.id));
    }
  };

  // Handle delete selected rows
  const handleDeleteSelected = () => {
    // Filter out the selected rows from the table data
    const updatedTableData = tableData.filter(
      (row) => !selectedRows.includes(row.id)
    );
    updateEntry(updatedTableData); // Update the table data
    setSelectedRows([]); // Clear selected rows
  };

  return (
    <div className="bg-white rounded-lg shadow-sm">
      {/* Delete Button (Visible when rows are selected) */}
      {selectedRows.length > 0 && (
        <div className="p-4 bg-red-50 border-b border-red-200">
          <button
            onClick={handleDeleteSelected}
            className="px-4 py-2 bg-red-500 text-white rounded-lg"
          >
            Delete Selected ({selectedRows.length})
          </button>
        </div>
      )}

      {/* Pagination */}
      <Pagination
        totalRows={sortedTableData.length}
        rowsPerPage={rowsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />

      {/* Table */}
      <table className="w-full">
        <thead>
          <tr className="text-left bg-gray-50">
            <th className="p-4">
              {/* Select All Checkbox */}
              <input
                type="checkbox"
                checked={selectedRows.length === currentRows.length}
                onChange={handleSelectAll}
              />
            </th>
            <th className="p-4">Date</th>
            <th className="p-4">Category</th>
            <th className="p-4">Type</th>
            <th className="p-4">Bill</th>
            <th className="p-4">Details</th>
            <th className="p-4">Amount</th>
          </tr>
        </thead>
        <tbody>
          {currentRows.map((entry) => (
            <tr
              key={entry.id}
              className="border-t hover:bg-gray-50 cursor-pointer"
              onClick={() => handleRowClick(entry)} // Handle row click
            >
              <td className="p-4" onClick={(e) => e.stopPropagation()}>
                <input
                  type="checkbox"
                  checked={selectedRows.includes(entry.id)}
                  onChange={() => handleRowSelect(entry.id)}
                />
              </td>
              <td className="p-4">
                <div>{entry.date}</div>
                {/* <div className="text-sm text-gray-500">{entry.time}</div> */}
              </td>
              
              <td className="p-4">{entry.category}</td>
              <td className="p-4">{entry.type}</td>
              
              <td className="p-4">
                 {entry.bills && entry.bills.length > 0 ? (
                <div className="flex items-center gap-1">
                  <span>📎</span> {/* Icon for attached bills */}
                  <span className="text-sm text-gray-500">({entry.bills.length})</span> {/* Number of files */}
                 </div>
                  ) : null}
              </td>
              <td className="p-4">
                <div>{entry.partyName} ({entry.partyType})</div> {/* Display party name and type */}
                <div className="text-sm text-gray-500">{entry.details}</div>
              </td>
              <td
                className={`p-4 ${
                  entry.type === "Cash Out" ? "text-red-600" : "text-green-600"
                }`}
              >
                {entry.amount}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Entry Details Modal */}
      {selectedEntry && selectedEntry.type !== "Loan" && (
        <EntryDetails
          isOpen={isEntryDetailsOpen}
          onClose={() => setIsEntryDetailsOpen(false)}
          title="Entry Details"
          entry={selectedEntry}
          onEdit={(updatedEntry) => {
            updateEntry(updatedEntry);
            setIsEntryDetailsOpen(false);
          }}
        />
      )}

      {/* Loan Modal */}
      {selectedEntry && selectedEntry.type === "Loan" && (
        <LoanEntryModal
          isOpen={isLoanEntryModalOpen}
          onClose={() => setIsLoanEntryModalOpen(false)}
          entry={selectedEntry}
          title="Loan Details"
          onEdit={(updatedEntry) => {
            updateEntry(updatedEntry);
            setIsLoanEntryModalOpen(false);
          }}
        />
      )}
    </div>
  );
};

Table.propTypes = {
  tableData: PropTypes.array.isRequired,
  updateEntry: PropTypes.func.isRequired,
};

export default Table;