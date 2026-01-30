import React, { useState, useEffect } from 'react';
import ProjectService from '../services/project.service';
import { useLanguage } from '../context/LanguageContext';
import { Upload, FileText, CheckCircle, Clock, AlertCircle } from 'lucide-react';

const ProjectRequestForm = ({ onUploadSuccess }) => {
    const { t } = useLanguage();
    const [plan, setPlan] = useState(null);
    const [lease, setLease] = useState(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!plan) return setMessage("Plan of Argument is mandatory");

        setLoading(true);
        try {
            await ProjectService.submitRequest(plan, lease);
            setMessage(t('uploadSuccess'));
            setPlan(null);
            setLease(null);
            onUploadSuccess();
        } catch (err) {
            setMessage("Failed to submit request");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-800">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                <FileText className="text-primary" /> {t('projectRequest')}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                        {t('planOfArgument')}
                    </label>
                    <div className="relative border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl p-6 hover:border-primary transition-colors text-center cursor-pointer group">
                        <input
                            type="file"
                            onChange={(e) => setPlan(e.target.files[0])}
                            required
                            className="absolute inset-0 opacity-0 cursor-pointer"
                        />
                        <Upload className="mx-auto mb-2 text-slate-400 group-hover:text-primary transition-colors" size={32} />
                        <p className="text-slate-500 dark:text-slate-400">
                            {plan ? plan.name : "Drag & drop or click to upload"}
                        </p>
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                        {t('lease')}
                    </label>
                    <div className="relative border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl p-6 hover:border-secondary transition-colors text-center cursor-pointer group">
                        <input
                            type="file"
                            onChange={(e) => setLease(e.target.files[0])}
                            className="absolute inset-0 opacity-0 cursor-pointer"
                        />
                        <Upload className="mx-auto mb-2 text-slate-400 group-hover:text-secondary transition-colors" size={32} />
                        <p className="text-slate-500 dark:text-slate-400">
                            {lease ? lease.name : "Drag & drop or click to upload"}
                        </p>
                    </div>
                </div>

                {message && (
                    <p className={`text-sm font-medium ${message.includes('success') ? 'text-green-600' : 'text-red-500'}`}>
                        {message}
                    </p>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 bg-primary text-white rounded-xl font-bold hover:bg-primary-dark transition-all transform hover:scale-[1.02] shadow-lg disabled:opacity-50"
                >
                    {loading ? "Processing..." : t('submit')}
                </button>
            </form>
        </div>
    );
};

export default ProjectRequestForm;
