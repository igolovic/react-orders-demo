# React Orders App
   
<img width="1304" height="806" alt="image" src="https://github.com/user-attachments/assets/44a5b707-7a61-4e70-b7ce-806907814b99" />
   
This project is a full-stack demo application for managing customer orders, built with a React frontend and a .NET 9 backend.

## Features

- View, add, edit, and delete orders
- Manage order items for each order
- Filter and paginate orders
- Manage products and clients
- Validation for order and order item data

## Technologies

- **Frontend:** React (with functional components and hooks)
- **Backend:** ASP.NET Core (.NET 9), Entity Framework Core
- **Database:** SQL Server (with code-first migrations)

## Getting Started

1. **Backend**
   - Navigate to the backend project directory.
   - Run database migrations:  
     `dotnet ef database update`
   - Start the backend API:  
     `dotnet run`

2. **Frontend**
   - Navigate to the `react-orders-app` directory.
   - Install dependencies:  
     `npm install`
   - Start the development server:  
     `npm start`

3. Open your browser at [http://localhost:3000](http://localhost:3000) to use the app.

## Notes
   
- The application uses a shared DbContext for all repositories, so only one `SaveChangesAsync` call is needed per operation.

## License

This project is for demonstration and educational purposes.
