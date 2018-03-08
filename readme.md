# Competitive Search: Minimax and AB Pruning

## Intro

This is a quick introduction to minimax search through the game Connect 4.

When you you have completed this introduction, minimax agent which you have created will probably be able to beat you at Connect 4.

The contents of this introduction, and of the workshop in general, take for granted that you've paid at least a little bit of attention to the lecture.

## Getting started

1. Git clone this repo, cd into it, and "npm install".

2. There's only one file which you'll be editing, which is "minimax.js."  IMPORTANT: Before starting to edit it, finish reading these instructions.
 
3. To test your changes to minimax.js, "npm test."  IMPORTANT: Passing the tests does not necessarily mean you've successfully written an intelligent agent.  You can pass the tests without actually using the minimax algorithm.  To test that your agent is really playing well, you'll need to play against your agent yourself.

4. To play against the agent, run "npm start."  It will start up a server; use a browser to go to localhost:8080 to play against the agent you've written in minimax.js.  If you start up the server before you've started writing your agent, you'll note that you're playing against a randomly-playing (i.e., extremely stupid) agent.

## Advice

1. There are all sorts of correct answers regarding the substance of the heuristic function.  Make something up; so long as it passes the tests, it will probably work with minimax.  Remember that the basic idea is just to roughly evaluate how good the state is.

2. Minimax itself is a bit more rigid, but it only takes a few lines to implement.

3. Minimax alpha-beta pruning is a little harder to visualize, so don't feel discouraged if you have difficulty with it.  It is only a few more lines than minimax itself, though, so if you're writing a lot you're probably going wrong.

