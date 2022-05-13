import { Container } from "@mui/material";
import Cont from "./Container";
import BlockPage from "./BlockPage";
import TransactionPage from "./TransactionPage";

const MainPage = () => {
  return (
    <Container maxWidth="lg">
      <Cont />
      <TransactionPage />
    </Container>
  );
};

export default MainPage;
