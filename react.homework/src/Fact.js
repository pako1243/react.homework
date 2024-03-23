// components/Fact.js
import React from 'react';
import { useParams } from 'react-router-dom';

const facts = {
  1: "Harry Potter was born on July 31, 1980.",
  2: "Harry's parents, Lily and James Potter, were killed by Voldemort when he was just a baby.",
  // Add more facts as needed
};

const Fact = () => {
  const { factId } = useParams();

  const fact = facts[factId];

  return (
    <div>
      <h2>Fact</h2>
      {fact ? <p>{fact}</p> : <p>Fact not found!</p>}
    </div>
  );
};

export default Fact;
