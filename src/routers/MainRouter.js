import { Box } from "grommet";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import About from "../components/About";
import Contact from "../components/Contact";
import CreateProfile from "../components/CreateProfile";
import FooterComponent from "../components/FooterComponent";
import Home from "../components/Home";
import NavComponent from "../components/NavComponent";
import NotFound from "../components/NotFound";
import ProfilePage from "../components/ProfilePage";

export const MainRouter = () => {
    return (
        <Router>
            <Box>
            <NavComponent />
            </Box>
            <Box margin={{bottom: 'xlarge'}} fill>
            <Switch>
                <Route exact path='/about' component={About} />
                <Route exact path='/contact' component={Contact} />
                <Route exact path='/make' component={CreateProfile} />
                <Route exact path='/' component={Home} />
                <Route path='/profile/:username' component={ProfilePage} />
                <Route path='*' component={NotFound} />
            </Switch>
            </Box>
            <Box margin={{top: 'xlarge'}} >
            <FooterComponent />
            </Box>
        </Router>
    )
}
