import { useEffect, useState } from 'react';
import { Button, Row, Col, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EmployeeCard from './employee-card';
import { getAllEmployees, deleteEmployee } from '../services/employeeApi';

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAllEmployees();
      setEmployees(data);
    } catch (err) {
      console.error("Error:", err.message);
      setError("Employees ki list load nahi ho saki");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Kya aap sach me is employee ko delete karna chahti hain?");
    if (!confirmDelete) return;

    try {
      await deleteEmployee(id);
      toast.success("Employee delete ho gaya");
      fetchEmployees();
    } catch (err) {
      console.error("Error:", err.message);
      toast.error("Delete nahi ho saka");
    }
  };

  const filteredEmployees = employees.filter((emp) => {
    const search = searchTerm.toLowerCase();
    return (
      emp.name?.toLowerCase().includes(search) ||
      emp.email?.toLowerCase().includes(search) ||
      emp.department?.toLowerCase().includes(search) ||
      emp.role?.toLowerCase().includes(search)
    );
  });

  if (loading) return <div className="container mt-4">Loading...</div>;
  if (error) return <div className="container mt-4 text-danger">{error}</div>;

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Employee List</h2>
        <Link to="/create-employee">
          <Button variant="primary">+ Create Employee</Button>
        </Link>
      </div>

      <Form.Control
        type="text"
        placeholder="Search by name, email, department or role..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4"
      />

      {filteredEmployees.length > 0 ? (
        <Row xs={1} sm={2} md={3} lg={4} className="g-4">
          {filteredEmployees.map((emp) => (
            <Col key={emp.id}>
              {/* Props yahan pass ho rahe hain: emp aur handleDelete function */}
              <EmployeeCard emp={emp} onDelete={handleDelete} />
            </Col>
          ))}
        </Row>
      ) : (
        <p className="text-center text-muted mt-5">
          {searchTerm ? "Koi match nahi mila" : "No employees found"}
        </p>
      )}
    </div>
  );
}

export default EmployeeList;