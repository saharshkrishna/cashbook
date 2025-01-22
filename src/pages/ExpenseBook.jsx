import { useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import Filters from "../components/Filters";
import SearchAndActions from "../components/SearchAndActnbtn";
import Summary from "../components/Summary";
import Table from "../components/Table";

const ExpenseBook = () => {
  const [tableData, setTableData] = useState([
    // Example data
    {
      id: 1,
      date: "2023-10-01",
      time: "10:00 AM",
      details: "Sample Entry",
      category: "Sample Category",
      paymentMode: "Cash",
      bill: "12345",
      amount: "100",
      balance: "500",
      type: "Cash In",
      bills: [
        { name: "", file: null },
        { name: "", file: null },
      ],
    },
    {
    id: 2,
      date: "2023-10-01",
      time: "10:00 AM",
      details: "Sample Entry",
      category: "Sample Category",
      paymentMode: "Credit",
      bill: "12345",
      amount: "100",
      balance: "500",
      type: "Credit",
    },
    // Add more entries as needed
  ]);

  const [filteredData, setFilteredData] = useState(tableData);

  // Function to add a new entry to the table
  const addEntry = async (entry) => {
    console.log("Added data to table",entry)
    try {
      const response = await axios.post("http://localhost:5000/api/user/transactions", entry);
      const newEntry = { ...entry, id: Date.now() };
    setTableData((prevData) => [...prevData, newEntry]);
    setFilteredData((prevData) => [...prevData, newEntry]);
      console.log(response.data.message);
  } catch (error) {
      console.error("Error creating transaction:", error);
  }
    
  };

  // Function to update an existing entry
  const updateEntry = (updatedEntry) => {
    setTableData((prevData) =>
      prevData.map((entry) =>
        entry.id === updatedEntry.id ? updatedEntry : entry
      )
    );
    setFilteredData((prevData) =>
      prevData.map((entry) =>
        entry.id === updatedEntry.id ? updatedEntry : entry
      )
    );
  };

  // Handle filter changes
  const handleFilterChange = (filters) => {
    const filtered = tableData.filter((entry) => {
      return (
        (filters.duration === "All Time" || entry.duration === filters.duration) && // Add duration logic if needed
        (filters.type === "All" || entry.type === filters.type) &&
        (filters.party === "All" || entry.partyName === filters.party) &&
        (filters.member === "All" || entry.member === filters.member) &&
        (filters.paymentMode === "All" || entry.paymentMode === filters.paymentMode) &&
        (filters.category === "All" || entry.category === filters.category)
      );
    });
    setFilteredData(filtered);
  };

  return (
    <div>
      <Header />
       {/* Pass filters and handleFilterChange to Filters component */}
       <Filters tableData={tableData} onFilterChange={handleFilterChange} />
      <SearchAndActions addEntry={addEntry} />
      {/* Pass filters and tableData to Summary component */}
      <Summary tableData={tableData} filters={filteredData} />
      <Table tableData={filteredData} updateEntry={updateEntry} />
    </div>
  );
};

export default ExpenseBook;