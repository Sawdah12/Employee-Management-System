const BASE_URL = "http://localhost:5000/api/employees";

// Saare employees ki list lana
export const getAllEmployees = async () => {
  const response = await fetch(BASE_URL);
  if (!response.ok) throw new Error("Data fetch nahi ho saka");
  return response.json();
};

// Ek employee ka data lana (Edit ke liye)
export const getEmployeeById = async (id) => {
  const response = await fetch(`${BASE_URL}/${id}`);
  if (!response.ok) throw new Error("Employee nahi mila");
  return response.json();
};

// Naya employee create karna
export const createEmployee = async (employeeData) => {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(employeeData),
  });
  if (!response.ok) throw new Error("Data save nahi ho saka");
  return response.json();
};

// Employee update karna
export const updateEmployee = async (id, employeeData) => {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(employeeData),
  });
  if (!response.ok) throw new Error("Update nahi ho saka");
  return response.json();
};

// Employee delete karna
export const deleteEmployee = async (id) => {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Delete nahi ho saka");
  return response.json();
};