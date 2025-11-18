# Breaking Up Git Work: A Comprehensive Recap

## The Challenge

We had a single feature branch (`feature/blob-visualization-spike`) with 2 commits containing intermingled work across multiple concerns:
- Specification document (WEEK9-PLAN.md)
- Package installation (D3 + types)
- Basic visualization implementation
- Enhanced label improvements

**Goal**: Split this into 3 separate PRs, each showing only its own work, while maintaining proper git history and sequential merge order.

## Key Planning Decisions

### 1. Sequential PRs with Localized Commits

**Decision**: Each PR should show only 1 commit, not cumulative history.

**Why it matters**:
- Makes code review focused and manageable
- Each PR represents a discrete unit of work
- Clear separation of concerns

**How we achieved it**:
- PRs target their predecessor branch, not `main`
- PR #1 → `main`
- PR #2 → `feature/blob-viz-setup`
- PR #3 → `feature/blob-viz-rendering`

This way, GitHub compares against the immediate parent, showing only the delta.

### 2. Build Branches First, Then Create PRs

**Initial confusion**: Should we reset branches and lose commits, or build new branches from scratch?

**Solution**: Build all three branches with proper commits BEFORE creating PRs.

**Why this worked**:
```bash
# We never lost work by resetting
# Instead, we selectively checked out files from existing commits
git checkout <commit-hash> -- <specific-file>
```

This let us "reconstruct" each commit's state without destroying the original.

### 3. Understanding Git's Branching Model

**Critical insight**: Branches are just pointers to commits, not containers.

When we did:
```bash
git checkout -b feature/blob-viz-rendering  # from setup branch
```

This created a new branch pointer at the same commit as `setup`, but the uncommitted working directory came along for the ride. This is KEY to understanding why our strategy worked.

## Git Quirks & Gotchas

### Quirk #1: Checkout Specific Files from Commits

```bash
git checkout 1446181 -- src/components/BlobVisualization.tsx
```

**What this does**:
- Does NOT change branches or move HEAD
- Copies that file as it existed in commit `1446181`
- Stages it immediately in your current branch

**Why it's powerful**: Lets you "cherry-pick" individual files across commits without cherry-picking entire commits.

### Quirk #2: PRs Compare Commits, Not Branch Pointers

**Scenario**: After merging PR #1, the `feature/blob-viz-setup` branch still exists pointing at the same commit.

**Question**: Does PR #2 break because its base branch moved?

**Answer**: No! GitHub PRs compare:
- The commit that the base branch pointed to *when the PR was created*
- The current head commit

The branch pointer moving doesn't affect already-created PRs.

### Quirk #3: Sequential Merges Require Base Updates

**The Problem**:
After merging PR #1 to `main`, PR #2 still targets `feature/blob-viz-setup`. If we merge it as-is, it merges INTO the setup branch, not main.

**The Solution**:
Before merging PR #2, change its base from `feature/blob-viz-setup` to `main`. GitHub will recalculate the diff, showing only the new commit.

**Why this matters**: Ensures all PRs ultimately merge to `main` while maintaining clean, single-commit PRs.

## The Execution Strategy

### Step 1: Build All Branches First

```bash
# From main, create setup branch
git checkout main
git checkout -b feature/blob-viz-setup
git checkout feature/blob-visualization-spike -- WEEK9-PLAN.md package.json package-lock.json
git commit -m "Setup"
git push -u origin feature/blob-viz-setup

# From setup, create rendering branch
git checkout -b feature/blob-viz-rendering
git checkout 1446181 -- src/components/BlobVisualization.tsx src/utils/astToHierarchy.ts src/App.tsx
git commit -m "Rendering"
git push -u origin feature/blob-viz-rendering

# From rendering, create labels branch
git checkout -b feature/blob-viz-labels
git checkout 375b10a -- src/components/BlobVisualization.tsx
git commit -m "Labels"
git push -u origin feature/blob-viz-labels
```

**Key insight**: Each `git checkout -b` inherits the parent's commits, creating a chain.

