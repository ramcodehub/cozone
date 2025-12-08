import React from 'react'

const Map = () => {
  return (
     <div style={{ width: "100%", height: "400px" }}>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.0196977307846!2d78.36185385692727!3d17.458771292105023!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb93ba498848bb%3A0x303970602aeb124c!2sAsian%20Sun%20City!5e0!3m2!1sen!2sin!4v1765172092874!5m2!1sen!2sin"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
      ></iframe>
    </div>
  )
}

export default Map
