# Thinkific Multi-User Journal Assignment

## Getting Started

### 1. Get to know project tech stack

This simple project is a starting point for your take-home test. It is built with the following technologies:

- [React](https://reactjs.org/), a JavaScript library for building user interfaces
- [Next.js](https://nextjs.org/), a frontend framework for server-side rendering, easy routing, serverless RESTful API
- [Prisma](https://www.prisma.io/), a database ORM for Node.js
  - Scaffolding is set up for SQLite
  - You are free to use other databases of your choice

### 2. Install npm dependencies

```
yarn
```

### 3. Create .env file

```
cp .env.example .env
```

### 4. Prepare DB

Create a local SQLite database and run migrations.

```
npx prisma migrate dev --name init
```

Seed the database with the sample data from [`prisma/seed.js`](./prisma/seed.js).

```
npx prisma db seed --preview-feature
```

### 5. Start the app

```
yarn dev
```

The app is now running, navigate to [`http://localhost:3000/`](http://localhost:3000/) in your browser to explore its UI.

## Submission

Update this README file by answering the questions below.

### Date Or Reflection

August 26, 2022

### Location of deployed application (not necessary for Junior Engineers)

https://hello-thinkific.herokuapp.com/

You can also see and clone the project on GitHub if you want to view the commit history: https://github.com/knowlesc/full-stack

### Instructions to run assignment locally

Some technologies were changed slightly, see [DEV_LOG.md](doc/DEV_LOG.md).

Everything should work with the same instructions as the boilerplate (see above), except you'll need postgres set up locally as I switched the DB provider to postgres. The .env file should point to your local postgres instance - I've updated the config example to match this.

### Time spent

About 5 hours, over several small sessions of 30-90 mins each, plus an extra 30 mins or so to update this README document. One thing I think is important to note: since I split this time across multiple days due to time constraints, I think the quality of my notes is significantly better than they would have been had I done this all in one uninterrupted 5 hour session, because between sit-downs I had time for the things I'd worked on and decisions I'd made to sink in a bit.

See [DEV_LOG.md](doc/DEV_LOG.md) for a more detailed breakdown of how I spent my time.

### Assumptions made

I listed these in the "Initial Assumptions on User Stories" section in [DEV_LOG.md](doc/DEV_LOG.md#initial-assumptions-on-user-stories).

### Shortcuts/Compromises made

See [DEV_LOG.md](doc/DEV_LOG.md#initial-notes) for lots of details on this, particularly the "Initial Notes" section.

### Assume your application will go into production...

#### 1) What would be your approach to ensuring the application is ready for production (testing)?

- Definitely don't run on the free heroku tier which is set to be discontinued in 2 months
  - For an intial production release, heroku's paid tiers would work, and it has the ability to handle lots of platform services (DB provisioning, deployment, config, logging, monitoring, basic scaling, networking, etc.)
  - I think heroku would become very costly over time as we add more platform functionality, so there is a big tradeoff between ease of operations and cost
  - If we wanted more control and lower costs as the app matures, we could switch to something like AWS/GCP
- Assuming we stick with Heroku to start, for a basic production run:
  - I'd probably want to set up a pipeline to separate out a staging and production environment, and build out some automated tests (unit and integration) so that I can limit regressions while continuing dev work
  - I'd also want to run through some testing of the site on different browsers and devices
  - I'd also need to make sure I understood heroku's monitoring system, and see if I could set up some alerts for if the site was having troubles
  - I'd want to build out the error handling and logging capabilities on the FE/BE of the app to make it easier to trace when things go wrong.
  - I'd also want to set up auth as my solution only allows anonymous posting which seems dangerous in any production app.
  - Also maybe some SEO if I want people to easily find the site!
- If we ended up going with something more piecemeal like GCP or AWS, it'd require setting up a ton of things: CI/CD pipeline, DB hosting, logging and monitoring, networking etc. so I probably wouldn't start with that unless I had enough time or help to manage all of this, or the costs were prohibitive on heroku

#### 2) How would you ensure a smooth user experience as 1000’s of users start using your app simultaneously?

- As the app gets bigger, I'd look into serving any static pages and other content from a CDN
- Defer loading scripts until they're needed and leverage hydration
- Leverage caching wherever possible
- Service worker can help with loading things in the background
- Build in rate limiting on the API endpoints to guard against attacks (this could be done in the app code itself, or with something like cloudflare)
- Load balancing can help with high traffic
- I would build pagination into the list page, as we definitely would not want every user to be loading every journal entry every page load
- On the DB site, if traffic is getting super high, we can look into replication
- We could look into using queues for writes to avoid a bunch of writes happening at the same time
- Automatic scaling on the BE would help if there are traffic spikes (heroku supports some basic scaling, not sure about automatic)
- Having said all of the above, I would still try to avoid over-engineering until I am sure the app is actually going to be used by thousands of users, as that can be costly :)

#### 3) What key steps would you take to ensure application security?

- Set up authentication as my solution only allows anonymous posting (easy to abuse)
- Store application secrets securely
- Add automated tests to avoid regressions
- Rate limit API endpoints to guard against denial of service attacks
- Add a content security policy to avoid XSS
- Use a reverse proxy to avoid exposing production servers
- Logging and monitoring to help trace if things go wrong
- Audit packages and avoid using libs with known vulnerabilities

### What did you not include in your solution that you want us to know about? Were you short on time and not able to include something that you want us to know about? Please list it here so that we know that you considered it.

I was able to get to pretty much everything that I thought was critical. Some nice-to-haves I would have considered if I had a bit more time:

- Error handling
- Stronger input validation (max lengths on title, content)
- Individual entry page
- Truncate display of content in the journal entries on the list page
- Pagination
- Better consistency in the styles (using px vs. rem consistently, rgba vs. hex codes, double check all the styles are in an appropriate place, maybe use something like tailwind instead of styled-jsx)
- Add a favicon to stop the 404s in my dev console!

### Other information about your submission that you feel it's important that we know if applicable.

I kept a detailed log of everything here: [DEV_LOG.md](doc/DEV_LOG.md)

### Your feedback on this technical challenge

Super enjoyable - I love little projects like this, and would have been happy to spend many more hours on it. I had some issues with dependencies when initally setting up the project, as the package versions are pretty old, so they could use updates. Although, figuring that out could be considered part of the challenge :)
