import React from 'react'
import TreeFlow from '../../components/TreeFlow/TreeFlow'
import ChairLoader from '../../components/ChairLoader/ChairLoader'
import img from '../../assets/img/AmenitiesHero.png'
import './Amenities.css'

const Amenities = () => {
  return (
    <div className='amenities-page '> 
       <div className='px-3 '>
        <section
          className="amenities-hero rounded-4"
          style={{ backgroundImage: `url(${img})` }}
        >
          <div className="amenities-overlay"></div>
          <div className="amenities-hero-text d-flex flex-column align-items-center">
            <h1>Premium Amenities for a better workday</h1>
            <p>Discover the range of features designed to make your workday smooth, productive, and enjoyable.</p>
          </div>
        </section>
       </div>

      <div className='about'>
        <div className='pt-5'>
          <h1 className='fw-bold'>Amenities Crafted for &nbsp;<span className='cursive-heading'>Productivity and Comfort</span></h1>
          <p className='fs-5'>Great ideas need the right environment — and we’ve built ours to fuel productivity, collaboration, and creativity. With modern amenities at every corner, you can focus on building, scaling, and creating without worrying about the small things. Everything you need is already here, designed to keep your workflow smooth and your energy high throughout the day.</p>
        </div>
     <div className='full-tree'>
      <TreeFlow/>
    </div>
    <ChairLoader/>
      </div>
    </div>
  )
}

export default Amenities
