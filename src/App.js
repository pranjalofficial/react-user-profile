import "./styles.css";
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchUserWithLogs } from "./hook";

const UserProfile = () => {
  const [userId, setUserId] = useState(1);

  const { data, isLoading, isFetching, status } = useQuery({
    queryKey: ["user", userId],
    queryFn: fetchUserWithLogs,
    staleTime: 5000,
  });

  return (
    <div style={{ padding: "20px", border: "1px solid #ccc" }}>
      <h2>User Profile View</h2>

      <button onClick={() => setUserId(1)}>Load User 1</button>
      <button onClick={() => setUserId(2)}>Load User 2</button>
      <button onClick={() => setUserId(3)}>Load User 3</button>

      {isLoading && <p>Loading user data...</p>}

      {/* {error && <p style={{ color: "red" }}>Error: {error}</p>} */}

      {data && !isLoading && (
        <div className="card">
          <h3>{data.name}</h3>
          <p>Email: {data.email}</p>
          <p>Phone: {data.phone}</p>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
