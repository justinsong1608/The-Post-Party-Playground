import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export default function NotFound() {
  const navigate = useNavigate();
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/');
    }, 8000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="position-relative container d-flex justify-content-center align-items-center black-bg-img flex-grow-1" style={{ height: "50vh" }}>
      <h2 className="position-absolute top-50 start-30 text-white">404 Not Found</h2>
      <img className="img-fluid w-50" src="https://media.tenor.com/w2o8VuTrneUAAAAC/dk-donkey.gif" alt="sad donkey kong" />
    </div>
  )
}
