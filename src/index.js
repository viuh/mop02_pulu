import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'

import Person from './components/Person'
import SearchForm from './components/SearchForm'
import Header from './components/Header'


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
      //console.log('will mount')
      axios
        .get('http://localhost:3001/persons')
        .then(response => {
          //console.log('data got')
          this.setState({ persons: response.data })
        })
    }


    addPerson = (event) => {
      event.preventDefault()
      
      let newperson = {name: this.state.newName,
        number: this.state.newPhone}
      
      let temp = this.state.persons
    
      let foundList = temp.filter(person=>person.name.startsWith(this.state.newName)===true)
    
      if (foundList.length===0) {
        temp.push(newperson)
        this.setState({persons: temp, newName:'', newPhone:''})
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

    listAll = () => { 
      //console.log("LA:",this.state.persons)
      let list = this.state.persons

      if (this.state.filter.length > 0) {
        list = this.state.persons.filter(person=>person.name.startsWith(this.state.filter)===true)

      } 
      
      return (
        list.map(person =>
        <Person key={person.name} name={person.name} phone={person.number}/>
        )
      ) 
    }

    render() {

      return (
        <div>
          <Header text="Puhelinluettelo"/>
  
          <SearchForm fu1={this.state.newFilter} 
            fu2={this.handleFilter}/>

          <h2>Lisää uusi</h2>
          <form onSubmit={this.addPerson}>
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
