import React from 'react'
import SidebarBtnElement from './SidebarBtnElement'
import { FormElements } from './FormElements'

function FormElementsSidebar() {
  return (
    <div>
        <SidebarBtnElement formElement={FormElements.TextField} />
    </div>
  )
}

export default FormElementsSidebar