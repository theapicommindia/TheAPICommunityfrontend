import React from 'react';
import { Controller, FormProvider, useFormContext } from 'react-hook-form';

const Form = FormProvider;

const FormField = ({ name, ...props }) => {
  const { control } = useFormContext();
  return <Controller name={name} control={control} {...props} />;
};

const FormItem = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={`space-y-2 ${className}`} {...props} />
));
FormItem.displayName = "FormItem";

const FormLabel = React.forwardRef(({ className, ...props }, ref) => (
  <label
    ref={ref}
    className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${className}`}
    {...props}
  />
));
FormLabel.displayName = "FormLabel";

const FormControl = React.forwardRef(({ ...props }, ref) => (
  <div ref={ref} className="mt-2" {...props} />
));
FormControl.displayName = "FormControl";

const FormMessage = React.forwardRef(({ className, children, ...props }, ref) => {
  const { error } = useFormContext();
  const body = error ? String(error?.message) : children;

  if (!body) {
    return null;
  }

  return (
    <p
      ref={ref}
      className={`text-sm font-medium text-red-500 ${className}`}
      {...props}
    >
      {body}
    </p>
  );
});
FormMessage.displayName = "FormMessage";

export { Form, FormItem, FormLabel, FormControl, FormMessage, FormField }; 