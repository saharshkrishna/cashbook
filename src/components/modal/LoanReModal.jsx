import { useState } from 'react';
import PropTypes from 'prop-types';
import { FiX, FiPlus } from 'react-icons/fi';
import PartyNameModal from './PartyModal';

const LoanReModal = ({  isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    // time: new Date().toLocaleTimeString('en-US', {
    //   hour: '2-digit',
    //   minute: '2-digit',
    //   hour12: true,
    // }),
    amount: '',
    interestRate: '',
    loanTerm: '', // in months
    emi: '',
    dueDate: '',
    partyName: '',
    remarks: '',
    paymentMode: 'Cash',
    type: 'LoanRe'
  });

  const [error, setError] = useState('');
  const [isPartyModalOpen, setIsPartyModalOpen] = useState(false);
  const [parties, setParties] = useState([]);

  // Calculate EMI when amount, interest rate, or loan term changes
//   useEffect(() => {
//     if (formData.amount && formData.interestRate && formData.loanTerm) {
//       const principal = parseFloat(formData.amount);
//       const ratePerMonth = parseFloat(formData.interestRate) / (12 * 100); // Convert annual rate to monthly
//       const numberOfPayments = parseFloat(formData.loanTerm);

//       // EMI = P * r * (1 + r)^n / ((1 + r)^n - 1)
//       const emi = (principal * ratePerMonth * Math.pow(1 + ratePerMonth, numberOfPayments)) /
//                  (Math.pow(1 + ratePerMonth, numberOfPayments) - 1);

//       setFormData(prev => ({
//         ...prev,
//         emi: emi.toFixed(2)
//       }));
//     }
//   }, [formData.amount, formData.interestRate, formData.loanTerm]);

//   // Calculate due date based on loan term
//   useEffect(() => {
//     if (formData.date && formData.loanTerm) {
//       const startDate = new Date(formData.date);
//       const dueDate = new Date(startDate.setMonth(startDate.getMonth() + parseInt(formData.loanTerm)));
//       setFormData(prev => ({
//         ...prev,
//         dueDate: dueDate.toISOString().split('T')[0]
//       }));
//     }
//   }, [formData.date, formData.loanTerm]);

  const handleAmountChange = (e) => {
    const value = e.target.value;
    if (value.startsWith('0') && value.length > 1) {
      setError('Amount cannot start with zero.');
      return;
    }
    setError('');
    setFormData(prev => ({ ...prev, amount: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.amount) {
      setError('Please fill in all required fields');
      return;
    }
    onSubmit(formData); // Call the onSubmit function with the form data
    onClose(); // Close the modal
  };

  const handleAddPartyName = (partyData) => {
    setParties((prev) => [...prev, partyData.partyName]);
    setFormData((prev) => ({
      ...prev,
      partyName: partyData.partyName,
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-end z-40">
      <div className="bg-white w-1/2 h-full overflow-hidden">
        <div className="sticky top-0 bg-white z-10 p-6 border-b">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Loan Rembursement Entry</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <FiX className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="overflow-y-auto h-[calc(100vh-80px)] p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                  className="w-full p-2 border rounded-lg"
                  required
                />
              </div>
              {/* <div>
                <label className="block text-sm font-medium text-gray-700">Time</label>
                <input
                  type="time"
                  value={formData.time}
                  onChange={(e) => setFormData(prev => ({ ...prev, time: e.target.value }))}
                  className="w-full p-2 border rounded-lg"
                />
              </div> */}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Loan Amount <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                placeholder="Enter loan amount"
                value={formData.amount}
                onChange={handleAmountChange}
                className="w-full p-2 border rounded-lg"
                required
              />
              {error && <div className="mt-1 text-sm text-red-500">{error}</div>}
            </div>

            {/* <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Interest Rate (% per year) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  step="0.01"
                  placeholder="Enter interest rate"
                  value={formData.interestRate}
                  onChange={(e) => setFormData(prev => ({ ...prev, interestRate: e.target.value }))}
                  className="w-full p-2 border rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Loan Term (months) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  placeholder="Enter loan term"
                  value={formData.loanTerm}
                  onChange={(e) => setFormData(prev => ({ ...prev, loanTerm: e.target.value }))}
                  className="w-full p-2 border rounded-lg"
                  required
                />
              </div>
            </div> */}

            {/* <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Monthly EMI
                </label>
                <input
                  type="text"
                  value={formData.emi}
                  className="w-full p-2 border rounded-lg bg-gray-50"
                  readOnly
                />
              </div> */}
              {/* <div>
                <label className="block text-sm font-medium text-gray-700">
                  Due Date
                </label>
                <input
                  type="date"
                  value={formData.dueDate}
                  className="w-full p-2 border rounded-lg bg-gray-50"
                  readOnly
                />
              </div> */}
            

            <div>
              <label className="block text-sm font-medium text-gray-700">Party Name (Contact)</label>
              <div className="flex gap-2">
                <select
                  value={formData.partyName}
                  onChange={(e) => setFormData((prev) => ({ ...prev, partyName: e.target.value }))}
                  className="w-1/3 p-2 border rounded-lg"
                >
                  <option value="">Search or Select</option>
                  {parties.map((party, index) => (
                    <option key={index} value={party}>
                      {party}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={() => setIsPartyModalOpen(true)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                >
                  <FiPlus />
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Remarks</label>
              <input
                type="text"
                placeholder="Enter additional details"
                value={formData.remarks}
                onChange={(e) => setFormData(prev => ({ ...prev, remarks: e.target.value }))}
                className="w-full p-2 border rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Payment Mode</label>
              <select
                value={formData.paymentMode}
                onChange={(e) => setFormData(prev => ({ ...prev, paymentMode: e.target.value }))}
                className="w-1/3 p-2 border rounded-lg"
              >
                <option value="Cash">Cash</option>
                <option value="Bank Transfer">Bank Transfer</option>
                <option value="Check">Check</option>
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <button
                type="button"
                className="px-4 py-2 bg-blue-500 text-white rounded-lg flex items-center gap-2"
              >
                📎 Attach Documents
              </button>
              <span className="text-sm text-gray-500">
                Attach loan agreement or other documents
              </span>
            </div>

            <div className="flex space-x-4">
            <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          Submit
        </button>
            </div>
          </form>
        </div>
      </div>
       {isPartyModalOpen && (
              <PartyNameModal
                onClose={() => setIsPartyModalOpen(false)}
                onAdd={handleAddPartyName}
              />
            )}
    </div>
  );
};

LoanReModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
};

export default LoanReModal;