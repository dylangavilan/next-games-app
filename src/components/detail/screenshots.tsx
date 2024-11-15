import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import React from 'react'
import Image from "next/image";
import { getCover } from "@/lib/utils";

interface Props {
  items: Screenshots[]
}
const Screenshots = ({ items }: Props) => {
    const responsive = {
        superLargeDesktop: {
          breakpoint: { max: 4000, min: 3000 },
          items: items.length < 4 ? items.length : 4
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: items.length < 4 ? items.length : 4
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: items.length < 4 ? items.length : 4
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: items.length < 4 ? items.length : 4
        }
      };

      const ShowItems = () => {
       return  ( 
        items.map((screenshot: Screenshots) => {
          const coverUrl = getCover('cover_big', screenshot.image_id);
          return (
            <div
              key={screenshot.image_id}
              className="relative w-[83.5px] h-[83.5px] md:w-[170px] md:h-[160px]"
            >
              <Image
                src={coverUrl}
                alt={`Screenshot ${screenshot.image_id}`}
                className="rounded-lg"
                fill
                sizes="(max-width: 640px) 83.5px, 170px"
              />
            </div>
          );
        })
      )
      }
 
      if(items.length < 4){
        return (
        <div className='flex gap-4'>
          <ShowItems />
        </div>
     )}
      
      return ( 
        <Carousel itemClass="carousel-item-padding-40-px"
                  infinite
                  responsive={responsive}>
            <ShowItems />
        </Carousel>
      )
    }
    export default Screenshots