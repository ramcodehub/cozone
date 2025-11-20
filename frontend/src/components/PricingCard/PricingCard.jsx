import React  from 'react'
import { Link } from 'react-router-dom'
import Button from '../Button/Button'
import './PricingCard.css'

const PricingCard = ({ heading, navLink, points, onEnquire }) => {
  return (
    <>
        <div className='pricing-card-outline '>
            <div className='d-flex flex-column justify-content-between pricing-card p-4'>
                <div className='d-flex flex-column gap-2'>
                    <div className='d-flex justify-content-between mt-4 pricing-heading'>
                        <h4 className='fw-semibold' >{heading}</h4>
                        <Link to={navLink}><i class="bi bi-info-circle text-black"></i></Link>
                    </div>
                    <ul className="list-unstyled">
                        {points.map((item, index) => (
                            <li key={index} className="mb-2"><i class="bi bi-check2-circle"></i> {item}</li>
                        ))}
                    </ul>

                </div>
                <Button
                    variant="primary"
                    icon={<i className="bi bi-arrow-right"></i>}
                    onClick={() => onEnquire(heading)}
                    className='mb-4'
                >
                Enquire Now
            </Button>
            </div>
        </div>
        
    </>
  )
}

export default PricingCard
