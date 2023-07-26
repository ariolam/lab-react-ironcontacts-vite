import { useState } from "react";
import "./App.css";
import contactsJSON from "./contacts.json";

// Function to generate random number
function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function App() {
    const [contacts, setContacts] = useState(contactsJSON.slice(0, 5));

    const addRandom = () => {
        //create random index with range 5-end
        const index = randomNumber(5, contactsJSON.length - 1);
        console.log(index);

        //use the index to read a new contact
        const randomContact = contactsJSON[index];
        console.log(randomContact);

        //add the contact to new state
        const newContacts = contactsJSON.slice(0, 5);
        newContacts.push(randomContact);
        setContacts(newContacts);
        console.log(newContacts);
    };

    const sortPopularity = () => {
        //Create a shallow copy of the array
        //Call the sort() method on the array passing it a function
        // The function is used to define the sort order
        const numDescending = [...contacts].sort(
            (a, b) => b.popularity - a.popularity
        );
        console.log(numDescending);
        setContacts(numDescending);
    };

    const sortName = () => {
        // Create a shallow copy of the array
        //Call the sort() method on the array passing it a function
        //The function is used to define the sort order
        const strAscending = [...contacts].sort((a, b) =>
            a.name > b.name ? 1 : -1
        );
        console.log(strAscending);
        setContacts(strAscending);
    };

    const deleteContact = (contactId) => {
        const filteredContacts = contacts.filter((filterContact) => {
            if (filterContact.id !== contactId) {
                return true;
            }
        });
        console.log("filtered contacts", filteredContacts);
        setContacts(filteredContacts);
    };

    return (
        <div className="App">
            <h1>LAB | React IronContacts</h1>
            <button onClick={addRandom}> Add Random Contact </button>
            <button onClick={sortPopularity}> Sort by popularity</button>
            <button onClick={sortName}> Sort by name </button>
            <table>
                <thead>
                    <tr>
                        <th>Picture</th>
                        <th>Name</th>
                        <th>Popularity</th>
                        <th>Won Oscar</th>
                        <th>Won Emmy</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {contacts &&
                        contacts.map((oneContact) => {
                            return (
                                <tr key={oneContact.id}>
                                    <td>
                                        <img
                                            src={oneContact.pictureUrl}
                                            alt={oneContact.name}
                                            style={{ height: "200px" }}
                                        />
                                    </td>
                                    <td>{oneContact.name}</td>
                                    <td>{oneContact.popularity}</td>
                                    <td>
                                        {oneContact.wonOscar && <p> 🏆 </p>}
                                        {!oneContact.wonOscar && <p> </p>}
                                    </td>
                                    <td>
                                        {oneContact.wonEmmy && <p> 🏆 </p>}
                                        {!oneContact.wonEmmy && <p> </p>}
                                    </td>
                                    <td>
                                        {" "}
                                        <button
                                            onClick={() =>
                                                deleteContact(oneContact.id)
                                            }
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                </tbody>
            </table>
        </div>
    );
}

export default App;
