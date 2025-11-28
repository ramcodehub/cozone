import React from 'react'
import PageBuilder from '../../components/PageBuilder/PageBuilder'
import DayPassData from '../../config/services/DayPassData.js'

const DayPass = () => {
  return (
    <div>
      <PageBuilder sections={DayPassData.sections}/>
    </div>
  )
}

export default DayPass
