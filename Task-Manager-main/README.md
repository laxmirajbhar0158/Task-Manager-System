# Advanced Task Tracker

A modern, responsive **Task Management Web App** built with React and Tailwind CSS. It allows you to create, organize, search, filter, sort, and manage tasks with priorities and due dates.

The application uses **browser localStorage**, so your tasks remain available after refreshing the page.

## 1. Features

### 1.1 Add Tasks

* Task description
* Category
* Priority
* Due date

### 1.2 Task Management

* Mark tasks as completed
* Delete tasks
* Clear all completed tasks

### 1.3 Search

* Search tasks by their description

### 1.4 Filtering

* All tasks
* Active tasks
* Completed tasks

### 1.5 Progress Tracking

* Displays completed vs. total tasks
* Dynamic completion percentage
* Visual progress bar

### 1.6 Sorting

* Sort by due date
* Sort by priority
* Sort by creation date

### 1.7 Due-Date Status

* Displays tasks due today
* Identifies overdue tasks

### 1.8 Persistent Storage

* Tasks are automatically saved to `localStorage`
* Data remains after browser refreshes

### 1.9 Responsive UI

* Works across desktop and mobile screen sizes

### 1.10 Modern Interface

* Dark glassmorphism-inspired design
* Gradient styling
* Interactive buttons and controls
* Accessible labels and ARIA attributes

---

## 2. Technologies Used

| Technology               | Purpose                              |
| ------------------------ | ------------------------------------ |
| **React 18**             | User interface and application logic |
| **Tailwind CSS**         | Utility-based styling                |
| **JavaScript (ES6+)**    | Application functionality            |
| **HTML5**                | Application structure                |
| **CSS3**                 | Custom visual styling                |
| **Babel Standalone**     | JSX transformation                   |
| **Browser localStorage** | Persistent task storage              |
| **GitHub Actions**       | Automated deployment                 |
| **GitHub Pages**         | Hosting                              |

---

## 3. Project Structure

```text
Task-Manager/
│
├── .github/
│   └── workflows/
│       ├── index1.html
│       └── static.yml
│
└── README.md
```

> **Recommended:** Move `index1.html` to the repository root and rename it to `index.html`. This makes the project easier to serve directly through GitHub Pages.

Recommended structure:

```text
Task-Manager/
│
├── .github/
│   └── workflows/
│       └── static.yml
│
├── index.html
│
└── README.md
```

---

## 4. Getting Started

### 4.1 Clone the Repository

```bash
git clone https://github.com/YOUR-USERNAME/Task-Manager.git
```

### 4.2 Navigate to the Project

```bash
cd Task-Manager
```

### 4.3 Open the Application

Because this project uses React and Tailwind through CDN links, no npm installation is required.

You can open:

```text
index.html
```

directly in a modern web browser.

For local development, you can also use a simple HTTP server.

For example, with Python:

```bash
python -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

---

## 5. How to Use

### 5.1 Add a Task

1. Enter a task description.
2. Enter an optional category.
3. Select a priority:

   * Low
   * Medium
   * High
4. Select an optional due date.
5. Click **Add Task**.

### 5.2 Manage Tasks

Use the circular button beside a task to mark it as completed.

Use the **X** button to delete a task.

### 5.3 Search Tasks

Use the search box to quickly find tasks by their description.

### 5.4 Filter Tasks

Choose between:

1. All
2. Active
3. Completed

### 5.5 Sort Tasks

Tasks can be sorted by:

1. Due Date
2. Priority
3. Creation Date

---

## 6. Data Storage

Tasks are stored in the browser using:

```javascript
localStorage
```

The application automatically saves tasks whenever the task list changes.

This means the data is stored locally in the user's browser rather than in a remote database.

### Important

Clearing browser site data or localStorage can remove saved tasks.

---

## 7. GitHub Pages Deployment

The repository includes a GitHub Actions workflow:

```text
.github/workflows/static.yml
```

The workflow automatically deploys the repository to **GitHub Pages** whenever changes are pushed to the `main` branch.

### 7.1 Enable GitHub Pages

1. Push the project to GitHub.
2. Open the repository on GitHub.
3. Go to **Settings → Pages**.
4. Under the build/deployment section, select **GitHub Actions**.
5. Push changes to the `main` branch.
6. GitHub Actions will build and deploy the static site.

Your site will generally be available at:

```text
https://YOUR-USERNAME.github.io/Task-Manager/
```

---

## 8. Deployment Workflow

The included GitHub Actions workflow performs these steps:

```text
Push to main
     ↓
Checkout repository
     ↓
Configure GitHub Pages
     ↓
Upload repository as Pages artifact
     ↓
Deploy to GitHub Pages
```

---

## 9. Future Improvements

Possible improvements for future versions:

1. Edit existing tasks
2. Drag-and-drop task ordering
3. Dark/light theme switcher
4. Task descriptions/notes
5. Recurring tasks
6. Browser notifications
7. Calendar integration
8. User authentication
9. Cloud database synchronization
10. Export/import tasks
11. Task statistics and charts
12. PWA/offline support

---

## 10. Contributing

Contributions are welcome.

### 10.1 Fork the Repository

Fork this repository on GitHub.

### 10.2 Create a New Branch

```bash
git checkout -b feature/new-feature
```

### 10.3 Make Your Changes

Implement your feature or fix.

### 10.4 Commit Your Changes

```bash
git commit -m "Add new feature"
```

### 10.5 Push the Branch

```bash
git push origin feature/new-feature
```

### 10.6 Open a Pull Request

Create a Pull Request on GitHub describing your changes.

---

## 11. License

This project is available for personal and educational use.

If you intend to publish or distribute the project, add an appropriate open-source license such as the MIT License.

---

## 12. Author

**Your Name**

GitHub: `https://github.com/YOUR-USERNAME`

---

If you find this project useful, consider giving the repository a star.
