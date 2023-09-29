import React, { useState } from 'react'

const ConditionalRendering = () => {
    //let [message,setMessage]=useState('hello world')
    let today=new Date().getDay();
    let year=new Date('2027-01-29').getFullYear();
    let message=today>=6? <h2>Today in weekday</h2>:<h2>Today is weekend</h2>;
    let message2=year%4==0?(year%100==0?(year%400==0?<h2>Leap Year</h2>:<h2>Not a Leap Year</h2>):<h2>Leap Year</h2>):<h2>Not a Leap Year</h2>
  return (
    <div>
        <h3>Hello World</h3>
        {message}
        {message2}
    </div>
  )
}

export default ConditionalRendering