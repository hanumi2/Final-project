import React, { useState } from 'react';
import { Upload, CheckCircle, Clock, ChevronRight, FileText, AlertCircle } from 'lucide-react';
import TaskService from '../services/task.service';

const KanbanBoard = ({ tasks, onTaskUpdate }) => {
    const columns = ['ASSIGNED', 'IN_PROGRESS', 'REVIEW', 'COMPLETED'];
    const [uploadingTask, setUploadingTask] = useState(null);

    const handleStatusChange = async (taskId, newStatus) => {
        try {
            await TaskService.updateStatus(taskId, newStatus);
            onTaskUpdate();
        } catch (err) {
            console.error("Failed to update status");
        }
    };

    const handleFileUpload = async (taskId, file) => {
        try {
            await TaskService.uploadResult(taskId, file);
            onTaskUpdate();
            setUploadingTask(null);
        } catch (err) {
            console.error("Upload failed");
        }
    };

    return (
        <div className="grid lg:grid-cols-4 gap-6 overflow-x-auto pb-8">
            {columns.map((col) => (
                <div key={col} className="min-w-[300px] flex flex-col gap-4">
                    <div className="flex items-center justify-between px-2">
                        <h4 className="font-black text-slate-500 text-xs uppercase tracking-widest">{col.replace('_', ' ')}</h4>
                        <span className="bg-white dark:bg-slate-800 px-2 py-0.5 rounded-full text-[10px] font-bold shadow-sm">
                            {tasks.filter(t => t.status === col).length}
                        </span>
                    </div>

                    <div className="bg-slate-100/50 dark:bg-slate-900/50 p-4 rounded-3xl min-h-[500px] space-y-4 border border-dashed border-slate-200 dark:border-slate-800">
                        {tasks.filter(t => t.status === col).map((task) => (
                            <div key={task.id} className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 group hover:shadow-xl transition-all duration-300">
                                <div className="flex justify-between items-start mb-3">
                                    <span className={`px-2 py-1 rounded-md text-[8px] font-bold uppercase tracking-tighter ${task.type === 'ARCHITECTURAL' ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'
                                        }`}>
                                        {task.type}
                                    </span>
                                    <span className="text-[10px] text-slate-400">#{task.id}</span>
                                </div>
                                <h5 className="font-bold text-slate-900 dark:text-white mb-2">{task.title}</h5>
                                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-3 mb-4 leading-relaxed">{task.description}</p>

                                <div className="flex flex-col gap-3">
                                    {col !== 'COMPLETED' && (
                                        <button
                                            onClick={() => handleStatusChange(task.id, columns[columns.indexOf(col) + 1])}
                                            className="w-full flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-[10px] font-bold hover:bg-primary hover:text-white transition-all transition-transform hover:scale-[1.02]"
                                        >
                                            Move to {columns[columns.indexOf(col) + 1].replace('_', ' ')}
                                            <ChevronRight size={14} />
                                        </button>
                                    )}

                                    {col === 'REVIEW' && (
                                        <div className="relative">
                                            {uploadingTask === task.id ? (
                                                <input
                                                    type="file"
                                                    onChange={(e) => handleFileUpload(task.id, e.target.files[0])}
                                                    className="w-full text-[10px] file:bg-primary file:text-white file:border-0 file:rounded-md file:px-2 file:py-1"
                                                />
                                            ) : (
                                                <button
                                                    onClick={() => setUploadingTask(task.id)}
                                                    className="w-full flex items-center justify-center gap-2 p-2 rounded-lg border-2 border-dashed border-slate-200 dark:border-slate-600 text-[10px] font-bold text-slate-400 hover:text-primary hover:border-primary transition-all"
                                                >
                                                    <Upload size={14} /> Upload Result
                                                </button>
                                            )}
                                        </div>
                                    )}

                                    {task.filePath && (
                                        <div className="flex items-center gap-2 text-[10px] text-green-600 font-bold bg-green-50 dark:bg-green-900/20 p-2 rounded-lg">
                                            <CheckCircle size={14} /> File Uploaded
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default KanbanBoard;
