// backend/server.js

const express = require('express');
const cors = require('cors');
const pool = require('./db');

const app = express();

app.use(cors());
app.use(express.json());

// 1. Employee SAVE karne ki API
app.post('/api/employees', async (req, res) => {
  try {
    const { name, email, department, role, status } = req.body;
    const newEmployee = await pool.query(
      `INSERT INTO employees (name, email, department, role, status) 
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [name, email, department, role, status]
    );
    res.json(newEmployee.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Data save nahi ho saka" });
  }
});

// 2. Employees LIST lane ki API
app.get('/api/employees', async (req, res) => {
  try {
    const allEmployees = await pool.query("SELECT * FROM employees ORDER BY id DESC");
    res.json(allEmployees.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Data fetch nahi ho saka" });
  }
});

// 3. EK employee ka data lena (Edit form ke liye)
app.get('/api/employees/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await pool.query("SELECT * FROM employees WHERE id = $1", [id]);
    if (employee.rows.length === 0) {
      return res.status(404).json({ error: "Employee nahi mila" });
    }
    res.json(employee.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Data fetch nahi ho saka" });
  }
});

// 4. Employee UPDATE karne ki API
app.put('/api/employees/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, department, role, status } = req.body;

    const updatedEmployee = await pool.query(
      `UPDATE employees 
       SET name = $1, email = $2, department = $3, role = $4, status = $5 
       WHERE id = $6 RETURNING *`,
      [name, email, department, role, status, id]
    );

    if (updatedEmployee.rows.length === 0) {
      return res.status(404).json({ error: "Employee nahi mila" });
    }

    res.json(updatedEmployee.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Update nahi ho saka" });
  }
});

// 5. Employee DELETE karne ki API
app.delete('/api/employees/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedEmployee = await pool.query(
      "DELETE FROM employees WHERE id = $1 RETURNING *",
      [id]
    );

    if (deletedEmployee.rows.length === 0) {
      return res.status(404).json({ error: "Employee nahi mila" });
    }

    res.json({ message: "Employee delete ho gaya" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Delete nahi ho saka" });
  }
});

app.listen(5000, () => {
  console.log("Server chal raha hai port 5000 pe");
});