# Reddit Newsletter

An application built using nodejs to send an email to users at 8 am containing a newsletter. This newsletter contains reddits with respect to an users favourite reddit.

## Note

* This application is using the Reddit API to get all the details.
* Also using sendgrid with nodejs api integration to send emails to the users.

## Project

To run the project follow the steps:

* Git clone the project
* Once clone go inside the project by using the command `cd project_name`
* To install the dependencies run `npm i`
* Run the app using `npm run start`

App will be available at `http:localhost:4000`
  
## Prequisites needed to send email

Please create an api_key from sendgrid [https://sendgrid.com/solutions/email-api/].
After the api key is available, run the following commands in your terminal with your api key:

* `echo "export SENDGRID_API_KEY='YOUR_API_KEY'" > .env`
* `echo ".env" >> .gitignore`
* `source ./.env`

with respect to nodejs integration documentation: [https://app.sendgrid.com/guide/integrate/langs/nodejs]

## Available routes

* create a user -> `/api/users/signup`
* update a user -> `/api/users/update`
* subscribe/unsubscribe users reddit choices -> `/api/users/subscribe`
* get all the available sub reddits from reddits server -> `/api/reddits`