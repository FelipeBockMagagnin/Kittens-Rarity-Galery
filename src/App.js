import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import Kitten from './pages/kitten';

function App() {
  const [ kittensData, setKittensData ] = useState([]);

  const collectionId = '0xfd211f3b016a75bc8d73550ac5adc2f1cae780c0';
  const paintSwapParams = '?allowNSFW=true&numToFetch=20&numToSkip=0'

  const getData=()=>{
    fetch('./data/kittens.json'
    ,{
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }
    }
    )
      .then(function(response){
        return response.json();
      })
      .then(function(myJson) {
        setKittensData(myJson);
        countRarity(myJson);
      });
  }

  useEffect(()=>{
    getData();
  },[])


  function countRarity(data){
    //ear frame
    let earFrameGroup = {}
    const total = 419; 

    data.forEach(kitten => {
      if(earFrameGroup[kitten.attributes[0].value] === undefined){
        earFrameGroup[kitten.attributes[0].value] = 0;
      }
      else{
        earFrameGroup[kitten.attributes[0].value]++;
      }
    });

    console.log(earFrameGroup);


    let eyeFrameGroup = {}

    data.forEach(kitten => {
      if(eyeFrameGroup[kitten.attributes[1].value] === undefined){
        eyeFrameGroup[kitten.attributes[1].value] = 0;
      }
      else{
        eyeFrameGroup[kitten.attributes[1].value]++;
      }
    });

    console.log(eyeFrameGroup);


    let mounthFrameGroup = {}

    data.forEach(kitten => {
      if(mounthFrameGroup[kitten.attributes[2].value] === undefined){
        mounthFrameGroup[kitten.attributes[2].value] = 0;
      }
      else{
        mounthFrameGroup[kitten.attributes[2].value]++;
      }
    });

    console.log(mounthFrameGroup);


    let glassFrameGroup = {}

    data.forEach(kitten => {
      if(glassFrameGroup[kitten.attributes[3].value] === undefined){
        glassFrameGroup[kitten.attributes[3].value] = 0;
      }
      else{
        glassFrameGroup[kitten.attributes[3].value]++;
      }
    });

    console.log(glassFrameGroup);


    data.forEach(kitten => {
      console.log(kitten.name);
      console.log('Ear ' + kitten.attributes[0].value + ' appears in ' + earFrameGroup[kitten.attributes[0].value] + ' kittens - '  + ((earFrameGroup[kitten.attributes[0].value] * 100 )/total ).toFixed(2) + '%');
      console.log('Eye ' + kitten.attributes[1].value + ' appears in ' + eyeFrameGroup[kitten.attributes[1].value] + ' kittens - '  + ((eyeFrameGroup[kitten.attributes[1].value] * 100 )/total ).toFixed(2) + '%');
      console.log('Mouth ' + kitten.attributes[2].value + ' appears in ' + mounthFrameGroup[kitten.attributes[2].value] + ' kittens - '  + ((mounthFrameGroup[kitten.attributes[2].value] * 100 )/total ).toFixed(2) + '%');
      
      
      if(kitten.attributes[3].value == 'none'){
        console.log("Kitten don't have glasses")
      }
      else{
        console.log('Glass ' + kitten.attributes[3].value + ' appears in ' + glassFrameGroup[kitten.attributes[3].value] + ' kittens - '  + ((glassFrameGroup[kitten.attributes[3].value] * 100 )/total ).toFixed(2) + '%');

      }


      console.log('#############################################################################################')
      console.log('#############################################################################################')


    });


  }

  function allKittenDataToJson(){
    let allKittens = [];

    for (let i = 0; i <= 419; i++) {
      axios.get('https://kittens.fakeworms.studio/api/kitten/' + i).then(kitten => {
          allKittens.push(kitten.data);

        }).catch(err => {
          console.log('error');
        })      
    }

    setTimeout(() => {
      const sorted = allKittens.sort(function(a, b){return a.id-b.id});
      console.log('all kittens data', sorted);
      setKittensData(sorted);
    }, 5000);
  }

  async function fetchKittens(){
    let kittens = [];
    
    await axios.get('https://api.paintswap.finance/nfts/' + collectionId + paintSwapParams).then(data => {
      console.log('data', data.data);

      data.data.nfts.forEach(nft => {
        axios.get('https://kittens.fakeworms.studio/api/kitten/' + nft.tokenId).then(kitten => {
          kittens.push(kitten.data);
          setKittensData([...kittens]);
        }).catch(err => {

        })
      });
    })

    console.log('kittens data', kittens)
    setKittensData(kittens);
  }

  return (
    <div className="App">
      
      Fantom Kittens

      <div>
        List of all Kittens

        <div className='list-container'>
        {kittensData && kittensData.map(kitten => {
          return (
            <Kitten kitten={kitten}/>
          )
        })}
        </div>
      </div>
    </div>
  );
}

export default App;
