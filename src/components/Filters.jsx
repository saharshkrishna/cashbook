import { useState } from "react";
import PropTypes from "prop-types";
import DateModal from "./modal/DateModal"; // Import the modal

const Filters = ({ tableData, onFilterChange }) => {
  const [selectedDuration, setSelectedDuration] = useState("All Time");
  const [selectedType, setSelectedType] = useState("All");
  const [selectedParty, setSelectedParty] = useState("All");
  // const [selectedMember, setSelectedMember] = useState("All");
  const [selectedPaymentMode, setSelectedPaymentMode] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isDateModalOpen, setIsDateModalOpen] = useState(false); // State for modal visibility
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Extract unique values for dropdown options
  const uniqueParties = [...new Set(tableData.map((entry) => entry.partyName))];
  // const uniqueMembers = [...new Set(tableData.map((entry) => entry.member))];
  const uniquePaymentModes = [...new Set(tableData.map((entry) => entry.paymentMode))];
  const uniqueCategories = [...new Set(tableData.map((entry) => entry.category))];

  // Handle filter changes
  const handleFilterChange = (filterType, value) => {
    switch (filterType) {
      case "duration":
        setSelectedDuration(value);
        if (value === "Custom Range") {
          setIsDateModalOpen(true); // Open the modal when "Custom Range" is selected
        } else {
          // Reset dates if duration is not "Custom Range"
          setStartDate("");
          setEndDate("");
          onFilterChange({
            duration: value,
            type: selectedType,
            party: selectedParty,
            // member: selectedMember,
            paymentMode: selectedPaymentMode,
            category: selectedCategory,
            startDate: "",
            endDate: "",
          });
        }
        break;
      case "type":
        setSelectedType(value);
        break;
      case "party":
        setSelectedParty(value);
        break;
      // case "member":
      //   setSelectedMember(value);
      //   break;
      case "paymentMode":
        setSelectedPaymentMode(value);
        break;
      case "category":
        setSelectedCategory(value);
        break;
      default:
        break;
    }

    // Pass the updated filters to the parent component
    onFilterChange({
      duration: filterType === "duration" ? value : selectedDuration,
      type: filterType === "type" ? value : selectedType,
      party: filterType === "party" ? value : selectedParty,
      // member: filterType === "member" ? value : selectedMember,
      paymentMode: filterType === "paymentMode" ? value : selectedPaymentMode,
      category: filterType === "category" ? value : selectedCategory,
      startDate: filterType === "duration" && value === "Custom Range" ? startDate : "",
      endDate: filterType === "duration" && value === "Custom Range" ? endDate : "",
    });
  };

 // Handle date selection from the modal
 const handleDateSelection = ({ startDate, endDate }) => {
  setStartDate(startDate);
  setEndDate(endDate);
  setSelectedDuration("Custom Range"); // Update duration to "Custom Range"

    // Pass the selected dates to the parent component
    onFilterChange({
      duration: "Custom Range",
      type: selectedType,
      party: selectedParty,
      // member: selectedMember,
      paymentMode: selectedPaymentMode,
      category: selectedCategory,
      startDate,
      endDate,
    });
    setIsDateModalOpen(false); // Close the modal
  };

  const handleDurationChange = (e) => {
    const value = e.target.value;
    setSelectedDuration(value);
    if (value === "Custom Range") {
      setIsDateModalOpen(true);
    } else {
      onFilterChange({ duration: value, startDate: "", endDate: "" });
    }
  };

  const handleDateModalClose = () => {
    setIsDateModalOpen(false);
  };

  // Display the selected date range or single date inside the duration dropdown button
  const getDurationLabel = () => {
    if (selectedDuration === "Custom Range" && startDate && endDate) {
      return `Custom Range: ${startDate} to ${endDate}`;
    }
    return `Duration: ${selectedDuration}`;
  };

  return (
    <div>
      {/* Filters */}
      <div className="grid grid-cols-6 gap-2 mb-4">
        {/* Duration Filter */}
        
        <div className="flex flex-col">
          <select
            className="p-1 border rounded-lg"
            value={selectedDuration}
            onChange={handleDurationChange}
          >
            <option value="All Time">Duration: All</option>
            <option value="Last 7 Days">Last 7 Days</option>
            <option value="Last 30 Days">Last 30 Days</option>
            <option value="Last 90 Days">Last 90 Days</option>
            <option value="Custom Range">custom range</option>
          </select>
        </div>


        {/* Type Filter */}
        <select
          className="p-1 border rounded-lg"
          value={selectedType}
          onChange={(e) => handleFilterChange("type", e.target.value)}
        >
          <option value="All">Types: All</option>
          <option value="Cash In">Cash In</option>
          <option value="Cash Out">Cash Out</option>
          <option value="Credit">Credit</option>
          <option value="Loan">Loan</option>
          <option value="LoanRe">Loan Re</option>
        </select>

        {/* Party Filter */}
        <select
          className="p-1 border rounded-lg"
          value={selectedParty}
          onChange={(e) => handleFilterChange("party", e.target.value)}
        >
          <option value="All">Parties: All</option>
          {uniqueParties.map((party, index) => (
            <option key={index} value={party}>
              {party}
            </option>
          ))}
        </select>

        {/* Member Filter */}
        {/* <select
          className="p-1 border rounded-lg"
          value={selectedMember}
          onChange={(e) => handleFilterChange("member", e.target.value)}
        >
          <option value="All">Members: All</option>
          {uniqueMembers.map((member, index) => (
            <option key={index} value={member}> 
              {member}
            </option>
          ))}
        </select> */}

        {/* Payment Mode Filter */}
        <select
          className="p-1 border rounded-lg"
          value={selectedPaymentMode}
          onChange={(e) => handleFilterChange("paymentMode", e.target.value)}
        >
          <option value="All">Payment: All</option>
          {uniquePaymentModes.map((mode, index) => (
            <option key={index} value={mode}>
              {mode}
            </option>
          ))}
        </select>

        {/* Category Filter */}
        <select
          className="p-1 border rounded-lg"
          value={selectedCategory}
          onChange={(e) => handleFilterChange("category", e.target.value)}
        >
          <option value="All">Categories: All</option>
          {uniqueCategories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <DateModal
        isOpen={isDateModalOpen}
        onClose={handleDateModalClose}
        onApply={handleDateSelection}
        startDate={startDate}
        endDate={endDate}
      />
    </div>
  );
};

Filters.propTypes = {
  tableData: PropTypes.array.isRequired,
  onFilterChange: PropTypes.func.isRequired,
};

export default Filters;