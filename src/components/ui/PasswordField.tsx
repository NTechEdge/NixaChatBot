import React, { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { FormField, type FormFieldProps } from './FormField'

export type PasswordFieldProps = Omit<FormFieldProps, 'label' | 'type' | 'trailing'> & {
  label?: string
}

/**
 * FormField preconfigured for passwords, with a show/hide visibility toggle
 */
export const PasswordField: React.FC<PasswordFieldProps> = ({ label = 'Password', ...props }) => {
  const [visible, setVisible] = useState(false)

  return (
    <FormField
      {...props}
      label={label}
      type={visible ? 'text' : 'password'}
      trailing={
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors cursor-pointer"
          title={visible ? 'Hide password' : 'Show password'}
          tabIndex={-1}
        >
          {visible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        </button>
      }
    />
  )
}
