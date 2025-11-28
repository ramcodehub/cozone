import React from 'react'
import PageBuilder from '../../components/PageBuilder/PageBuilder'
import DedicatedDeskData from '../../config/services/DedicatedDeskData'

const DedicatedDesk = () => {
  return (
    <div>
      <PageBuilder sections={DedicatedDeskData.sections} />
    </div>
  )
}

export default DedicatedDesk
