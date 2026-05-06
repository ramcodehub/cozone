import React from 'react'
import PageBuilder from '../../components/PageBuilder/PageBuilder'
import ConferenceRoomsData from '../../config/services/ConferenceRoomsData'

const ConferenceRooms = () => {
  return (
    <div className=''>
      <PageBuilder sections={ConferenceRoomsData.sections} />
    </div>
  )
}

export default ConferenceRooms
