import React from 'react'
import PageBuilder from '../../components/PageBuilder/PageBuilder'
import PrivateCabinData from '../../config/services/PrivateCabinData'

const PrivateCabin = () => {
  return (
    <div className='about'>
      <PageBuilder sections={PrivateCabinData.sections} />
    </div>
  )
}

export default PrivateCabin
