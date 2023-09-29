import React, { useState } from 'react'
import ShowPerson from './ShowPerson';
import PersonDetailsRow from './PersonDetailsRow';
import AddPerson from './AddPerson';

const ListRendering = () => {

    
    const names = ['John', 'Peter', 'Mark', 'James', 'Mary'];
    const persons = [{
        id: 1,
        name: 'John',
        age: 30,
        skill: 'React'
    },
    {
        id: 2,
        name: 'Peter',
        age: 25,
        skill: 'Angular'
    },
    {
        id: 3,
        name: 'Mark',
        age: 35,
        skill: 'Vue'
    },
{
        id: 4,
        name: 'James',
        age: 40,
        skill: 'Spring Boot'
},
{
        id: 5,
        name: 'Mary',
        age: 45,
        skill: 'Django'
    }]

    let [personList,UpdatePersonList] = useState(persons);

    return (
        <div className='container'>
            {/* <h2>List of names</h2>
            <ol>
                {names.map((uname, index) => <li key={index}>{uname}</li>)}
            </ol> */}

            <AddPerson perList={personList} updatePersons={UpdatePersonList}/>

            <h2>List of Persons</h2>
            <div className='container'>
            <div className='row'>
            
                {personList.map(person=><ShowPerson key={person.id} person={person}/>)}
            </div>
        </div>

        {/* <table className='table'>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Skill</th>
                </tr>
            </thead>
            <tbody>
            {persons.map(person=><PersonDetailsRow key={person.id} person={person}/>)}
            </tbody>

        </table> */}


        </div>
    )
}

export default ListRendering
