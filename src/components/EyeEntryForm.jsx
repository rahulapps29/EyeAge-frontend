import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { createEntry, shareEntry } from "../features/eye/eyeSlice";
import "./EyeEntryForm.css";

const EyeEntryForm = () => {
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    rightEye: { distance: {}, near: {} },
    leftEye: { distance: {}, near: {} },
    sv: false,
    bf: false,
    prog: false,
    hc: false,
    hmc: false,
    bc: false,
    poly: false,
    trio: false,
    violet: false,
    totalAmount: 0,
    advanceAmount: 0,
    balanceAmount: 0,
  });

  const [shareEmails, setShareEmails] = useState("");

  useEffect(() => {
    const balance = form.totalAmount - form.advanceAmount;
    setForm((prev) => ({ ...prev, balanceAmount: balance }));
  }, [form.totalAmount, form.advanceAmount]);

  const handleNestedChange = (e, eye, type, field) => {
    const value = parseFloat(e.target.value);
    setForm((prev) => ({
      ...prev,
      [eye]: {
        ...prev[eye],
        [type]: {
          ...prev[eye][type],
          [field]: value,
        },
      },
    }));
  };

  const handleCheckbox = (e) => {
    setForm({ ...form, [e.target.name]: e.target.checked });
  };

  const handleSimpleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: parseFloat(value) || 0 });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resultAction = await dispatch(createEntry(form));
      const createdEntry = resultAction.payload;

      const emails = shareEmails
        .split(",")
        .map((email) => email.trim())
        .filter((email) => email);

      if (createdEntry?._id && emails.length > 0) {
        await dispatch(shareEntry({ entryId: createdEntry._id, emails }));
        alert("Entry shared successfully!");
      }

      alert("Entry saved successfully!");
      setForm({
        rightEye: { distance: {}, near: {} },
        leftEye: { distance: {}, near: {} },
        sv: false,
        bf: false,
        prog: false,
        hc: false,
        hmc: false,
        bc: false,
        poly: false,
        trio: false,
        violet: false,
        totalAmount: 0,
        advanceAmount: 0,
        balanceAmount: 0,
      });
      setShareEmails("");
    } catch (error) {
      alert("Failed to save or share entry.");
      console.error(error);
    }
  };

  const renderEyeFields = (eye) => (
    <>
      <h4>{eye === "rightEye" ? "Right Eye" : "Left Eye"}</h4>
      {["distance", "near"].map((type) => (
        <div key={`${eye}-${type}`} className="eye-group">
          <label>{type.toUpperCase()} SPH:</label>
          <input
            type="number"
            step="0.25"
            value={form[eye][type]?.sph || ""}
            onChange={(e) => handleNestedChange(e, eye, type, "sph")}
          />
          <label>CYL:</label>
          <input
            type="number"
            step="0.25"
            value={form[eye][type]?.cyl || ""}
            onChange={(e) => handleNestedChange(e, eye, type, "cyl")}
          />
          <label>AXIS:</label>
          <input
            type="number"
            value={form[eye][type]?.axis || ""}
            onChange={(e) => handleNestedChange(e, eye, type, "axis")}
          />
        </div>
      ))}
    </>
  );

  return (
    <form onSubmit={handleSubmit} className="entry-form">
      <h2>Add Eye Entry</h2>

      {renderEyeFields("rightEye")}
      {renderEyeFields("leftEye")}

      <div className="options-group">
        {["sv", "bf", "prog", "hc", "hmc", "bc", "poly", "trio", "violet"].map(
          (option) => (
            <label key={option}>
              <input
                type="checkbox"
                name={option}
                checked={form[option]}
                onChange={handleCheckbox}
              />
              {option.toUpperCase()}
            </label>
          )
        )}
      </div>

      <div className="payment-group">
        <label>Total Amount:</label>
        <input
          type="number"
          name="totalAmount"
          value={form.totalAmount}
          onChange={handleSimpleChange}
        />

        <label>Advance Amount:</label>
        <input
          type="number"
          name="advanceAmount"
          value={form.advanceAmount}
          onChange={handleSimpleChange}
        />

        <label>Balance Amount:</label>
        <input type="number" value={form.balanceAmount} readOnly />
      </div>

      <div className="share-group">
        <label>Share with (comma-separated emails):</label>
        <input
          type="text"
          value={shareEmails}
          onChange={(e) => setShareEmails(e.target.value)}
          placeholder="e.g. user1@example.com, user2@example.com"
        />
      </div>

      <button type="submit" className="submit-btn">
        Save & Share
      </button>
    </form>
  );
};

export default EyeEntryForm;
