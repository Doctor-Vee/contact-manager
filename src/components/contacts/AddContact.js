import React, { Component } from "react";
import { Consumer } from "../../context";
import TextInputGroup from "../layout/TextInputGroup";
// import { v1 } from "uuid";
import Axios from "axios";
class AddContact extends Component {
  state = {
    name: "",
    email: "",
    phone: "",
    errors: {},
  };

  onSubmit = async (dispatch, e) => {
    e.preventDefault();
    const newContact = { ...this.state};
    console.log(newContact);
    if (newContact.name === "") {
      this.setState({ errors: { name: "Name is required" } });
      return;
    }
    if (newContact.email === "") {
      this.setState({ errors: { email: "Email is required" } });
      return;
    }
    if (newContact.phone === "") {
      this.setState({ errors: { phone: "Phone is required" } });
      return;
    }

    const res = await Axios.post("https://jsonplaceholder.typicode.com/users", newContact)
    console.log(res.data);
    dispatch({ type: "ADD_CONTACT", payload: res.data });
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
              <div className="card-header">Add Contact</div>
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
                    value="Add Contact"
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

export default AddContact;
