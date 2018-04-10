import React from 'react'
import ReactDOM from 'react-dom'
//import axios from 'axios'

//import Person from './components/Person'
import SearchForm from './components/SearchForm'
import AddForm from './components/AddForm'

import Header from './components/Header'
import personService from './services/persons'
import Notification from './components/Notification'
import './index.css'



const Info = ({ message  }) => {
  //console.log("Info for ", message)
  if (message === null && message !== "ERR") {
    return null
  }
  return (
    <div className="info">
      {message}
    </div>
  )
}


class App extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
          persons: []   ,
          newName: '',
          newPhone: '',
          filter: '',
          error: null,
          info: null,
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
    
      //let foundList = temp.filter(person=>person.name.startsWith(this.state.newName)===true)
      let foundList = temp.filter(person=>person.name === this.state.newName)
    
      if (foundList.length===0) {
        personService
          .create(newperson)
          .then(response=> {
            this.setState ( {
              persons: this.state.persons.concat(response.data),
              newName:'',
              newPhone:'',
              info: `Henkilö '${this.state.newName}' lisätty.`
            })
            setTimeout(() => {
              this.setState({info: null})
            }, 5000)
    
          })
      
      } else {
        if (window.confirm(this.state.newName+" on jo luettelossa, korvataanko vanha numero uudella?")) {

          foundList[0]["number"] =  this.state.newPhone
          let others = this.state.persons.filter(person=>person.id!==foundList[0].id)

          personService
            .update(foundList[0].id, foundList[0])
            .then(response=> {
              //console.log("updated:",response.data)

              this.setState ( {
                persons: others.concat(response.data),
                newName:'',
                newPhone:''
              })
            })
            this.setState ({
              info: `Henkilön '${this.state.newName}' numero päivitetty.`
          })
          setTimeout(() => {
            this.setState({info: null})
          }, 5000)
    
        }
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
      
      let infomsg = `Henkilö '${name}' poistettu.`
   
      if (window.confirm("Poistetaanko "+name+" ?")) {

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
          .catch(error => {
            
            this.setState({
              error: `Henkilö '${name}' on jo valitettavasti poistettu palvelimelta`,
              notes: this.state.persons.filter(n => n.id !== id),
              info: null
            })
            setTimeout(() => {
              infomsg = null
              this.setState({error: null})
            }, 5000)
          }
          )
     
          this.setState ({
            info: infomsg
            })
            setTimeout(() => {
            this.setState({info: null})
          }, 5000) 
          
    }


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
  
          <Notification message={this.state.error} classname="error"/>
          <Info message={this.state.info} classname="info"/>

          <SearchForm fu1={this.state.newFilter} 
            fu2={this.handleFilter}/>

          <Header text="Lisää uusi"/>
          <AddForm fu1={this.addPerson} 
            fu2={this.state.newName}
            fu3={this.handleName}
            fu4={this.state.newPhone}
            fu5={this.handlePhone} />

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
