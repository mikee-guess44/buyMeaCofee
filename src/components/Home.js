import { Anchor, Box, Button } from "grommet";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";



const MakeLink = () => {
    return (
        <NavLink to='/make'><Button primary label='Create Account'/></NavLink>
    )
}


export default function Home() {
    const address = useSelector(state => state.main.address)
    
    return (
        <Box flex align='center' justify='center'>
            <Box flex align='center' justify='center'>
                {address && <Anchor as={MakeLink}/> }
            </Box>
        </Box>
    )
}
