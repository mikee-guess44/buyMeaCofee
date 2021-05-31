import { useEthers, useEtherBalance } from "@usedapp/core"
import { formatEther, formatUnits } from '@ethersproject/units';
import { useDispatch } from 'react-redux'
import { setAddress, setStatus, setBalance } from '../features/mainSlice'
import { Avatar, Box, Button } from "grommet"
import { useEffect } from 'react'

export default function ConnectButton() {
    const { account, deactivate, activateBrowserWallet, active } = useEthers()
    const etherBalance = useEtherBalance(account)
    const dispatch = useDispatch()

    useEffect(() => {
        if (account) {
            dispatch(setAddress(account))
            if (etherBalance) {
                dispatch(setBalance(formatEther(etherBalance)))
            }

        }
    }, [account, dispatch, etherBalance]
    )

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
                    <Avatar background="online" size='xsmall' />
                    <Button color='offline' label="Disconnect" onClick={deactivate} size='small' />
                </Box>
            ) : (
                <Button color="online" label="Connect" onClick={activateBrowserWallet} size='small' />
            )}

        </Box>
    )
}
