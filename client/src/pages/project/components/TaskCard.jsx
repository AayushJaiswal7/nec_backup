import React from "react";

const TaskCard = ({ task }) => {
    const getStatusColor = (status) => {
        switch (status) {
            case "Todo": return "bg-yellow-50 text-yellow-600";
            case "In Progress": return "bg-blue-50 text-blue-600";
            case "Closed": return "bg-green-50 text-green-600";
            case "On Hold": return "bg-red-50 text-red-600";
            default: return "bg-gray-50 text-gray-600";
        }
    };

    return (
        <div className="border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-all bg-white">
            <p className="text-[11px] text-gray-500 mb-1">{task.type}</p>
            <h3 className="font-semibold text-gray-800 text-[14px] mb-2">{task.name}</h3>
            <p className="text-gray-500 text-[12px] leading-snug mb-4">
                Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...
            </p>
            <div className="flex items-center justify-between">
                <p className="text-[11px] text-gray-500">{task.user}</p>
                <span
                    className={`px-3 py-0.5 text-[11px] font-medium rounded-full ${getStatusColor(task.status)}`}
                >
                    {task.status}
                </span>
            </div>
        </div>
    );
};

export default TaskCard;