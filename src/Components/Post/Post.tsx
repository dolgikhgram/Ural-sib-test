import React from 'react';
import './Post.css';
import { Link, NavLink } from 'react-router-dom';

type PropsPostType = {
    title:string
    id:number
    key:number
}


const Post = ({title,id}:PropsPostType) =>{
    return(
        <div className='border-posts'>
            <NavLink to={`post/${id}`}
            className={'link'}>{title}</NavLink>
        </div>
    )
}

export default Post