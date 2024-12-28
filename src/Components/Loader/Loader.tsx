import React from 'react';
import './Loader.css'
import { Flex, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
const Loader = () =>{
    return (
        <div className={'spin-container'}>
            <Flex align="center" gap="middle">
                <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
            </Flex>
        </div>
    )
}

export default Loader