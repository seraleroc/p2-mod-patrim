import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Container, Card, Button, Row, Col, Form, Spinner } from "react-bootstrap";

function DetailPage() {
    const { equipID } = useParams(); 
    const navigate = useNavigate();

    const [ item, setItem] = useState({});
    const [showEdit, setShowEdit] = useState(false);
    const [form, setForm] = useState({
        rp: "",
        item: "",
        itemDetalhe: "",
        sitFisica: "",
        valCompra: "",
        localiz: "",
        observ: "",
    });
 
    const [isLoading, setIsLoading] = useState(true);
    const [reload, setReload] = useState(false);
    
    useEffect(() => {
        async function fetchItem() {
            try {
                const response = await axios.get(
                    `https://ironrest.cyclic.app/prj02modequipsiads2/${equipID}`
                );
                setItem(response.data);
                setForm(response.data);
                setIsLoading(false);
            }   catch (error) {
                console.log(error);
                toast.error("Erro ao recuperar informação da API");                
            } 
        }
        fetchItem();
        return () => {
            console.log("sim ok após o useEffect")
        };
    }, [reload, equipID] );

    function handleChange(e) {
        if (e.target.name === "active") {
            setForm({ ...form, active: e.target.checked });
            return;
        }
        setForm({ ...form, active: e.target.checked });
    }
    
    async function handleDelete(e) {
        try {
            await axios.delete(`https://ironrest.cyclic.app/prj02modequipsiads2/${equipID}`);
            navigate("/");
            toast.success("Exclusão de material ok.");
        } catch (error) {
            console.log(error);
            toast.error("Erro na exclusão do material.");
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const clone = { ...form };
            delete clone._id;

            await axios.put(`https://ironrest.cyclic.app/prj02modequipsiads2/${equipID}`, clone);
            
            toast.success("Alteração Ok");
            setReload(!reload);
            setShowEdit(false);
        }   catch (error) {
            console.log(error);
            toast.error("Erro. Tente Novamente.");
        }
    }

   console.log(form);

    return (
/*        <div>
/*           <p> Pagina de Detalhe de Cadastro do Equipamento</p>
/*            <p> Pegar o id do equipamento pelo useParams</p>
/*            <p> Mostrar as informações do equipamento</p>
/*        </div>
*/
        <Container className="my-4">
            {isLoading === false && (
            <>
            {/* Card Item */}
            {showEdit === false && (
               <Card className="text-center" bg="light">
               <Card.Header>
                 <Card.Title>Material</Card.Title>
                 <Card.Subtitle className="mb-2 text-muted">
                           {item.item}
                 </Card.Subtitle>
               </Card.Header>
               <Card.Body>
                 <Row>
                   <Col>
                   <Card.Title>Registro Patrimonial</Card.Title>
                     <Card.Text>{item.rp}</Card.Text> 

                     <Card.Title>Descrição do Material</Card.Title>
                     <Card.Text>{item.itemDetalhe}</Card.Text>
 
                     <Card.Title>Situação do Material</Card.Title>
                     <Card.Text>{item.sitFisica}</Card.Text>
                   </Col>
                   <Col>
                     <Card.Title>Valor de Compra</Card.Title>
                     <Card.Text>{item.valCompra}</Card.Text>
 
                     <Card.Title>Localização</Card.Title>
                     <Card.Text>{item.localiz}</Card.Text>
 
                     <Card.Title>Observação</Card.Title>
                     <Card.Text>{item.observ}</Card.Text>
                   </Col> 
                 </Row>
                </Card.Body>
                 <Card.Footer className="text-muted">
                   <Row>
                   <Col>
                     <Button variant="outline-secondary" onClick={() => setShowEdit(true)}>
                       Editar Material
                     </Button>
                   </Col>
                   <Col>
                     <Button variant="outline-danger" onClick={handleDelete}>
                       Excluir Material
                     </Button>
                   </Col>
                   </Row>
                 </Card.Footer>
                </Card>
            )}

            {/* Card Item Edit */}
          {showEdit === true && (
            <Card className="text-center" bg="light">
              <Card.Body>
                <Form>
                  <Row>
                  <Col>
                      <Form.Group className="mb-3">
                        <Form.Label>Item</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Digite o item (material)"
                          name="item"
                          value={form.item}
                          onChange={handleChange}
                          autoFocus
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group className="mb-3">
                        <Form.Label>Descrição do Material</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Digite descrição do material"
                          name="itemDetalhe"
                          value={form.itemDetalhe}
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group className="mb-3">
                        <Form.Label>Situação</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Digite Situação do Material"
                          name="sitFisica"
                          value={form.sitFisica}
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Group className="mb-3">
                        <Form.Label>Valor de Compra</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Digite o valor de compra"
                          name="valCompra"
                          value={form.valCompra}
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group className="mb-3">
                        <Form.Label>Localização</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Digite a localização do material"
                          name="localiz"
                          value={form.localiz}
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Group className="mb-3">
                        <Form.Label>Observação</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Digite alguma observação (opcional)"
                          name="observ"
                          value={form.observ}
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                </Form>
              </Card.Body>
              <Card.Footer className="text-muted">
                <Row>
                  <Col>
                    <Button variant="outline-danger" onClick={() => setShowEdit(false)}>
                      Voltar
                    </Button>
                  </Col>
                  <Col>
                    <Button variant="outline-success" onClick={handleSubmit}>
                      Salvar Alterações
                    </Button>
                  </Col>
                </Row>
              </Card.Footer>
              </Card>
          )} 
            </> 
            )} 

            {isLoading === true && (
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Carregando...</span>
                </Spinner>
            )}  
        </Container>
    )

}

export default DetailPage;