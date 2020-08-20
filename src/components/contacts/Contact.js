import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Consumer } from "../../context";
import Axios from "axios";

class Contact extends Component {
  state = {
    showContactInfo: false,
  };

  onDeleteClick = async (id, dispatch) => {
    const res = await Axios.delete(
      `https://jsonplaceholder.typicode.com/users/${id}`
    );

    console.log(res);
    dispatch({ type: "DELETE_CONTACT", payload: id });
  };

  render() {
    const { id, name, email, phone } = this.props.contact;
    const { showContactInfo } = this.state;
    return (
      <Consumer>
        {(value) => {
          const { dispatch } = value;
          return (
            <div className="card card-body mb-3">
              <h4>
                {name}
                {showContactInfo ? (
                  <i
                    onClick={() =>
                      this.setState({
                        showContactInfo: !this.state.showContactInfo,
                      })
                    }
                    className="fas fa-sort-up"
                    style={{ cursor: "pointer" }}
                  />
                ) : (
                  <i
                    onClick={() =>
                      this.setState({
                        showContactInfo: !this.state.showContactInfo,
                      })
                    }
                    className="fas fa-sort-down"
                    style={{ cursor: "pointer" }}
                  />
                )}

                <i
                  onClick={this.onDeleteClick.bind(this, id, dispatch)}
                  className="fas fa-times"
                  style={{ cursor: "pointer", float: "right", color: "red" }}
                />
                <Link to={`/contact/edit/${id}`}>
                  <i
                    className="fas fa-pencil-alt"
                    style={{
                      cursor: "pointer",
                      float: "right",
                      color: "green",
                      marginRight: "1rem",
                    }}
                  ></i>
                </Link>
              </h4>
              {showContactInfo ? (
                <ul className="list-group">
                  <li className="list-group-item">Email: {email}</li>
                  <li className="list-group-item">Phone: {phone}</li>
                </ul>
              ) : null}
            </div>
          );
        }}
      </Consumer>
    );
  }
}

Contact.defaultProps = {
  name: "John Doe",
  email: "jdoe@gmail.com",
  phone: "555-555-555-555",
};

Contact.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
};

export default Contact;
