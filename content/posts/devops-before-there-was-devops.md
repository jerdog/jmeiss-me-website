---
title: DevOps before there was DevOps, 20yr old style
date: 2020-01-17
hero: /images/posts/ethernet-switch.jpg
description: "From 1995-1997 I worked at an Internet provider who was at the bleeding edge of the WWW explosion. This, is my DevOps story."
summary: "From 1995-1997 I worked at an Internet provider who was at the bleeding edge of the WWW explosion. This, is my DevOps story."
draft: false
author:
  name: Jeremy Meiss
  image: /images/author/jeremy-meiss.jpg
tags:
  - devops
  - humor
  - sysadmin
toc: false
---
aka, "The early days of DevOps, from the perspective of a 20yr old"

From 1995-1997 I worked at an Internet provider who was at the bleeding edge of the WWW explosion. We did the websites and e-commerce sites for the first Mission Impossible and Independence Day movies, and worked directly with Apple on some of their early e-commerce initiatives. I was hired first as Tech Support (and built out those great CDs with things like WS_FTP, Netscape Navigator, Gopher, Archie, and Winsock), and progressed my way to Unix SysAdmin and Network Admin.

![THE INTERNET](https://media.giphy.com/media/SZUnyVdIDAEQU/giphy.gif)
<figcaption>via <a href="https://giphy.com/embed/SZUnyVdIDAEQU">GIPHY</a></figcaption>

During my time as Network Admin, we had grown so much that we took over 3 total floors in this building. The decision was made, not by the clearest of minds I will say, to have myself and the support team run the Cat5 cable, and let the contractors connect the cables to the wall outlets, and number them there.

![ethernet cable connections](https://thepracticaldev.s3.amazonaws.com/i/c5w6wannllhg0hu2ugci.jpg)
<figcaption>Photo by <a href="https://www.pexels.com/@brett-sayles">Brett Sayles</a> from <a href="https://www.pexels.com/photo/ethernet-cable-connected-to-a-compartment-port-2881232/">Pexels</a></figcaption>

The big problem with this (of which there were others), was whenever there were issues we didn’t know who was sitting where, or what outlet was connected to which port on the patch panel. So, the CTO decided that "we" should identify which patch panel port went to which outlet at each desk. The fact that this should have been done from the beginning, and by those of us actually running the wiring instead of the contractors, was lost on him. It wasn’t the first, nor was it the last, such example.

Now I mentioned “we”, which of course meant “me”. I sat at my desk after hearing the news, and mentally started calculating how long it was going to take me to use the tone generator on roughly 75 connections across the 2 new floors in order to visit each outlet and map to each patch panel port. As I recall I calculated it would take roughly 8-10 hours to do this, meaning I was looking at almost a day and a half (at _least_) being fully devoted. My 20yr old attention span was not amused.

![not amused](https://media.giphy.com/media/NlhCDLJnkfInm/giphy.gif)
<figcaption>via <a href="https://giphy.com/embed/NlhCDLJnkfInm">GIPHY</a></figcaption>

I remember sitting in my desk chair, looking at the patch panels behind me, and I had what can only be considered a “Eureka!” moment. I reached up, unplugged one of the cables, leaned back in my chair and turned to face my desk, looked at the phone, and waited. Sure enough, I got a phone call.

![IT crowd](https://media.giphy.com/media/F7yLXA5fJ5sLC/giphy.gif)
<figcaption>via <a href="https://giphy.com/embed/F7yLXA5fJ5sLC">GIPHY</a></figcaption>

>Caller: “Hello, Jeremy? I can’t access my Geocities site, and Eudora Mail says it can’t connect to the 'popcorn' server.”
>Me: “Well that’s odd. Let’s take a look. Can you let me know what the label says on the outlet where your ethernet cable is and I’ll see if I can trace where the problem is?” (me tries to avoid snickering)
>Caller: “Sure. It’s 2-35.”
>Me: “Great. Let me see.” (me writes down on the patch panel “2-35”, and then plugs it back in) “Ok, try now.”
>Caller: “Perfect! I just got my ezine on Eudora! Thanks!”

I had found the magical solution. Over the next roughly 2hrs, our building experienced what could only be described as “intermittent network outages” which affected everyone, in groups of 10 because I wasn’t a monster - everyone needs to feel that sense of community, over random times. However, I had successfully completed the task with the minimal amount of effort on my part.

I had implemented, without even knowing it, a few of the core DevOps principles (as laid out in Emily Freeman's fantastic book ["DevOps for Dummies"](http://amzn.to/2XL7lGM)) before they were a thing. I was a trailblazer!

##Encourage teamwork
Instead of taking on the project all myself, I efficiently roped others into my ambitious gamble. They unknowingly provided me with the legwork, and allowed me to sit in the server room with my feet up, and eat bonbons until the next group of people recognised they needed to join me in this project.

![teamwork](https://media.giphy.com/media/xUPGcjQ6dJEjH5uwMw/giphy.gif)
<figcaption>via <a href="https://giphy.com/embed/xUPGcjQ6dJEjH5uwMw">GIPHY</a></figcaption>

##Reduce silos
I live in Kansas. Silos are a regular thing across the plains. I can honestly say, that as a result of my brilliant plan, no new silos were created during, or since. I'd say that was successful.

![success](https://media.giphy.com/media/2vA33ikUb0Qz6/giphy.gif)
<figcaption>via <a href="https://giphy.com/embed/2vA33ikUb0Qz6">GIPHY</a></figcaption>

##Practice systems thinking
I holistically approached the problem by using all of the resources available to me. My chair was comfortable, I had the patch panels and switches within easy reach, the telephone had a speakerphone, and I had a pen ready to write down the location and it had plenty of ink.

![thinking](https://media.giphy.com/media/v3mwgBgNm7iOk/giphy.gif)
<figcaption>via <a href="https://giphy.com/embed/v3mwgBgNm7iOk">GIPHY</a></figcaption>

##Learn from failure
I recognised the failure in not marking locations when the wires were ran left me with a learning opportunity on how to automate. I also learned that a ball point pen wasn't as effective as a Sharpie.
>“Failure is the condiment that gives success its flavor.”
― Truman Capote

##Communicate
Telephones. They used to be used to talk on, not text and take selfies. I used it. I communicated with multiple people over a few hours, and they were all extremely thankful.

![comms](https://media.giphy.com/media/lXHj6CJpdEhxe/giphy.gif)
<figcaption>via <a href="https://giphy.com/embed/lXHj6CJpdEhxe">GIPHY</a></figcaption>

##Accept feedback
I heard, loud and clear, that people were having issues with their internet connection. I took that feedback and rolled it into actionable results, i.e. I plugged their cable back in. I then accepted that they were happy with the service I had given. I'd say that was a very productive morning.

![feedback](https://i.imgur.com/aBGOnae.gif)
<figcaption>from <a href="https://tenor.com/5gkO.gif">Tenor GIFs</a></figcaption>

##Iterate rapidly
The challenge with any project, be it software or building a deck (if you're reading this, you would be **100% correct** that I should not help you build a deck), is how quickly you can repeat what you've just done, making any changes along the way, and roll it out, thus making way for the next sprint. I wasn't going to be running any race, still won't, but for me I was able to take a 1-2 day process, and turn it into a less than half a day success story by breaking it down into groups of 10. I iterated like a BOSS!

![boss](https://media.giphy.com/media/qFwiRo6isWjza/giphy.gif)<figcaption>via <a href="https://giphy.com/embed/qFwiRo6isWjza">GIPHY</a></figcaption>

##Automate where appropriate
Finally, we come to automation. This is where I think my 20 year old self really excelled. I was able to automate the manual process of going to 70+ outlets in the building and using a tone generator on every one, down to never leaving my chair and having everyone in the building do the task for me. I dare say that also was a good example of teamwork.

![teamwork](https://media.giphy.com/media/xmz2JEFmNsGru/giphy.gif)<figcaption>via <a href="https://giphy.com/embed/xmz2JEFmNsGru">GIPHY</a></figcaption>

So if you've gotten this far without a table flip, give yourself a cookie! This of course was completely in jest, and not at all the correct application of DevOps principles, or really a good way of working for anything or anyone. I would like to say that I have learned a few things since then. Now where did I put that Sharpie marker and tone generator?

---

Cover Photo by <a href="https://unsplash.com/@thomasjsn?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Thomas Jensen</a> on <a href="https://unsplash.com/photos/black-network-switch-with-cables-ISG-rUel0Uw?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
  