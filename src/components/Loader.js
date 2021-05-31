import { Box, Spinner } from "grommet";


export default function Loader() {
    return (
        <Box flex align='center' justify='center' margin={{ top: 'large' }}>
            <Spinner size='large' />
        </Box>)
}
