"use client";
import axios from "axios";
import { useParams } from "next/navigation";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";

const page = () => {
  const [User, setUser] = useState();
  const [error, setError] = useState({});
  const params = useParams();
  const { id } = params;
  console.log(id);
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
  console.log(User);

  return (
    <div>
      <h1>{User?.name}</h1>
      <h1>{User?.age}</h1>
      <h1>{User?.email}</h1>
    </div>
  );
};

export default page;
