# Planner Peak
## Overview
PlannerPeak is a personal planner application designed to integrate with school-provided learning management systems. It assists students in managing school deadlines and assignments, supports personal task management, and employs machine learning for scheduling recommendations. The platform also provides optional parental access for schedule oversight, promoting a community-driven approach to educational organization.

## Technology Stack
### Backend
Language: Python
Framework: Django REST Framework
Hosting: Heroku
Database: SQL
### Frontend
Language: JavaScript
Frameworks/Libraries: React Native, React Redux
## Getting Started
1. Fork the Repository: Fork the project repository to your GitHub account.
2. Clone the Repository: Clone the forked repository to your local machine using git clone <repository-url>.
3. Backend Setup:
  Navigate to the backend directory: cd backend.
  Install backend dependencies: Run pip install -r requirements.txt.
4. Frontend Setup:
  Navigate to the frontend directory: cd frontend.
  Install frontend dependencies: Run yarn install.
5. Configure the Database:
  Open the Django settings file: Edit backend/settings.py.
  Change the database configuration to SQLite3 by updating the DATABASES setting.
6. Run Migrations:
  Initialize the database: Run python3 manage.py migrate.
7. Start the Backend Server:
  Run python3 manage.py runserver.
8. Start the Frontend Application:
  In the frontend directory, run yarn start.
