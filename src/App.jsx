import { useState } from "react";

const BACKEND_URL = "https://be2a0f21-1fa8-4d48-95f4-54a8e57eef4c-00-ml2t04cjua1p.riker.replit.dev/generate";

function App() {
  const [siteType, setSiteType] = useState("Portfolio");
  const [colorStyle, setColorStyle] = useState("Light");
  const [layout, setLayout] = useState("Centered");
  const [features, setFeatures] = useState([]);
  const [prompt, setPrompt] = useState("");
  const [html, setHtml] = useState("");
  const [loading, setLoading] = useState(false);

  const featureOptions = ["Contact Form", "Image Gallery", "FAQ", "Testimonials", "Blog"];

  const handleFeatureToggle = (feature) => {
    setFeatures((prev) =>
      prev.includes(feature) ? prev.filter((f) => f !== feature) : [...prev, feature]
    );
  };

  const handleGenerate = async () => {
    setLoading(true);
    setHtml("");

    const body = {
      siteType,
      colorStyle,
      layout,
      features,
      prompt,
    };

    try {
      const response = await fetch(BACKEND_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await response.json();
      if (data.html) setHtml(data.html);
      else alert("Error: " + data.error);
    } catch (err) {
      alert("Failed to connect to backend.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 20, fontFamily: "sans-serif", maxWidth: 800, margin: "auto" }}>
      <h1>AI Website Generator</h1>

      <label>
        Site Type:
        <select value={siteType} onChange={(e) => setSiteType(e.target.value)}>
          <option>Portfolio</option>
          <option>Business</option>
          <option>Blog</option>
          <option>Landing Page</option>
        </select>
      </label>

      <br /><br />

      <label>
        Color Style:
        <select value={colorStyle} onChange={(e) => setColorStyle(e.target.value)}>
          <option>Light</option>
          <option>Dark</option>
          <option>Colorful</option>
        </select>
      </label>

      <br /><br />

      <label>
        Layout:
        <select value={layout} onChange={(e) => setLayout(e.target.value)}>
          <option>Centered</option>
          <option>Sidebar</option>
          <option>Full-width</option>
        </select>
      </label>

      <br /><br />

      <div>
        Features:
        {featureOptions.map((feature) => (
          <label key={feature} style={{ marginLeft: 10 }}>
            <input
              type="checkbox"
              checked={features.includes(feature)}
              onChange={() => handleFeatureToggle(feature)}
            />
            {feature}
          </label>
        ))}
      </div>

      <br />

      <label>
        Custom Prompt:
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          rows={4}
          style={{ width: "100%" }}
        />
      </label>

      <br />

      <button onClick={handleGenerate} disabled={loading}>
        {loading ? "Generating..." : "Generate Website"}
      </button>

      <hr />

      {html && (
        <div>
          <h2>Generated Website:</h2>
          <iframe
            srcDoc={html}
            title="Preview"
            style={{ width: "100%", height: "600px", border: "1px solid #ccc" }}
          />
        </div>
      )}
    </div>
  );
}

export default App;
