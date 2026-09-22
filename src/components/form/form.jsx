import React, { useState } from 'react'
import Card from './component/Card'
import ModalDetails from './ModalPopUp/ModalDetails'
import EditModalDetails from './ModalPopUp/EditModalDetails'

const MainSection = ({ setEmployeeId }) => {
  // dummy data of employees
  const dummyEmployees = [
    {
      _id: "1",
      firstname: "Ali",
      lastname: "Khan",
      email: "ali@gmail.com",
      job: "React Developer",
      department: "Engineering",
      image: "https://via.placeholder.com/150"
    },
    {
      _id: "2",
      firstname: "Sara",
      lastname: "Ahmed",
      email: "sara@gmail.com",
      job: "UI/UX Designer",
      department: "Design",
      image: "https://via.placeholder.com/150"
    }
  ]

  const [employees, setEmployees] = useState(dummyEmployees)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [selectedEmp, setSelectedEmp] = useState(null)

  // Delete function (Local state update)
  const handleDelete = (id) => {
    setEmployees(employees.filter(emp => emp._id !== id))
  }

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Employee Directory</h1>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-semibold"
        >
          + Add Employee
        </button>
      </div>

      {/* Cards Display Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {employees.length > 0 ? (
          employees.map((emp) => (
            <Card 
              key={emp._id} 
              empData={emp} 
              onDelete={handleDelete}
              onEdit={() => {
                setSelectedEmp(emp)
                setIsEditModalOpen(true)
              }}
              setEmployeeId={setEmployeeId}
            />
          ))
        ) : (
          <p className="text-gray-400">No employees found.</p>
        )}
      </div>

      {/* Modals Conditional Rendering */}
      {isModalOpen && (
        <ModalDetails 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)}
          setEmployees={setEmployees}
        />
      )}

      {isEditModalOpen && (
        <EditModalDetails 
          isOpen={isEditModalOpen} 
          onClose={() => setIsEditModalOpen(false)}
          employee={selectedEmp}
          setEmployees={setEmployees}
        />
      )}
    </div>
  )
}

export default MainSection