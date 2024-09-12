import React, { useState } from 'react';
import Step1 from './components/Step1';
import Step2 from './components/Step2';
import Confirmation from './components/Confirmation';
import { Button, Box, Tabs, Tab, Snackbar, Alert } from '@mui/material';

const App = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zip: ''
  });

  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState({});
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const steps = ['Personal Information', 'Address Information', 'Confirmation'];

  const validateStep = () => {
    let newErrors = {};
    if (step === 0) {
      if (!formData.name) newErrors.name = 'Name is required';
      if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Valid email is required';
      if (!formData.phone) newErrors.phone = 'Phone number is required';
    } else if (step === 1) {
      if (!formData.address1) newErrors.address1 = 'Address Line 1 is required';
      if (!formData.city) newErrors.city = 'City is required';
      if (!formData.state) newErrors.state = 'State is required';
      if (!formData.zip) newErrors.zip = 'Zip Code is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      setStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    setStep(prev => prev - 1);
  };

  const handleSubmit = () => {
    if (validateStep()) {
      // Simulate API call
      setTimeout(() => {
        // Simulate a network error with a 50% chance
        if (Math.random() < 0.5) {
          setSnackbarMessage('Form submitted successfully!');
          setSnackbarSeverity('success');
        } else {
          setSnackbarMessage('Failed to submit the form. Please try again.');
          setSnackbarSeverity('error');
        }
        setSnackbarOpen(true);
      }, 1000);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const renderStepContent = () => {
    switch (step) {
      case 0:
        return <Step1 formData={formData} setFormData={setFormData} errors={errors} />;
      case 1:
        return <Step2 formData={formData} setFormData={setFormData} errors={errors} />;
      case 2:
        return <Confirmation formData={formData} />;
      default:
        return null;
    }
  };

  return (
    <Box sx={{ width: '50%', margin: 'auto', padding: '20px' }}>
      <Tabs value={step} centered>
        {steps.map((label, index) => (
          <Tab key={index} label={label} disabled={index !== step} />
        ))}
      </Tabs>

      <Box sx={{ marginTop: '20px' }}>
        {renderStepContent()}
      </Box>

      <Box sx={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between' }}>
        <Button disabled={step === 0} onClick={handleBack}>
          Back
        </Button>
        {step < 2 ? (
          <Button onClick={handleNext}>Next</Button>
        ) : (
          <Button onClick={handleSubmit}>Submit</Button>
        )}
      </Box>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default App;
