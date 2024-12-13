import React, {useState} from 'react'
import {Form, Button,} from 'react-bootstrap'
import axios from 'axios';

export const UserInput = () => {
    
    const [userInput, setUserInput] = useState(
        {
            title: "",
            description: ""
        }
    )

    const onChange = (e) => {
        const { name, value } = e.target;
        setUserInput({
          ...userInput,
          [name]: value,
        });
      };

    const handleReset = (e) => {

    }

    const handleSubmit = async(e) => {
      const newChore = {
        title: userInput.title,
        description: userInput.description,
      };
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };
        const body = JSON.stringify(newChore);
        const res = await axios.post(
          "http://localhost:5000/api/chore",
          body,
          config
        );
      return res;
      } catch (error) {
        console.error(error);
      }
    }

  return (
    <>
    <Form>
       <Form.Group>
          <Form.Label htmlFor="title"></Form.Label>
            <Form.Control
              className="form-control"
              id="title"
              name="title"
              type="text"
              value={userInput.title}
              placeholder="Add chore name"
              autoComplete='off'
              onChange={(e) => onChange(e)}
            />
          <Form.Label htmlFor="description"></Form.Label>
            <Form.Control
              className="form-control"
              id="description"
              name="description"
              type="text"
              as="textarea"
              rows = {4}
              value={userInput.description}
              placeholder="Describe what is needed. You could include necessary steps or what the result should look like."
              onChange={(e) => onChange(e)}
            />
            </Form.Group>
          <Button className="" type="submit" onClick={handleSubmit}>Submit</Button>
          <Button
            className=""
            onClick={handleReset}
          >Reset
          </Button>
      </Form>
      {/* {status && (<div className={status.type}>{status.message}</div>)} */}
      </>
  )
}
