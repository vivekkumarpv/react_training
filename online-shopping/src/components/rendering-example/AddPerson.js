import React, { useState } from 'react'

const AddPerson = ({perList, updatePersons}) => {
 

  let [person, updatePerson] = useState({});

  const addPerson = (e) => {
    e.preventDefault();
    

    // let numbers = [1,2,3,4,5];
    // let newNumbers = [...numbers, 6];

    let newPersonList = [...perList, person];
    updatePersons(newPersonList);
    console.log(person);
    resetForm();
    
  }

  const handleInputChange = (e) => {
    let inputName = e.target.name;
    let inputValue = e.target.value;
    updatePerson({...person, [inputName]:inputValue});

  }

  const resetForm = () => {
    updatePerson({});
  }

 

  return (
    <div>
      <form onSubmit={(e)=>{addPerson(e)}} onReset={()=>resetForm()} className='form'>
        <div className='form-group'>
          <label>ID</label>
          <input type='number' name='id' className='form-control'  
            onChange={(e)=>{handleInputChange(e)}}/>
          </div>
          <div className='form-group'>
          <label>Name</label>
          <input type='text' name='name' className='form-control' 
            onChange={(e)=>{handleInputChange(e)}}/>
          </div>
          <div className='form-group'>
          <label>Age</label>
          <input type='number' name='age' className='form-control' onChange={(e)=>{handleInputChange(e)}}/>
          </div>
          <div className='form-group'>
          <label>Skill</label>
          <input type='text' name='skill' className='form-control' onChange={(e)=>{handleInputChange(e)}}/>

          </div>
          <div className='form-group'>
          <input type='submit' className='btn btn-primary' value='Add Person'/>
          <input type='reset' className='btn btn-dark' value='Reset'/>
          </div>
          </form>

    </div>
  )
}

export default AddPerson
