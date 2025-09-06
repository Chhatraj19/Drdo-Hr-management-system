// import axios from 'axios'
// import React, { useEffect, useState } from 'react'
// import { useNavigate, useParams } from 'react-router-dom'


// const EmployeeDetail = () => {
//     const [employee, setEmployee] = useState([])
//     const {id} = useParams()
//     const navigate = useNavigate()
//     useEffect(() => {
//         axios.get('http://localhost:8000/employee/detail/'+id)
//         .then(result => {
//             setEmployee(result.data[0])
//         })
//         .catch(err => console.log(err))
//     }, [])
//     const handleLogout = () => {
//         axios.get('http://localhost:8000/employee/logout')
//         .then(result => {
//           if(result.data.Status) {
//             localStorage.removeItem("valid")
//             navigate('/')
//           }
//         }).catch(err => console.log(err))
//       }
//   return (
//     <div>
//         <div className="p-2 d-flex justify-content-center shadow">
//             <h4>Emoployee Management System</h4>
//         </div>
//         <div className='d-flex justify-content-center flex-column align-items-center mt-3'>
//             <img src={`http://localhost:8000/Images/`+employee.image} className='emp_det_image'/>
//             <div className='d-flex align-items-center flex-column mt-5'>
//                 <h3>Name: {employee.name}</h3>
//                 <h3>Email: {employee.email}</h3>
//                 <h3>Salary: ${employee.salary}</h3>
//             </div>
//             <div>
//                 <button className='btn btn-primary me-2'>Edit</button>
//                 <button className='btn btn-danger' onClick={handleLogout}>Logout</button>
//             </div>
//         </div>
//     </div>
//   )
// }

// export default EmployeeDetail
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const EmployeeDetail = () => {
  const [employee, setEmployee] = useState(null)
  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    axios.get(`http://localhost:8000/employee/${id}`)
      .then(result => {
        if (result.data.Status) {
          setEmployee(result.data.Result)
        } else {
          console.log(result.data.Error)
        }
      })
      .catch(err => console.log(err))
  }, [id])

  const handleLogout = () => {
    // If you’re not using sessions, just clear localStorage
    localStorage.removeItem("valid")
    navigate('/')
  }

  if (!employee) {
    return <div className="text-center mt-5">Loading...</div>
  }

  return (
    <div>
      <div className="p-2 d-flex justify-content-center shadow">
        <h4>Employee Management System</h4>
      </div>
      <div className='d-flex justify-content-center flex-column align-items-center mt-3'>
        {employee.image && (
          <img
            src={`http://localhost:8000/Images/${employee.image}`}
            className='emp_det_image'
            alt={employee.name}
          />
        )}
        <div className='d-flex align-items-center flex-column mt-5'>
          <h3>Name: {employee.name}</h3>
          <h3>Email: {employee.email}</h3>
          <h3>Salary: ${employee.salary}</h3>
          <h3>Address: {employee.address}</h3>
        </div>
        <div>
          <button
            className='btn btn-primary me-2'
            onClick={() => navigate(`/employee_edit/${employee._id}`)}
          >
            Edit
          </button>
          <button className='btn btn-danger' onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </div>
  )
}

export default EmployeeDetail
