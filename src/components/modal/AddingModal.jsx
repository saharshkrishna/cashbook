import { useState } from "react";
import PropTypes from "prop-types";

const AddEntryModal = ({ title, placeholder, onAdd, onClose }) => {
  const [newValue, setNewValue] = useState("");

  const handleAdd = () => {
    if (newValue.trim() !== "") {
      onAdd(newValue); // Pass the new value to the parent component
      setNewValue(""); // Clear the input
      onClose(); // Close the modal
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-1/3">
        <h2 className="text-xl font-semibold mb-4">{title}</h2>
        <input
          type="text"
          placeholder={placeholder}
          value={newValue}
          onChange={(e) => setNewValue(e.target.value)}
          className="w-full p-2 border rounded-lg mb-4"
        />
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={handleAdd}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

AddEntryModal.propTypes = {
  title: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  onAdd: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default AddEntryModal;