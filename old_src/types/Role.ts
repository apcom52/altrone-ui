/**
 * Role shows the importance of a component, how big of an effect that component has, and what will happen if the user interacts with it. You can set role via role prop.
 * There four different roles of the components:
 *
 * **Default role**. This role indicates that the component does not fulfill any important role. An example of using this role is a button that performs a simple action that doesn't do serious things (like "Copy" or "Cancel")
 *
 * **Primary role**. This role is used to highlight emphasized actions on the page. Do not use multiple components with the Primary role in the same place. An example of using this role is the "Apply" button in a modal window. This role indicates that when you click this button, you are ready to move to the next step.
 *
 * **Success role**. This role is used to save data or to emphasize that an action will result in a successful completion. An example of using this role is the "Save" button at the bottom of a form.
 *
 * **Danger role**. This role indicates that an action has irreversible or dangerous consequences. Often this role is used to emphasize that the user is taking a dangerous action. Sometimes some components allow you to do certain internal components with this role (without allowing you to select other roles, such as ContextAction in ContextMenu). An example of using this role is the "Delete" button in the context menu.
 *
 * @since 1.0
 */
export enum Role {
  default = 'default',
  primary = 'primary',
  success = 'success',
  warning = 'warning',
  danger = 'danger'
}
