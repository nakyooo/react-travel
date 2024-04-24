import {FC} from "react";
import styles from './Carousel.module.css'
import {Image, Carousel as AntCarousel} from 'antd'
import {useNavigate} from 'react-router-dom'

import CarouselImage1 from '../../assets/images/carousel_1.jpg'
import CarouselImage2 from '../../assets/images/carousel_2.jpg'
import CarouselImage3 from '../../assets/images/carousel_3.jpg'

export const Carousel:FC=()=>{
  const nav=useNavigate()
  return (
    <AntCarousel autoplay className={styles.slider}> 
      <Image src={CarouselImage1} onClick={()=>{nav('/detail/7')}}/>
      <Image src={CarouselImage2} onClick={()=>{nav('/detail/6')}}/>
      <Image src={CarouselImage3} onClick={()=>{nav('/detail/5')}}/>
    </AntCarousel>
  )
}