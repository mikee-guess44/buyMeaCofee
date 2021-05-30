import { useEthers } from "@usedapp/core"
import { useDispatch } from 'react-redux'
import { setAddress, setStatus } from '../features/mainSlice'
import { Avatar, Box, Button } from "grommet"
import { useEffect } from 'react'

export default function ConnectButton() {
    const { account, deactivate, activateBrowserWallet, active } = useEthers()
    const dispatch = useDispatch()
    
    useEffect(() => {
        if (account) {
            dispatch(setAddress(account))
        }
    }, [account, dispatch])

    useEffect(() => {
        dispatch(setStatus(active))
        if (!active) {
            dispatch(setAddress(null))
        }
    }, [active, dispatch])
    
    return (
        <Box>
            { account ? (
                <Box direction='row' gap='medium' align='center'>
                    <Avatar background="online" size='xsmall'/>
                    <Button color='offline' label="Disconnect" onClick={deactivate} size='small'/>
                </Box>
            ) : (
                <Button color="online" label="Connect" onClick={activateBrowserWallet}  size='small'/>
            )}

        </Box>
    )
}
