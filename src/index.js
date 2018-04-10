import React from 'react'
import ReactDOM from 'react-dom'
//import axios from 'axios'

//import Person from './components/Person'
import SearchForm from './components/SearchForm'
import AddForm from './components/AddForm'

import Header from './components/Header'
import personService from './services/persons'



class App extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
          persons: []   ,
          newName: '',
          newPhone: '',
          filter: '',
        } 
      ;

    }
  

    componentDidMount() {
      personService.getAll()
      .then(response=> {
        this.setState({persons: response.data})
      })
    }



    addPerson = (event) => {
      event.preventDefault()
    
      const newperson = {
        name: this.state.newName,
        number: this.state.newPhone
      }
      
      let temp = this.state.persons
    
      let foundList = temp.filter(person=>person.name.startsWith(this.state.newName)===true)
    
      if (foundList.length===0) {

        personService
          .create(newperson)
          .then(response=> {
            this.setState ( {
              persons: this.state.persons.concat(response.data),
              newName:'',
              newPhone:''
            })
          })
      } else {
        alert("Name exists already!")
      }
    
    }
    

    handleFilter = (event) => {
      this.setState({ filter: event.target.value})
    }

    handleName = (event) => {
      let temp = event.target.value

      let orig = this.newName || ''

      let newVal = orig + temp 
      this.setState({newName: newVal})
      //
    }
    
    handlePhone = (event) => {
      let temp = event.target.value

      let orig = this.newPhone || ''

      let newVal = orig + temp 
      this.setState({newPhone: newVal})
      //
    }

  

    deleteRow = (e,id,name)=> {
      //console.log("DRL:",id, " name:",name, "- kaikki: ",this.state.persons)
      
      let others = this.state.persons.filter(person=>person.id!==id)
      //console.log ("Muut kamut: ", others)  


      personService
          .deletex(id)
          .then(response=> {
            //console.log("delli:", id, "AXX", response.data)
            this.setState({
              persons: others
            })
          })
      }


    listAll = () => { 
      //console.log("LA:",this.state.persons)
      let list = this.state.persons

      if (this.state.filter.length > 0) {
        list = this.state.persons.filter(person=>person.name.startsWith(this.state.filter)===true)

      } 
      return (
        list.map(person =>
          <tr key={person.id}><td>{person.name}</td><td>{person.number}</td>
          <td><button type="submit" name={person.name} onClick={(e)=>this.deleteRow(e,person.id,person.name)}>poista</button>
          </td></tr>
      )
      ) 
    }

    render() {

      return (
        <div>
          <Header text="Puhelinluettelo"/>
  
          <SearchForm fu1={this.state.newFilter} 
            fu2={this.handleFilter}/>

          <Header text="Lisää uusi"/>
          <AddForm fu1={this.addPerson} 
            fu2={this.state.newName}
            fu3={this.handleName}
            fu4={this.state.newPhone}
            fu5={this.handlePhone} />
{/*          <form onSubmit={this.addPerson}>
          <div>
            nimi: <input value={this.state.newName} 
            onChange={this.handleName}/> <br/>
            numero: <input value={this.state.newPhone} 
            onChange={this.handlePhone} />
          </div>
          <div>
            <button type="submit" >lisää</button>
          </div>
          </form>
      */}
          <Header text="Numerot"/>
          <table><tbody>
            {this.listAll()}
          </tbody>
          </table>

        </div>
      )
    }
  }


ReactDOM.render(
  <App />,
  document.getElementById('root')
)



export default App
