import React, { FC } from 'react'
import TopBar from './TopBar'
import GlobalStyle from '../global/Style'

const BaseLayout: FC = ({ children }) => (
    <>
        <GlobalStyle />
        <TopBar />
        {children}
    </>
)

export default BaseLayout