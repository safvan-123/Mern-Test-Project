"use client";

import axios from "axios";
import Link from "next/link";
import React, { useState, useEffect, useContext, useCallback } from "react";
import { Table, Button } from "react-bootstrap";
import { useSearchParams, useRouter } from "next/navigation";
import { pagecontext } from "../layout";

const UsersPage = () => {
  const { setpages, setsearchTerm } = useContext(pagecontext);
  const searchParams = useSearchParams();
  const router = useRouter();

  const search = searchParams.get("search") || "";
  const currentPage = parseInt(searchParams.get("page")) || 1;

  const [users, setUsers] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [role, setRole] = useState("");
  const [age, setAge] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");
  const [order, setOrder] = useState("desc");

  useEffect(() => {
    setpages(currentPage);
    setsearchTerm(search);
    fetchUsers();
  }, [
    search,
    currentPage,
    role,
    age,
    sortBy,
    order,
    fetchUsers,
    setpages,
    setsearchTerm,
  ]);
  const fetchUsers = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        "https://mern-test-project-5.onrender.com/users",
        {
          headers: { Authorization: `Bearer ${token}` },
          params: {
            search,
            role,
            age,
            sortBy,
            order,
            page: currentPage,
            limit: 5,
          },
        }
      );
      setUsers(res.data.users);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error("Error fetching users", err.response?.data || err.message);
    }
  }, [search, role, age, sortBy, order, currentPage]);

  const deleteUser = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `https://mern-test-project-5.onrender.com/users/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchUsers();
    } catch (err) {
      console.error("Delete failed", err.response?.data || err.message);
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setsearchTerm(value);
    router.push(`/users?search=${value}&page=1`);
  };

  const goToPage = (pageNumber) => {
    router.push(`/users?search=${search}&page=${pageNumber}`);
  };

  return (
    <div className="container mt-4">
      <h3>User Listing Table</h3>

      <input
        type="text"
        placeholder="Search by name..."
        onChange={handleSearch}
        className="form-control mb-3"
      />

      <div className="mb-3 d-flex gap-2 align-items-center">
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="form-select"
        >
          <option value="">All Roles</option>
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </select>

        <select
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className="form-select"
        >
          <option value="">Filter By Age</option>
          <option value="24">24</option>
          <option value="26">26</option>
          <option value="27">27</option>
        </select>

        <select
          value={order}
          onChange={(e) => setOrder(e.target.value)}
          className="form-select"
        >
          <option value="desc">Desc</option>
          <option value="asc">Asc</option>
        </select>

        <Link href="/createuser">
          <Button variant="info" size="sm">
            Create User Here
          </Button>
        </Link>
      </div>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.age}</td>
                <td>{user.email}</td>
                <td>
                  <Link href={`/users/${user._id}`}>
                    <Button variant="primary" size="sm">
                      View
                    </Button>
                  </Link>{" "}
                  <Link href={`/updateuser/${user._id}`}>
                    <Button variant="success" size="sm">
                      Edit
                    </Button>
                  </Link>{" "}
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => deleteUser(user._id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">
                No users found
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      <div className="d-flex justify-content-center gap-3 mt-3">
        <Button
          variant="primary"
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Prev
        </Button>
        <span className="align-self-center">
          Page {currentPage} of {totalPages}
        </span>
        <Button
          variant="primary"
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default UsersPage;
