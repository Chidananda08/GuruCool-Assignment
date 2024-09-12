import React from 'react';
import { Button, Grid } from '@mui/material';

const NavigationButtons = ({ currentStep, nextStep, prevStep, handleSubmit }) => {
  return (
    <Grid container spacing={2} justifyContent="space-between">
      {currentStep > 1 && (
        <Grid item xs={6}>
          <Button fullWidth variant="contained" onClick={prevStep}>
            Back
          </Button>
        </Grid>
      )}
      {currentStep < 3 ? (
        <Grid item xs={6}>
          <Button fullWidth variant="contained" onClick={nextStep}>
            Next
          </Button>
        </Grid>
      ) : (
        <Grid item xs={6}>
          <Button fullWidth variant="contained" color="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </Grid>
      )}
    </Grid>
  );
};

export default NavigationButtons;
