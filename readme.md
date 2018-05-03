# Competitive Search: Minimax and AB Pruning

## Intro

This is a quick introduction to minimax search through the game Connect 4.

When you you have completed this introduction, the minimax agent which you have created will be able to beat you at Connect 4.

The contents of this introduction, and of the workshop in general, take for granted that you've paid at least a little bit of attention to the lecture.

## Getting started

1. Git clone this repo, cd into it, and "npm install".

2. There's only one file which you'll be editing, which is "minimax.js."  IMPORTANT: Before starting to edit it, finish reading these instructions.
 
3. To test your changes to minimax.js, "npm test."  Note that to test that your agent is really playing well, you'll need to play against your agent yourself.

4. To play against the agent, run "npm start."  It will start up a server; use a browser to go to localhost:8080 to play against the agent you've written in minimax.js.  If you start up the server before you've started writing your agent, you'll note that you're playing against a randomly-playing (i.e., extremely stupid) agent.

## Advice

1. Any calls to "state" methods that you might need to make have already been made, with the value stored in some variable.  You do NOT need to make any calls to "state.{anything}()" that have not already been made.

2. Minimax alpha-beta pruning is hard, so don't feel discouraged if you have difficulty with it.  It is only a few more lines than minimax itself, though, so if you're writing a lot you're probably going wrong.


