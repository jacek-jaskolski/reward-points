const killServer = () => {
  fetch('http://localhost:3001/kill')
  window.location.reload()
}

export const DemoButton = () => (
  <button style={{ marginTop: '20px' }} onClick={() => killServer()}>
    Kill server and retry to see error handling
  </button>
)
