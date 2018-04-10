import React from 'react'


const AddForm = ({fu1,fu2,fu3,fu4,fu5}) => {

    return (
   <form onSubmit={fu1}>
   <div>
    nimi: <input value={fu2} 
    onChange={fu3}/> <br/>
    numero: <input value={fu4} 
    onChange={fu5} />
    </div>
    <div>
    <button type="submit" >lisää</button>
    </div>
    </form>
    )
}

export default AddForm