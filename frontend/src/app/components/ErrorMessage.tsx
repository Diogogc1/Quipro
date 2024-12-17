import { WarningCircle } from "phosphor-react";



export function ErrorMessage({ message }: { message?: string }) {
    if (!message) return null;
  
    return (
        <span className="flex items-center text-sm text-red-500 mt-1 ml-14">
            <WarningCircle className="mr-1" size={16} />
            {message}
        </span>
    );
  }