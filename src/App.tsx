import React, { useState, useEffect} from 'react';
import './App.css';
import Post from './Components/Post/Post.tsx';
import {Route, Routes } from 'react-router-dom';
import PostContent from './Components/PostContent/PostContent.tsx';
import { Button, Card,Layout, Row, Space, Spin, Typography } from 'antd';
import { Content, Header } from 'antd/es/layout/layout';
import HeaderContent from './Components/HeaderContent/HeaderContent.tsx';
import Loader from './Components/Loader/Loader.tsx';

export type PostType = {
  body:string
  id:number
  title:string
  userId:number
}
export type ResponseType = Array<PostType>

function App() {
  const layoutStyle = {
    borderRadius: 8,
    overflow: 'hidden',
    width: '100%x',
    maxWidth: 'calc(100% - 8px)',
  };
  const headerStyle: React.CSSProperties = {
    textAlign: 'center',
    color: '#fff',
    height: 120,
    padding: 16,
    fontSize: 84,
    backgroundColor: '#4096ff',
  };
  let [posts,setPosts]=useState([])
  let [addedPosts,setAddedPosts]=useState([])
  let [loading,setLoading]=useState(true)
  useEffect(
    ()=>{
  fetch('https://jsonplaceholder.typicode.com/posts')
  .then(response => response.json())
  .then((r:ResponseType) => {
    setPosts([...r.splice(5)])
    setAddedPosts([...r.splice(0,5)])
    setLoading(false)
  })
  .catch(e=>{
    console.error(e)
  })},
  [])
  
  const addPosts  = () => {
    setAddedPosts(prev => [...prev,...posts.splice(0,5)])
  }
  return (
    <div className="App">
      <Layout style={layoutStyle}>
        <Header style={headerStyle}> 
          <HeaderContent/>
        </Header>
        <Content style={{ padding: '0 48px' }}>
          {
            loading && <Loader/>
          }
          <Routes>
            <Route path='/*' element={
              <div className='title-posts'> 
              <Space direction="vertical" size={16}>
                {
                  addedPosts.map((el:PostType)=>{
                    return(
                      <div>
                        <div className={'posts'}>
                          <Card
                            title={el.title} 
                            style={{ width: '100%'}}>
                            <Post
                              id={el.id}
                              title={el.body}
                              key={el.id}/>
                          </Card>
                        </div>
                      </div>
                    )
                  })
                }
              </Space>
              {!loading &&  <div className={'btn-container'}>
                <Button 
                  size="large"
                  onClick={addPosts}>
                  show more
                </Button>
              </div>}
              </div>}>
            </Route>
            <Route path='/post/*' element={<PostContent/>}></Route>
          </Routes>
        </Content>
      </Layout>
    </div>
  );
}

export default App;
