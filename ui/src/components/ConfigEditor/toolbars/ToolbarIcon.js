import React from 'react';
import classnames from 'classnames';

export default ({ label, icon, active, onToggle, action }) => (
  <li
    className={"toolbar-icon " + classnames({ active })}
    onMouseDown={(e) => {
      e.preventDefault();
      onToggle(action)
    }}
  >
    {label ? label : <i className={icon}></i>}
  </li>
);