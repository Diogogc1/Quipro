import React, { InputHTMLAttributes } from 'react';

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
    id: string;
    placeholder: string;
    type: string;
    icon: React.ReactNode;
}

const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
    ({ id, placeholder, type, icon, ...rest }, ref) => {
        return (
            <div className="relative w-full">
                <input
                    id={id}
                    placeholder={placeholder}
                    type={type}
                    className="w-full h-12 font-roboto bg-zinc-950 text-xl p-4 pl-14 pr-4 border-solid border-2 rounded-full"
                    ref={ref} // Atribui a ref ao input
                    {...rest} // Passa o register e outros props
                />
                {icon && (
                    <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                        {icon}
                    </div>
                )}
            </div>
        );
    }
);

InputField.displayName = 'InputField';

export default InputField;
