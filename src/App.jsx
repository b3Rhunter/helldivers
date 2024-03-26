import { useEffect, useState } from 'react';
import { db } from './firebase';
import { doc, getDoc } from 'firebase/firestore';

function App() {
  const [galacticWarData, setGalacticWarData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(db, "galacticWar", "latest");
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setGalacticWarData(docSnap.data());
      } else {
        console.log("No such document!");
      }
    };

    fetchData();
  }, []);

  return (
    <div className="app">
      {galacticWarData && (  
          <>
          <h1>Galactic War Status</h1>
          <h2>Total Helldivers: {galacticWarData.totalHelldivers}</h2>
          <div className='main'>
          {galacticWarData.galacticWar.filter(planet => planet.planet).map((planet, index) => (
            <div className='card' key={index}>
              <h2>{planet.planet}</h2>
              <p>Progression: {planet.progression}</p>
              <p>Helldivers: {planet.helldivers}</p>
              <p>Time Left: {planet.timeLeft}</p>
            </div>
          ))}
        </div>
        </>
      )}
    </div>
  );
}

export default App;
