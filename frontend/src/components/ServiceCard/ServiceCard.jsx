import React from "react";
import './ServiceCard.css'

export default function ServiceCard({ data }) {
  return (
    <div className="sc-wrapper">

      <div className="sc-header">
        <h1>{data.title}</h1>
        <p>{data.description}</p>
      </div>

      <div className="sc-middle">
        <div>
            <h3 className="fw-semibold">Key Highlights</h3>
            <ul>
            {data.points.map((item, i) => (
                <li key={i}>
                <span className="tick"><i class="bi bi-check2-circle "></i></span> {item}
                </li>
            ))}
            </ul>
        </div>

        <div className="sc-img-large img-wrapper">
          <img src={data.images[0]} alt="main" />
        </div>
      </div>

      <div className="sc-bottom">
        <div className="sc-img-small img-wrapper">
          <img src={data.images[1]} alt="img1" />
        </div>
        <div className="sc-img-small img-wrapper">
          <img src={data.images[2]} alt="img2" />
        </div>
      </div>

    </div>
  );
}
