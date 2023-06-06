import './panel.css'

export const Panel = ({ title, children }) => (
  <div className="panel">
    <div className="panel-header">
      <h1>{title}</h1>
    </div>
    {children}
  </div>
)
