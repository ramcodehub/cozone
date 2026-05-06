import "./HomeHero.css";
import heroVideo from "../../assets/img/homehero.mp4";

const HomeHero = () => {
  return (
    <section className="home-hero">
      {/* Video Wrapper */}
      <div className="video-wrapper">
        <video
          className="hero-video"
          src={heroVideo}
          autoPlay
          loop
          muted
          playsInline
        />
      </div>

      {/* Overlay */}
      <div className="hero-overlay"></div>

      {/* Content */}
      {/* <div className="hero-content">
        <h1>Build. Create. Grow.</h1>
        <p>
          A modern workspace designed to inspire productivity, collaboration,
          and innovation.
        </p>
        <button className="hero-btn">Explore Our Space</button>
      </div> */}
    </section>
  );
};

export default HomeHero;