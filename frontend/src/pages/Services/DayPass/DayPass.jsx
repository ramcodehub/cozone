import React from 'react'
import ContactCard from '../../../components/ContactCard/ContactCard'
import hi from '../../../assets/img/mall.jpg'

const DayPass = () => {
  return (
    <div>
       <ContactCard
        heading="Private Cabin"
        content="Quiet & productive workspace."
        image={hi}
        action="modal"
        serviceName="Private Cabin"
      />
    </div>
  )
}

export default DayPass
