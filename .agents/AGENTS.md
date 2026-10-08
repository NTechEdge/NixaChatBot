# Project Rules & Guidelines for Agents

## 1. Incremental Workflow (One Task at a Time)

- **Step-by-Step Execution**: Always work on one specific task or feature at a time. Complete and verify it thoroughly before moving to the next.
- **No Over-Engineering**: Keep implementations minimal, robust, and directly aligned with the current task requirements.
- **Verification**: Run tests or lint/build checks to ensure changes are error-free before concluding a task.

---

## 2. Professional & Meaningful Commit Guidelines

- **Atomic Commits**: Make small, self-contained commits for each completed unit of work. Never bundle multiple unrelated features or fixes into a single commit.
- **Conventional Commits Format**: Follow standard commit conventions:
  - `feat(<scope>): <short description>` — New feature or functionality
  - `fix(<scope>): <short description>` — Bug fix
  - `refactor(<scope>): <short description>` — Code restructure without changing behavior
  - `style(<scope>): <short description>` — UI/styling updates, formatting
  - `docs(<scope>): <short description>` — Documentation changes
  - `test(<scope>): <short description>` — Adding or updating tests
  - `chore(<scope>): <short description>` — Build configs, dependencies, tool setup
- **Commit Message Quality**:
  - Write messages in clear, professional English.
  - Use imperative mood in the summary line (e.g., `feat(chat): add auto-scroll to bottom`, not `added auto-scroll`).
  - Explain the *what* and *why* clearly if a commit body is necessary.
  - Avoid vague messages like `update`, `fixed issue`, or `wip`.

---

## 3. Communication & Transparency

- Confirm task completion with a brief summary before requesting approval or picking up the next item.
- Highlight any key decisions, edge cases, or potential impacts clearly.
