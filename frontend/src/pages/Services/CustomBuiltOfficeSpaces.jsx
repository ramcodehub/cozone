import React from 'react'
import PageBuilder from '../../components/PageBuilder/PageBuilder'
import CustomBuiltOfficeSpacesData from '../../config/services/CustomBuiltOfficeSpacesData'

const CustomBuiltOfficeSpaces = () => {
  return (
    <div>
      <PageBuilder sections={CustomBuiltOfficeSpacesData.sections} />
    </div>
  )
}

export default CustomBuiltOfficeSpaces
