import { StyledMainContainer } from './MainContainer.styled'
import PropTypes from "prop-types";

function MainContainer ({children}) {
    return <StyledMainContainer>{children}</StyledMainContainer>;
}

export default MainContainer;

MainContainer.propTypes = {
	children: PropTypes.node,
};