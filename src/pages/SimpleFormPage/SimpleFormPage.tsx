import { Alert, Box, Button, Grid, Snackbar } from "@mui/material";
import { FieldValues, UseControllerReturn, useController, useForm } from "react-hook-form";

import { INPUT_WITH_MAX_LENGTH_REQUIRED, INPUT_WITH_MIN_LENGTH_REQUIRED, INPUT_WITH_NUMBERS_REQUIRED, INPUT_WITH_TEXT_REQUIRED } from "../../utils/formFields";
import InputWithValidation from "../../components/InputWithValidation";
import { useState } from "react";


const SimpleFormPage = () => {
  const { handleSubmit, control } = useForm({ mode: 'all', reValidateMode: 'onChange' });

  const [openSnackBar, setOpenSnackBar] = useState(false);

  const onSubmitValid = async (data: any) => {
    setOpenSnackBar(true);
  };

  const onSubmit = handleSubmit(
    onSubmitValid,
  );

  const requiredTextContoller: UseControllerReturn<FieldValues, typeof INPUT_WITH_TEXT_REQUIRED> = useController({
    control,
    name: INPUT_WITH_TEXT_REQUIRED,
    defaultValue: "",
    rules: {
      required: "This field is required.",
    }
  });

  const requiredNumbersController: UseControllerReturn<FieldValues, typeof INPUT_WITH_NUMBERS_REQUIRED> = useController({
    control,
    name: INPUT_WITH_NUMBERS_REQUIRED,
    defaultValue: "",
    rules: {
      required: "Don't skip this field.",
      pattern: {
        value: /^[0-9]*$/,
        message: "Only numbers are allowed."
      } 
    }
  });

  const minLengthController: UseControllerReturn<FieldValues, typeof INPUT_WITH_MIN_LENGTH_REQUIRED> = useController({
    control,
    name: INPUT_WITH_MIN_LENGTH_REQUIRED,
    defaultValue: "",
    rules: {
      required: "Don't skip this field",
      minLength: {
        message: "Must be at leeast 6 characters",
        value: 6
      },
    }
  });

  const maxLengthController: UseControllerReturn<FieldValues, typeof INPUT_WITH_MAX_LENGTH_REQUIRED> = useController({
    control,
    name: INPUT_WITH_MAX_LENGTH_REQUIRED,
    defaultValue: "",
    rules: {
      required: "Don't skip this field",
      maxLength: {
        message: "Max 9 characters allowed",
        value: 9
      },
    }
  });

  return (
    <>
      <Grid container justifyContent="center">
        <Grid item xs={6}>
          <form onSubmit={onSubmit}>
            <Box display="flex" gap={3} flexDirection="column">
              <InputWithValidation
                controller={requiredTextContoller}
                label="Input with a text required for submission"
              />
              <InputWithValidation
                controller={requiredNumbersController}
                label="Input with a numbers required for submission"
              />
              <InputWithValidation
                controller={minLengthController}
                label="Input with min 6 characters"
              />
              <InputWithValidation
                controller={maxLengthController}
                label="Input with max 9 characters"
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

export default SimpleFormPage;
