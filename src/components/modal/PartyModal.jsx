import { useState } from "react";
import PropTypes from "prop-types";

const PartyNameModal = ({ onClose, onAdd }) => {
  const [partyName, setPartyName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [partyType, setPartyType] = useState("Supplier"); // Default to "Supplier"

  const handleAdd = () => {
    if (partyName.trim() !== "") {
      onAdd({ partyName, phoneNumber, partyType }); // Pass the new party data
      setPartyName("");
      setPhoneNumber("");
      setPartyType("Supplier");
      onClose(); // Close the modal
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-1/3">
        <h2 className="text-xl font-semibold mb-4">Add Party Name</h2>
        <input
          type="text"
          placeholder="Enter Party Name"
          value={partyName}
          onChange={(e) => setPartyName(e.target.value)}
          className="w-full p-2 border rounded-lg mb-4"
        />
        <input
          type="text"
          placeholder="Enter Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="w-full p-2 border rounded-lg mb-4"
        />
        <select
          value={partyType}
          onChange={(e) => setPartyType(e.target.value)}
          className="w-full p-2 border rounded-lg mb-4"
        >
          <option value="Supplier">Supplier</option>
          <option value="Customer">Customer</option>
        </select>
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

PartyNameModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
};

export default PartyNameModal;