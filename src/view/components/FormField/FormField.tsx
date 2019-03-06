import * as React from "react";
import { cn } from "@bem-react/classname";

import "./FormField.css";

const cnFormField = cn("FormField");

export interface IFormFieldProps {
  className?: string;
  title?: string;
}

export const FormField: React.SFC<IFormFieldProps> = ({ className, title, children }) => (
  <div className={cnFormField(null, [className])}>
    {title && <label className={cnFormField('Label')}>{title}:</label>}
    {children}
  </div>
);
