import React from 'react'
import PageBuilder from '../../components/PageBuilder/PageBuilder'
import VirtualZoneData from '../../config/services/VirtualZoneData'

const VirtualZone = () => {
  return (
    <div className='about'>
      <PageBuilder sections={VirtualZoneData.sections} />
    </div>
  )
}

export default VirtualZone
