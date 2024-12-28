import React, {useState,useEffect} from 'react';
import { Button, Col, Row } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import { NavLink, useLocation, useParams } from 'react-router-dom';
const HeaderContent = () =>{
    let location = useLocation()
    const [showBtn, setShowBtn] = useState(false) 
    useEffect(()=>{
        if (location.pathname!='/') setShowBtn(true)
        else setShowBtn(false)
    },[location])
    return (
        <>
            <Row>
                <Col span={1}>
                {
                    showBtn  && <NavLink to = {`/`}>
                        <Button>
                            <HomeOutlined />
                        </Button>
                    </NavLink>
                }
                </Col>
                <Col span={23}>
                    <div className={'header-title'}>
                        Posts
                    </div>
                </Col>
            </Row>
        </>
    )
}

export default HeaderContent