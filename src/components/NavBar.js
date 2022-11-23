import {Navbar, Container} from 'react-bootstrap';
import {Link} from "react-router-dom";

function NavBar() {

    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Link to="/" style={{ textDecoration: "none"}}>
                    <Navbar.Brand as="div">
                        <img
                            alt="logo SIADS"
                            src="https://siads.fazenda.gov.br/siadsweb/resources/img/logo-siads.png"
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                        />{' '}
                        Módulo Estoque - Nova Entrada de Material
                    </Navbar.Brand>
                </Link>         
            </Container>
      </Navbar>
    )
}


export default NavBar