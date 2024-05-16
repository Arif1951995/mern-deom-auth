import React, { useState } from 'react'
import useFetch from '../hooks/useFetch';

function Home() {
const {data} = useFetch("/todos");
console.log(data);  
return (
    <div>Home</div>
  )
}

export default Home