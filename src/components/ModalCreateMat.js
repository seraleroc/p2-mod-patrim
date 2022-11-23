import { Button, Modal, Row, Col, Form } from "react-bootstrap";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

function ModalCreateMat({ reload, setReload }) {
    const [show, setShow] = useState(false);
    const [form, setForm] = useState({
        rp: "",
        item: "",
        itemDetalhe: "",
        sitFisica: "",
        valCompra: "0",
        localiz: "",
        observ: "",
    });

const handleClose = () => setShow(false);
const handleShow = () => setShow(true);

function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
}

async function handleSubmit(e) {
   e.preventDefault();
   try {
    await axios.post("https://ironrest.cyclic.app/prj02modequipsiads2", form);
    handleClose();
    setForm({
        rp: "",
        item: "",
        itemDetalhe: "",
        sitFisica: "",
        valCompra: "0",
        localiz: "",
        observ: "",
    });
    toast.success("Material cadastrado com sucesso! :D");
    setReload(!reload);
   } catch (error) {
     console.log (error);
     toast.error("Error. Tente novamente");
   }
}
return (
    <div>
        <Button variant="success" onClick={handleShow}>
            + Cadastrar novo material
        </Button>

    <Modal show={show} onHide={handleClose} size="xl">
        <Modal.Header closeButton>
            <Modal.Title>Form Cadastro de Material</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <Row>
                    <Col>
                        <Form.Group className="mb-3">
                        <Form.Label>Nome do Material</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Digite o nome do material"
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
                            placeholder="Digite a descrição do material"
                            name="itemDetalhe"
                            value={form.itemDetalhe}
                            onChange={handleChange}
                        />
                        </Form.Group>
                    </Col>   
                </Row>
                <Row>
                <Col>
                        <Form.Group className="mb-3">
                        <Form.Label>Situação do Material</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Qual a Situação do Material"
                            name="sitFisica"
                            value={form.sitFisica}
                            onChange={handleChange}
                        />
                        </Form.Group>
                </Col>  
                    <Col>
                        <Form.Group className="mb-3">
                        <Form.Label>Valor Inicial de Compra</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Valor de Compra"
                            name="valCompra"
                            value={form.valCompra}
                            onChange={handleChange}
                        />
                        </Form.Group>
                </Col>  
                </Row>
                <Row>
                <Col>
                        <Form.Group className="mb-3">
                        <Form.Label>Localização</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Qual a Localização do Material"
                            name="localiz"
                            value={form.localiz}
                            onChange={handleChange}
                        />
                        </Form.Group>
                </Col>  
                    <Col>
                        <Form.Group className="mb-3">
                        <Form.Label>Observação</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Observação"
                            name="observ"
                            value={form.observ}
                            onChange={handleChange}
                        />
                        </Form.Group>
                </Col>  
                </Row>
            </Form>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Cancelar            
            </Button>
            <Button variant="primary" onClick={handleSubmit}>
                Cadastrar Material
            </Button>
        </Modal.Footer>
    </Modal>
    </div>
)

};

export default ModalCreateMat;