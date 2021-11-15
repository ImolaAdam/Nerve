Nerve is a social question-and-answer website where users can collaborate by editing questions and commenting on answers that have been submitted by other users.
You can follow profiles and upvote / downvote the questions and answers.

##Setup
* Configure your hostname and database credential in the .env file
    - DB_CONNECTION=pgsql
    - DB_HOST=127.0.0.1
    - DB_PORT=5432
    - DB_DATABASE=postgres
    - DB_USERNAME=yourUsername
    - DB_PASSWORD=yourPassword
* run: php artisan migrate
* run: php artisan serve
