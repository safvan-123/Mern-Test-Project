"use client";

import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const SingleUserPage = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const params = useParams();
  const { id } = params || {}; // Safe check

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `https://mern-test-project-5.onrender.com/users/${id}`
        );
        setUser(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Error fetching user");
      }
    };

    if (id) {
      fetchUser();
    }
  }, [id]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!user) {
    return <div>Loading user...</div>;
  }

  return (
    <div>
      <h1>{user.name}</h1>
      <h1>{user.age}</h1>
      <h1>{user.email}</h1>
    </div>
  );
};

export default SingleUserPage;
