import React from "react";
import './ServiceCard.css'

export default function ServiceCard({ data }) {
  return (
    <div className="sc-wrapper about pb-5">

      <div className="sc-header">
        <h1>{data.title}</h1>
        <p>{data.description}</p>
      </div>

      <div className="sc-grid">

          <div className="points">
            <h3 className="fw-semibold">Key Highlights</h3>
            <ul>
              {data.points.map((item, i) => (
                <li key={i} className="d-flex">
                  <span className="tick"><i className="bi bi-check2-circle"></i></span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="large img-wrapper">
            <img src={data.images[0]} alt="main" />
          </div>

          <div className="small1 img-wrapper">
            <img src={data.images[1]} alt="img1" />
          </div>

          <div className="small2 img-wrapper">
            <img src={data.images[2]} alt="img2" />
          </div>

        </div>
    </div>
  );
}
