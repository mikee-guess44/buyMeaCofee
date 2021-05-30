import { Box, Text } from "grommet";
import { DocumentMissing } from "grommet-icons";

export default function NotFound() {
    return (
        <Box flex direction='row' align='center' justify='center' gap='small'>
            <DocumentMissing />
            <Text>Page not found 404</Text>
        </Box>
    )
}
