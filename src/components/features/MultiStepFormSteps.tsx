"use client";

import React from "react";
import { Form, Input, Select, Checkbox, Radio } from "antd";
import { useMultiStepForm } from "@/contexts/MultiStepFormContext";

export const PersonalInfoStep: React.FC = () => {
  const { formData, formErrors, handleChange } = useMultiStepForm();

  return (
    <Form layout="vertical">
      <Form.Item
        label="First Name"
        required
        validateStatus={formErrors.firstName ? "error" : ""}
        help={formErrors.firstName}
      >
        <Input
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
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
          onChange={handleChange}
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
          onChange={handleChange}
          placeholder="your.email@example.com"
        />
      </Form.Item>
    </Form>
  );
};

export const AddressStep: React.FC = () => {
  const { formData, formErrors, handleChange, handleSelectChange } =
    useMultiStepForm();

  return (
    <Form layout="vertical">
      <Form.Item
        label="Address"
        required
        validateStatus={formErrors.address ? "error" : ""}
        help={formErrors.address}
      >
        <Input
          name="address"
          value={formData.address}
          onChange={handleChange}
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
        <Select
          value={formData.country}
          onChange={(value) => handleSelectChange("country", value)}
          style={{ width: "100%" }}
        >
          <Select.Option value="">{"Select Country"}</Select.Option>
          <Select.Option value="USA">{"USA"}</Select.Option>
          <Select.Option value="Canada">{"Canada"}</Select.Option>
          <Select.Option value="UK">{"UK"}</Select.Option>
        </Select>
      </Form.Item>
    </Form>
  );
};

export const ConsentStep: React.FC = () => {
  const { formData, formErrors, handleCheckboxChange, handleRadioChange } =
    useMultiStepForm();

  return (
    <Form layout="vertical">
      <Form.Item
        valuePropName="checked"
        validateStatus={formErrors.agreeTerms ? "error" : ""}
        help={formErrors.agreeTerms}
        rules={[{ required: true, message: "You must agree to the terms" }]}
      >
        <Checkbox
          name="agreeTerms"
          checked={formData.agreeTerms}
          onChange={handleCheckboxChange}
        >
          {"I agree to the terms and conditions"}
        </Checkbox>
      </Form.Item>
      <Form.Item name="newsletter" valuePropName="checked">
        <Checkbox
          name="newsletter"
          checked={formData.newsletter}
          onChange={handleCheckboxChange}
        >
          {"Subscribe to newsletter"}
        </Checkbox>
      </Form.Item>
      <Form.Item
        label="Gender"
        validateStatus={formErrors.gender ? "error" : ""}
        help={formErrors.gender}
      >
        <Radio.Group
          name="gender"
          value={formData.gender}
          onChange={handleRadioChange}
        >
          <Radio value="male">{"Male"}</Radio>
          <Radio value="female">{"Female"}</Radio>
          <Radio value="other">{"Other"}</Radio>
        </Radio.Group>
      </Form.Item>
    </Form>
  );
};

export const getStepConfig = () => [
  {
    title: "Personal Info",
    component: <PersonalInfoStep />,
  },
  {
    title: "Address",
    component: <AddressStep />,
  },
  {
    title: "Consent",
    component: <ConsentStep />,
  },
];
