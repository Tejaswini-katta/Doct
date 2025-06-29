import React, { useEffect, useState } from "react";
import { Table, Container, Alert } from "react-bootstrap";
import axios from "axios";
import { message } from "antd";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    try {
      const res = await axios.get("http://localhost:8001/api/admin/getallusers", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        setUsers(res.data.data);
      } else {
        message.error("Failed to fetch users");
      }
    } catch (err) {
      console.error(err);
      message.error("Something went wrong");
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div>
      <h2 className="p-3 text-center">All Registered Users</h2>
      <Container>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>User ID</th>
              <th>Full Name</th>
              <th>Email</th>
              <th>Is Admin?</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.name || user.fullName}</td>
                  <td>{user.email}</td>
                  <td>{user.isAdmin ? "Yes" : "No"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4}>
                  <Alert variant="info">
                    <Alert.Heading>No users found.</Alert.Heading>
                  </Alert>
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </Container>
    </div>
  );
};

export default AdminUsers;
