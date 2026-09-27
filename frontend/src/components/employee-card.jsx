import { Card, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';

// Props: emp (employee ka data) aur onDelete (function jo parent se aata hai)
function EmployeeCard({ emp, onDelete }) {
  return (
    <Card className="h-100 shadow-sm">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-start mb-2">
          <Card.Title className="mb-0">{emp.name}</Card.Title>
          <Badge bg={emp.status === "Active" ? "success" : "secondary"}>
            {emp.status}
          </Badge>
        </div>

        <Card.Text className="text-muted mb-1" style={{ fontSize: "0.9rem" }}>
          {emp.email}
        </Card.Text>

        <hr />

        <div className="mb-1">
          <strong>Department:</strong> {emp.department}
        </div>
        <div className="mb-3">
          <strong>Role:</strong> {emp.role}
        </div>

        <div className="d-flex gap-2">
          <Link to={`/edit-employee/${emp.id}`} className="flex-fill">
            <Button variant="outline-primary" size="sm" className="w-100">
              Edit
            </Button>
          </Link>
          <Button 
            variant="outline-danger" 
            size="sm" 
            className="flex-fill"
            onClick={() => onDelete(emp.id)}
          >
            Delete
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default EmployeeCard;