export default function Home() {
  return (
    <main style={{ minHeight: '100vh', padding: '2rem' }}>
      <h1 style={{ fontSize: '2.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>
        Anamaría Espinoza
      </h1>
      <p style={{ fontSize: '1.25rem', color: '#666', marginBottom: '2rem' }}>
        Learning Experience & Community Education Lead
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <p>Welcome to my portfolio.</p>
        <p>The site is being built. Soon you'll have access to:</p>
        <ul style={{ marginLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <li>Project portfolio</li>
          <li>Professional CV</li>
          <li>NarrLab information</li>
          <li>Contact form</li>
        </ul>
      </div>
    </main>
  );
}