### Step 2: Create PRs with Proper Targets

- PR #1: `feature/blob-viz-setup` → `main` (shows 1 commit)
- PR #2: `feature/blob-viz-rendering` → `feature/blob-viz-setup` (shows 1 commit)
- PR #3: `feature/blob-viz-labels` → `feature/blob-viz-rendering` (shows 1 commit)

### Step 3: Sequential Merging with Base Updates

```
1. Merge PR #1 to main
   └─ main now has: [setup]

2. Update PR #2 base: feature/blob-viz-setup → main
   └─ PR #2 now shows just [rendering] (setup already in main)

3. Merge PR #2 to main
   └─ main now has: [setup, rendering]

4. Update PR #3 base: feature/blob-viz-rendering → main
   └─ PR #3 now shows just [labels] (setup + rendering already in main)

5. Merge PR #3 to main
   └─ main now has: [setup, rendering, labels]
```

## Tangible Lessons

### Lesson 1: Git Branches Are Pointers, Not Containers

**What it means**: A branch is just a named reference to a commit. The commits themselves exist independently in Git's object database.

**Practical impact**: You can create multiple branches pointing at the same commit, and they'll diverge only when you make new commits.

### Lesson 2: Checkout Files, Not Just Commits

Most developers know:
```bash
git checkout <branch>  # Switch branches
git checkout <commit>  # Detached HEAD state
```

But this is powerful:
```bash
git checkout <commit> -- <file>  # Copy file from any commit to working directory
```

Use this to "reconstruct" states without complex rebases.

### Lesson 3: PR Base Branches Are Mutable

**Common misconception**: Once you create a PR with a base branch, it's locked.

**Reality**: You can change the base branch on GitHub at any time. The PR will recalculate the diff.

**When to use this**: Sequential PRs where you want clean single-commit reviews but eventual merge to main.

### Lesson 4: Plan Git Work Like Code Architecture

**The process we followed**:
1. **Understand the current state** (what commits exist, what's in each)
2. **Define the desired end state** (3 PRs, each with 1 commit)
3. **Map the transformation** (which files go in which commit)
4. **Execute methodically** (build branches, create PRs, merge sequentially)

**Why this matters**: Git work benefits from the same planning rigor as code design. Rushing in causes confusion and mistakes.

### Lesson 5: Communicate Intent at Each Step

Throughout our execution, we stated:
- **INTENT**: What we're trying to achieve
- **RESULT**: What state we expect after

This clarity prevented errors and made the process auditable.

## Common Pitfalls Avoided

### ❌ Pitfall: Resetting and Losing Work

**Temptation**: `git reset --hard` to clean up, then rebuild.

**Problem**: Easy to lose uncommitted work or orphan commits.

**What we did instead**: Built new branches from existing commits using selective checkouts.

### ❌ Pitfall: Cherry-Picking Entire Commits

**Temptation**: `git cherry-pick 1446181` to copy the first commit.

**Problem**: Cherry-pick copies the ENTIRE commit, including files we wanted in later PRs.

**What we did instead**: `git checkout 1446181 -- <specific-files>` to selectively copy.

### ❌ Pitfall: Forgetting to Update PR Bases

**Temptation**: Create all PRs targeting their chain, then merge them as-is.

**Problem**: PR #2 would merge to `feature/blob-viz-setup`, not `main`.

**What we did instead**: Documented the need to update bases before merging.

## The Big Picture

**What we accomplished**:
- Took messy, intermingled commits
- Organized into clean, reviewable PRs
- Maintained proper git history
- Achieved sequential merge order
- Each PR showed only its specific work

**The meta-lesson**: Good git hygiene isn't about memorizing commands. It's about:
1. Understanding git's model (commits, branches, pointers)
2. Planning transformations deliberately
3. Executing methodically with clear intent
4. Communicating state at each step

This approach works for any scenario where you need to reorganize git history: splitting features, extracting hotfixes, or reorganizing messy branches.
