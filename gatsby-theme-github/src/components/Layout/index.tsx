import React, { FC } from 'react'

import NavTabLayout from './NavTabLayout/NavTabLayout'
import SimpleLayoutLayout from './SimpleLayout'

export enum LayoutMode {
    Simple = 'simple',
    NavTab = 'navtab',
}

interface Props {
    mode?: LayoutMode;
}

const Layout: FC<Props> = ({ children, mode }) => {
    let LayoutComp = SimpleLayoutLayout
    switch (mode) {
        case LayoutMode.NavTab:
            LayoutComp = NavTabLayout
            break
        case LayoutMode.Simple:
        default:
            LayoutComp = SimpleLayoutLayout
    }

    return <LayoutComp>{children}</LayoutComp>
}

export default Layout