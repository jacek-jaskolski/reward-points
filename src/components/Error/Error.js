import './error.css'

export const Error = ({ title, body }) => (
  <div className="error" data-testid="error">
    <div className="error-sing">
      <span className="warning-sign-icon"></span>
    </div>
    <h3>{title}</h3>
    <p>{body}</p>
  </div>
)
