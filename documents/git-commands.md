# Most Used Git Commands

This document provides a comprehensive list of commonly used Git commands, along with examples and visual diagrams.

## Basic Configuration

* **Configure User Name:**

    ```bash
    git config --global user.name "Your Name"
    ```

* **Configure User Email:**

    ```bash
    git config --global user.email "[email address removed]"
    ```

## Repository Initialization and Cloning

* **Initialize a New Repository:**

    ```bash
    git init
    ```

    ```
    (Empty Directory) --> git init --> (.git Directory Created)
    ```

* **Clone an Existing Repository:**

    ```bash
    git clone <repository_url>
    ```

    Example:

    ```bash
    git clone [https://github.com/yourusername/your-repo.git](https://github.com/yourusername/your-repo.git)
    ```

    ```
    (Remote Repository) --> git clone --> (Local Repository)
    ```

## Staging and Committing Changes

* **Check Repository Status:**

    ```bash
    git status
    ```

    ```
    (Working Directory) --> git status --> (Status Report)
    ```

* **Add Files to Staging Area:**

    ```bash
    git add <file>
    git add . # Add all files
    ```

    ```
    (Working Directory) --> git add --> (Staging Area)
    ```

* **Commit Changes:**

    ```bash
    git commit -m "Commit message"
    ```

    ```
    (Staging Area) --> git commit --> (Local Repository History)
    ```

## Branching and Merging

* **Create a New Branch:**

    ```bash
    git branch <branch_name>
    ```

    ```
    (Main Branch) --> git branch new-feature --> (New Branch Created)
    ```

* **Switch to a Branch:**

    ```bash
    git checkout <branch_name>
    ```

    Or, create and switch in one command:

    ```bash
    git checkout -b <branch_name>
    ```

    ```
    (Current Branch) --> git checkout --> (Target Branch)
    ```

* **List Branches:**

    ```bash
    git branch
    ```

* **Merge Branches:**

    ```bash
    git checkout main
    git merge <branch_name>
    ```

    ```
    (Main Branch) + (Feature Branch) --> git merge --> (Merged Main Branch)
    ```

* **Delete a Branch:**

    ```bash
    git branch -d <branch_name> #delete only if merged
    git branch -D <branch_name> #force delete even if not merged
    ```

## Remote Repositories

* **Add a Remote Repository:**

    ```bash
    git remote add origin <repository_url>
    ```

    ```
    (Local Repository) --> git remote add origin --> (Remote Repository Connection)
    ```

* **Push Changes to Remote:**

    ```bash
    git push origin <branch_name>
    ```

    ```
    (Local Repository) --> git push origin main --> (Remote Repository)
    ```

* **Pull Changes from Remote:**

    ```bash
    git pull origin <branch_name>
    ```

    ```
    (Remote Repository) --> git pull origin main --> (Local Repository)
    ```

* **Fetch Changes from Remote:**

    ```bash
    git fetch origin
    ```

    ```
    (Remote Repository) --> git fetch origin --> (Local Remote Tracking Branches)
    ```

## Viewing History

* **View Commit History:**

    ```bash
    git log
    git log --oneline
    git log --graph
    ```

    ```
    (Repository History) --> git log --> (Commit Details)
    ```

* **View Changes in a Commit:**

    ```bash
    git show <commit_hash>
    ```

## Undoing Changes

* **Undo Changes in Working Directory (before staging):**

    ```bash
    git checkout -- <file>
    ```

* **Remove File from Staging Area:**

    ```bash
    git reset HEAD <file>
    ```

* **Revert a Commit:**

    ```bash
    git revert <commit_hash>
    ```

    ```
    (Repository History) --> git revert --> (New Commit Reversing Changes)
    ```

* **Reset to a Previous Commit (Use with caution):**

    ```bash
    git reset --hard <commit_hash>
    ```

    ```
    (Repository History) --> git reset --hard --> (Repository Rewritten)
    ```

## Stashing Changes

* **Stash Changes:**

    ```bash
    git stash
    ```

    ```
    (Working Directory Changes) --> git stash --> (Stash Stack)
    ```

* **List Stashes:**

    ```bash
    git stash list
    ```

* **Apply a Stash:**

    ```bash
    git stash apply
    ```

* **Pop a Stash (Apply and Remove):**

    ```bash
    git stash pop
    ```

* **Clear All Stashes:**

    ```bash
    git stash clear
    ```

These commands should cover the majority of your Git workflows. Remember to practice these commands to become proficient with Git.