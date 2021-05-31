import { Anchor, Box, Button, Paragraph, Text } from "grommet";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";



const MakeLink = () => {
    return (
        <NavLink to='/make'><Button primary label='Create Account' /></NavLink>
    )
}


export default function Home() {
    const address = useSelector(state => state.main.address)

    return (
        <Box margin={{top: 'xlarge'}} pad='small' align='center' justify='around' gap='medium' full>
            <Box align='center' justify='around'>
                {address && <Anchor as={MakeLink} />}
                <Text margin={{top: 'small'}} size='large' weight='bold'>What is buyMeaCoffee?</Text>
                <Paragraph>
                Is a crowdfunding DApp that seeks to unite content creators, NGOs or projects with people who want to contribute to what they do.
                </Paragraph>
                <Paragraph>
                    CreateProfile your account
                    It only takes 60 seconds to customize your profile and start sharing what you do.
                </Paragraph>
                <Paragraph>
                    Create content
                    Tell your community about Cafecito and your goals, post it on social networks so more people can see your profile.
                </Paragraph>
                <Text>Next steps.. press Connect Button and Create Account</Text>
            </Box>
        </Box>
    )
}
