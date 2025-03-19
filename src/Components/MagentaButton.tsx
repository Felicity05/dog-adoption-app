import React from 'react';

interface MagentaButtonProps {
    label: string;
    onClick: () => void;
    disabled?: boolean;
    buttonType?: 'primary' | 'secondary' | 'danger';
}

const MagentaButton: React.FC<MagentaButtonProps> = ({
                                                         label,
                                                         onClick,
                                                         disabled = false,
                                                         buttonType = 'primary',
                                                     }) => {
    const baseClasses = `px-15 py-2 font-semibold rounded-md focus:outline-none w-full md:w-70`;
    const buttonStyles = {
        primary: `bg-[#890A74] text-[#FFA900] hover:bg-[#FFA900] hover:text-[#890A74] `,
        secondary: `bg-gray-500 text-white hover:bg-gray-600 focus:ring-gray-300`,
        danger: `bg-red-500 text-white hover:bg-red-600 focus:ring-red-300`,
    };

    return (
        <button
            className={`${baseClasses} ${
                buttonStyles[buttonType]
            } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={onClick}
            disabled={disabled}
        >
            {label}
        </button>
    );
};

export default MagentaButton;
