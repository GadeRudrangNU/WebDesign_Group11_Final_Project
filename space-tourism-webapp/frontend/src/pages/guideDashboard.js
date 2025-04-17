// src/pages/GuideDashboard.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import '../styles/guide.css';

const GuideDashboard = () => {
    const [missions, setMissions] = useState([]);
    const [filter, setFilter] = useState('all');
    const [instructionUpdates, setInstructionUpdates] = useState({});
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    const fetchMissions = async (status = 'all') => {
        try {
            let url = "http://localhost:5000/api/guide/missions";
            if (status !== 'all') {
                url += `?status=${status}`;
            }

            const response = await fetch(url, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            const data = await response.json();
            if (response.ok) {
                setMissions(data);
            } else {
                setMessage(data.message || "Failed to load missions.");
            }
        } catch (err) {
            setMessage("Failed to load missions.");
        }
    };

    useEffect(() => {
        fetchMissions(filter);
    }, [filter]);

    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => setMessage(""), 3000);
            return () => clearTimeout(timer);
        }
    }, [message]);

    const updateMission = async (id, action) => {
        try {
            const endpoint = `http://localhost:5000/api/guide/missions/${id}/${action}`;
            const response = await fetch(endpoint, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
            const data = await response.json();
            if (response.ok) {
                setMessage(data.message);
                fetchMissions(filter);
            } else {
                setMessage(data.message || "Error");
            }
        } catch (err) {
            setMessage("Action failed");
        }
    };

    const postInstructions = async (id) => {
        const newInstructions = instructionUpdates[id];
        if (!newInstructions) return;
        try {
            const response = await fetch(`http://localhost:5000/api/guide/missions/${id}/instructions`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ instructions: newInstructions })
            });
            const data = await response.json();
            if (response.ok) {
                setMessage("Instructions updated");
                fetchMissions(filter);
                setInstructionUpdates(prev => ({ ...prev, [id]: "" }));
            } else {
                setMessage(data.message || "Update failed");
            }
        } catch (err) {
            setMessage("Error updating instructions");
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    };

    return (
        <div className="guide-page-container">
            <header className="guide-header">
                <div className="header-top">
                    <div></div>{/* <span className="welcome-text">Welcome {user?.username}</span> */}
                    <button className="logout-btn" onClick={handleLogout}>Logout</button>
                </div>
                <h2 className="glow-title">Your Missions</h2>
            </header>

            {message && <div className="alert alert-info text-center fade-in-alert">{message}</div>}

            <div className="filters">
                <button className="btn btn-dark" onClick={() => setFilter('all')}>All</button>
                <button className="btn btn-warning" onClick={() => setFilter('assigned')}>Assigned</button>
                <button className="btn btn-success" onClick={() => setFilter('completed')}>Completed</button>
                <button className="btn btn-danger" onClick={() => setFilter('cancelled')}>Cancelled</button>
            </div>

            <div className="row row-cols-1 row-cols-md-2 g-4 mission-list">
                {missions.length === 0 ? (
                    <p className="text-muted text-center">No missions found for this filter.</p>
                ) : (
                    missions.map(mission => (
                        <div className="col" key={mission._id}>
                            <div className={`card h-100 mission-card border-${mission.status}`}>
                                <div className="card-body">
                                    <h5 className="card-title">{mission.tripName}</h5>
                                    <p><strong>Status:</strong> {mission.status}</p>
                                    <p><strong>Start:</strong> {new Date(mission.startDate).toLocaleDateString()}</p>
                                    <p><strong>End:</strong> {new Date(mission.endDate).toLocaleDateString()}</p>
                                    <p><strong>Instructions:</strong> {mission.instructions || "None"}</p>

                                    {mission.status === "assigned" && (
                                        <>
                                            <textarea
                                                className="form-control mb-2"
                                                placeholder="Update Instructions"
                                                rows="2"
                                                value={instructionUpdates[mission._id] || ""}
                                                onChange={(e) => setInstructionUpdates({
                                                    ...instructionUpdates,
                                                    [mission._id]: e.target.value
                                                })}
                                            ></textarea>
                                            <div className="d-flex flex-wrap gap-2">
                                                <button className="btn btn-primary" onClick={() => postInstructions(mission._id)}>
                                                    Update Instructions
                                                </button>
                                                <button className="btn btn-success" onClick={() => updateMission(mission._id, "complete")}>
                                                    Mark as Completed
                                                </button>
                                                <button className="btn btn-danger" onClick={() => updateMission(mission._id, "cancel")}>
                                                    Cancel Mission
                                                </button>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            <footer className="text-center footer-fixed">
                <p>© 2025 Space Tourism · Navigate the stars 🌌</p>
            </footer>
        </div>

    );
};

export default GuideDashboard;
