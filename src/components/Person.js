import React from 'react'


const Person = ({key,name,number,fu1}) => {
    //console.log("PEr",name,";", phone)
    return (

        <tr key={key}><td>{name}</td><td>{number}</td>
        <td><button key={key} id={key} type="submit" 
          name={name} onClick={fu1}>poista</button>
        </td></tr>


        /*<tr><td>{name}</td><td>{phone}</td>
        <td><button id={name} type="submit" name={name} onClick={alert({name})}>poista</button>
        </td></tr>*/
      )
  
  }
  




export default Person
