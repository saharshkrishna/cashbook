// DataContext.jsx
import { createContext, useState, useEffect } from "react";
import PropTypes from 'prop-types';
import axios from "axios";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [parties, setParties] = useState([]);
  const [categories, setCategories] = useState([]);
  const [paymentModes, setPaymentModes] = useState([]);
  const [loans, setLoans] = useState([]); // 🆕 Loans state
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [partiesResponse, categoriesResponse, paymentModesResponse] = await Promise.all([
          axios.get("http://localhost:5000/api/user/parties"),
          axios.get("http://localhost:5000/api/user/category"),
          axios.get("http://localhost:5000/api/user/paymentmode"),
        ]);
  
        setParties(partiesResponse.data.parties || []);
        setCategories(categoriesResponse.data.category || []);
        setPaymentModes(paymentModesResponse.data.paymentMode || []);
      } catch (err) {
        console.error("Error fetching shared data:", err);
        setError("Error fetching data");
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, []);

  
// 🆕 Loan-related APIs
const fetchLoans = async () => {
  try {
    const response = await axios.get("http://localhost:5000/api/user/loans");
    setLoans(response.data.loans || []);
  } catch (err) {
    console.error("Error fetching loans:", err);
  }
};

const createLoan = async (loanData) => {
  try {
    const response = await axios.post("http://localhost:5000/api/user/loans", loanData);
    setLoans((prevLoans) => [response.data.loan, ...prevLoans]); // Add newly created loan
  } catch (err) {
    console.error("Error creating loan:", err);
  }
};

const updateLoan = async (id, updatedData) => {
  try {
    const response = await axios.put(`http://localhost:5000/api/user/loans/${id}`, updatedData);
    setLoans((prevLoans) =>
      prevLoans.map((loan) => (loan._id === id ? response.data.loan : loan))
    );
  } catch (err) {
    console.error("Error updating loan:", err);
  }
};

const deleteLoan = async (ids) => {
  try {
    await axios.delete("http://localhost:5000/api/user/loans", { data: { ids } });
    setLoans((prevLoans) => prevLoans.filter((loan) => !ids.includes(loan._id)));
  } catch (err) {
    console.error("Error deleting loans:", err);
  }
};

return (
  <DataContext.Provider
    value={{
      parties, setParties,
      categories, setCategories,
      paymentModes, setPaymentModes,
      loans, setLoans,
      loading, error,
      fetchLoans, createLoan, updateLoan, deleteLoan, // 🆕 Expose loan functions
    }}
  >
    {children}
  </DataContext.Provider>
);
};

DataProvider.propTypes = {
children: PropTypes.node.isRequired,
};

