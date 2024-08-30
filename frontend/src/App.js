import React , {useState} from 'react';
import './App.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import ifpb from './img/IFCZ.png'
import ifBrand from './img/IFBrand.png'
import InputGroup from 'react-bootstrap/InputGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import DropdownButton from 'react-bootstrap/DropdownButton';



import SignUpScreen from './components/UserRegister';

class App extends React.Component {

  

  constructor(props){
    super(props);
      this.state = {
        todoList:[],
        labList: [],
        activeItem:{
          id:null, 
          title:'',
          completed:false,
        },

        editing:false,
        mostrarCadastro: false,
        mostrarLogin: true,
        mostrarApp: false,
      }

      
    

      this.fetchTasks = this.fetchTasks.bind(this)

      

      this.handleChange = this.handleChange.bind(this)
      this.handleSubmit = this.handleSubmit.bind(this)
      this.getCookie = this.getCookie.bind(this)


      this.startEdit = this.startEdit.bind(this)
      this.deleteItem = this.deleteItem.bind(this)
      this.strikeUnstrike = this.strikeUnstrike.bind(this)
  };

  getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

  componentWillMount(){
    this.fetchTasks()
  }

  fetchTasks(){
    console.log('Fetching...')

    fetch('http://127.0.0.1:8000/api/task-list/')
    .then(response => response.json())
    .then(data => 
      this.setState({
        todoList:data
      })
      )
  }

  fetchLabs(){
    console.log('Fetching...')

    fetch('http://127.0.0.1:8000/api/lab-list/')
    .then(response => response.json())
    .then(data => 
      this.setState({
        labList:data
      })
      )
  }

  handleSignIn = () => {
    this.setState({ mostrarCadastro: true });
    document.getElementById('App').style = 'display:none;'
  };

  handleApp = () => {
    this.setState({ mostrarCadastro: false });
    document.getElementById('App').style = 'display:block;'
  };

  handleChange(e){
    var name = e.target.name
    var value = e.target.value
    console.log('Name:', name)
    console.log('Value:', value)

    this.setState({
      activeItem:{
        ...this.state.activeItem,
        title:value
      }
    })
  }

  handleSubmit(e){
    e.preventDefault()
    console.log('ITEM:', this.state.activeItem)

    var csrftoken = this.getCookie('csrftoken')

    var url = 'http://127.0.0.1:8000/api/task-create/'

    if(this.state.editing === true){
      url = `http://127.0.0.1:8000/api/task-update/${ this.state.activeItem.id}/`
      this.setState({
        editing:false
      })
    }



    fetch(url, {
      method:'POST',
      headers:{
        'Content-type':'application/json',
        'X-CSRFToken':csrftoken,
      },
      body:JSON.stringify(this.state.activeItem)
    }).then((response)  => {
        this.fetchTasks()
        this.setState({
           activeItem:{
          id:null, 
          title:'',
          completed:false,
        }
        })
    }).catch(function(error){
      console.log('ERROR:', error)
    })

  }

  startEdit(task){
    this.setState({
      activeItem:task,
      editing:true,
    })
  }


  deleteItem(task){
    var csrftoken = this.getCookie('csrftoken')

    fetch(`http://127.0.0.1:8000/api/task-delete/${task.id}/`, {
      method:'DELETE',
      headers:{
        'Content-type':'application/json',
        'X-CSRFToken':csrftoken,
      },
    }).then((response) =>{

      this.fetchTasks()
    })
  }


  strikeUnstrike(task){

    task.completed = !task.completed
    var csrftoken = this.getCookie('csrftoken')
    var url = `http://127.0.0.1:8000/api/task-update/${task.id}/`

      fetch(url, {
        method:'POST',
        headers:{
          'Content-type':'application/json',
          'X-CSRFToken':csrftoken,
        },
        body:JSON.stringify({'completed': task.completed, 'title':task.title})
      }).then(() => {
        this.fetchTasks()
      })

    console.log('TASK:', task.completed)
  }

  

  render(){
    var tasks = this.state.todoList
    const { mostrarCadastro } = this.state;
    var self = this
    return(
      
      <>
      <Navbar expand="lg" className="bg-body-tertiary" style={{zIndex: 1}}>
        <Container>
          <Navbar.Brand href="#home"><img  style={{height: 40}} src={ifBrand}/>IF Book Laboratory</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link active onClick={this.handleApp}>Home</Nav.Link>
              <Nav.Link onClick={this.handleSignIn}>Sign In</Nav.Link>
              <NavDropdown title="Categories" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">ADS</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Eng Civil
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Eng Automação</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Lic em Matematica
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div className="container" id='App' style={{display:'block'}}>
        <img style={{position: 'relative', top:1 , left: 325, marginTop:10}} className='ifLogoMobile' src={ifpb}/>
            <div id="task-container">
            
              <div id="form-wrapper">
                <form onSubmit={this.handleSubmit} id="form">
                  <div className="flex-wrapper">
                    <div style={{ flex: 6 }}>
                    <input onChange={this.handleChange} className="form-control" id="title" value={this.state.activeItem.title} type="text" name="title" placeholder="inform a lab you want to book" />
                      
                    </div>

                    <div style={{ flex: 1 }}>
                      <input id="submit" className="btn btn-warning rounded-right" type="submit" name="Add" value={"Book"} />
                    </div>
                  </div>
                </form>

              </div>

              <div id="list-wrapper">
                {tasks.map(function (task, index) {
                  return (
                    <div key={index} className="task-wrapper flex-wrapper">

                      <div onClick={() => self.strikeUnstrike(task)} style={{ flex: 7 }}>

                        {task.completed == false ? (
                          <span>{task.title}</span>

                        ) : (

                          <strike>{task.title}</strike>
                        )}

                      </div>

                      <div style={{ flex: 1 }}>
                        <button onClick={() => self.startEdit(task)} className="btn btn-sm btn-outline-info">Edit</button>
                      </div>

                      <div style={{ flex: 1 }}>
                        <button onClick={() => self.deleteItem(task)} className="btn btn-sm btn-outline-danger delete"><i class="fa-solid fa-trash"></i></button>
                      </div>

                    </div>
                  );
                })}
              </div>
            </div>

      </div></>
      )
  }
}





export default App;
