import { Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"

const NotFound = () => {

    const navigate = useNavigate();

    return (
        <div className="text-center my-5">
            <h3 className="text-light">Pagina Non Disponibile!</h3>
            <Button variant="dark" className="my-5" onClick={() => {
                alert('Stai per essere reindirizzato alla Home...');
                navigate('/');
            }}>Ritorna alla Home</Button>
        </div>
    )
}

export default NotFound;