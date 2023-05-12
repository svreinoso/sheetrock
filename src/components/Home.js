import React, { useState } from 'react';
import { Form, Button, Card, Row, Col, ButtonGroup, ToggleButton } from 'react-bootstrap';

export const Home = () => {
  const [width, setWidth] = useState(0);
  const [heigh, setHeigh] = useState(0);
  const [result, setResult] = useState(null);
  const [distanceParales, setDistanceParales] = useState(40);
  const [distanceTornilloPlachas, setDistanceTornilloPlachas] = useState(8);

  const calculate = () => {
    if (!width || !heigh) {
      alert('Datos incorrectos');
      return;
    }
    console.log(width, heigh, distanceParales);
    const data = {};

    data.planchas = (width * heigh) / 32;
    data.planchasR = Math.ceil(data.planchas) + Math.ceil(Math.ceil(data.planchas) / 32);

    data.durmientes = ((width * 1 + heigh * 1) * 2) / 10;
    data.durmientesR = Math.ceil(data.durmientes) + Math.ceil(Math.ceil(data.durmientes) / 10);

    const max = width > heigh ? width : heigh;
    const min = width < heigh ? width : heigh;
    data.parales = ((max / (distanceParales / 2.54 / 12)) * min) / 10;
    data.paralesR = Math.ceil(data.parales) + Math.ceil(Math.ceil(data.parales) / 10);

    data.tornillosPlancha = distanceTornilloPlachas === 8 ? data.planchas * 36 : data.planchas * 28;
    data.tornillosPlanchaR = Math.ceil(data.tornillosPlancha) + Math.ceil(Math.ceil(data.tornillosPlancha) / 10);

    setResult(data);
    console.log(data);
  };

  const renderValue = (title, value, valueR) => {
    return (
      <Col sm={6} className="mt-3">
        <Card>
          <Card.Body>
            <Card.Title>{title}</Card.Title>
            <Row>
              <Col sm={6}>
                <p>
                  Exacto: <b>{value.toFixed(2)}</b>
                </p>
              </Col>
              <Col sm={6}>
                <p>
                  Recomendado: <b>{valueR}</b>
                </p>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Col>
    );
  };

  return (
    <div>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Ancho(pies)</Form.Label>
          <Form.Control
            required
            onChange={(e) => setWidth(e.target.value)}
            type="number"
            step={0.1}
            placeholder="Ancho"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Altura (pies)</Form.Label>
          <Form.Control
            required
            onChange={(e) => setHeigh(e.target.value)}
            type="number"
            step={0.1}
            placeholder="Altura"
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Distancia de los parales</Form.Label>
          <div>
            <ButtonGroup>
            <ToggleButton
              id="radio-40"
              type="radio"
              variant={distanceParales === 40 ? 'outline-success' : 'link'}
              name="radio"
              value={distanceParales}
              checked={distanceParales === 40}
              onChange={(e) => setDistanceParales(40)}>
              40 CM
            </ToggleButton>
            <ToggleButton
              id="radio-60"
              type="radio"
              variant={distanceParales === 60 ? 'outline-success' : 'link'}
              name="radio"
              value={distanceParales}
              checked={distanceParales === 60}
              onChange={(e) => setDistanceParales(60)}>
              60 CM
            </ToggleButton>
          </ButtonGroup>
          </div>
        </Form.Group>

        
        <Form.Group>
          <Form.Label>Distancia de los tornillos de plancha</Form.Label>
          <div>
            <ButtonGroup>
            <ToggleButton
              id="t-8"
              type="radio"
              variant={distanceTornilloPlachas === 8 ? 'outline-success' : 'link'}
              name="tornillos"
              value={distanceTornilloPlachas}
              checked={distanceTornilloPlachas === 8}
              onChange={(e) => setDistanceTornilloPlachas(8)}>
              8 PG (techo)
            </ToggleButton>
            <ToggleButton
              id="t10"
              type="radio"
              variant={distanceTornilloPlachas === 10 ? 'outline-success' : 'link'}
              name="tornillos"
              value={distanceTornilloPlachas}
              checked={distanceTornilloPlachas === 10}
              onChange={(e) => setDistanceTornilloPlachas(10)}>
              10 PG (pared)
            </ToggleButton>
          </ButtonGroup>
          </div>
        </Form.Group>

        <Button variant="primary" onClick={calculate} className="mt-3">
          Calcular
        </Button>
      </Form>
      {result && (
        <Row className="mt-3">
          {renderValue('Planchas', result.planchas, result.planchasR)}
          {renderValue('Durmientes', result.durmientes, result.durmientesR)}
          {renderValue('Parales', result.parales, result.paralesR)}
          {renderValue('Tornillos de plancha', result.tornillosPlancha, result.tornillosPlanchaR)}
        </Row>
      )}
    </div>
  );
};
