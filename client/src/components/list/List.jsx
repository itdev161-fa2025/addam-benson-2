import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { ListGroupItem } from 'react-bootstrap'
import ListGroup from 'react-bootstrap/ListGroup'
import axios from 'axios';

export const List = () => {
    const [pageData, setPageData] = useState({
        arrayOfChores: [],
        choreComponents: []
    })

    useEffect(() => {
        getChores();
    }, [])

    const getChores = () => {
        axios.get('http://localhost:5000/api/chore')
            .then(response => getChoresSuccess(response))
            .catch(response => getChoresError(response));

    }

    const getChoresSuccess = (response) => {
        console.log(response)
        const listArray = response.data;
        setPageData((prev) => {
            const n = { ...prev };
            n.arrayOfChores = listArray
            n.choreComponents = listArray.map(mapItems);
            return n;
        })
    }

    const getChoresError = (response) => {
        console.warn(response);
    }


    const mapItems = (item) => {
        return <ListGroupItem key={item.id}>{item.description}</ListGroupItem>
    }
    return (
        <>
            <ListGroup>
                {pageData.choreComponents}
            </ListGroup>
        </>
    )
}
