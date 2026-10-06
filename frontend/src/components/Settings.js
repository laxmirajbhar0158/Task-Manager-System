
import React, { useEffect, useState } from 'react';
import { getSettings, saveSettings } from '../api';
export default function Settings() {
  const [theme, setTheme] = useState('corporate-blue');
  const [saved, setSaved] = useState(false);
  useEffect(() => { (async () => { try { const res = await getSettings(); setTheme(res.settings.theme || 'corporate-blue'); } catch {} })(); }, []);
  async function save() { try { await saveSettings({ theme }); setSaved(true); setTimeout(()=>setSaved(false), 1500); } catch (e) { alert('Failed to save'); } }
  return (
    <div className="card">
      <h4>Settings</h4>
      <label>Theme</label>
      <select value={theme} onChange={e=>setTheme(e.target.value)}>
        <option value="corporate-blue">Corporate Blue</option>
        <option value="dark">Dark</option>
        <option value="light">Light</option>
      </select>
      <div style={{marginTop:10}}>
        <button className="btn" onClick={save}>Save settings</button>
        {saved && <span className="saved">Saved ✓</span>}
      </div>
    </div>
  );
}
