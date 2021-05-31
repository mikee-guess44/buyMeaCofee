import { Anchor, Box, Heading } from "grommet"
import { Home, Java } from "grommet-icons"
import { NavLink } from "react-router-dom"
import ConnectButton from "./ConnectButton"


const NavBar = (props) => {
    return <Box
        tag='header'
        direction='row'
        align='center'
        justify='between'
        background='brand'
        pad={{ left: 'medium', right: 'small', vertical: 'medium' }}
        elevation='medium'
        style={{ zIndex: '1' }}
        {...props}
    />
}


const HomeLink = () => {
    return (
        <NavLink to='/'><Home /></NavLink>
    )
}

export default function NavComponent() {
    return (
        <NavBar>
            <Heading level='4' margin='none' ><Java />{'   '}buyMeaCoffee</Heading>
            <Anchor as={HomeLink} />
            <ConnectButton />
        </NavBar>
    )
}
