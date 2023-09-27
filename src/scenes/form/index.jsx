import React, { useState } from "react";
import sdk from "../../scripts/assets/initialize-sdk.mjs";
import { ethers } from "ethers";
import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ProposalForm() {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const [proposalType, setProposalType] = useState("mint");
  const [recipient, setRecipient] = useState("");
  const [showRecipientField, setShowRecipientField] = useState(false); // Status to control visibility
  const [isLoading, setIsLoading] = useState(false);

  const handleFormSubmit = async (values) => {
    try {
      setIsLoading(true);
      const vote = await sdk.getContract(
        "0xa2699D854Ce73005F181B28bB3770c81b3dc1E7A",
        "vote"
      );
      const token = await sdk.getContract(
        "0x9CD97b01e1E042cE63656E4E6EdC75f2610Ff323",
        "token"
      );

      const executions = [];

      if (proposalType === "mint") {
        const mintExecution = {
          toAddress: token.getAddress(),
          nativeTokenValue: 0,
          transactionData: token.encoder.encode("mintTo", [
            vote.getAddress(),
            ethers.utils.parseUnits(values.amount.toString(), 18),
          ]),
        };
        executions.push(mintExecution);
      } else if (proposalType === "transfer") {
        const transferExecution = {
          toAddress: recipient, // Use the recipient address entered
          nativeTokenValue: 0,
          transactionData: token.encoder.encode("transfer", [
            recipient,
            ethers.utils.parseUnits(values.amount.toString(), 18),
          ]),
        };
        executions.push(transferExecution);
      }

      const proposalDescription = `${values.description}`;

      await vote.propose(proposalDescription, executions);
      toast.success("Proposal created successfully", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      console.log("✅ Successfully created proposal");
    } catch (error) {
      console.error("Failed to create proposal", error);
      toast.error("Failed to create proposal", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Function to handle the change in the "Proposal Type" field
  const handleProposalTypeChange = (e) => {
    setProposalType(e.target.value);

    // Show recipient field if option is "transfer"
    if (e.target.value === "transfer") {
      setShowRecipientField(true);
    } else {
      // Hide recipient field if option is "mint"
      setShowRecipientField(false);
    }
  };

  // Form validation
  const checkoutSchema = yup.object().shape({
    description: yup.string().required("Description is required"),
    amount: yup
      .number()
      .typeError("Amount must be a number")
      .required("Amount is required")
      .positive("Amount must be positive"),
  });

  const initialValues = {
    description: "",
    amount: "",
  };

  return (
    <Box m="20px">
      <Header title="Create Proposal" subtitle="Create a New Proposal" />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Description"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.description}
                name="description"
                error={!!touched.description && !!errors.description}
                helperText={touched.description && errors.description}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Amount"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.amount}
                name="amount"
                error={!!touched.amount && !!errors.amount}
                helperText={touched.amount && errors.amount}
                sx={{ gridColumn: "span 4" }}
              />
              <Box
                sx={{
                  gridColumn: "span 4",
                  position: "relative",
                  maxWidth: "250px",
                }}
              >
                <label>Proposal Type:</label>
                <select
                  value={proposalType}
                  onChange={handleProposalTypeChange}
                  style={{
                    width: "100%",
                    cursor: "pointer",
                    padding: "7px 10px",
                    height: "42px",
                    outline: "0",
                    border: "0",
                    background: "#f0f0f0",
                    color: "#7b7b7b",
                    fontSize: "1em",
                    fontFamily: "'Quicksand', sans-serif",
                    borderWidth: "2px",
                    borderColor: "rgba(0,0,0,0.2)",
                    borderRadius: "12px",
                    position: "relative",
                    transition: "all 0.25s ease",
                  }}
                >
                  <option value="mint">Mint</option>
                  <option value="transfer">Transfer</option>
                </select>
              </Box>
              {showRecipientField && (
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Recipient Address"
                  onBlur={handleBlur}
                  onChange={(e) => setRecipient(e.target.value)}
                  value={recipient}
                  name="recipient"
                  error={!!touched.recipient && !!errors.recipient}
                  helperText={touched.recipient && errors.recipient}
                  sx={{ gridColumn: "span 4" }}
                />
              )}
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                {isLoading ? "Loading..." : "Create Proposal"}
              </Button>
            </Box>
          </form>
        )}
      </Formik>
      <ToastContainer />
    </Box>
  );
}

export default ProposalForm;
