<<<<<<< HEAD
## Back-End overview

**Used technologies**

-   Node & Express.
-   MongoDB & Mongoose.

**Directories & Files**

-   `app.js` main server configuration.
-   `controllers` main in-route logic with the best practice of centralized error handling and promises based db-server communication.
-   `errors` class objects for centralized error handling.
-   `middlewares` server actions before/after a selected event has happened on the server.
-   `models` mongoose schemas and validations.
-   `routes` main routing logic with integration of `celebrate` & `Joi` libraries for data validation.
-   `utils` constants and reusable variables.


Third party libraries: cors, limiter, helmet, jwt, celebrate, and joi.

**Links**

-   API => https://api.yaron-news.students.nomoredomainssbs.ru
