import React from 'react'
import Card  from './Card/Card.component'
import useStyles from './styles'
import { useSelector } from 'react-redux'

const Cards = () => {
    const classes = useStyles();
    const posts = useSelector((state) => state.posts)
    console.log(posts);
    return (
        <>
            <Card/> 
        </>
    )
}

export default Cards;