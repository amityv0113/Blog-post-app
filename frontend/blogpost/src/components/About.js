import React, {useContext, useEffect} from 'react'
import blogContext from '../context/blogs/blogContext'

const About = () => {
  const a= useContext(blogContext)

  // useEffect(()=>{
  //   a.updatefuc()
  //    // eslint-disable-next-line
  // },[])

  return (
    <div>About page</div>
  )
}

export default About