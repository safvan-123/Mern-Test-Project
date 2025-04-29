"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [peoples, setpeoples] = useState("");
  useEffect(() => {
    fetch("http://localhost:8080/api")
      .then((res) => res.json()) // Convert response to JSON
      .then((data) => setpeoples(data.peoples)) // Store JSON data in state
      .catch((error) => console.error("Error fetching data:", error)); // Handle errors
  }, []);
  console.log(peoples);

  return (
    <div>
      {/* <h1>Next js Landing Page</h1>
      {peoples?.map((arr, ind) => {
        return (
          <div key={ind}>
            <h1>{arr}</h1>
          </div>
        );
      })} */}
    </div>
  );
}
