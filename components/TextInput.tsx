import React from 'react';

interface TextInputProps {
    id: string;
    label: string;
    placeholder?: string;
    value: string;
    onChange: (value: string) => void;
    required?: boolean;
    error?: string;
}

const TextInput: React.FC<TextInputProps> = ({ id, label, placeholder = '', value, onChange, required = false, error, }) => {
    return (
        <div className="w-full relative mt-6 pr-4">
            <input
                id={id}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                type="text"
                className={`peer pt-6 p-2 font-light outline-none relative left-2 border-b-2 w-full
                    ${error ? 'border-rose-500' : 'border-neutral-300'}
                    ${error ? 'focus:border-rose-500' : 'focus:border-[#47444c]'}
                `}
            />

            <label
                className={`absolute text-md duration-150 transform -translate-y-3 top-2.5 z-10 origin-[0] select-none left-4
                ${error ? 'text-rose-500' : 'text-zinc-400'}
                `}
            >
                {label}
                {required && <span className="text-rose-500">*</span>}
            </label>

            {error && <p className="text-rose-500 text-xs mt-2">{error}</p>}
        </div>
    );
}

export default TextInput;
