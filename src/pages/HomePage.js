import { Table, Container, Button, FloatingLabel, Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import ModalCreateMat from "../components/ModalCreateMat";
import { Link } from "react-router-dom";

function HomePage() {
  const [items, setItems] = useState([]);
  const [reload, setReload] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchItems() {
      const response = await axios.get(
        "https://ironrest.cyclic.app/prj02modequipsiads2"
      );
      //console.log(response);
      setItems(response.data);
    }

    fetchItems();
  }, [reload]);

  function handleSearch(e) {
    setSearch(e.target.value);
  }

  return (
    <div>
      <h1>Cadastro / Consulta de Equipamentos</h1>
      <tr> </tr>

      <Container className="my-4">
        <FloatingLabel
          controlId="floatingInput"
          label="Pesquisar por Número do Patrimônio / Equipamento / Estado de Conservação / Localização"
          className="my-5"
        >
          <Form.Control
            size="lg"
            type="text"
            placeholder="Pesquisar"
            value={search}
            onChange={handleSearch}
          />
        </FloatingLabel>

        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>Número do Patrimônio</th>
              <th>Equipamento</th>
              <th>Estado de Conservação</th>
              <th>Localização</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {items
              .filter((item) => {
                return (
                  item.item.toLowerCase().includes(search.toLowerCase()) ||
                  item.localiz.toLowerCase().includes(search.toLowerCase()) ||
                  item.rp.toLowerCase().includes(search.toLowerCase()) ||
                  item.sitFisica.toLowerCase().includes(search.toLowerCase())
                );
              })
              .map((item) => {
                return (
                  <tr key={item._id}>
                    <td>{item.rp}</td>
                    <td>{item.item}</td>
                    <td>{item.sitFisica}</td>
                    <td>{item.localiz}</td>
                    <td>
                      <Link to={`/equip/${item._id}`}>
                        <Button variant="outline-primary">Detalhes</Button>
                      </Link>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </Table>

        <ModalCreateMat reload={reload} setReload={setReload} />
      </Container>
    </div>
  );
}

export default HomePage;
