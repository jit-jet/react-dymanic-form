import React, { useState, useEffect, useMemo } from "react";
import { useForm, Controller } from "react-hook-form";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Field, FormConfig, FormStep } from "./types/types";
import { getUrlParams, parseMessage, validateField } from "./utility/utilitis";
import { FieldFactory } from "./components/FieldFactory";
import ErrorComponent from "./components/ErrorComponent";
import LoadingComponent from "./components/LoadingComponent";

const DynamicFormBuilder: React.FC = () => {
  const [config, setConfig] = useState<FormConfig | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm({
    mode: "onChange",
  });
  const watchedValues = watch();
  const urlParams = useMemo(() => getUrlParams(), []);

  // Fetch configuration
  useEffect(() => {
    const fetchConfig = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://api.winazbet.com/v3/default/config"
        );
        if (!response.ok) throw new Error("Failed to fetch configuration");
        const data = await response.json();
        setConfig(data);

        // Set default values from URL params and field defaults
        if (data.form?.register) {
          data.form.register.forEach((step: FormStep) => {
            step.fields.forEach((field: Field) => {
              if (field.name && urlParams[field.name?.toLocaleLowerCase()]) {
                setValue(
                  field.name,
                  urlParams[field.name?.toLocaleLowerCase()]
                );
              } else if (field.value) {
                setValue(field.name, field.value);
              }
            });
          });
        }
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Failed to load form configuration"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchConfig();
  }, [setValue, urlParams]);

  // Check field visibility based on conditions
  const isFieldVisible = (field: Field): boolean => {
    if (!field.condition) return true;

    const {
      field: conditionField,
      value: conditionValue,
      operator = "equals",
    } = field.condition;
    const currentValue = watchedValues[conditionField];

    switch (operator) {
      case "equals":
        return currentValue === conditionValue;
      case "not_equals":
        return currentValue !== conditionValue;
      case "contains":
        return Array.isArray(conditionValue)
          ? conditionValue.includes(currentValue)
          : currentValue?.toString().includes(conditionValue?.toString());
      case "in":
        return (
          Array.isArray(conditionValue) && conditionValue.includes(currentValue)
        );
      default:
        return true;
    }
  };

  // Handle form submission
  const onSubmit = async (data: any) => {
    if (!config) return;

    const currentStepConfig = config.form.register[currentStep];
    const isLastStep = currentStep === config.form.register.length - 1;

    if (isLastStep) {
      // Final submission
      const payload = {
        ...data,
        ...urlParams,
        ...(currentStepConfig.data || {}),
      };

      console.log("Final submission payload:", payload);

      // Here you would make the actual API call
      if (currentStepConfig.action) {
        try {
          const response = await fetch(currentStepConfig.action, {
            method: currentStepConfig.method || "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          });

          if (response.ok) {
            alert("Registration successful!");
          } else {
            alert("Registration failed. Please try again.");
          }
        } catch (err) {
          console.error("Submission error:", err);
          alert("An error occurred during registration.");
        }
      }
    } else {
      // Move to next step
      setCurrentStep(currentStep + 1);
    }
  };

  const goBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  if (loading) {
    return <LoadingComponent />;
  }

  if (error) {
    return <ErrorComponent errorMessage={error} />;
  }

  if (!config || !config.form?.register) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <p className="text-gray-300">No form configuration found</p>
      </div>
    );
  }

  const currentStepConfig = config.form.register[currentStep];
  const visibleFields = currentStepConfig.fields
    .filter(
      (field) =>
        !!field.name &&
        field.type !== "submit" &&
        !currentStepConfig.hideFields?.includes(field.name)
    )
    .filter(isFieldVisible)
    .sort((a, b) => (a.sort || 100) - (b.sort || 100));

  const submitField = currentStepConfig.fields.find(
    (field) => field.type === "submit"
  );
  const isLastStep = currentStep === config.form.register.length - 1;

  return (
    <div className="min-h-screen bg-gray-900 py-8 px-4">
      <div className="max-w-md mx-auto">
        <div className="bg-gray-800 rounded-lg shadow-xl p-6">
          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-white mb-2">
              {parseMessage(currentStepConfig.title) || "Register"}
            </h1>
            {currentStepConfig.description && (
              <p className="text-gray-400">
                {parseMessage(currentStepConfig.description)}
              </p>
            )}
            {config.form.register.length > 1 && (
              <div className="mt-4 flex justify-center space-x-2">
                {config.form.register.map((_, index) => (
                  <div
                    key={index}
                    className={`w-3 h-3 rounded-full ${
                      index === currentStep ? "bg-yellow-500" : "bg-gray-600"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Form */}
          <div className="space-y-6">
            {visibleFields.map((field) => (
              <Controller
                key={field.name + currentStep}
                name={field.name}
                control={control}
                rules={{
                  validate: (value) => validateField(value, field.rules),
                }}
                render={({ field: { value, onChange } }) => (
                  <FieldFactory
                    field={field}
                    value={value}
                    onChange={onChange}
                    error={errors[field.name]?.message as string}
                  />
                )}
              />
            ))}

            {/* Navigation */}
            <div className="flex justify-between items-center pt-4">
              {currentStepConfig.back && currentStep > 0 ? (
                <button
                  type="button"
                  onClick={goBack}
                  className="flex items-center space-x-2 px-4 py-2 text-gray-400 hover:text-white transition-colors"
                >
                  <ArrowLeft size={20} />
                  <span>Back</span>
                </button>
              ) : (
                <div />
              )}

              <button
                type="button"
                onClick={handleSubmit(onSubmit)}
                className="flex items-center space-x-2 px-6 py-3 bg-yellow-600 hover:bg-yellow-700 text-black font-semibold rounded-lg transition-colors"
              >
                <span>
                  {parseMessage(submitField?.value) ||
                    (isLastStep ? "Submit" : "Next")}
                </span>
                {!isLastStep && <ArrowRight size={20} />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DynamicFormBuilder;
