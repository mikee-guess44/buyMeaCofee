import axios from "axios";
import { Avatar, Box, Button, FileInput, Form, Select, Text, TextArea, TextInput } from "grommet";
import { User } from "grommet-icons";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router";
import ConnectButton from "./ConnectButton";
import Loader from "./Loader";
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';


const reader = (e, setAvatar) => {
    const fileInput = e.target.files[0]
    const fr = new FileReader();
    fr.onload = function () {
        var data = fr.result;
        setAvatar(data)
    };
    fr.readAsDataURL(fileInput);
}

const postRequest = async (form, ava) => {
    const formDataParsed = new FormData();
    Object.keys(form).map((key) => {
        if (key === 'avatar') {
            formDataParsed.append(key, ava)
        }
        if (key !== 'avatar') {
            formDataParsed.append(key, form[key])
        }
    })

    const result = await axios.post('https://buymeacoffee.eu-4.evennode.com/', formDataParsed)
    return result

}

const optionsCategory = [
    'Art',
    'Handicrafts',
    'Blog',
    'Science and Technology',
    'Film and video',
    'Comics',
    'Food and drink',
    'Communities',
    'Cosplay',
    'Sports',
    'Money',
    'Design',
    'Education',
    'Writing and literature',
    'Lifestyle',
    'Photography',
    'Hardware',
    'Games',
    'Fashion',
    'Music',
    'Local businesses',
    'News',
    'NGO',
    'Others',
    'Movies and series',
    'Journalism',
    'Painting and drawing',
    'Podcast',
    'Social media',
    'Health & Wellness',
    'Software',
    'Streaming',
    'Theater'
]

export default function CreateProfile() {
    const address = useSelector(state => state.main.address)
    const isConnected = useSelector(state => state.main.isConnected)
    const [avatar, setAvatar] = useState('')
    const [loadingPost, setLoadingPost] = useState(false)
    const [submitedForm, setSubmitedForm] = useState(false)
    const [userData, setUserData] = useState({})
    return (
        <Box flex direction='column' pad={{ vertical: 'medium', horizontal: 'xlarge' }} responsive>
            { isConnected ? (
                <Form onSubmit={({ value }) => {
                    setLoadingPost(true)
                    postRequest(value, avatar).then((result) => {
                        setUserData({userId: result.data.userId, username: result.data.username})
                        setTimeout(() => {
                            setSubmitedForm(true) 
                        }, 2000);
                        
                    })
                }}>
                    { loadingPost ? (
                        <Box>
                            { submitedForm ?  (<Redirect to={`/profile/${userData.userId}`} />) :
                            <Loader />
                            }
                        </Box>
                    ) : (
                        <Box flex direction='column' gap='medium' responsive>
                            <Box direction='column' align='center' gap='medium' >
                                <Avatar background="dark-1" size='xlarge'>
                                    {avatar ? (<Avatar src={avatar} size='xlarge' />) : (<User />)}
                                </Avatar>
                                <FileInput name="avatar" messages={{ dropPrompt: ' ', browse: 'Choose an Avatar' }} onChange={(event) => {
                                    reader(event, setAvatar)
                                }} />
                            </Box>
                            <Box direction='row' gap='medium' align='center'>
                                <Text>Address:</Text>
                                <TextInput name='address' size='small' value={address} required />
                            </Box>
                            <Box direction='row' gap='medium' align='center'>
                                <Text>Username:</Text>
                                <TextInput name='username' size='small' required />
                            </Box>
                            <Box direction='row' gap='medium' align='center'>
                                <Text>Mission:</Text>
                                <TextArea name='mission' size='small' required />
                            </Box>
                            <Box direction='row' gap='medium' align='center'>
                                <Text>Category:</Text>
                                <Select options={optionsCategory} name='category' size='small' required />
                            </Box>

                            <Box direction="row" gap="medium">
                                <Button type="submit" primary label="Submit" />
                                <Button type="reset" label="Reset" />
                            </Box>
                        </Box>
                    )}
                </Form>) : (
                <Box justify='center' align='center' flex>
                    <Text>
                        Please Connect
                    </Text>
                    <ConnectButton />
                </Box>)
            }
        </Box>
    )
}
