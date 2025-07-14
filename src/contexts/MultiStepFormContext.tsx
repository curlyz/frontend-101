"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { produce } from "immer";
import useForm from "@/hooks/useForm";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import type { RadioChangeEvent } from "antd/es/radio";

// Define types for form values
export interface FormValues {
  // Step 1
  firstName: string;
  lastName: string;
  email: string;
  // Step 2
  address: string;
  city: string;
  country: string;
  // Step 3
  agreeTerms: boolean;
  newsletter: boolean;
  gender: string;
}

const initialValues: FormValues = {
  firstName: "",
  lastName: "",
  email: "",
  address: "",
  city: "",
  country: "USA", // Default value
  agreeTerms: false,
  newsletter: false,
  gender: "",
};

interface MultiStepFormContextType {
  // Form state
  currentStep: number;
  formData: FormValues;
  formErrors: Partial<Record<keyof FormValues, string>>;
  isSubmitted: boolean;

  // Navigation actions
  next: () => void;
  prev: () => void;

  // Form actions
  handleSubmit: () => void;
  handleReset: () => void;

  // Field handlers
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleCheckboxChange: (event: CheckboxChangeEvent) => void;
  handleRadioChange: (event: RadioChangeEvent) => void;
  handleSelectChange: (name: string, value: string) => void;

  // Validation
  validateStep: (stepIndex: number) => boolean;
  clearFieldError: (fieldName: keyof FormValues) => void;

  // Step configuration
  totalSteps: number;
}

const MultiStepFormContext = createContext<
  MultiStepFormContextType | undefined
>(undefined);

export const useMultiStepForm = () => {
  const context = useContext(MultiStepFormContext);
  if (context === undefined) {
    throw new Error(
      "useMultiStepForm must be used within a MultiStepFormProvider",
    );
  }
  return context;
};

interface MultiStepFormProviderProps {
  children: React.ReactNode;
  onSubmit?: (data: FormValues) => void;
  initialStep?: number;
}

export const MultiStepFormProvider: React.FC<MultiStepFormProviderProps> = ({
  children,
  onSubmit,
  initialStep = 0,
}) => {
  const [currentStep, setCurrentStep] = useState(initialStep);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    values: formData,
    handleChange,
    setValues,
  } = useForm<FormValues>(initialValues);

  const [formErrors, setFormErrors] = useState<
    Partial<Record<keyof FormValues, string>>
  >({});

  const validateStep = useCallback(
    (stepIndex: number): boolean => {
      const errors: Partial<Record<keyof FormValues, string>> = {};

      switch (stepIndex) {
        case 0:
          if (!formData.firstName) errors.firstName = "First Name is required";
          if (!formData.lastName) errors.lastName = "Last Name is required";
          if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email))
            errors.email = "Valid email is required";
          break;
        case 1:
          if (!formData.address) errors.address = "Address is required";
          if (!formData.city) errors.city = "City is required";
          if (!formData.country) errors.country = "Country is required";
          break;
        case 2:
          if (!formData.agreeTerms) {
            errors.agreeTerms = "You must agree to the terms";
          }
          break;
        default:
          break;
      }

      setFormErrors(errors);
      return Object.keys(errors).length === 0;
    },
    [formData],
  );

  const next = useCallback(() => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => prev + 1);
    }
  }, [currentStep, validateStep]);

  const prev = useCallback(() => {
    setCurrentStep((prev) => prev - 1);
    setFormErrors({});
  }, []);

  const handleSubmit = useCallback(() => {
    if (validateStep(currentStep)) {
      console.log("Form Submitted:", formData);
      setIsSubmitted(true);

      // Call custom onSubmit if provided
      if (onSubmit) {
        onSubmit(formData);
      }
    }
  }, [currentStep, validateStep, formData, onSubmit]);

  const handleReset = useCallback(() => {
    setValues(initialValues);
    setCurrentStep(initialStep);
    setFormErrors({});
    setIsSubmitted(false);
  }, [setValues, initialStep]);

  const clearFieldError = useCallback(
    (fieldName: keyof FormValues) => {
      if (formErrors[fieldName]) {
        setFormErrors(
          produce((draft) => {
            delete draft[fieldName];
          }),
        );
      }
    },
    [formErrors],
  );

  const handleCheckboxChange = useCallback(
    (event: CheckboxChangeEvent) => {
      const { name, checked } = event.target;
      if (name) {
        setValues(
          produce((draft) => {
            (draft as any)[name] = checked;
          }),
        );
        clearFieldError(name as keyof FormValues);
      }
    },
    [setValues, clearFieldError],
  );

  const handleRadioChange = useCallback(
    (event: RadioChangeEvent) => {
      const { name, value } = event.target;
      if (name) {
        setValues(
          produce((draft) => {
            (draft as any)[name] = value;
          }),
        );
        clearFieldError(name as keyof FormValues);
      }
    },
    [setValues, clearFieldError],
  );

  const handleSelectChange = useCallback(
    (name: string, value: string) => {
      setValues(
        produce((draft) => {
          (draft as any)[name] = value;
        }),
      );
      clearFieldError(name as keyof FormValues);
    },
    [setValues, clearFieldError],
  );

  const value: MultiStepFormContextType = {
    // Form state
    currentStep,
    formData,
    formErrors,
    isSubmitted,

    // Navigation actions
    next,
    prev,

    // Form actions
    handleSubmit,
    handleReset,

    // Field handlers
    handleChange,
    handleCheckboxChange,
    handleRadioChange,
    handleSelectChange,

    // Validation
    validateStep,
    clearFieldError,

    // Step configuration
    totalSteps: 3,
  };

  return (
    <MultiStepFormContext.Provider value={value}>
      {children}
    </MultiStepFormContext.Provider>
  );
};
