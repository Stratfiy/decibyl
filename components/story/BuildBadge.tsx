/* The story previously rendered a temporary viewport/build diagnostic here.
   ScrollStory still imports this component on the handoff branch, so keep the
   tiny no-op export until that import is removed in a later refactor. Shipping
   no UI is intentional. */
export function BuildBadge() {
  return null;
}
