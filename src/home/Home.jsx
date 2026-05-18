import React from 'react'
import "../assets/my_home.css"
import {Link} from "react-router-dom"
import Image1 from "../../public/images (tropical).jpg"

const Home = () => {
  return (
    <>
   <div className='main-home'>
      <div className='home-container'>
       <h3>
        Tropical Naturals Limited
        {/* <p>IOT platform</p> */}
      </h3>
      <div className='home-image'>
        <img src={Image1}/>
      </div>
      <div className='home-form-div'>
    
       <Link to= "/login">
         <button className='login-btn'>
        Login
        </button>
       </Link>
      </div>
     </div>
   </div>
    </>
  )
}

export default Home