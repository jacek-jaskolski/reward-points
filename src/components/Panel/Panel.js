import './panel.css'

export const Panel = ({ title, children }) => (
  <div className="panel">
    <div className="panel-header">
      <h2>{title}</h2>
    </div>
    <div className="panel-body">{children}</div>
  </div>
)
