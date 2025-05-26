import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { Plus } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyEntries, fetchSharedEntries } from "../features/eye/eyeSlice";
import "./Dashboard.css";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);

  const { myEntries, sharedEntries, loading } = useSelector(
    (state) => state.eye
  );

  useEffect(() => {
    dispatch(fetchMyEntries());
    dispatch(fetchSharedEntries());
  }, [dispatch]);

  return (
    <div className="dashboard">
      <h1 className="welcome-heading">
        Welcome to <span className="brand">eyeage</span>, {user?.firstName}!
      </h1>

      <div className="dashboard-grid">
        <div className="card">
          <div className="card-header">
            <h3>Quick Actions</h3>
            <button className="plus-btn" onClick={() => setShowModal(true)}>
              <Plus size={18} />
            </button>
          </div>
          <p className="card-subtext">
            Manage your eye readings quickly using the options below.
          </p>
        </div>
      </div>

      <div className="entries-section">
        {/* ---------- MY ENTRIES ---------- */}
        <h2>📋 My Eye Entries</h2>
        {loading ? (
          <p>Loading entries...</p>
        ) : Array.isArray(myEntries) && myEntries.length > 0 ? (
          myEntries.map((entry) => (
            <div key={entry._id} className="entry-card">
              <p>
                <strong>Created:</strong>{" "}
                {new Date(entry.createdAt).toLocaleString()}
              </p>
              <p>
                <strong>Right Eye SPH (Distance):</strong>{" "}
                {entry.rightEye?.distance?.sph ?? "N/A"}
              </p>
              <p>
                <strong>Left Eye SPH (Distance):</strong>{" "}
                {entry.leftEye?.distance?.sph ?? "N/A"}
              </p>
              <p>
                <strong>Shared With:</strong>{" "}
                {entry.sharedWith?.length > 0
                  ? entry.sharedWith
                      .map((u) => u?.email || "Unknown")
                      .join(", ")
                  : "Not shared"}
              </p>
            </div>
          ))
        ) : (
          <p>No entries found.</p>
        )}

        {/* ---------- SHARED ENTRIES ---------- */}
        <h2>🤝 Entries Shared With Me</h2>
        {loading ? (
          <p>Loading shared entries...</p>
        ) : Array.isArray(sharedEntries) && sharedEntries.length > 0 ? (
          sharedEntries.map((entry) => (
            <div key={entry._id} className="entry-card shared">
              <p>
                <strong>From:</strong>{" "}
                {entry.user?.firstName || entry.user?.email ? (
                  <>
                    {`${entry.user.firstName ?? ""} ${
                      entry.user.lastName ?? ""
                    }`.trim()}{" "}
                    ({entry.user.email})
                  </>
                ) : (
                  "Unknown"
                )}
              </p>

              <p>
                <strong>Created:</strong>{" "}
                {new Date(entry.createdAt).toLocaleString()}
              </p>
              <p>
                <strong>Right Eye SPH (Distance):</strong>{" "}
                {entry.rightEye?.distance?.sph ?? "N/A"}
              </p>
              <p>
                <strong>Left Eye SPH (Distance):</strong>{" "}
                {entry.leftEye?.distance?.sph ?? "N/A"}
              </p>
            </div>
          ))
        ) : (
          <p>No entries shared with you yet.</p>
        )}
      </div>

      {/* ---------- MODAL ---------- */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3 className="modal-title">Quick Actions</h3>
            <ul className="modal-links">
              <li>
                <Link to="/eyes/add" className="modal-link">
                  ➕ Add Eye Reading
                </Link>
              </li>
              <li>
                <Link to="/eyes" className="modal-link">
                  📋 View All Eye Readings
                </Link>
              </li>
            </ul>
            <button className="close-btn" onClick={() => setShowModal(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
