# Project Implementation Plan: Claude-Inspired Chatbot Interface (UI Focus)

## 1. Project Overview & Scope

A pixel-refined, high-fidelity AI Chatbot UI inspired directly by Claude's web interface. 
> **Scope Focus**: Dedicated strictly to **Frontend UI Design & Presentation**. No complex backend integrations or unnecessary backend mess. All interactive client states (sidebar collapse, active chat selection, mode toggles, model selector, modals) are managed centrally using **Redux Toolkit**.

### Core Stack

- **Framework**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS v4 (`@tailwindcss/vite`) + Custom `black/80` dark tokens
- **Icons**: `lucide-react`
- **State Management**: Redux Toolkit (`@reduxjs/toolkit`) + `react-redux`

---

## 2. Clean Architecture & Directory Structure

To keep the codebase maintainable and completely unbloated, we enforce strict component and state modularity:

```text
src/
├── assets/                  # Brand assets / svgs
├── components/
│   ├── ui/                  # Reusable, stateless UI primitives (Tailwind + Lucide)
│   │   ├── Button/          # Primary, ghost, icon, outline variants
│   │   ├── Input/           # Clean input components
│   │   ├── Textarea/        # Auto-resizing prompt textarea
│   │   ├── ActionPill/      # 'Chat' / 'Cowork' mode pills & model badges
│   │   ├── Badge/           # Status pills ('Free plan', 'Upgrade', 'Medium')
│   │   ├── Avatar/          # User avatar & Claude star mark
│   │   └── Dropdown/        # Model selection dropdown menu
│   ├── layout/              # Application layout shell
│   │   ├── Sidebar/         # Collapsible left navigation drawer
│   │   │   ├── SidebarNav.tsx      # Projects, Artifacts, Code, Customize
│   │   │   ├── ChatHistoryList.tsx # Grouped chats & tasks list with bullets
│   │   │   └── UserFooter.tsx      # User profile, tier, and settings menu
│   │   ├── Header/          # Minimal top bar (Plan pill & profile avatar)
│   │   └── AppLayout.tsx    # Responsive frame connecting Sidebar & Main Area
│   └── chat/                # Center workspace UI components
│       ├── HeroGreeting.tsx # Signature star icon + serif greeting ("Afternoon, Eistiak")
│       └── ChatInputBox.tsx # Floating prompt container with full action bar
├── store/                   # Centralized Redux Toolkit State
│   ├── index.ts             # Redux Store configuration & typed hooks (`useAppDispatch`, `useAppSelector`)
│   └── slices/
│       ├── uiSlice.ts       # Sidebar state (collapsed/expanded), active modal, mobile drawer
│       └── chatUiSlice.ts   # Active mode ('chat' | 'cowork'), selected model, active chat ID, prompt input text
├── types/                   # TypeScript interfaces and contracts
│   ├── ui.ts                # Navigation items, theme types, button variants
│   └── chat.ts              # Chat metadata, model options, history item types
├── styles/                  # Global CSS tokens and styling
│   └── index.css            # Tailwind CSS @import and black/80 theme custom utilities
└── App.tsx                  # Root container wrapping Redux Provider & Layout
```

---

## 3. Theme & Visual Aesthetics (`black/80` Dark Aesthetic)

### 3.1 Color Palette

- **Background Root**: `bg-[#0c0d0e]` (Deep onyx black)
- **Surface / Card (black/80)**: `bg-black/80` or `bg-[#141517]/80 backdrop-blur-md`
- **Sidebar Surface**: `bg-[#141517]` with `border-r border-white/5`
- **Prompt Input Box**: `bg-[#1b1c20]/90` with `border border-white/10 shadow-2xl rounded-2xl`
- **Subtle Borders**: `border-white/10` and `border-white/5`
- **Typography Colors**:
  - Primary: `text-zinc-100` (`#f4f4f5`)
  - Secondary / Muted: `text-zinc-400` (`#a1a1aa`)
  - Subtle / Bullets: `text-zinc-600` (`#52525b`)
  - Brand Accent: `text-[#d97706]` / `text-[#e07a5f]` (Claude terracotta star mark)
- **Hover & Interaction**: `hover:bg-white/5 transition-colors duration-150`

### 3.2 Typography

- **Hero Title**: Serif font styling for an elegant editorial look (*"Afternoon, Eistiak"*).
- **Interface UI**: Clean, high-legibility sans-serif (`Inter`, system fonts).

---

## 4. Redux State Management Specifications

### `uiSlice`

```typescript
interface UIState {
  isSidebarOpen: boolean;
  activeNavTab: string; // 'new' | 'projects' | 'artifacts' | 'code' | 'customize'
}
```

- Controls sidebar collapsing on desktop and drawer toggle on mobile.

