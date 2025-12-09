import "./CurvedHero.css";
import Img1 from '../../assets/img/curved1.jpg'
import Img2 from '../../assets/img/curved2.jpg'
import Img3 from '../../assets/img/curved3.jpg'

export default function CurvedHero() {
  return (
    <section className="curved-hero">
      <div className="curved-inner">
        <div className="panel p1">
          <img src={Img1} alt="" />
        </div>

        <div className="panel p2">
          <img src={Img2} alt="" />
        </div>

        <div className="panel p3">
          <img src={Img3} alt="" />
        </div>
      </div>

      <div className="heroo-text">
        <h1>Gallery</h1>
        {/* <p>Discover the space around you</p> */}
      </div>
    </section>
  );
}
