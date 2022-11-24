import { Table, Container, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import ModalCreateMat from "../components/ModalCreateMat";
import { Link } from "react-router-dom";

function HomePage() {
  const [items, setItems] = useState([]);
  const [reload, setReload] = useState(false);

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

  //console.log(items)

  return (
    <div>
      <h1> Módulo de Cadastro / Consulta de Equipamentos</h1>
      <tr> </tr>

      <Container className="my-4">
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
            {items.map((item) => {
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
