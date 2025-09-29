import React, { useState, useRef } from 'react';
import '../style/Dashboard.css';
import Verification from './Verification';

// --- Icon components (no changes here) ---
const HistoryIcon = () => <svg viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 8v4l3 3m6 -3a9 9 0 1 1 -18 0a9 9 0 0 1 18 0" /></svg>;
const VerifyIcon = () => <svg viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 12l2 2l4 -4m5.618 -4.016a11.955 11.955 0 0 1 1.982 11.016m-2.434 2.434a11.955 11.955 0 0 1 -11.016 1.982m-2.434 -2.434a11.955 11.955 0 0 1 1.982 -11.016" /></svg>;
const DownloadIcon = () => <svg viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2" /><path d="M7 11l5 5l5 -5" /><path d="M12 4l0 12" /></svg>;
const ArrowLeftIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 12l14 0" /><path d="M5 12l6 6" /><path d="M5 12l6 -6" /></svg>;
const CheckCircleIcon = () => <svg className="wipe-summary__icon" width="36" height="36" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /><path d="M9 12l2 2l4 -4" /></svg>;
const DeviceIcon = () => <svg viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 19l18 0" /><path d="M5 6m0 1a1 1 0 0 1 1 -1h12a1 1 0 0 1 1 1v8a1 1 0 0 1 -1 1h-12a1 1 0 0 1 -1 -1z" /></svg>;
const WipeIcon = () => <svg viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M19 20h-10.5l-4.21 -4.3a1 1 0 0 1 0 -1.41l10 -10a1 1 0 0 1 1.41 0l5 5a1 1 0 0 1 0 1.41l-3.29 3.3" /><path d="M16 5l3 3" /></svg>;


