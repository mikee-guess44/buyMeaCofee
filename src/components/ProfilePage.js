import { useSendTransaction } from '@usedapp/core';
import axios from 'axios';
import { utils } from 'ethers';
import { Anchor, Avatar, Box, Button, Layer, Select, Spinner, Text } from 'grommet';
import { FormClose } from 'grommet-icons';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Redirect, useLocation, useParams } from 'react-router'
import Loader from './Loader';



export default function ProfilePage() {

    const { userId } = useParams();
    const [data, setData] = useState(null)
    const [count, setCount] = useState(1);
    const [value, setValue] = useState('ETH');
    const address = useSelector(state => state.main.address)
    const [ethPrice, setEthPrice] = useState(0)
    const [show, setShow] = useState(false);
    const [profileNotFound, setProfileNotFound] = useState(false);
    const location = useLocation()
    const { sendTransaction, state } = useSendTransaction()

    useEffect(() => {
        console.log(state);
        
    }, [state])

    useEffect(() => {
        axios.get('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd').then((data) => {
            setEthPrice(data.data.ethereum.usd);
        })
    }, [ethPrice])

    useEffect(() => {

        axios.get(`http://localhost:5500/profile/${userId}`).then((result) => {
            if (result.status === 200) {
                console.log(result.data);
                setData(result.data.user)
            }
        }).catch(() => {
            setProfileNotFound(true)
        })

    }, [])

    return (
        <Box align='center' justify='center' margin={{ top: 'medium' }}>
            {!data ? (<Box>
                { profileNotFound ? (<Redirect to='/notfound' />) : (
                    <Loader />
                )}
            </Box>
            ) : (
                <Box gap='small'>
                    <Box align='center' justify='center' gap='medium' background='light-5' pad='medium'>
                        <Avatar size='large' src={data.avatar} />
                        <Text size='xsmall' weight='bold'><Anchor>{`http://localhost:3000${location.pathname}`}</Anchor></Text>
                        <Text size='medium' weight='bold'>{data.username}</Text>
                        <Text size='xsmall'>{data.address}</Text>
                    </Box>
                    <Box align='center' justify='center' gap='medium' background='dark-4' pad='medium'>
                        <Text>Mission:</Text>
                        <Text size='xsmall'>{data.mission}</Text>

                    </Box>

                    { state.status === 'Mining' ? (<Loader />) : (
                        <Box>
                            { address === data.address ? (
                                <Box align='center' justify='center' gap='medium' background='dark-4' pad='medium'>
                                    <Text>You are viewing your profile, soon you will be able to edit your profile data from here ...</Text>
                                </Box>
                            ) : (
                                <Box align='center' justify='center' gap='medium' background='dark-4' pad='medium'>
                                    <Box direction='row' align='center' justify='center' gap='medium' pad='medium'>
                                        <Text>Buy a Cofee: {count}</Text>
                                        <Button onClick={() => setCount(count + 1)}>+</Button>
                                        <Button onClick={() => setCount(count - 1)}>-</Button>
                                    </Box>
                                    <Box align='center' justify='center' gap='medium' pad='medium'>
                                        <Select
                                            size='small'
                                            options={['ETH', 'DAI(Coming soon)', 'USDC(Coming soon)', 'More.. (Coming soon)']}
                                            value={value}
                                            onChange={({ option }) => option === 'ETH' ? setValue(option) : setValue('ETH')}
                                        />
                                        <Button onClick={() => {
                                            const amount = (count * 3 / ethPrice).toString()
                                            sendTransaction({ to: data.address, value: utils.parseEther(amount) })
                                            setShow(true)
                                        }}>Send</Button>
                                    </Box>
                                </Box>
                            )}
                        </Box>
                    )}
                </Box>
            )}
            {show && state.status !== 'None' && (

                <Layer
                    onEsc={() => setShow(false)}
                    onClickOutside={() => setShow(false)}
                    background='brand'
                >
                    <Box align='center' justify='center' gap='small' pad='medium'>
                        <Button primary color='light-3' aling='center' justify='center' alignSelf='end' onClick={() => setShow(false)}>
                            <FormClose />
                        </Button>
                        <Text size='large' weight='bold'>Details Transaction</Text>
                        <Text>Status: {state.status}</Text>
                        <Text>Transaction Hash:</Text>
                        <Text truncate size='small' >{state.transaction.hash}</Text>
                    </Box>
                </Layer>

            )
            }
        </Box >
    )
}