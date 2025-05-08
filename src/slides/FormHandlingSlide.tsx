import React, { useEffect } from "react";
import { Card, Typography, Space, Row, Col, Divider } from "antd";
import MultiStepForm from "@/components/features/MultiStepForm"; // Use alias
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"; // Add SyntaxHighlighter
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism"; // Add style
import mermaid from "mermaid"; // Add mermaid

const { Title, Paragraph, Text } = Typography;

// Added Mermaid Diagram Definition
const formHandlingDiagram = `
graph LR
    subgraph UserInteraction
        UI[Form UI: Inputs, Buttons]
    end

    subgraph MultiStepForm_Component ["MultiStepForm.tsx"]
        direction LR
        MS_State[Local State: currentStep, formErrors, isSubmitted]
        MS_Validate[validateStep()]
        MS_Next[next() / prev()]
        MS_Submit[handleSubmit()]
        MS_FieldHandlers[Specific Handlers: handleCheckboxChange(), etc.]
        HookCall[Calls useForm()]
    end

    subgraph useForm_Hook ["useForm.ts Hook"]
        direction LR
        Hook_State[values (useState)]
        Hook_HandleChange[handleChange()]
        Hook_SetValues[setValues()]
        Hook_Reset[resetForm()]
    end

    UserInteraction -- Triggers Events --> MS_FieldHandlers
    UserInteraction -- Clicks Next/Prev --> MS_Next
    UserInteraction -- Clicks Submit --> MS_Submit
    
    MS_FieldHandlers -- Uses --> Hook_SetValues
    MS_FieldHandlers -- Updates --> MS_State // (formErrors)
    HookCall --> Hook_State
    MS_Next -- Calls --> MS_Validate
    MS_Validate -- Updates --> MS_State // (formErrors)
    MS_Validate -- Reads --> Hook_State // (formData to validate)
    Hook_HandleChange -- Updates --> Hook_State

    UI -- Displays data from --> Hook_State // (formData.firstName)
    UI -- Displays errors from --> MS_State // (formErrors.firstName)
`;

// Added Code Snippets
const useFormSnippet = `
// src/hooks/useForm.ts (Core Logic)
import { useState, useCallback } from "react";

function useForm<T>(initialValues: T) {
  const [values, setValues] = useState<T>(initialValues);

  const handleChange = useCallback((event) => {
    const { name, value, type } = event.target;
    if (type === "checkbox") {
      const checked = (event.target as HTMLInputElement).checked;
      setValues((prev) => ({ ...prev, [name]: checked }));
    } else {
      setValues((prev) => ({ ...prev, [name]: value }));
    }
  }, []);

  const resetForm = useCallback(() => { setValues(initialValues); }, [initialValues]);

  return { values, handleChange, resetForm, setValues };
}
export default useForm;
`;

const multiStepFormSnippet = `
// src/components/features/MultiStepForm.tsx (Key Parts)
import useForm from "@/hooks/useForm";

const MultiStepForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const { values: formData, handleChange, setValues } = useForm<FormValues>(initialValues);
  const [formErrors, setFormErrors] = useState({}); // Local error state

  const validateStep = (stepIndex: number): boolean => {
    const errors = {};
    // ... step-specific validation logic ...
    // Example for step 0:
    if (!formData.firstName) errors.firstName = "Required";
    // ... more validation ...
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const next = () => {
    if (validateStep(currentStep)) setCurrentStep(currentStep + 1);
  };
  
  // Example of a step UI definition (within steps array)
  const stepContent = (
    <Form.Item label="First Name" required validateStatus={formErrors.firstName ? "error" : ""} help={formErrors.firstName}>
      <Input name="firstName" value={formData.firstName} onChange={handleChange} />
    </Form.Item>
  );
  // ... rest of the component ...
};
`;

const codeSnippetStyle: React.CSSProperties = {
  borderRadius: "4px",
  fontSize: "0.85em",
  marginBottom: "16px",
  maxHeight: "400px", // Increased height for better snippet visibility
  overflow: "auto",
};

/**
 * Renders a slide demonstrating the MultiStepForm component
 * which uses the custom useForm hook, with diagrams and code snippets.
 *
 * @returns {JSX.Element} The FormHandlingSlide component.
 */
const FormHandlingSlide: React.FC = () => {
  // Added useEffect for Mermaid
  useEffect(() => {
    mermaid.initialize({ startOnLoad: false, theme: "neutral" });
    const timer = setTimeout(() => {
      try {
        mermaid.run();
      } catch (e) {
        console.error("Mermaid rendering error:", e);
      }
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Space direction="vertical" size="large" style={{ width: "100%" }}>
      <Title level={2} style={{ textAlign: "center" }}>
        Form Handling with a Custom Hook
      </Title>

      <Card title="Concept Overview">
        <Paragraph>
          This example demonstrates a multi-step form. The form's field values
          are managed by a custom hook (<code>useForm</code>), while step
          navigation, validation logic, and error states are handled directly
          within the <code>MultiStepForm</code> component.
        </Paragraph>
        {/* Added Mermaid Diagram */}
        <div
          className="mermaid"
          style={{
            textAlign: "center",
            padding: "10px",
            border: "1px solid #f0f0f0",
            borderRadius: "4px",
            marginTop: "20px",
            marginBottom: "20px",
            background: "#fff",
          }}
        >
          {formHandlingDiagram}
        </div>
        <Paragraph>
          The diagram above illustrates the separation of concerns:{" "}
          <code>useForm</code> hook focuses on value management, while the
          <code>MultiStepForm</code> component orchestrates the steps,
          validation, and UI presentation.
        </Paragraph>
      </Card>

      {/* Added Code Snippets Section */}
      <Card title="Key Code Snippets">
        <Row gutter={[16, 16]}>
          <Col xs={24} lg={12}>
            <Title level={4}>
              1. <code>useForm</code> Hook (Core)
            </Title>
            <Paragraph>
              Manages form field values and provides a generic change handler.
            </Paragraph>
            <SyntaxHighlighter
              language="typescript"
              style={atomDark}
              customStyle={codeSnippetStyle}
              showLineNumbers
            >
              {useFormSnippet.trim()}
            </SyntaxHighlighter>
          </Col>
          <Col xs={24} lg={12}>
            <Title level={4}>
              2. <code>MultiStepForm</code> Component (Orchestration)
            </Title>
            <Paragraph>
              Uses the hook, manages steps, performs validation, and defines UI.
            </Paragraph>
            <SyntaxHighlighter
              language="typescript"
              style={atomDark}
              customStyle={codeSnippetStyle}
              showLineNumbers
            >
              {multiStepFormSnippet.trim()}
            </SyntaxHighlighter>
          </Col>
        </Row>
      </Card>

      <Card title={<Title level={3}>Interactive Demo: Multi-Step Form</Title>}>
        <Paragraph>
          Interact with the form below. It demonstrates handling various input
          types, basic validation per step, and a final submission state. Check
          the console for submitted data.
        </Paragraph>
        {/* Original explanation paragraphs from the slide - might be redundant now
        <Paragraph>
          This example shows a multi-step form whose state is managed by the
          custom <code>useForm</code> hook.
        </Paragraph>
        <Paragraph>
          It demonstrates handling various input types (text, select, checkbox,
          radio), basic validation per step, conditional fields, and a final
          submission state.
        </Paragraph> 
        */}
      </Card>
      <MultiStepForm />
    </Space>
  );
};

export default FormHandlingSlide;
