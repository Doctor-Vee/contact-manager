import React, { Component } from "react";
import Axios from "axios";

const Context = React.createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "DELETE_CONTACT":
      return {
        ...state,
        contacts: state.contacts.filter(
          (contact) => contact.id !== action.payload
        ),
      };
    case "ADD_CONTACT":
      return {
        ...state,
        contacts: [action.payload, ...state.contacts],
      };
    case "UPDATE_CONTACT":
      return {
        ...state,
        contacts: state.contacts.map(
          contact => contact.id === action.payload.id ? (contact = action.payload) : contact
        )
      }
    default:
      return state;
  }
};

export class Provider extends Component {
  state = {
    contacts: [],
    dispatch: (action) => this.setState((state) => reducer(state, action)),
  };

  // //using Fetch
  // componentDidMount() {
  //   fetch("https://jsonplaceholder.typicode.com/users")
  //   .then(response => response.json())
  //   .then(data => {
  //     const newContacts = [];
  //     data.forEach(datum => {
  //       const { id, name, email, phone } = datum
  //       const user = { id, name, email, phone}
  //       newContacts.push(user)
  //     })
  //     this.setState({
  //     ...this.state,
  //     contacts: [...this.state.contacts, ...newContacts],
  //   })
  // })
  // }

  // Using Axios
  async componentDidMount() {
    const res = await Axios.get("https://jsonplaceholder.typicode.com/users");
    const newContacts = [];
    res.data.forEach((datum) => {
      const { id, name, email, phone } = datum;
      const user = { id, name, email, phone };
      newContacts.push(user);
    });
    this.setState({
      ...this.state,
      contacts: [...this.state.contacts, ...newContacts],
    });
  }

  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export const Consumer = Context.Consumer;
