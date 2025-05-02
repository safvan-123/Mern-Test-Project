"use client"; // Ensures this is a Client Component in Next.js

import { pagecontext } from "@/app/layout";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect, useContext } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";

export default function EditUserPage() {
  const { pages, setpages, searchTerm, setsearchTerm } =
    useContext(pagecontext);
  console.log(pages);

  const { id } = useParams(); // Get user ID from URL params
  const router = useRouter(); // For redirection after update

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    email: "",
  });

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState(null);

  // Fetch user data when the component loads
  useEffect(() => {
    if (!id) return;

    axios
      .get(`https://mern-test-project-5.onrender.com/users/${id}`)
      .then((res) => {
        console.log("✅ User Data Fetched:", res.data);
        setFormData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("🚨 Error fetching user:", err);
        setError("Failed to fetch user details.");
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    if (searchTerm && pages) {
      fetchUsers(searchTerm, pages); // Call your fetchUsers function
    }
  }, [searchTerm, pages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);
    setError(null);

    try {
      const res = await axios.put(
        `https://mern-test-project-5.onrender.com/users/${id}`,
        formData
      );
      console.log("✅ User Updated:", res.data);
      alert("User Updated Successfully!");

      // Redirect to the same filtered and paginated view
      router.push(`/users?search=${searchTerm}&page=${pages}`);
    } catch (err) {
      console.error(
        "🚨 Error updating user:",
        err.response?.data?.message || err.message
      );
      setError("Failed to update user.");
    } finally {
      setUpdating(false);
    }
  };
  const fetchUsers = (searchTerm, page) => {
    axios
      .get(`https://mern-test-project-5.onrender.com/users`, {
        params: { searchTerm, page },
      })
      .then((res) => {
        console.log("✅ Fetched Users:", res.data);
        // Handle the users list here
      })
      .catch((err) => {
        console.error("🚨 Error fetching users:", err);
      });
  };
  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h2 className="text-center mb-4">Update User</h2>

          {loading ? (
            <p>Loading user data...</p>
          ) : error ? (
            <p className="text-danger">{error}</p>
          ) : (
            <Form onSubmit={handleSubmit} className="p-4 border rounded shadow">
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Age</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter age"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Button
                variant="warning"
                type="submit"
                className="w-100"
                disabled={updating}
              >
                {updating ? "Updating..." : "Update User"}
              </Button>
            </Form>
          )}
        </Col>
      </Row>
    </Container>
  );
}
