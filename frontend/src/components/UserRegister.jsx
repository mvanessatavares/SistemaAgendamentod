import axios from 'axios';
import React, {useState} from 'react';
import { Form, Button } from 'react-bootstrap';
import {Container} from 'react-bootstrap';
import App from '../App';
import AuthLogin from './UserLogin';
import ifpb from '../img/IFCZ.png'
import ifBrand from '../img/IFBrand.png'





function SignUp() {
  
  const [showApp, setShowApp] = useState(false)
  const [showRegister, setShowRegister] = useState(true)
  const [showLogin, setShowLogin] = useState(false)

  const handleLogin = () =>
  {
    setShowLogin(true)
    setShowRegister(false)
  }

  function enviarRequisicao(event) {
    event.preventDefault(); // Evita o comportamento padrão de envio do formulário
  
    const form = event.target;
    const csrfToken = form._csrf.value; // Obtenha o valor do CSRF token do campo oculto
  
    // Configurando o cabeçalho da requisição com o token CSRF
    const headers = {
      'X-CSRFToken': csrfToken
    };
  
    // Extrair os dados do formulário
    const formData = new FormData(form);
  
    // Fazendo a requisição com o cabeçalho configurado
    axios.post('http://127.0.0.1:8000/api/create-user/', formData, { headers })
      .then(response => {
        alert('Usuario Cadastrado com Sucesso!')
        setShowLogin(true)
        setShowRegister(false)
      })
      .catch(error => {
        alert('Houve algum erro!')
      });
  }


  const csrfToken = window.csrfToken; // Certifique-se de que csrfToken esteja definido
  return (
    <>
      {showApp && <App />}
      {showLogin && <AuthLogin />}
      {showRegister && 

        <div>
        <img style={{position: 'relative', top:1 , left: 325, marginTop:10}} className='ifLogoMobile' src={ifpb}/>
        <Container className='bg-light rounded box-register'>

          <Form onSubmit={enviarRequisicao} method='POST' action='http://127.0.0.1:8000/api/create-user/'>
          <Form.Group className="mb-3" controlId="formBasicUsername">
            <Form.Control name="_csrf" type="hidden" defaultValue={csrfToken} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicUsername">
            <Form.Control name="groups" type="hidden" defaultValue='Docentes' />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control name="username" type="text" placeholder="Username" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control name="email" type="email" placeholder="Enter email" />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control name="password" type="password" placeholder="Password" />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
        <p>Já Possui uma Conta? <br/> <span onClick={handleLogin} className='btn btn-primary btn-sm'>Clique Aqui</span> </p>
      </Container>
        </div>
       
      }
      
    </>
  );
}

export default SignUp;