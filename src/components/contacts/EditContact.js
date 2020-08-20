import React, { Component } from "react";
import { Consumer } from "../../context";
import TextInputGroup from "../layout/TextInputGroup";
// import { v1 } from "uuid";
import Axios from "axios";
class EditContact extends Component {
  state = {
    name: "",
    email: "",
    phone: "",
    errors: {},
  };

  async componentDidMount() {
    const { id } = this.props.match.params;
    const res = await Axios.get(
      `https://jsonplaceholder.typicode.com/users/${id}`
    );

    const { name, email, phone } = res.data;

    this.setState({
      name,
      email,
      phone,
    });
  }

  onSubmit = async (dispatch, e) => {
    e.preventDefault();
    const updatedContact = { ...this.state };

    if (updatedContact.name === "") {
      this.setState({ errors: { name: "Name is required" } });
      return;
    }
    if (updatedContact.email === "") {
      this.setState({ errors: { email: "Email is required" } });
      return;
    }
    if (updatedContact.phone === "") {
      this.setState({ errors: { phone: "Phone is required" } });
      return;
    }

    const { id } = this.props.match.params;

    const res = await Axios.put(
      `https://jsonplaceholder.typicode.com/users/${id}`, updatedContact
    );

    dispatch({ type: 'UPDATE_CONTACT', payload: res.data });

    console.log(updatedContact);

    this.setState({
      name: "",
      email: "",
      phone: "",
      errors: {},
    });     

    this.props.history.push("/");
  };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  render() {
    const { name, email, phone } = this.state;
    return (
      <Consumer>
        {(value) => {
          const { dispatch } = value;
          return (
            <div className="card mb-3">
              <div className="card-header">Edit Contact</div>
              <div className="card-body">
                <form onSubmit={this.onSubmit.bind(this, dispatch)}>
                  <TextInputGroup
                    label="Name"
                    name="name"
                    value={name}
                    onChange={this.onChange}
                    error={this.state.errors.name}
                  />
                  <TextInputGroup
                    label="Email"
                    type="email"
                    name="email"
                    value={email}
                    onChange={this.onChange}
                    error={this.state.errors.email}
                  />
                  <TextInputGroup
                    label="Phone"
                    name="phone"
                    value={phone}
                    onChange={this.onChange}
                    error={this.state.errors.phone}
                  />
                  <input
                    type="submit"
                    value="Update Contact"
                    className="btn btn-light btn-block"
                  />
                </form>
              </div>
            </div>
          );
        }}
      </Consumer>
    );
  }
}

export default EditContact;
