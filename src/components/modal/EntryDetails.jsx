import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import CashinModal from "./CashinModal";
import CashoutModal from "./CashoutModal";
import DebitModal from "./DebitModal";
import CreditModal from "./CreditModal";

const EntryDetails = ({ isOpen, onClose, entry, onEdit }) => {
  const [modalToOpen, setModalToOpen] = useState(null);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen && entry) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    // Cleanup function
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose, entry]);

  const handleEditClick = () => {
    // Determine which modal to open based on the entry type
    switch (entry.type) {
      case "Cash In":
        setModalToOpen("CashinModal");
        break;
      case "Cash Out":
        setModalToOpen("CashoutModal");
        break;
      case "Debit":
        setModalToOpen("DebitModal");
        break;
      case "Credit":
        setModalToOpen("CreditModal");
        break;
      default:
        setModalToOpen(null);
    }
  };

  const handleModalClose = () => {
    setModalToOpen(null); // Close the modal
  };

  const handleSave = (updatedEntry) => {
    onEdit(updatedEntry); // Pass the updated entry to the parent component
    setModalToOpen(null); // Close the modal
  };

  if (!isOpen || !entry) return null;


  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-end items-start z-50"
      onClick={onClose} // Close modal when clicking outside
    >
      <div
        className="bg-white w-1/2 h-full overflow-y-auto p-6"
        onClick={(e) => e.stopPropagation()} // Prevent clicks inside the modal from closing it
      >
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <span
              className={`flex items-center gap-1 font-medium ${
                entry.type === "Cash In"
                  ? 'before:content-["+"] before:text-success'
                  : ""
              }`}
            >
              {entry.type}
            </span>
            <span className="text-gray-500">{entry.date}</span>
            <span className="text-success bg-success-light p-1 rounded-full">
              ✓
            </span>
          </div>
          <div className="text-3xl font-medium text-gray-900">
            {entry.amount}
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-gray-500 mb-1">Party Name</label>
            <div className="flex gap-2">
              <span>{entry.partyName}</span>
              <span className="text-gray-500">({entry.partyType})</span>
            </div>
          </div>

          <div>
            <label className="block text-gray-500 mb-1">Remark</label>
            <div>{entry.remark}</div>
          </div>

          <div className="flex gap-2 my-4">
            {entry.tags &&
              entry.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-gray-100 text-primary px-3 py-1 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
          </div>
           {/* Display Attached Files */}
            {entry.bills && entry.bills.length > 0 && (
              <div>
                <label className="block text-gray-500 mb-1">Attached Bills</label>
                <div className="flex flex-wrap gap-2">
                  {entry.bills.map((file, index) => (
                    <div key={index} className="flex items-center gap-2 bg-gray-100 p-2 rounded-lg">
                      <span>📎</span> {/* Icon for the file */}
                      <span className="text-sm text-gray-700">{file.name}</span> {/* File name */}
                      {/* Optional: Add a button to view/download the file */}
                      <button
                        onClick={() => window.open(URL.createObjectURL(file), "_blank")}
                        className="text-sm text-blue-500 hover:underline"
                      >
                        View
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

        <div className="my-6">
          <h3 className="text-base font-medium mb-4">Activities</h3>
          <div className="space-y-4">
            <div className="flex gap-3">
              <span className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center">
                +
              </span>
              <div>
                <div>Created by {entry.createdBy}</div>
                <div className="text-gray-500 text-sm">
                  On {entry.createdAt}
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <span className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center">
                ✎
              </span>
              <div>
                <div>Last Updated by {entry.lastUpdatedBy}</div>
                <div className="text-gray-500 text-sm">
                  On {entry.lastUpdatedAt}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between pt-4 border-t border-gray-200">
            <button className="flex items-center gap-2 text-danger px-4 py-2">
              <span>🗑</span>
              Delete
            </button>
            <div className="flex gap-2">
              <button
                className="py-2 px-4 border border-gray-200 rounded"
                onClick={handleEditClick}
              >
                <span>✎</span>
                Edit
              </button>
            </div>
          </div>
        </div>

      {/* Render the appropriate modal based on modalToOpen */}
      {modalToOpen === "CashinModal" && (
        <CashinModal
          onClose={handleModalClose}
          type={entry.type}
          onSubmit={handleSave}
          initialData={entry} // Pass the entry data to pre-fill the form
        />
      )}

      {modalToOpen === "CashoutModal" && (
        <CashoutModal
          onClose={handleModalClose}
          type={entry.type}
          onSubmit={handleSave}
          initialData={entry} // Pass the entry data to pre-fill the form
        />
      )}

      {modalToOpen === "DebitModal" && (
        <DebitModal
          onClose={handleModalClose}
          type={entry.type}
          onSubmit={handleSave}
          initialData={entry} // Pass the entry data to pre-fill the form
        />
      )}

      {modalToOpen === "CreditModal" && (
        <CreditModal
          onClose={handleModalClose}
          type={entry.type}
          onSubmit={handleSave}
          initialData={entry} // Pass the entry data to pre-fill the form
        />
      )}
    </div>
  );
};

EntryDetails.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  entry: PropTypes.object,
  onEdit: PropTypes.func.isRequired,
};

export default EntryDetails;

