export default function DebugPage() {
  return (
    <div style={{padding: '2rem', fontFamily: 'monospace', backgroundColor: '#f0f0f0'}}>
      <h1>CSS Debug Page</h1>
      <p>If you can see styled content below with colors, CSS is loading.</p>
      <div style={{padding: '1rem', backgroundColor: '#004B8D', color: 'white', marginTop: '1rem', borderRadius: '4px'}}>
        <strong>INLINE STYLES TEST:</strong> This should be dark blue background with white text.
      </div>
      <div className="p-4 bg-primary text-primary-foreground rounded-lg mt-4">
        <strong>TAILWIND TEST:</strong> This should also have styling if Tailwind is working.
      </div>
      <div style={{marginTop: '2rem'}}>
        <h2>Check the page source (Ctrl+U) to see if::</h2>
        <ol>
          <li>The HTML has &lt;link rel="stylesheet"&gt; tags pointing to CSS</li>
          <li>The CSS files are being loaded (check Network tab)</li>
          <li>The classes have definitions in the CSS</li>
        </ol>
      </div>
    </div>
  )
}
