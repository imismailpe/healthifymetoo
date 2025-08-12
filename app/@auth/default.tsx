//Consider the following UI pattern, where a user can open a login modal from a layout using client-side navigation, or access a separate /login page:
//To implement this pattern, start by creating a /login route that renders your main login page.
//Then, inside the @auth slot, add default.js file that returns null. This ensures that the modal is not rendered when it's not active

export default function Default() {
  return null;
}
