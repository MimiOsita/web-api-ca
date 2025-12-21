# Assignment 2 - Web API
Name : Mimi Osita
Authentication was added using the same approach as the Tasky labs
Backend:
- A users API supports registration and login 
- Passwords are hashed and stored in MongoDB
- JSON web tokens are issued when the lgin is successful 

Frontend:
- Login and signup pages were added
- An authentication context then manages the login, signup and authentication state
- The JSON web tokens are stored in localStorage
- I used protected routes for favorites which ensures the page is only accessible to logged in users.

Movies API
Implemented Endpoints
- I added an upcoming movies and top rated movies endpoint.
- The endpoints fetch movie data from TMDB and returun JSON responses using Postman

Another API
I added a favorites API for user-specific data
- MongoDB/Mongoose model stores username and movieId
- Uses GET and Post