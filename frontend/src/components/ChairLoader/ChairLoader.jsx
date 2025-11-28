import chair from '../../assets/img/chair.gif'
import "./ChairLoader.css";

export default function ChairLoader() {
  return (
    <div className="chair-loader mt-5 bg-white">
      <div className="dots">
        <span></span><span></span><span></span>
      </div>

      <div className="chair-icon">
        <img src={chair} width='40px' alt="" />
      </div>
    </div>
  );
}