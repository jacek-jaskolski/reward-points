import { apiService } from 'services'

const killServer = () => {
  apiService.kill()
  window.location.reload()
}

export const DemoButton = () => (
  <div>
    <button style={{ margin: '20px 0' }} onClick={() => killServer()}>
      Kill server and retry to see error handling
    </button>
  </div>
)
