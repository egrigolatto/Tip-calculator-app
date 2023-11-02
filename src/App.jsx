import { useState } from 'react'
import './assets/styles/App.css'
import dollarIcon from './assets/images/icon-dollar.svg'
import personIcon from './assets/images/icon-person.svg'
import { Form } from './Components/Form'
import { Boton } from './Components/Boton'

function App() {
  const [total, setTotal] = useState('');
  const [propina, setPropina] = useState('');
  const [propinaCustom, setPropinaCustom] = useState('')
  const [personas, setPersonas] = useState('');
  const [errorPersonas, setErrorPersonas] = useState(false);
  const [errorTotal, setErrorTotal] = useState(false);
  const [errorPropCustom, setErrorPropCustom] = useState(false);
  const [selectedTip, setSelectedTip] = useState(null);

  // para reseter el error y que desaparezca el mensaje de error
  const resetError = (errorSetter) => {
    if (errorSetter) {
      errorSetter(false);
    }
  };
  // para validar que los valores ingresados sean solo numeros
  const validarNroForm = (num, func, errorSetter) => {
    if (/^\d*\.?\d*$/.test(num)) {
      resetError(errorSetter);
      func(num);
    } else {
      errorSetter(true);
    }
  };
  // para obtener el valor total
  const manejarTotal = (e) => {
    e.preventDefault()
    const valor = e.target.value
    validarNroForm(valor,setTotal,setErrorTotal)
  }
  // para obtener propina personalizada
  const manejarPropCustom = (e) => {
    e.preventDefault();
    const valor = e.target.value;
    validarNroForm(valor, setPropinaCustom, setErrorPropCustom);
    setSelectedTip(null);
  
  };
  // para obtenber la cantidad de personas
  const manejarPersonas = (e) => {
    e.preventDefault();
    const valor = e.target.value;
    validarNroForm(valor, setPersonas, setErrorPersonas);
  };

  const manejarBtnPropina = (porcentaje) => {
     setSelectedTip(porcentaje);
     setPropinaCustom("");
     setPropina(porcentaje);
  }
  const manejarReset = () => {
    setPersonas('');
    setTotal('');
    setPropinaCustom('');
    setSelectedTip(null);
  }

  const totalPorPersona = () => {
    const totalNum = parseFloat(total);
    const personasN = parseFloat(personas);
    let propinaNum = 0; // Inicializar propina en 0

    if (propinaCustom) {
      // Utilizar propina personalizada si se proporciona
      propinaNum = parseFloat(propinaCustom);
      
    } else if (propina) {
      // Utilizar propina de los botones si está definida
      propinaNum = parseFloat(propina);
     
    }

    if (isNaN(totalNum) || isNaN(personasN)) {
      return 0; // ante cualquier error devuelve cero
    }
    // Calcular el total por persona
    const totalPP = (totalNum + (totalNum * propinaNum) / 100) / personasN;

    const totalPropPersona = ((totalNum * propinaNum) / 100)/ personasN;

    return {
      totalPP: totalPP.toFixed(2),
      totalPropPersona: totalPropPersona.toFixed(2),
    };
  }
  

  return (
    <div className="app">
      <h1 className="title">
        SPLI
        <br />
        TTER
      </h1>
      <div className="leftCard">
        <Form
          label="Bill"
          value={total}
          onChange={manejarTotal}
          placeholder="0"
          error={errorTotal}
          icon={dollarIcon}
        />

        <div className="divTips">
          <p className="sub_title">Slect Tip %</p>
          <div className="btnGrilla">
            <Boton
              selected={selectedTip === 5}
              onClick={() => manejarBtnPropina(5)}
              percentage={5}
            />
            <Boton
              selected={selectedTip === 10}
              onClick={() => manejarBtnPropina(10)}
              percentage={10}
            />
            <Boton
              selected={selectedTip === 15}
              onClick={() => manejarBtnPropina(15)}
              percentage={15}
            />
            <Boton
              selected={selectedTip === 25}
              onClick={() => manejarBtnPropina(25)}
              percentage={25}
            />
            <Boton
              selected={selectedTip === 50}
              onClick={() => manejarBtnPropina(50)}
              percentage={50}
            />
            <input
              value={propinaCustom}
              onChange={manejarPropCustom}
              type="text"
              placeholder="Custom"
              className={errorPropCustom ? "errorCustom" : ""}
            />
          </div>
        </div>
        <Form
          label="Number of People"
          value={personas}
          onChange={manejarPersonas}
          placeholder="0"
          error={errorPersonas}
          icon={personIcon}
        />
      </div>

      <div className="rightCard">
        <div>
          <div className="tipAmount">
            <span>
              <p>Tip Amount</p>
              <small>/ person</small>
            </span>
            <h1>${totalPorPersona().totalPropPersona ?? "0.00"}</h1>
          </div>
          <div className="totalPerson">
            <span>
              <p>Total</p>
              <small>/ person</small>
            </span>
            <h1>${totalPorPersona().totalPP ?? "0.00"}</h1>
          </div>
        </div>

        <div>
          <button className="btnReset" onClick={manejarReset}>
            RESET
          </button>
        </div>
      </div>
    </div>
  );
}

export default App
