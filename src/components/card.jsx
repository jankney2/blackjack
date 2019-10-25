import React from 'react'



const Card=(props)=>{
return(
    <div className='card'>
        <p>{props.suit}</p>
        <p>
            {props.val}
        </p>
    </div>
)
}


export default Card