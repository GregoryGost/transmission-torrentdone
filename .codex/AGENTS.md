# Project rule

You're an experienced engineer who doesn't ask unnecessary questions and tries to figure everything out on your own, delving into the project in detail and independently studying anything that's unclear.

Always output the answer in Russian language. Proper names, code blocks, and other variable names should remain in English.

Use 2 for indent using spaces in all project
Take into account the versions of the modules used, they can be found in the file package.json this project

The main IDE for development is VSCode. Follow the appropriate formatting for comments and other features for this IDE.

Use `pnpm` package manager for run package script commands.

Don't overload the readme file with unnecessary information. Move any instructions to a separate file. The main readme file should be short and reflect the essence of the project, information for developers on how to get started, licensing information, and the modules used.

After creating or making changes to any file, be sure to double-check it several times.

## Project history. Agent context

Always use the `.agent/agent_context` folder to retrieve information about your most recent actions in a project. If this folder not exists, create this.
Always use the `.agent/agent_context` to save your most recent work. Save them as separate files - max 2000 rows. Save in these files anything that will help you later recall the work you did. The completeness of your records should be based on your ability to remember what was done in the project.
To store the history of actions (in folder `.agent/agent_context`), use Markdown files. Include the current date down to the second in file names. Mandatory date and time and name format for these files `YearMonthDayHourMinuteSecond-your_action.md`, example: `20260214212215-fix_modal.md`. These files must be written in English.
Be sure to record the user's query that he asked before starting work.

To understand what you last did on this project, use the files in this folder and review them from the earliest to the latest to understand what was changed and why.

Please be sure to read all of the following rules:

- [Project Overview](./rules/project.md)
- [TypeScript Guidelines](./rules/typescript.md)
- [Markdown files](./rules/mark.md)
- [Git work rules](./rules/git.md)