### `chatUiSlice`

```typescript
interface ChatUIState {
  activeMode: 'chat' | 'cowork';
  selectedModel: string; // e.g., 'Sonnet 3.5' | 'Sonnet 5.5 Medium'
  selectedChatId: string | null;
  promptText: string;
}
```

- Controls prompt input text, active mode pill toggling, model selector dropdown, and highlighting selected chat from the history sidebar.

---

## 5. Reusable UI Components Plan (Tailwind + Lucide)

| Component | Variants & Props | Lucide Icons Used |
| :--- | :--- | :--- |
| `Button` | `variant: 'primary' \| 'secondary' \| 'ghost' \| 'outline'`, `size: 'sm' \| 'md' \| 'lg'` | Any slot |
| `IconButton` | `icon: LucideIcon`, `tooltip?: string`, `active?: boolean` | `Mic`, `Volume2`, `ArrowUp`, `Plus`, `Search`, `PanelLeft` |
| `ActionPill` | `active: boolean`, `icon?: LucideIcon`, `label: string`, `onClick: () => void` | `Sparkles`, `MessageSquare`, `Briefcase` |
| `Badge` | `label: string`, `variant: 'free' \| 'pro' \| 'model'` | `Sparkles` |
| `ChatTextarea` | `value`, `onChange`, `placeholder`, `minRows` | — |
| `SidebarItem` | `icon: LucideIcon`, `label: string`, `active?: boolean`, `badge?: string` | `Plus`, `Folder`, `Boxes`, `Code2`, `Sliders` |

---

## 6. Incremental Implementation Phases

Following `.agents/AGENTS.md` (one task at a time, verify, atomic commit):

### Phase 1: Setup Foundation & Redux Store

- [ ] Configure Tailwind CSS v4 in `src/index.css` with `black/80` theme background and variables.
- [ ] Setup Redux Toolkit store (`store/index.ts`, `store/slices/uiSlice.ts`, `store/slices/chatUiSlice.ts`).
- [ ] Wrap application with `<Provider store={store}>` and verify typing.
- **Verification**: Ensure app builds with zero errors and Redux hooks are available.

### Phase 2: Core Atomic UI Primitives

- [ ] Create `Button` and `IconButton` with Tailwind styles and Lucide icon support.
- [ ] Create `ActionPill` (for 'Chat', 'Cowork' and model badges).
- [ ] Create `Badge` and `Avatar`.
- [ ] Create `ChatTextarea` with auto-resizing height behavior.
- **Verification**: Test individual components with different props and verify hover/focus states.

### Phase 3: Claude-Inspired Sidebar & Header Layout Shell

- [ ] Build `Sidebar` containing:
  - "+ New" action button
  - Navigation links (`Projects`, `Artifacts`, `Code`, `Customize`)
  - "Chats and tasks" section with search icon and mock chat history items with bullet points
  - Footer user profile (`Eistiak Free`) with settings icon
- [ ] Build minimal top `Header` ("Free plan • Upgrade" pill and avatar).
- [ ] Connect sidebar toggle state to Redux (`isSidebarOpen`).
- **Verification**: Test sidebar collapse/expand transitions and responsive drawer behavior.

### Phase 4: Center Hero & Floating Prompt Box

- [ ] Build `HeroGreeting` component with the signature star icon and dynamic greeting (*"Afternoon, Eistiak"*).
- [ ] Build `ChatInputBox` matching the Claude reference UI:
  - Textarea ("How can I help you today?")
  - Action row with:
    - Attachment button (`+`)
    - Mode toggle pills (`Chat`, `Cowork`) connected to Redux `activeMode`
    - Model selector pill (`Sonnet 5.5 Medium`) with dropdown trigger
    - Mic / Audio icon buttons
    - Send button
- **Verification**: Test mode pill switching, typing in prompt box, and visual fidelity against the screenshot.

### Phase 5: UI Polish, Hover Micro-interactions & Final Review

- [ ] Add smooth transitions, custom scrollbar styling for sidebar history, and subtle borders.
- [ ] Verify accessibility, responsive mobile/desktop breakpoints.
- [ ] Run `pnpm build` and `pnpm lint` to ensure zero warnings or errors.

---

## 7. Development Rules & Code Hygiene

1. **Strictly UI & Client State**: Keep focus purely on visual excellence, structure, and Redux UI state. No unfinished mock backends.
2. **Modular Code**: Every component in its own file; keep code clean and self-contained (< 150 lines per file).
3. **Redux Best Practices**: Use typed hooks (`useAppDispatch`, `useAppSelector`).
4. **Atomic Commits**: Follow conventional commits (`feat(ui)`, `style(layout)`, `chore(store)`).
