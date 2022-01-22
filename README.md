# group-chat-and-polls
Simple Node.js-based group-chat and polling app with MathJax support

This script was designed to allow in-class participation, which I wrote for math lectures at the University of Toronto at Scarborough, where I teach.
It is a much refined version of my earlier [Zoom-Chat-Follow](https://github.com/yunwilliamyu/zoom-chat-follow) software amenable to use for on videocalls and for in-person teaching, unrestricted to using Zoom.
There is of course basic (unathenticated) group chat functionality; the user inputs are sanitized, but users are allowed to use MathJax commands.

In addition to basic chat functionality, any responses of "A", "B", "C", "D", or "E" in the chat will count towards the polling, with any most one vote per username.
Furthermore, the total number of "?" and "!" in chats is used to display respectively Confusion and Excitement graphs for the previous 10 minutes.

Since it is a Node.js hosted website, it is also fairly easy to use it either as an overlay, or as a separate screen. In my setup, I either use it as an OBS Project overlay when teaching remotely or as a split-screen when teaching on my iPad in person (using either OneNote or Powerpoint on the other screen).

<img alt="Student Chat View" src="https://github.com/yunwilliamyu/group-chat-and-polls/blob/main/docs/student-usage.png?raw=true" width="200"  /> <img alt="Professor Poll View" src="https://github.com/yunwilliamyu/group-chat-and-polls/blob/main/docs/prof-usage.png?raw=true" width="200"  /> <img alt="Split screen iPad view with PowerPoint on left and chat/polls on the right" src="https://github.com/yunwilliamyu/group-chat-and-polls/blob/main/docs/split-screen.png?raw=true" width="400"  />

## Setup
However, initial setup is a bit more difficult, since you must be able to deploy to publicly accessible node.js server for students to use it.
I give instructions below both for directly serving using Node.js and also reverse proxying using nginx, my preferred method.

### Basic direct setup
On a Debian machine, so up nodejs and npm.
```
sudo apt install nodejs npm
```
Then we clone this repo and install all the dependencies.
```
git clone https://github.com/yunwilliamyu/group-chat-and-polls.git
cd group-chat-and-polls
npm install
```
We are ready to run the server, which will default to listening on port 3000 (edit index.js to change the port).
```
nodejs index.js
```
And that's it. Now you can navigate to http://localhost:3000/ to see the chat server in action. Alternately, if you know your public IP address/hostname, you can also send your students to http://[IP-Address]:3000/ or http://public.hostname:3000/, after of course configuring the appropriate holes in your firewall.

### Reverse proxy via nginx
This is the preferred method of deployment. We assume you've already completed the basic direct setup, and are running on port 3000. Then, you will need to set up a reverse proxy by including the following `location` line under `server`, where `[...]` includes the standard directives, such as `listen`, `include`, or `ssl_certificate`. Of course, make sure that you put this into an enabled nginx site.
```
server {
    location / {
        proxy_pass http://localhost:3000;
        proxy_redirect http://localhost:3000/ /;
        proxy_read_timeout 60s;

        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
    [...]
}
```

# Acknowledgments
The software depends [Chart.js](https://www.chartjs.org/), [JQuery](https://jquery.com), [MathJax](https://www.mathjax.org/), and of course [Node.js](https://nodejs.org/en/). Additionally, we use some of themes for buttons from [Bootstrap](https://getbootstrap.com/).
We thank Diky Hadna's [tutorial](https://itnext.io/build-a-group-chat-app-in-30-lines-using-node-js-15bfe7a2417b) for guiding us through some of the basics of Node.js.




