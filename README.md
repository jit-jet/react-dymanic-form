# Dynamic Form Builder

A dynamic form builder component built with React. This component allows you to generate a multi-step form dynamically from a configuration object. It supports various field types such as text inputs, password inputs, select dropdowns, checkboxes, captchas, and OTP fields. The form handles validation, conditional field visibility, and integrates with a backend API to handle form submissions.

## Features

- **Multi-step form**: Navigate through steps with a clear visual indicator of the current step.
- **Field types**:
  - Text, email, and password inputs.
  - Select dropdowns.
  - Checkboxes.
  - Captchas and OTP inputs.
- **Dynamic field visibility**: Fields can be conditionally displayed based on other field values.
- **Field validation**: Custom validation rules for each field (required, minLength, maxLength, regex pattern).
- **Form submission**: Collect form data and submit it to a configured API endpoint.
- **Error handling**: Display error messages for invalid fields.

## Installation

1. Clone the repository:

   git clone https://github.com/jit-jet/react-dymanic-form.git

   cd react-dymanic-form

3. Install dependencies:
    npm install

4. Run the application:
    npm run dev
  
## Usage

Configuration
The form is configurable via a JSON configuration file (config.json). It specifies the structure of the form, including the fields, their types, validation rules, and actions. This configuration is fetched from an API and can be customized for your use case.

Example configuration:
```
{
  "form": {
    "register": [
      {
        "name": "step1",
        "method": "POST",
        "title": "User Registration",
        "fields": [
          {
            "type": "text",
            "name": "username",
            "caption": "Username",
            "placeholder": "Enter your username",
            "rules": {
              "required": true,
              "minLength": 3,
              "maxLength": 20
            }
          },
          {
            "type": "email",
            "name": "email",
            "caption": "Email",
            "placeholder": "Enter your email",
            "rules": {
              "required": true,
              "pattern": {
                "regexp": "^\\S+@\\S+$",
                "message": "Invalid email address"
              }
            }
          }
        ],
        "back": false,
        "params": ["userId"]
      }
    ]
  }
}
```

# Fields

The form supports multiple field types, each with its own set of attributes:

- Text Field: Supports text inputs such as username, email, and password.

- Select Field: Allows the user to select from predefined options.

- Checkbox Field: A checkbox input for true/false values.

- Captcha: Displays a captcha field for additional verification.

- OTP: Sends an OTP code and allows the user to enter it within the form.
