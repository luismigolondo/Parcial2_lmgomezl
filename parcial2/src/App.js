import { React, useState, useEffect } from 'react';
import './App.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import { FormattedMessage } from 'react-intl';
import Grafica from './components/Grafica';

function App() {

  let [data, setData] = useState();

  function getBrowserLanguage() {
    return navigator.language || navigator.userLanguage;
  }

  useEffect(() => {
    if (!navigator.onLine) {
      if (JSON.parse(localStorage.getItem("series")) === null) {
        setData("Loading...")
      } else {
        setData(JSON.parse(localStorage.getItem("series")));
      }
    } else {
      let URL = "";
      if (getBrowserLanguage() === "en") {
        URL = "https://gist.githubusercontent.com/josejbocanegra/5dc69cb7feb7945ef58b9c3d84be2635/raw/64146e99e4416da3a8be2e2da4156cb87b3f6fd0/series-en.json";
      } else {
        URL = "https://gist.githubusercontent.com/josejbocanegra/c55d86de9e0dae79e3308d95e78f997f/raw/d9eb0701f6b495dac63bbf59adc4614a9eb5fbc8/series-es.json";
      }
      fetch(URL).then(res => res.json()).then(res => {
        setData(res);
        localStorage.setItem("series", JSON.stringify(res));
      })
    }
  }, [])

  return (
    <div className="App">
      <Container>
        <Row>
          <Col>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th><FormattedMessage id="id" /></th>
                  <th><FormattedMessage id="name" /></th>
                  <th><FormattedMessage id="channel" /></th>
                  <th><FormattedMessage id="description" /></th>
                </tr>
              </thead>
              <tbody>
                {data && data.map(s => (
                  <tr>
                    <td>{s.id}</td>
                    <td>{s.name}</td>
                    <td>{s.channel}</td>
                    <td>{s.description}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
        <Row>
          <h1><FormattedMessage id="seasons"/></h1>
        </Row>
        <Row>
          {data &&
            <Grafica datos={data} />
          }
        </Row>
      </Container>
    </div>
  );
}

export default App;
