import React from 'react';


class NewUserForm extends React.Component {


  render() {
    return (
      <form action="http://127.0.0.1:5000/submit-new-user" method="post">
        
        <label for="firstName">Fisrt Name:</label>
        <input type="text" id="firstName" name="firstName"/>
        
        <label for="lastName">Last Name:</label>
        <input type="text" id="lastName" name="lastName"/>

        <br/><br/>
        <label for="email">Email:</label>
        <input type="email" id="email" name="email"/>

        <label for="password">password:</label>
        <input type="password" id="password" name="password"/>

        <br/><br/>
        <button type="submit">Submit</button>
      </form>
    )
  }

}

export default NewUserForm;