const ReportModal = ({ data, onClose }) => {
    const jsonRef = useRef(null);

    const handleViewCertificateClick = () => {
        if (jsonRef.current) {
            jsonRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <div className="report-header">
                    <CheckCircleIcon />
                    <h2 style={{fontSize: '1.25rem', fontWeight: '600'}}>Certificate of Data Erasure</h2>
                    <p style={{color: '#22c55e', fontSize: '0.9rem', fontWeight: '500'}}>Verified & Authentic</p>
                </div>
                <div className="modal-body">
                    <div className="report-section">
                        <h3 className="report-section__title"><DeviceIcon /> Device Information</h3>
                        <dl className="report-details">
                            <dt>Device Model:</dt><dd>{data.deviceDetails.deviceModel}</dd>
                            <dt>Serial Number:</dt><dd>{data.deviceDetails.deviceSerial}</dd>
                            <dt>Host System:</dt><dd>{data.deviceDetails.hostSystem}</dd>
                        </dl>
                    </div>
                    <div className="report-section">
                        <h3 className="report-section__title"><WipeIcon /> Wipe Information</h3>
                        <dl className="report-details">
                            <dt>Method Used:</dt><dd>{data.wipeDetails.wipeMethod}</dd>
                            <dt>Final Status:</dt><dd style={{color: '#22c55e'}}>{data.wipeDetails.wipeStatus}</dd>
                            <dt>Timestamp:</dt><dd>{new Date(data.issueTimestamp).toLocaleString()}</dd>
                        </dl>
                    </div>
                    <div className="report-section">
                        <h3 className="report-section__title">Raw Certificate Data (JSON)</h3>
                        <pre ref={jsonRef}>{JSON.stringify(data, null, 2)}</pre>
                    </div>
                </div>
                <div className="modal-footer">
                    <button onClick={handleViewCertificateClick} className="btn btn--secondary">View JSON Certificate</button>
                    <button onClick={onClose} className="btn btn--primary">Close</button>
                </div>
            </div>
        </div>
    );
};

const WipeHistoryView = ({ onBack }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeDownloadMenu, setActiveDownloadMenu] = useState(null);

    const historyData = {
        id: 'cert-1',
        device: 'Kingston 250GB SSD', 
        host: 'Dell Vostro', 
        date: '30 Sep 2025', 
        status: 'Success',
        fullReport: {
          certificateVersion: "1.0", 
          certificateId: "a4e9-8b1c-3d7f-5a0a-1b8e", 
          issuerName: "True Erase by Everizon", 
          issueTimestamp: "2025-09-30T12:46:00.000Z",
          deviceDetails: { 
              deviceId: "DEV-KINGSTON-250SSD-PQR", 
              deviceModel: "Kingston 250GB SSD", 
              deviceSerial: "K58219A0987654", 
              hostSystem: "Dell Vostro" 
          },
          wipeDetails: { 
              wipeMethod: "NIST 800-88 Purge (ATA Secure Erase)", 
              wipeStatus: "Success", 
              wipeEnvironment: "Arch Linux" 
          },
          cryptographicProof: { 
              dataHash: "b2c3d4e5f67890a1b2c3d4e5f67890a1b2c3d4e5f67890a1b2c3d4e5f67890a1", 
              digitalSignature: "eyJhbGciOiJFUzI1NiJ9..." 
          }
        }
    };

    const handleToggleDownloadMenu = (rowId) => {
        setActiveDownloadMenu(activeDownloadMenu === rowId ? null : rowId);
    };

    const handleJsonDownload = () => {
        const dataStr = JSON.stringify(historyData.fullReport, null, 2);
        const blob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `TrueErase-Certificate-${historyData.device.replace(/ /g, '-')}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        setActiveDownloadMenu(null);
    };

    const handlePdfDownload = () => {
        alert('PDF download functionality is not yet implemented.');
        setActiveDownloadMenu(null);
    };

    return (
        <div className="animate-fade-in">
            <button onClick={onBack} className="dashboard__back-button"><ArrowLeftIcon /> Back to Dashboard</button>
            <h2 style={{fontSize: '1.875rem', fontWeight: 600, marginBottom: '1.5rem'}}>Wipe History</h2>
            <div className="history-table-container">
                <table className="history-table">
                    <thead>
                        <tr>
                            <th>Device</th>
                            <th>Host System</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{historyData.device}</td>
                            <td>{historyData.host}</td>
                            <td>{historyData.date}</td>
                            <td>
                                <span className="status-badge status-badge--success">{historyData.status}</span>
                            </td>
                            <td>
                                <div className="action-buttons">
                                    <button onClick={() => setIsModalOpen(true)} className="btn btn--secondary btn--small">View Report</button>

                                    <div className="download-menu-container">
                                        <button 
                                            onClick={() => handleToggleDownloadMenu(historyData.id)} 
                                            className="btn btn--primary btn--small"
                                        >
                                            Download Certificate
                                        </button>
                                        {activeDownloadMenu === historyData.id && (
                                            <div className="download-options">
                                                <button onClick={handleJsonDownload} className="download-option-btn">Download JSON</button>
                                                <button onClick={handlePdfDownload} className="download-option-btn">Download PDF</button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            {isModalOpen && <ReportModal data={historyData.fullReport} onClose={() => setIsModalOpen(false)} />}
        </div>
    );
};


const DashboardHub = ({ setView }) => (
    <div className="dashboard-hub animate-fade-in">
        <button className="hub-card" onClick={() => setView('history')}>
            <div className="hub-card__icon"><HistoryIcon /></div>
            <h3 className="hub-card__title">View Wipe History</h3>
            <p className="hub-card__description">Review past erasure reports and download your certificates of sanitization.</p>
        </button>
        <button className="hub-card" onClick={() => setView('verify')}>
            <div className="hub-card__icon"><VerifyIcon /></div>
            <h3 className="hub-card__title">Verify a Certificate</h3>
            <p className="hub-card__description">Upload a certificate to cryptographically verify its authenticity and integrity.</p>
        </button>
        <a 
            href="https://drive.google.com/drive/folders/1U1E9BeIkLEq74Xijn03hu3dzYvv-ZFwA"
            className="hub-card" 
            target="_blank"
            rel="noopener noreferrer"
        >
            <div className="hub-card__icon"><DownloadIcon /></div>
            <h3 className="hub-card__title">Download Prototype</h3>
            <p className="hub-card__description">Get the latest build of the TrueErase application for your operating system.</p>
        </a>
    </div>
);


const Dashboard = () => {
    const [view, setView] = useState('hub');

    const renderContent = () => {
        switch(view) {
            case 'history':
                return <WipeHistoryView onBack={() => setView('hub')} />;
            case 'verify':
                return (
                    <>
                        <button onClick={() => setView('hub')} className="dashboard__back-button"><ArrowLeftIcon /> Back to Dashboard</button>
                        <Verification />
                    </>
                );
            case 'hub':
            default:
                return <DashboardHub setView={setView} />;
        }
    };

    return (
        <section className="dashboard">
            <div className="dashboard__content">
                {renderContent()}
            </div>
        </section>
    );
};

export default Dashboard;

