import { useEffect, useState } from 'react';
import './App.css';
import Kitten from './pages/kitten';

function App() {
  const [kittensData, setKittensData] = useState([]);
  const [sort, setSort] = useState();

  useEffect(() => {
    getData();
  }, [])

  const getData = () => {
    fetch('./data/kittens.json'
      , {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (myJson) {
        countRarity(myJson);
      });
  }

  function handleSortChange(value) {
    let kittens = kittensData;

    switch (value) {
      case 'rarity':
        kittens = kittens.sort(function (a, b) {
          const averageA = ((parseFloat(a.rarity.glass) + parseFloat(a.rarity.mouth) + parseFloat(a.rarity.eye) + parseFloat(a.rarity.ear)) / 4).toFixed(2);
          const averageB = ((parseFloat(b.rarity.glass) + parseFloat(b.rarity.mouth) + parseFloat(b.rarity.eye) + parseFloat(b.rarity.ear)) / 4).toFixed(2);
          return averageA - averageB
        });
        break;
      case 'number':
        kittens = kittens.sort(function (a, b) { return a.id - b.id });
        break;
      default:
        break;
    }

    setKittensData([...kittens]);
    setSort(value);
  }

  function countRarity(data) {
    const total = 420;

    let earFrameGroup = {}
    data.forEach(kitten => {
      if (earFrameGroup[kitten.attributes[0].value] === undefined) {
        earFrameGroup[kitten.attributes[0].value] = 0;
      }
      else {
        earFrameGroup[kitten.attributes[0].value]++;
      }
    });

    let eyeFrameGroup = {}
    data.forEach(kitten => {
      if (eyeFrameGroup[kitten.attributes[1].value] === undefined) {
        eyeFrameGroup[kitten.attributes[1].value] = 0;
      }
      else {
        eyeFrameGroup[kitten.attributes[1].value]++;
      }
    });

    let mounthFrameGroup = {}
    data.forEach(kitten => {
      if (mounthFrameGroup[kitten.attributes[2].value] === undefined) {
        mounthFrameGroup[kitten.attributes[2].value] = 0;
      }
      else {
        mounthFrameGroup[kitten.attributes[2].value]++;
      }
    });

    let glassFrameGroup = {}
    data.forEach(kitten => {
      if (glassFrameGroup[kitten.attributes[3].value] === undefined) {
        glassFrameGroup[kitten.attributes[3].value] = 0;
      }
      else {
        glassFrameGroup[kitten.attributes[3].value]++;
      }
    });

    let kittens = data.map(kitten => {
      let rarity = [];
      rarity['ear'] = ((earFrameGroup[kitten.attributes[0].value] * 100) / total).toFixed(2);
      rarity['eye'] = ((eyeFrameGroup[kitten.attributes[1].value] * 100) / total).toFixed(2);
      rarity['mouth'] = ((mounthFrameGroup[kitten.attributes[2].value] * 100) / total).toFixed(2);
      rarity['glass'] = kitten.attributes[3].value == 'none' ? 82.38 : ((glassFrameGroup[kitten.attributes[3].value] * 100) / total).toFixed(2)
      kitten['rarity'] = rarity;
      return kitten;
    });

    setKittensData(kittens);
  }

  return (
    <div className="App">
      <div className='header'>
        Kittens Rarity Ranking
      </div>

      <div>
        Sort By
        <select value={sort} onChange={(e) => handleSortChange(e.target.value)}>
          <option value='number'>Number</option>
          <option value='rarity'>Rarity</option>
        </select>

        <div className='list-container'>
          {kittensData && kittensData.map(kitten => {
            return (
              <Kitten kitten={kitten} />
            )
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
