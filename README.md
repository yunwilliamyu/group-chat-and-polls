# group-chat-and-polls
Simple Node.js-based group-chat and polling app with MathJax support

This script was designed to allow in-class participation.
It is a much refined version of my earlier [Zoom-Chat-Follow](https://github.com/yunwilliamyu/zoom-chat-follow) software amenable to use for on videocalls and for in-person teaching, unrestricted to using Zoom.
In addition to basic (unauthenticated) group chat functionality, any responses of "A", "B", "C", "D", or "E" in the chat will count towards the polling, with any most one vote per username.
Furthermore, the total number of "?" and "!" in chats is used to display respectively Confusion and Excitement graphs for the previous 10 minutes.

Since it is a Node.js hosted website, it is also fairly easy to use it either as an overlay, or as a separate screen. In my setup, I either use it as an OBS Project overlay when teaching remotely or as a split-screen when teaching on my iPad in person (using either OneNote or Powerpoint on the other screen).

## Setup
However, initial setup is a bit more difficult, since you must be able to deploy to publicly accessible node.js server for students to use it.
I give instructions below both for directly serving using Node.js and also reverse proxying using nginx, my preferred method.



