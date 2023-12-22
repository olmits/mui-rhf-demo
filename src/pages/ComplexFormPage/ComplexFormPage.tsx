import { useState } from "react";

import { Alert, Box, Button, Grid, Snackbar } from "@mui/material";
import { FieldValues, UseControllerReturn, useController, useForm } from "react-hook-form";

import { INPUT_WITH_CARD_NUMBER, INPUT_WITH_EMAIL, INPUT_WITH_PHONE_NUMBER } from "../../utils/formFields";
import InputWithValidation from "../../components/InputWithValidation";
import InputWithMask from "../../components/InputWithMask";

const ComplexFormPage = () => {
  const { handleSubmit, control } = useForm({ mode: 'all', reValidateMode: 'onChange' });

  const [openSnackBar, setOpenSnackBar] = useState(false);

  const onSubmitValid = async () => {
    setOpenSnackBar(true);
  };

  const onSubmitInvalid = (errors: any) => {
    console.log("invalid", errors);
  }

  const onSubmit = handleSubmit(
    onSubmitValid,
    onSubmitInvalid,
  );

  const cardNumberController: UseControllerReturn<FieldValues, typeof INPUT_WITH_CARD_NUMBER> = useController({
    control,
    name: INPUT_WITH_CARD_NUMBER,
    defaultValue: "",
    rules: {
      required: "This field is required.",
      pattern: {
        value: /^\d{4}\s?\d{4}\s?\d{4}\s?\d{4}$/,
        message: "Invalid card number address"
      }
    }
  });

  const emailContoller: UseControllerReturn<FieldValues, typeof INPUT_WITH_EMAIL> = useController({
    control,
    name: INPUT_WITH_EMAIL,
    defaultValue: "",
    rules: {
      required: "This field is required.",
      pattern: {
        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: "Invalid email address"
      }
    }
  });

  const phoneNumberController: UseControllerReturn<FieldValues, typeof INPUT_WITH_PHONE_NUMBER> = useController({
    control,
    name: INPUT_WITH_PHONE_NUMBER,
    defaultValue: "",
    rules: {
      required: "Don't skip this field.",
      pattern: {
        value: /^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/,
        message: "Invalid phone number (USA format)"
      } 
    }
  });

  return (
    <>
      <Grid container justifyContent="center">
        <Grid item xs={6}>
          <form onSubmit={onSubmit}>
            <Box display="flex" gap={3} flexDirection="column">
              <InputWithMask
                mask="9999 9999 9999 9999"
                controller={cardNumberController}
                label="Card Number"
              />
              <InputWithValidation
                controller={emailContoller}
                label="Email Address"
              />
              <InputWithMask
                mask="(999) 999-9999"
                controller={phoneNumberController}
                label="Phone numbers"
                helperText="e.g. 555 555 5555"
              />
              <Button color="primary" type="submit" variant="contained">Submit</Button>
            </Box>
          </form>
        </Grid>
      </Grid>
      <Snackbar open={openSnackBar} onClose={() => setOpenSnackBar(false)} autoHideDuration={3000}>
        <Alert onClose={() => setOpenSnackBar(false)} severity="success">
          Successfully submitted!
        </Alert>
      </Snackbar>
    </>
  );
}

export default ComplexFormPage;
