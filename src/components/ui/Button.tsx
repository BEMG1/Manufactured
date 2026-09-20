import React, { ButtonHTMLAttributes } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg" | "icon";
  children: React.ReactNode;
}

export function Button({ 
  className = "", 
  variant = "primary", 
  size = "md", 
  children, 
  ...props 
}: ButtonProps) {
  const baseStyles = "inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-teal disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98] cursor-pointer";
  
  const variants = {
    primary: "bg-brand-teal text-white shadow-md hover:bg-brand-teal/90 hover:shadow-lg",
    secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200",
    outline: "border-2 border-gray-200 bg-white text-gray-700 hover:border-brand-teal hover:bg-brand-teal/5 hover:text-brand-teal",
    ghost: "text-gray-700 hover:bg-gray-100",
    danger: "bg-red-50 text-red-600 hover:bg-red-100",
  };
  
  const sizes = {
    sm: "h-9 px-4 text-sm",
    md: "h-11 px-6 text-base",
    lg: "h-14 px-8 text-lg",
    icon: "h-11 w-11 p-2",
  };

  const classes = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
