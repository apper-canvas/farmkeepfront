import React, { useCallback, useState } from "react";
import DatePicker from "react-datepicker";
import ApperIcon from "@/components/ApperIcon";
const Input = ({
  type = "text",
  placeholder,
  value,
  onChange,
  label,
  error,
  required = false,
  disabled = false,
  icon,
  ...props 
}) => {
  const [focused, setFocused] = useState(false);

  const handleChange = useCallback((e) => {
    if (onChange && typeof onChange === 'function') {
      // Ensure we always pass the actual value, not the event
      const inputValue = e?.target?.value ?? e;
      onChange(inputValue);
    }
  }, [onChange]);

  const inputId = `input-${Math.random().toString(36).substr(2, 9)}`;

  // Ensure value is always a string for controlled inputs
  const safeValue = value != null ? String(value) : '';

  return (
    <div className="w-full">
      {label && (
        <label 
          htmlFor={inputId}
          className={`block text-sm font-medium mb-2 ${
            error ? 'text-red-600' : 'text-gray-700'
          }`}
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <ApperIcon name={icon} className="h-5 w-5 text-gray-400" />
          </div>
        )}
        
{(type === "date" || type === "datetime-local") ? (
          <DatePicker
            selected={safeValue ? new Date(safeValue) : null}
            onChange={(date) => {
              if (onChange && typeof onChange === 'function') {
                if (date) {
                  const formattedDate = type === "datetime-local" 
                    ? date.toISOString().slice(0, 16)
                    : date.toISOString().split('T')[0];
                  onChange(formattedDate);
                } else {
                  onChange('');
                }
              }
            }}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholderText={placeholder}
            disabled={disabled}
            required={required}
            showTimeSelect={type === "datetime-local"}
            timeFormat="HH:mm"
            timeIntervals={15}
            dateFormat={type === "datetime-local" ? "yyyy-MM-dd HH:mm" : "yyyy-MM-dd"}
            className={`
              w-full px-3 py-2 border rounded-lg 
              focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
              disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed
              ${icon ? 'pl-10' : ''}
              ${error 
                ? 'border-red-300 focus:ring-red-500' 
                : focused 
                  ? 'border-primary' 
                  : 'border-surface-200 hover:border-surface-300'
              }
            `}
            {...props}
          />
        ) : (
          <input
            id={inputId}
            type={type}
            placeholder={placeholder}
            value={safeValue}
            onChange={handleChange}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            disabled={disabled}
            required={required}
            className={`
              w-full px-3 py-2 border rounded-lg 
              focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
              disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed
              ${icon ? 'pl-10' : ''}
              ${error 
                ? 'border-red-300 focus:ring-red-500' 
                : focused 
                  ? 'border-primary' 
                  : 'border-surface-200 hover:border-surface-300'
              }
            `}
            {...props}
          />
        )}
      </div>
      
      {error && (
        <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
          <ApperIcon name="AlertCircle" size={16} />
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;