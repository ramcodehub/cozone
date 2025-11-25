import React from 'react'
import GalleryImages from '../../components/GalleryImages/GalleryImages'

const Gallery = () => {
  return (
    <div className=''>
        <div className='about text-center'>
            <h1 className='fw-bold'>A Glimpse Into <span className='cursive-heading'>Your Future Workspace</span></h1>
            <p className='fs-5'>This gallery provides an inside look at our professionally designed coworking environment, engineered for maximum efficiency and business productivity. Our private offices, conference rooms, and shared work zones are equipped with modern infrastructure and high-performance amenities that support both individual focus and team collaboration. Explore the spaces that reflect reliability, structure, and professionalism — a work setting built to empower growing businesses, startups, and corporate teams alike.</p>
        </div>
        <GalleryImages/>
    </div>
  )
}

export default Gallery
