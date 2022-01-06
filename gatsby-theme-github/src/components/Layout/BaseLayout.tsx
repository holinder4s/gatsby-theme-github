import React, { FC } from 'react'
import TopBar from './TopBar'
import Index from '../global/Style'

const BaseLayout: FC = ({ children }) => (
    <>
        <Index />
        <TopBar />
        {children}
    </>
)

export default BaseLayout