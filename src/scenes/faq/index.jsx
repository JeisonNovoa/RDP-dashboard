import { Box, useTheme } from "@mui/material";
import Header from "../../components/Header";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { tokens } from "../../theme";

const FAQ = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box m="20px">
      <Header title="FAQ" subtitle="Frequently Asked Questions Page" />

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            What is Ready Player DAO and what is its purpose?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Ready Player DAO is a community governance system designed for
            projects related to gaming and gaming tokens. Our goal is to empower
            all community members, allowing them to make meaningful decisions
            and actively participate in steering the project.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            How can I claim tokens in Ready Player DAO?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            To claim tokens in Ready Player DAO, you first need to connect your
            wallet and obtain a free NFT. Then, you can visit the token section
            and follow the instructions to claim your tokens. Please note that
            in our test environment, tokens are free to facilitate testing.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            How can I create a proposal in Ready Player DAO?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            To create a proposal in Ready Player DAO, visit the proposals
            section and complete the form by providing a detailed description of
            your proposal, the amount of tokens involved, and the type of
            proposal (e.g., "maintenance" or "transfer"). Make sure to follow
            the guidelines, and then submit the proposal for members to vote on.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            How does the voting system work in Ready Player DAO?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            The voting system in Ready Player DAO allows members to vote on
            proposals created by the community. You can vote for multiple
            proposals at once or for a single one. Proposals require a minimum
            number of votes to be valid, and the results are displayed in
            real-time on our platform.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            How can I suggest changes or improvements to Ready Player DAO?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            We are open to suggestions and contributions from the community. If
            you have ideas for changes or improvements to Ready Player DAO, you
            can propose them on our governance platform. To do so, simply log in
            to your account, go to the "Proposals" section, and follow the
            instructions to create a new proposal. Once the proposal is reviewed
            and approved by the community, we will work on its implementation.
            Your active participation is essential to growing our platform and
            enhancing the experience for all members.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default FAQ;
