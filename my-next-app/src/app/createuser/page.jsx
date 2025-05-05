"use client";

import axios from "axios";
import { useState } from "react";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    email: "",
    role: "",
    image: null,
  });

  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      setFormData({ ...formData, image: files[0] }); // For file input
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   console.log("clicked");

  //   try {
  //     let uploadedImageUrl = "";

  //     // First upload image to Cloudinary
  //     if (formData.image) {
  //       const imageData = new FormData();
  //       imageData.append("file", formData.image);
  //       imageData.append("upload_preset", "unsigned_preset"); // 👉 Replace with your Cloudinary upload preset
  //       imageData.append("cloud_name", "dmsybcze6"); // 👉 Replace with your Cloudinary cloud name

  //       const cloudinaryResponse = await axios.post(
  //         "https://api.cloudinary.com/v1_1/dmsybcze6/image/upload",
  //         imageData
  //       );

  //       uploadedImageUrl = cloudinaryResponse.data.secure_url;
  //     }

  //     // Now send the form data + uploaded image URL to your server
  //     const submitData = {
  //       name: formData.name,
  //       age: formData.age,
  //       email: formData.email,
  //       role: formData.role,
  //       image: uploadedImageUrl, // Send URL
  //     };
  //     console.log(submitData);

  //     const res = await axios.post(
  //       "https://mern-test-project-5.onrender.com/createuser",
  //       submitData
  //     );
  //     console.log(res);

  //     setMessage({ type: "success", text: "User created successfully!" });
  //     router.push("/users");
  //   } catch (err) {
  //     console.error(err);
  //     setMessage({ type: "danger", text: "Failed to create user!" });
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("clicked");

    try {
      let uploadedImageUrl = "";

      if (formData.image) {
        const imageData = new FormData();
        imageData.append("file", formData.image);
        imageData.append("upload_preset", "unsigned_preset"); // your Cloudinary preset
        imageData.append("cloud_name", "dmsybcze6");

        const cloudinaryResponse = await axios.post(
          "https://api.cloudinary.com/v1_1/dmsybcze6/image/upload",
          imageData
        );

        if (cloudinaryResponse.data && cloudinaryResponse.data.secure_url) {
          uploadedImageUrl = cloudinaryResponse.data.secure_url;
        } else {
          throw new Error("Failed to get uploaded image URL from Cloudinary");
        }
      } else {
        throw new Error("No image selected to upload");
      }

      const submitData = {
        name: formData.name,
        age: formData.age,
        email: formData.email,
        role: formData.role,
        image: uploadedImageUrl, // Now guaranteed
      };

      console.log("Submitting data:", submitData);

      const res = await axios.post(
        "https://mern-test-project-5.onrender.com/createuser",
        submitData
      );
      console.log(res);

      setMessage({ type: "success", text: "User created successfully!" });
      router.push("/users");
    } catch (err) {
      console.error("Error during submission:", err);
      setMessage({ type: "danger", text: "Failed to create user!" });
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h2 className="text-center mb-4">Create User</h2>
          {message && <Alert variant={message.type}>{message.text}</Alert>}
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

            <Form.Group className="mb-3">
              <Form.Label>Role</Form.Label>
              <Form.Select
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
              >
                <option value="">Select Role</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </Form.Select>
            </Form.Group>

            {/* New Image Upload Field */}
            <Form.Group className="mb-3">
              <Form.Label>Profile Image</Form.Label>
              <Form.Control
                type="file"
                name="image"
                accept="image/*"
                onChange={handleChange}
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              Create User
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
