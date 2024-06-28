// import React, { useState } from 'react';

// const Dashboard = () => {
//   const [file, setFile] = useState(null);
//   const [message, setMessage] = useState('');

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   const handleUpload = async (e) => {
//     e.preventDefault();
//     if (!file) {
//       setMessage('No file selected');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('file', file);

//     try {
//       const response = await fetch('http://localhost:3000/upload', {
//         method: 'POST',
//         headers: {
//           'Authorization': `Bearer ${localStorage.getItem('token')}`,
//         },
//         body: formData,
//       });

//       const data = await response.json();
//       if (response.ok) {
//         setMessage('File uploaded successfully');
//       } else {
//         setMessage('File upload failed: ' + data.message);
//       }
//     } catch (error) {
//       setMessage('Error: ' + error.message);
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <h2>Dashboard</h2>
//       {message && <div className="alert alert-info">{message}</div>}
//       <form onSubmit={handleUpload}>
//         <div className="form-group">
//           <label htmlFor="file">Upload File</label>
//           <input
//             type="file"
//             className="form-control"
//             id="file"
//             onChange={handleFileChange}
//           />
//         </div>
//         <button type="submit" className="btn btn-primary">
//           Upload
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Dashboard;



import React from 'react';

const Dashboard = () => {
  return (
    <div className="container mt-5">
      <h2>Dashboard</h2>
      <p>Welcome to the dashboard!</p>
    </div>
  );
};

export default Dashboard;
