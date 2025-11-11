# IT Asset Management System

A full-stack web application for managing IT assets, users, and departments with real-time tracking and detailed reporting capabilities.

![Java](https://img.shields.io/badge/Java-17-orange)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.x-brightgreen)
![React](https://img.shields.io/badge/React-18-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Latest-blue)
![Docker](https://img.shields.io/badge/Docker-Supported-blue)

## 🌟 Features

### Asset Management
- **Complete CRUD Operations**: Create, read, update, and delete IT assets
- **Asset Categories**: Laptop, Desktop, Monitor, Phone, Tablet, Keyboard, Mouse, Printer, Server, Network Device, and more
- **Status Tracking**: In Use, In Storage, In Repair, Decommissioned
- **Detailed Asset Information**: 
  - Purchase date and warranty expiry tracking
  - Vendor information
  - Technical specifications
  - Assignment history
  - Custom notes

### User Management
- **Employee Database**: Comprehensive user profiles with department assignments
- **Asset Assignment**: Track which assets are assigned to which users
- **Avatar Generation**: Automatic color-coded initials for user identification
- **Department Integration**: Users linked to departments with automatic counts

### Department Management
- **Department Hierarchy**: Organize users by departments
- **Employee Count Tracking**: Real-time employee counts per department
- **Validation**: Prevent deletion of departments with assigned employees

### Dashboard & Analytics
- **Real-time Statistics**:
  - Total assets count
  - Assets in use
  - Assets in repair
  - Total users
- **Visual Analytics**:
  - Asset status distribution (Pie Chart)
  - Assets by department distribution (Pie Chart)
- **Recent Activity**: Quick view of recently added assets

### Security & Authentication
- **JWT-based Authentication**: Secure token-based authentication
- **Admin Profile Management**: Update profile information and password
- **Protected Routes**: All routes require authentication
- **Session Management**: Persistent login with token refresh

### User Interface
- **Dark Mode Support**: Toggle between light and dark themes
- **Responsive Design**: Mobile-friendly interface
- **Advanced Filtering**:
  - Search assets by name or user
  - Filter by status
  - Filter users by department
- **Intuitive Navigation**: Clean sidebar navigation with active state indicators

## 🏗️ Architecture

### Backend (Spring Boot)
```
backend/
├── config/          # Security, CORS, and data initialization
├── controller/      # REST API endpoints
├── dto/            # Data Transfer Objects
├── exception/      # Global exception handling
├── model/          # JPA entities
├── repository/     # Spring Data JPA repositories
├── security/       # JWT authentication & filters
└── service/        # Business logic layer
```

### Frontend (React + TypeScript)
```
frontend/
├── components/
│   ├── admin/      # Admin profile components
│   ├── assets/     # Asset management UI
│   ├── dashboard/  # Dashboard charts & stats
│   ├── departments/# Department management UI
│   ├── layout/     # Header, sidebar, navigation
│   ├── ui/         # Reusable UI components
│   └── users/      # User management UI
├── context/        # React context (Auth)
├── pages/          # Page components
├── services/       # API service layer
└── utils/          # Utility functions
```

## 🚀 Getting Started

### Prerequisites
- **Java 17** or higher
- **Node.js** and npm/yarn
- **PostgreSQL** (or Docker)
- **Maven 3.9+**

### Environment Setup

#### Backend Configuration
Update `application-docker.properties` in `src/main/resources/` with your proper credentials:

```properties
spring.application.name=asset-management-api
spring.datasource.url=jdbc:postgresql://postgres:5432/asset_management
spring.datasource.username=postgres_username
spring.datasource.password=postgres_password
spring.datasource.driver-class-name=org.postgresql.Driver
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect
server.port=8080
cors.allowed-origins=http://localhost:3000
```

#### Frontend Configuration
Create `.env` in the frontend directory:

```env
VITE_API_BASE_URL=URL
```

### Running Locally

#### Backend
```bash
cd backend
mvn clean install
mvn spring-boot:run
```

The API will be available at `http://localhost:8080`

#### Frontend
```bash
cd frontend
npm install
npm run dev
```

The frontend will be available at `http://localhost:3000`

### Default Admin Credentials
```
Username: admin_username
Password: admin_password
```

Change these credentials 

## 🐳 Docker Deployment

### Using Docker Compose
```bash
docker-compose up -d
```

### Docker Compose Configuration
```yaml
version: '3.8'

services:
  postgres:
    image: postgres:latest
    environment:
      POSTGRES_DB: asset_management
      POSTGRES_USER: postgres_username
      POSTGRES_PASSWORD: postgres_password
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

  backend:
    build: ./backend
    ports:
      - "8080:8080"
    environment:
      SPRING_PROFILES_ACTIVE: docker
    depends_on:
      - postgres

  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    environment:
      VITE_API_BASE_URL: http://localhost:8080/api

volumes:
  postgres_data:
```

### Backend Dockerfile
```dockerfile
FROM maven:3.9.9-eclipse-temurin-17 AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

FROM eclipse-temurin:17-jdk
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","/app/app.jar","--spring.profiles.active=docker"]
```

## 📡 API Endpoints

### Authentication
- `POST /api/auth/login` - Admin login

### Assets
- `GET /api/assets` - Get all assets (with optional filters)
- `GET /api/assets/{id}` - Get asset by ID
- `POST /api/assets` - Create new asset
- `PUT /api/assets/{id}` - Update asset
- `DELETE /api/assets/{id}` - Delete asset

### Users
- `GET /api/users` - Get all users
- `GET /api/users/{id}` - Get user by ID
- `POST /api/users` - Create new user
- `PUT /api/users/{id}` - Update user
- `DELETE /api/users/{id}` - Delete user

### Departments
- `GET /api/departments` - Get all departments
- `GET /api/departments/{id}` - Get department by ID
- `POST /api/departments` - Create new department
- `PUT /api/departments/{id}` - Update department
- `DELETE /api/departments/{id}` - Delete department

### Admin
- `GET /api/admin/profile` - Get current admin profile
- `PUT /api/admin/profile` - Update admin profile

## 🛠️ Technology Stack

### Backend
- **Framework**: Spring Boot 3.x
- **Security**: Spring Security + JWT
- **Database**: PostgreSQL with Spring Data JPA
- **Build Tool**: Maven
- **Java Version**: 17

### Frontend
- **Framework**: React 
- **Language**: TypeScript
- **Build Tool**: Vite
- **Routing**: React Router v6
- **HTTP Client**: Fetch API
- **Charts**: Recharts
- **Styling**: Tailwind CSS
- **Icons**: Heroicons

### DevOps
- **Containerization**: Docker
- **Orchestration**: Docker Compose

## 📊 Database Schema

### Main Entities
- **Admin**: System administrators
- **User**: Employees/users
- **Department**: Organizational departments
- **Asset**: IT assets
- **AssetHistory**: Historical tracking of asset changes

### Key Relationships
- Users belong to Departments (Many-to-One)
- Assets can be assigned to Users (Many-to-One)
- Assets have History entries (One-to-Many)

## 🎨 UI Features

- **Responsive Design**: Works on desktop, tablet, and mobile
- **Dark Mode**: Automatic theme detection with manual toggle
- **Color-Coded Status**: Visual indicators for asset status
- **Interactive Charts**: Real-time data visualization
- **Modal Dialogs**: Clean, focused editing experience
- **Search & Filters**: Quick data access
- **Form Validation**: Client and server-side validation

## 🔒 Security Features

- JWT token-based authentication
- Password encryption with BCrypt
- CORS configuration
- Protected API endpoints
- Session management
- Automatic token expiration handling

## 📈 Future Enhancements

- [ ] Asset QR code generation
- [ ] Bulk import/export (CSV, Excel)
- [ ] Role-based access control (RBAC)
- [ ] Asset depreciation tracking


## 👤 Author

**Mohamed Boussas**
- GitHub: [@boussas](https://github.com/boussas)

## Special Thanks To

- Spring Boot team for the excellent framework
- React team for the powerful UI library
- Tailwind CSS for the utility-first CSS framework
- Heroicons for the beautiful icon set

