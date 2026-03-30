# 193-github-login-approval-flow-question

- Goal: Confirm whether the GitHub approval step connects to the server and identify which server handles the flow.
- Findings: The sign-in button redirects the browser to the Gateway/Auth Service login URL; GitHub callback handling stays on the Gateway side.
- Findings: The frontend callback page only exchanges `ticket -> /auth/exchange -> /auth/me` against the Gateway domain.
- Reference: `README.md` auth setup already states that browser requests only the Gateway domain and GitHub callback is handled by Gateway/Auth Service.
