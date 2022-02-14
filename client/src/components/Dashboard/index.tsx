import React, { useState, useEffect } from "react";

import { User } from "../../types/entities";
const Index = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BE_HOST}users`)
      .then((r) => r.json())
      .then((bfs) => setUsers(bfs))
  }, [])
  return (
    <div>
      <p> </p>
      Ana sayfa
      {users.map((b) => (
        <div key={b.id}>
          <div>{b.id}</div>
          <div>{b.email}</div>
          <div>{b.password}</div>
        </div>
      ))}
    </div>
  );
};

export default Index;
