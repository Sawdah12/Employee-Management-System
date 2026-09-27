import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getEmployeeById, createEmployee, updateEmployee } from '../services/employeeApi';


function EmployeeForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("Active");
  const [loading, setLoading] = useState(isEditMode);

  useEffect(() => {
    if (isEditMode) {
      getEmployeeById(id)
        .then((data) => {
          setName(data.name);
          setEmail(data.email);
          setDepartment(data.department);
          setRole(data.role);
          setStatus(data.status);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error:", err.message);
          toast.error("Employee ka data nahi mil saka");
          setLoading(false);
        });
    }
  }, [id, isEditMode]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const employeeData = { name, email, department, role, status };

    try {
      if (isEditMode) {
        await updateEmployee(id, employeeData);
        toast.success("Employee update ho gaya!");
      } else {
        await createEmployee(employeeData);
        toast.success("Employee successfully created!");
      }
      navigate('/employee');
    } catch (err) {
      console.error("Error:", err.message);
      toast.error(isEditMode ? "Update nahi ho saka" : "Data save nahi ho saka");
    }
  };

  const handleCancel = () => {
    navigate('/employee');
  };

  if (loading) return <div className="container mt-4">Loading...</div>;

  return (
    <div className="container mt-4">
      <h2>{isEditMode ? "Edit Employee" : "Create Employee"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name:</label>
          <input 
            type="text" 
            className="form-control" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Email:</label>
          <input 
            type="email" 
            className="form-control" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Department:</label>
          <input 
            type="text" 
            className="form-control" 
            value={department} 
            onChange={(e) => setDepartment(e.target.value)} 
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Role:</label>
          <input 
            type="text" 
            className="form-control" 
            value={role} 
            onChange={(e) => setRole(e.target.value)} 
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Status:</label>
          <select 
            className="form-select" 
            value={status} 
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        <div className="d-flex gap-2">
          <button type="submit" className="btn btn-primary">
            {isEditMode ? "Save Changes" : "Create"}
          </button>
          <button type="button" className="btn btn-secondary" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default EmployeeForm;