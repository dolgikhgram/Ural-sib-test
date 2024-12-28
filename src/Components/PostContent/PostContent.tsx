import React, { useState, useEffect} from 'react';
import './PostContent.css';
import {useParams } from 'react-router-dom';
import { Button, Card, Typography } from 'antd';
import { CommentOutlined } from '@ant-design/icons';
import { PostType } from '../../App';

type CommentType = {
    postId: number
    id: number
    name: string
    email: string
    body: string
}
type CommentsResponseType  =  Array<CommentType>

const PostContent = () =>{
    let params = useParams()
    let [post,setPost]=useState([])
    let [comments,setComments]=useState([])
    let [openComments,setOpenComments]=useState(false)

    const openCommentsHandler = () =>{
        setOpenComments((prev)=>!prev)
    }
    useEffect(
    ()=>{
    fetch(`https://jsonplaceholder.typicode.com/posts/${params['*']}`)
    .then(response => response.json())
    .then((r:PostType) => setPost(r))
    .catch(e => console.error(e))
    },
    [])
    useEffect(
        ()=>{
        fetch(`https://jsonplaceholder.typicode.com/comments/`)
        .then(response => response.json())
        .then((r:CommentsResponseType) => setComments(r))},
        [])
        let newComments= comments.filter((el)=> el.postId===Number(params['*']))
    return(
        <div className='border-comment'>
            <div>
                <Card title={post.title} 
                    style={{ width: '100% '}}>
                        <div className={'content-posts'}>
                            <div>{post.body}</div>
                            <div>
                                <Button 
                                    className={'btn-comments'}
                                    size='large'
                                    color={openComments ?  "primary" : "default"} 
                                    variant={openComments ?  "solid" : "outlined"}
                                    onClick={openCommentsHandler}
                                    icon={<CommentOutlined/>}
                                    >
                                </Button>
                            </div>
                        </div>
                </Card>
            </div>
            <div>
                {
                    openComments && newComments.map((el)=>{
                        return (
                            <div className='border-posts'>
                                <div>
                                    <Card title={`${el.email}`} style={{ width: '100%'}}>
                                        <p>{el.body}</p>
                                    </Card>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default PostContent