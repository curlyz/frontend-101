import React, { useState } from "react";
import {
  Card,
  Steps,
  Button,
  Form,
  Input,
  Select,
  Checkbox,
  Radio,
  Space,
  Typography,
  Alert,
} from "antd";
import useForm from "@/hooks/useForm"; // Use alias
import { produce } from "immer";
import type { CheckboxChangeEvent } from "antd/es/checkbox"; // Import specific event type
import type { RadioChangeEvent } from "antd/es/radio"; // Import specific event type

const { Title } = Typography;
const { Step } = Steps;

// Define types for form values
interface FormValues {
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

/**
 * Demonstrates a multi-step form using Ant Design Steps and controlled components
 * managed by the custom useForm hook for values and local state for errors.
 *
 * @returns {JSX.Element} The MultiStepForm component.
 */
const MultiStepForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const {
    values: formData,
    handleChange,
    setValues,
  } = useForm<FormValues>(initialValues);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Re-introduce local state for form errors
  const [formErrors, setFormErrors] = useState<
    Partial<Record<keyof FormValues, string>>
  >({});

  const validateStep = (stepIndex: number): boolean => {
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
        // Example validation: If newsletter is checked, gender must be selected
        // Adjust based on actual requirements
        // if (formData.newsletter && !formData.gender) {
        //   errors.gender = "Gender selection is required if subscribing";
        // }
        if (!formData.agreeTerms) {
          errors.agreeTerms = "You must agree to the terms";
        }
        break;
      default:
        break;
    }
    setFormErrors(errors); // Use the local state setter
    return Object.keys(errors).length === 0;
  };

  const next = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prev = () => {
    setCurrentStep(currentStep - 1);
    setFormErrors({}); // Use the local state setter to clear errors
  };

  const handleSubmit = () => {
    if (validateStep(currentStep)) {
      console.log("Form Submitted:", formData);
      setIsSubmitted(true);
      // In a real app, send data to API here
    }
  };

  const handleReset = () => {
    setValues(initialValues); // Reset form values using hook setter
    setCurrentStep(0);
    setFormErrors({}); // Use the local state setter to clear errors
    setIsSubmitted(false);
  };

  // Keep specific handlers (handleCheckboxChange, handleRadioChange, handleSelectChange)
  const handleCheckboxChange = (event: CheckboxChangeEvent) => {
    const { name, checked } = event.target;
    if (name) {
      setValues(
        produce((draft) => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (draft as any)[name] = checked;
        }),
      );
      // Clear error for this field upon interaction
      if (formErrors[name as keyof FormValues]) {
        setFormErrors(
          produce((draft) => {
            delete draft[name as keyof FormValues];
          }),
        );
      }
    }
  };

  const handleRadioChange = (event: RadioChangeEvent) => {
    const { name, value } = event.target;
    if (name) {
      setValues(
        produce((draft) => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (draft as any)[name] = value;
        }),
      );
      // Clear error for this field upon interaction
      if (formErrors[name as keyof FormValues]) {
        setFormErrors(
          produce((draft) => {
            delete draft[name as keyof FormValues];
          }),
        );
      }
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    setValues(
      produce((draft) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (draft as any)[name] = value;
      }),
    );
    // Clear error for this field upon interaction
    if (formErrors[name as keyof FormValues]) {
      setFormErrors(
        produce((draft) => {
          delete draft[name as keyof FormValues];
        }),
      );
    }
  };

  const steps = [
    // Step 1: Personal Info
    {
      title: "Personal Info",
      content: (
        <Form layout="vertical">
          {/* Ensure Form.Items use formErrors for validation status/help */}
          <Form.Item
            label="First Name"
            required
            validateStatus={formErrors.firstName ? "error" : ""}
            help={formErrors.firstName}
          >
            <Input
              name="firstName"
              value={formData.firstName}
              onChange={handleChange} // Use generic handler from useForm
              placeholder="Your First Name"
            />
          </Form.Item>
          <Form.Item
            label="Last Name"
            required
            validateStatus={formErrors.lastName ? "error" : ""}
            help={formErrors.lastName}
          >
            <Input
              name="lastName"
              value={formData.lastName}
              onChange={handleChange} // Use generic handler from useForm
              placeholder="Your Last Name"
            />
          </Form.Item>
          <Form.Item
            label="Email"
            required
            validateStatus={formErrors.email ? "error" : ""}
            help={formErrors.email}
          >
            <Input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange} // Use generic handler from useForm
              placeholder="your.email@example.com"
            />
          </Form.Item>
        </Form>
      ),
    },
    // Step 2: Address
    {
      title: "Address",
      content: (
        <Form layout="vertical">
          {/* Ensure Form.Items use formErrors */}
          <Form.Item
            label="Address"
            required
            validateStatus={formErrors.address ? "error" : ""}
            help={formErrors.address}
          >
            <Input
              name="address"
              value={formData.address}
              onChange={handleChange} // Use generic handler from useForm
              placeholder="123 Main St"
            />
          </Form.Item>
          <Form.Item
            label="City"
            required
            validateStatus={formErrors.city ? "error" : ""}
            help={formErrors.city}
          >
            <Input
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="Anytown"
            />
          </Form.Item>
          <Form.Item
            label="Country"
            required
            validateStatus={formErrors.country ? "error" : ""}
            help={formErrors.country}
          >
            {/* Use specific handler for Select */}
            <Select
              value={formData.country}
              onChange={(value) => handleSelectChange("country", value)}
              style={{ width: "100%" }}
            >
              <Select.Option value="">Select Country</Select.Option>
              <Select.Option value="USA">USA</Select.Option>
              <Select.Option value="Canada">Canada</Select.Option>
              <Select.Option value="UK">UK</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      ),
    },
    // Step 3: Consent
    {
      title: "Consent",
      content: (
        <Form layout="vertical">
          {/* Ensure Form.Items use formErrors and specific handlers */}
          <Form.Item
            // name="agreeTerms" // Name prop not needed here for validation display
            valuePropName="checked"
            validateStatus={formErrors.agreeTerms ? "error" : ""}
            help={formErrors.agreeTerms}
            // required // Rule added below
            rules={[{ required: true, message: "You must agree to the terms" }]}
          >
            <Checkbox
              name="agreeTerms"
              checked={formData.agreeTerms}
              onChange={handleCheckboxChange} // Use specific handler
            >
              I agree to the terms and conditions
            </Checkbox>
          </Form.Item>
          <Form.Item name="newsletter" valuePropName="checked">
            <Checkbox
              name="newsletter"
              checked={formData.newsletter}
              onChange={handleCheckboxChange} // Use specific handler
            >
              Subscribe to newsletter
            </Checkbox>
          </Form.Item>
          <Form.Item
            label="Gender"
            // name="gender" // Name prop not needed here for validation display
            validateStatus={formErrors.gender ? "error" : ""}
            help={formErrors.gender}
            // required // Not making this required by default
          >
            <Radio.Group
              name="gender"
              value={formData.gender}
              onChange={handleRadioChange} // Use specific handler
            >
              <Radio value="male">Male</Radio>
              <Radio value="female">Female</Radio>
              <Radio value="other">Other</Radio>
            </Radio.Group>
          </Form.Item>
        </Form>
      ),
    },
  ];

  return (
    <Card
      title={<Title level={4}>Multi-Step Form (useForm)</Title>}
      size="small"
    >
      {isSubmitted ? (
        <Space direction="vertical" align="center" style={{ width: "100%" }}>
          <Alert
            message="Form Submitted Successfully!"
            type="success"
            showIcon
          />
          <pre
            style={{
              background: "#f5f5f5",
              padding: 10,
              borderRadius: 4,
              maxWidth: 400,
              overflowX: "auto",
            }}
          >
            {JSON.stringify(formData, null, 2)}
          </pre>
          <Button onClick={handleReset}>Start Over</Button>
        </Space>
      ) : (
        <Space direction="vertical" style={{ width: "100%" }}>
          <Steps current={currentStep}>
            {steps.map((item) => (
              <Step key={item.title} title={item.title} />
            ))}
          </Steps>
          <div
            style={{
              marginTop: 24,
              padding: 20,
              border: "1px dashed #ccc",
              minHeight: 200,
            }}
          >
            {steps[currentStep].content}
          </div>
          <Space
            style={{
              marginTop: 24,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div>
              {currentStep > 0 && (
                <Button onClick={() => prev()}>Previous</Button>
              )}
            </div>
            <div>
              {currentStep < steps.length - 1 && (
                <Button type="primary" onClick={() => next()}>
                  Next
                </Button>
              )}
              {currentStep === steps.length - 1 && (
                <Button type="primary" onClick={handleSubmit}>
                  Submit Form
                </Button>
              )}
            </div>
          </Space>
        </Space>
      )}
    </Card>
  );
};

export default MultiStepForm;
