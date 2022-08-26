# Development Log

## Session 1 (~45 mins)

I sat down to do some initial brainstorming, as well as breaking down the user stories into tasks and figuring out an MVP + nice-to-haves.

### Initial Notes

- I would normally start any project with a boilerplate that includes typescript/tailwind/jest as that greatly improves my dev experience. However, I will avoid these to start and stick mostly with the given boilerplate, as it's easy to spend hours fiddling with initial config and getting everything to work right. If I have time I'll add typescript first, as that might help me pick up unfamiliar things faster (next and prisma)
- I would also normally start a react project with create-react-app (or I guess create-next-app in this case) as it handles a lot of very useful things immediately eg. browser support, automatic typescript/tailwind support, jest built-in. It looks like next handles browser support for modern JS and CSS out of the box so I don't need to worry about that.
- I need to figure out deployment, ideally as early as possible. If I leave it to the end and there are any complications, I risk going way beyond the allotted time just writing feature code.
  - Some options:
    - AWS (I find the interface clunky for small projects, so might take extra time to fiddle around)
    - Firebase (have had some success in the past w/ Firebase, pretty user friendly, has some google auth libs, but i've only used their built-in db tools so not sure how to deploy prisma db)
    - Heroku (have used quite a bit with the limited free tier - concern would be the max free hours which I might already be up against)
    - Vercel - haven't used this but seems like the hobby tier would work for this
- I'm also conscious of the fact that the additional user stories are all decently involved, and any of them would probably take at least an hour or two. I will be careful not going overboard with the initial user stories to leave myself time to implement one of the additional ones.
- I probably won't need a project management tool (eg. Trello) for this, the time to set it up is not worth it for such a short assignment. I'll stick with these notes.
- I haven't used next.js before but I've been wanting to figure it out, so I'm excited to do that
- SQLite is lightweight and pretty easy to use, so I will stick with that (if I needed to scale this up I would move to postgres, though the SQLite author seems to think it could handle a decent chunk of traffic)
- I haven't used prisma before but it looks like it handles db migrations which is nice
  - There are already tables for posts and users
- API GET and POST routes look to be created already
- Off the top of my head, my priorities are:
  - Break user stories down into more granular tasks, identify critical path, and deal with any assumptions I need to make
  - Get app working locally, see what's already there, read the existing code
  - Get app deployed so I don't have to worry about that later
  - Implement basic functionality to satisfy the user stories (ie. a basic input and submit button, basic html elements for viewing existing entries, nothing fancy)
  - Implement/refactor in a couple nice-to-haves, especially if any of my initial implementation was very rough, and add some styling to make things look a little bit cleaner
  - Implement one of the additional user stories
  - See how long I've taken and go back and do more cool stuff if there's time

### Initial Assumptions on User Stories

User story 1: As an anonymous user I can post a message to the journal.

- Doesn't include authed users, so can leave the existing user field blank
- Doesn't specify if the message posting needs to be a separate page, so I'll leave it as one page to start
- Doesn't specify reloading/showing the newest post after submitting, so I'll leave that as a nice-to-have if I have time

User story 2: As an anonymous user I can retrieve the list of journal entries, sorted by creation time. For
each entry, I see the message as well as date & time of when it was posted.

- Ascending/descending is not specified, normally I would check with PO. I'll assume descending, as that's generally how simple journal/blog/news sites sort (newest first)
- There is a title field in the db schema but it doesn't mention needing to show the title, only "message", which is unclear. I'll assume we should show both the title and the content.
- Author is not mentioned, though it exists in the db and in the seeded data. I'll avoid showing the author to start, leave that as a nice-to-have

Additional User Story: Redesign and improve the user interface, including mobile and accessibility support.

- This is pretty vague, I can generally handle mobile support by building with a mobile-first approach
- For accessibility, I will probably use lighthouse to guage where I'm at and if there are any detected errors
- I'll also test my app with a screen reader and make sure I can navigate using that

### Task Breakdown (\* = MVP, everything else nice-to-have)

- As an anonymous user I can post a message to the journal.
  - user can enter input into a field\*
  - user can click a button to submit their input\*
  - input is sent to the API\*
  - API saves input and creation datetime to the DB\*
  - API returns success response if success\*
  - input fields are validated (maxlength, don't allow empty fields)
  - input is sanitized
  - API validation/error handling
  - user can tell that their message was posted successfully
  - user sees an error message if message was not successfully created
- As an anonymous user I can retrieve the list of journal entries, sorted by creation time. For
  each entry, I see the message as well as date & time of when it was posted.
  - user can see a page for existing journal entries\*
  - entries are requested from the API on page load\*
  - entries show creation datetime\*
  - entries are sorted by creation datetime\*
  - after submitting an entry, new data is shown
  - entries are paginated on the UI (or infinitely-scrollable)
  - API supports pagination
  - API validation/error handling

## Session 2 (~45 mins)

- Goals - run project locally, deploy project remotely
- I ran through the readme file, dealt with a few issues
  - Fixed one issue by switching node versions based on a github issue (https://github.com/facebook/create-react-app/issues/11565)
- Dev server started, navigating to localhost:3000 was successful
- Second goal is to deploy basic project somewhere
- I initially looked into vercel and firebase as my hosting providers, as my heroku account is inaccessible for some reason
- Since SQLite requires a non-ephemeral filesystem, deployment is a bit difficult
  - Serverless providers like vercel don't really support SQLite, and firebase wants you to use its own data providers
- I ended up reconfiguring prisma to use postgres
- Since I now needed a running postgres instance, I went with heroku because it's really easy to set up postgres there
- This involved a few things:
  - Figuring out how to regenerate the prisma migrations
  - Creating a new heroku account as my old one is inaccessible for some reason
  - Updating prisma to the latest version to support OpenSSL 3.0
  - Updating the start script to bind to the port heroku wants it to bind to
- This ended up taking longer than I wanted, but I learned some stuff!
- I've now got the app running locally, and deployed to heroku, so I can push further updates easily and shouldn't have to worry about deployment any more, just dev work
- Spent a little time reading the Next.js docs as I don't have much experience with it specifically

## Session 3 (~30 mins)

- Goal: MVP functionality for first user story (new post form + submission)
- I just read an article that Heroku is removing its free tier in a couple months, so good thing I'm not doing this assignment in a couple months!
- I decided to add TypeScript as I tend to dev faster/more reliably with it, and from the Next.js docs adding TS is very easy
  - I'm gonna only use it for new files to start so I don't get carried away refactoring before implementing basic functionality, will come back later to refactor to TS
  - In order to understand prisma and next.js a bit better, I converted some of the BE code to typescript so I can navigate to type definitions easily

## Session 4 (~60 mins)

- Goal: MVP functionality for second user story (existing entry list)
- Since the creation date is not stored on post creation, I'll need a migration for that
- Migration created, needed a workaround to get the date field through to Next.js
- Verified the following MVP functionality I identified earlier works:
  - user can enter input into a field
  - user can click a button to submit their input
  - input is sent to the API
  - API saves input and creation datetime to the DB
  - API returns success response if success
  - user can see a page for existing journal entries
  - entries are requested from the API on page load
  - entries show creation datetime
  - entries are sorted by creation datetime

## Session 5 (~90 mins)

- I'm going to do some styling updates and work on accessibility
- I ensured the following:
  - Form fields are labelled
  - Used semantic html
  - Alert when form successfully submits/has an error
- I also ran lighthouse and got some other suggestions
  - Added document title
  - Added html lang attribute
- I tested things out with a screen reader and was able to navigate the page with narration that made sense, and I was able to tell when the form was submitted successfully.
- Made some styling updates, and refactored the big main component into multiple
- Converted the remaining components into TypeScript

## Session 6 (~30 mins)

- Since I've got about 30 minutes before I've spent 5 hours on this, I'm going to finish off by adding some colours
- I've used some of the same colours from the Thinkific site to stay with the theme!
- One more little accessibility fix: I updated the "Submit" button to say "Create New Post" so it's obvious what the button does

# Retrospective

Total time spent: Approx. 5 hours

- 45 minutes for initial brainstorm and task breakdown
- 45 minutes to get the project running locally and deployed to heroku
- 90 minutes to build out MVP functionalty
- 120 minutes to build out additional functionality (accessibility, mobile support, and redesign)

Some notes on how I felt about the assignment after the fact:

- The user stories don't have acceptance criteria so there are some nuances/edge cases that I would normally ask the PO about
- Haven't used yarn before, used to npm, so I kept using npm commands by accident
- Haven't used Next.js or Prisma before (i've used TypeORM previously, and some internal SSR tools) so had to run through some docs to understand a bit of the magic behind the scenes
- SQLite deployments are difficult if the filesystem is ephemeral so I decided to go with postgres instead (for which I had to set it up locally)
- I'm really glad I prioritized deployment first, as if I had left that until the end I might not have left myself enough time. I had to weigh some different options and understand how to deploy the technologies used, and made some adjustments
- Date objects are weird with serialization in Next.js (https://github.com/prisma/prisma/discussions/4428 https://github.com/vercel/next.js/issues/11993), I found a workaround for now that I am using but that ate up some time
- I decided to go with TypeScript (partially), which took some extra time, but I'm glad I went with it as it helped me avoid some basic mistakes (eg. typos), and it helped me navigate around unfamiliar library codebases (particularly prisma)
