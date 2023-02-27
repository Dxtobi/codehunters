
import { profile } from 'console';
import Carousel from 'nuka-carousel/lib/carousel';
import { Key } from 'react';
import IndeCard from '../cards/IndeCard';


export default function CarouselElement(params: { profiles: any; }) {

    const {profiles} = params
  
    return (
        <Carousel
            renderCenterLeftControls={({ previousDisabled, previousSlide }) => (
                <button className='w-[100px] h-[300px]' onClick={previousSlide} disabled={previousDisabled}>
                
                </button>
            )}
            renderCenterRightControls={({ nextDisabled, nextSlide }) => (
                <button
                    className='w-[100px] h-[300px]'
                    onClick={nextSlide} disabled={nextDisabled}>
                </button>
            )}
            animation="zoom"
            autoplay={true}
            autoplayInterval={50}
            >
            {
                profiles.map((profile: any, index: Key | null | undefined) => (
                    <IndeCard profile={profile} key={index} />
                ))
            }
            </Carousel>
                )
}