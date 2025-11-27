import { useNavigate } from "react-router-dom";
import Button from "../Button/Button";

export default function ErrorPage() {

  return (
    <div className="d-flex flex-column align-items-center justify-content-center" style={{height:'80dvh'}}>
      <h1 className="fw-bolder text-center">Oops! Something went wrong 🚨</h1>
      <p className="fs-5 m-0 p-0 text-center" style={{color:'#AAAAAA'}}>We couldn’t find the page you’re looking for.</p>
      <Button
        variant='secondary'
        to='/'
        style={{ padding: "10px 20px", marginTop: "20px" }}
      >
        Go Home
      </Button>
    </div>
  );
}