import React from 'react';

/**
 * Component hiển thị khi không có dữ liệu
 */
const EmptyState = ({
    icon,
    title,
    description,
    action
}) => {
    return (
        <div className="bg-white rounded-lg shadow p-8 text-center">
            {icon}
            <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
            <p className="text-gray-600 mb-6">{description}</p>
            {action}
        </div>
    );
};

export default EmptyState;
