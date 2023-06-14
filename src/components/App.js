import React, { useState, useEffect } from "react";

function App() {
  const [pups, setPups] = useState([]);
  const [selectedPup, setSelectedPup] = useState(null);
  const [filterGoodDogs, setFilterGoodDogs] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:3001/pups`)
    .then(response => response.json())
    .then(data => setPups(data));
  }, []);

  const toggleFilter = () => {
    setFilterGoodDogs(!filterGoodDogs);
  };

function toggleGoodness(pup) {
  const updatedPup = {...pup, isGoodDog: ~pup.isGoodDog};

  fetch(`http://localhost:3001/pups/${pup.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedPup)
  })
  .then(response => response.json())
  .then(data => {
    setPups(pups.map(p => p.id === pup.id ? data : p));
    setSelectedPup(data);
  });
}

  return (
    <div className="App">
      <div id="filter-div">
        <button id="good-dog-filter" onClick={toggleFilter}>
          Filter good dogs: {filterGoodDogs ? 'ON' : 'OFF'}
          </button>
      </div>
      <div id="dog-bar">
        {(filterGoodDogs ? pups.filter(pup => pup.isGoodDog) : pups).map(pup => (
          <span key={pup.id} onClick={() =>setSelectedPup(pup)}>{pup.name}</span>
        ))}
      </div>
      <div id="dog-summary-container">
        <h1>DOGGO:</h1>
        <div id="dog-info">
          {selectedPup && (
            <div>
              <img src={selectedPup.image} alt={selectedPup.name} />
              <h2>{selectedPup.name}</h2>
              <button onClick={() => toggleGoodness(selectedPup)}>
                {selectedPup.isGoodDog ? 'Good Dog!' : 'Bad Dog!'}
              </button>
              </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
