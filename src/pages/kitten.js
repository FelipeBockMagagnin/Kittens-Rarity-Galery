import React  from "react";


export default function Kitten({kitten}){
    return (
        <div className='kitten'>
            {kitten.name}
            <img src={kitten.image} className='kitten-image' alt='kitten'></img>
        </div>
    )
}