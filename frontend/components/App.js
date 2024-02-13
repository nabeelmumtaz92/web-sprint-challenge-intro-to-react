import React, { useEffect, useState } from 'react';
import axios from 'axios'
import Character from './Character'

const urlPlanets = 'http://localhost:9009/api/planets'
const urlPeople = 'http://localhost:9009/api/people'

function App() {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    // Define async function to fetch data
    const fetchData = async () => {
      try {
        // Endpoint URLs
        const endpointA = 'http://localhost:9009/api/planets'; // Placeholder for the actual URL
        const endpointB = 'http://localhost:9009/api/people'; // Placeholder for the actual URL

        // Fetching both endpoints concurrently
        const [planetsData, peopleData] = await Promise.all([
          fetch(endpointA).then(res => res.json()),
          fetch(endpointB).then(res => res.json()),
        ]);

        // Assuming responseB is an array of planets
        // Creating a map where each key is a planet's ID and the value is the planet object
        const planetsMap = planetsData.reduce((acc, planet) => {
          acc[planet.id] = planet;
          return acc;
        }, {});

        // Combine character data with homeworld details using the map
        const combinedData = peopleData.map(person => ({
          ...person,
          homeworld: planetsMap[person.homeworld] // Replace homeworld ID with the actual planet object
        }));

        // Update state with combined data
        setCharacters(combinedData);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    // Invoke the fetch operation
    fetchData();
  }, []); // Empty dependency array ensures this effect runs only once after initial render

  return (
    <div>
      <h2>Star Wars Characters</h2>
      <p>See the README of the project for instructions on completing this challenge</p>
      {/* Render your data here */}
      {characters.map(character => (
        
          <Character key = {character.id}
          character={character} />
      ))}
    </div>
  );
}


export default App

// ❗ DO NOT CHANGE THE CODE  BELOW
if (typeof module !== 'undefined' && module.exports) module.exports = App
