import { Anchor, Footer, Text } from "grommet";

export default function FooterComponent() {
    return (
        <Footer background="brand" pad="xsmall" margin={{top: 'large'}}>
            <Text>Copyright</Text>
            <Anchor href='/about' label="About" />
        </Footer>
    )
}
