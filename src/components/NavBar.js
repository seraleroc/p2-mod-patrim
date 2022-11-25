import { Navbar, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <Navbar bg="orange" variant="dark">
      <Container>
        <Link to="/" style={{ textDecoration: "none" }}>
          <Navbar.Brand as="div">
            <img
              alt="logo SIADS"
              src="https://siads.fazenda.gov.br/siadsweb/resources/img/logo-siads.png"
              width="100"
              height="100"
              className="d-inline-block align-center"
            />{" "}
            <strong>Módulo Estoque - Nova Entrada de Material</strong>
          </Navbar.Brand>
        </Link>
      </Container>
    </Navbar>
  );
}

export default NavBar;
