import React from "react";

export default function Kitten({ kitten }) {
  return (
    <div className="kitten">
      {kitten.name}
      <img src={kitten.image} className="kitten-image" alt="kitten"></img>

      <br />

      <div className="kitten-attributes">
        <div>Ear ({kitten.attributes[0].value}): </div>{" "}
        <div>{kitten.rarity.ear}%</div>
      </div>

      <div className="kitten-attributes">
        <div>Eye ({kitten.attributes[1].value}):</div>{" "}
        <div>{kitten.rarity.eye}%</div>
      </div>
      <div className="kitten-attributes">
        <div>Month ({kitten.attributes[2].value}):</div>{" "}
        <div>{kitten.rarity.mouth}%</div>
      </div>
      <div className="kitten-attributes">
        <div>Glass ({kitten.attributes[3].value}):</div>{" "}
        <div>{kitten.rarity.glass}%</div>
      </div>
      <div style={{textAlign: 'center'}}>
        <div style={{color: kitten.attributes[4].value}}>
          {(
            (parseFloat(kitten.rarity.glass) +
              parseFloat(kitten.rarity.mouth) +
              parseFloat(kitten.rarity.eye) +
              parseFloat(kitten.rarity.ear)) /
            4
          ).toFixed(2)}
          %
        </div>
      </div>
    </div>
  );
}
