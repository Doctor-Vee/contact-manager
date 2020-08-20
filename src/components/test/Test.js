import React, { Component } from "react";

class Test extends Component {

    state = {
        title: "",
        task: "", 
        userId: ""
        
    }

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/todos/1")
      .then((response) => response.json())
      .then((json) => this.setState({
          title: json.title,
          task: json.completed.toString(),
          userId: json.userId
      }));
  }

  render() {
      const { title, task, userId } = this.state;
    return <div>
        <h1>{title}</h1>
        <i>userId: {userId}</i>
        <p>completed: {task}</p>
    </div>;
  }
}

export default Test;
