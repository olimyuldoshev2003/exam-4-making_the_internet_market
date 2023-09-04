// import React from 'react'
import { useGetDataQuery } from "./api/api";

const App = () => {
  const { data = [] } = useGetDataQuery("");
  console.log(data);

  return (
    <div>
      <header className="header"></header>
      <section className="section">
        
      </section>
    </div>
  );
};

export default App;
