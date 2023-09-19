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

  const [proposalType, setProposalType] = useState("mint"); // Puede ser 'mint' o 'transfer'
  const [recipient, setRecipient] = useState(""); // Nuevo estado para la dirección del destinatario
  const [showRecipientField, setShowRecipientField] = useState(false); // Estado para controlar la visibilidad

  const handleFormSubmit = async (values) => {
    try {
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
          toAddress: recipient, // Usar la dirección del destinatario ingresada
          nativeTokenValue: 0,
          transactionData: token.encoder.encode("transfer", [
            recipient, // Usar la dirección del destinatario ingresada
            ethers.utils.parseUnits(values.amount.toString(), 18),
          ]),
        };
        executions.push(transferExecution);
      }

      const proposalDescription = `${values.description}`;

      await vote.propose(proposalDescription, executions);
      toast.success("Proposal created successfully", {
        position: "top-right",
        autoClose: 3000, // Cerrar el mensaje automáticamente después de 3 segundos
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
    }
  };

  // Función para manejar el cambio en el campo "Proposal Type"
  const handleProposalTypeChange = (e) => {
    setProposalType(e.target.value);

    // Mostrar el campo de destinatario si la opción es "transfer"
    if (e.target.value === "transfer") {
      setShowRecipientField(true);
    } else {
      // Ocultar el campo de destinatario si la opción es "mint"
      setShowRecipientField(false);
    }
  };

  // Validación del formulario
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
                    outline: 0,
                    border: 0,
                    borderRadius: 0,
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
                Create Proposal
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
