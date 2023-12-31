
import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import './style.css'
import api from './services/api';

function App() {

  const [input, setInput] = useState ('') 
  const [cep, setCep] = useState('')


  async function handleSearch(){
    if(input === ''){
      alert("preencha algum cep")
      return;
    }

    try {
      const response = await api.get(`${input}/json`); 
      setCep(response.data)
      setInput('');
    } catch  {
      alert('erro ao buscar')
      setInput('')
    }



  }

  return (
    <div className="App">
          <meta name="viewport" content="user-scalable=no, width=device-width, initial-scale=1.0" />

      <div className='container'>
        <div className='box'>
        <img src={require('./icon.png')} />
         <h1>Digite o seu <span style={{color: "#23c079"}}>CEP</span> </h1>

          <div className='container-input'>
              <input 
              type='text' 
              placeholder='Digite seu CEP' 
              value={input}
              onChange={(e)=> setInput(e.target.value)}
              
              ></input>
              <button className='buttonSearch' onClick={handleSearch}>
              <FiSearch size={25} color='white' />

              </button>
          </div>

        {Object.keys(cep).length > 0 &&(
           <main className='main'>
           <h2>CEP: {cep.cep}</h2>
           <span>{cep.logradouro}</span>
           <span>Complemento - {cep.complemento}</span>
           <span>{cep.bariro}</span>
           <span>{cep.localidade} - {cep.uf}</span>


       </main>

        )}

         

        </div>
        
      </div>
    </div>
  );
}

export default App;
