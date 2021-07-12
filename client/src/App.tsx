import Container from "@material-ui/core/Container";
import DeckGLMap from "./Components/DeckGLMap";
import SearchAndFilter from "./Components/SearchAndFilter";

export default function App() {
    return (
        <Container maxWidth="md">
            <SearchAndFilter />
            <DeckGLMap />
        </Container>
    );
}
