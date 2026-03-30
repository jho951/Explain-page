# 194-header-logout-only-remove-go-home

- Goal: Replace the authenticated header action set with a logout-only control and remove the authenticated "Go Home" button.
- Changes: Removed `onStart` from header auth action props and deleted the primary home/start button from `HeaderAuthActions`.
- Changes: Updated desktop and mobile header callers to keep only login/logout behavior.
- Notes: Preserved the existing login redirect to the Gateway sign-in flow.
