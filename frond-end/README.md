# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh



## Steps

- npm create vite@latest student-shelf --template react
- cd student-shelf
- npm install
- npm run dev
- npm install react-router-dom (navigation)
- npm install react-google-recaptcha (google recaptcha)
- npm install --save @fortawesome/fontawesome-svg-core @fortawesome/free-solid-svg-icons @fortawesome/react-fontawesome
- 

## React Notes

- {} is needed for comments
- always close self closing tag like image, a etc
- a tag is link in some cases
- class attribute can be className
- little things can make the page go blank






## things to do
- nest sub-menu into main menu
- make all routes linkable
- link register path in landing page
- make user profile image dynamic from backend, also user name when logged in
- add policy field in user info bio
- add campus during registration and include it in the user info page



## Backend ASP
dotnet add package Pomelo.EntityFrameworkCore.MySql --version 7.0.0
dotnet add package Microsoft.EntityFrameworkCore.Tools --version 7.0.0
dotnet add package Microsoft.AspNetCore.Identity.EntityFrameworkCore --version 7.0.0
dotnet add package Microsoft.EntityFrameworkCore.Design


dotnet tool install --global dotnet-ef
dotnet ef --version
export PATH="$PATH:$HOME/.dotnet/tools" to .zshrc

dotnet restore
dotnet clean
dotnet build
dotnet ef migrations add InitialCreate
dotnet ef database update
ef migrations remove
dotnet run