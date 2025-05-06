import { useState, useCallback } from "react";

/**
 * A basic custom hook for managing form state.
 *
 * @template T Initial form values type.
 * @param {T} initialValues The initial values for the form fields.
 * @returns {{ values: T; handleChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void; resetForm: () => void; setValues: React.Dispatch<React.SetStateAction<T>> }}
 */
function useForm<T>(initialValues: T) {
  const [values, setValues] = useState<T>(initialValues);

  // Handles input changes for standard HTML inputs
  const handleChange = useCallback(
    (
      event: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) => {
      const { name, value, type } = event.target;

      // Handle checkbox type specifically
      if (type === "checkbox") {
        const checked = (event.target as HTMLInputElement).checked;
        setValues((prevValues) => ({
          ...prevValues,
          [name]: checked,
        }));
      } else {
        setValues((prevValues) => ({
          ...prevValues,
          [name]: value,
        }));
      }
    },
    [], // No dependencies needed as setValues is stable
  );

  // Resets the form to initial values
  const resetForm = useCallback(() => {
    setValues(initialValues);
  }, [initialValues]);

  // Note: For more complex forms, consider libraries like Formik or React Hook Form

  return {
    values,
    handleChange,
    resetForm,
    setValues, // Expose setValues for more complex updates if needed
  };
}

export default useForm;
