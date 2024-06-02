+++
title = 'Developer Experience is Essential for DevOps Success'
date = 2024-05-31T12:21:04-05:00
draft = true
hero = "/images/posts/devex-devops-success.jpg" # location of images should be in /images/posts/
tags = [ "", "", "" ]
toc = true
summary = ""
[author]
    name = "Jeremy Meiss"
    image = "/images/author/jeremy-meiss.jpg"
+++

From the simplicity of the setup process to the complexity of solving production issues, DevEx directly impacts developer productivity, satisfaction, and, ultimately, the quality of the products they build and use. That quality is directly dependent on the choices made around which development tools, technologies, and platforms to use, making DevEx is an integral part of the entire development lifecycle. Factors such as: the ease of use, reliability, accessibility, and understanding of documentation, the efficiency of build processes, the effectiveness of testing frameworks, and the smoothness of deployment procedures all impact the overall dev experience.

This blog post dives into the world of DevEx, exploring its impact, benefits, and how it intertwines with DevOps practices. But first, let's define "Developer Experience".

## A working definition of Developer Experience

Developer Experience (DevEx) encompasses everything a developer, or ops practitioner, interacts with throughout the software development lifecycle. It includes the tools they use, the processes they follow, and their work environment. To quote a fantastic DevEx practitioner:

> DevEx is the journey of developers as they learn and deploy technology. When successful, it focuses on eliminating obstacles that hinder a developer or practitioner from achieving success in their endeavors.
<cite>Jessica<span class="cite-last-name">West</span></cite>

A positive DevEx means fewer hurdles and frustrations, leading to happier, more productive developers. The evolution of Integrated Development Environments (IDEs) is a prime example of DevEx in action.

## The DevEx Journey: From Text Editors to Cloud-Based IDEs

Remember the days of text-based editors like Vim and Emacs? It's a far cry from today's sophisticated IDEs with features like code completion and debugging tools. Here's a brief, and wholy incomplete, timeline to illustrate this:

### Text only editors

Before the 1990s, you had primarily text-based editors for writing code, like Vi, which evidently is supposed to be called "SIX."

![USER FRIENDLY by Illiad](https://www.oreilly.com/api/v2/epubs/9781492078791/files/assets/lvv8_0101.png)

Who knew? It was created in 1976 and included in the first BSD Linux release.

Then we had Emacs in 1985, Vim in 1991, and my personal favorite, `Nano.` And only partially because I can exit it without throwing out the computer and buying a new one like I do with Vim. Saving the planet, one less computer thrown away because of Vim at a time.

### The cutting edge: HP Softbench?

One of the first IDEs with a plugin concept was HP Softbench, released in 1989. HP Softbench was one of the first plugin IDEs, shipped with its own library, and was extensively talked about in the June 1990 edition of the HP Journal.

![HP Softbench in `Library as a Service` mode](/images/posts/hp-softbench-manuals.jpg)

It's a fascinating read as HP lays out its software architecture and development vision, including automated testing, distributed computing, integrated and interchangeable tools, and more. [Here is the link](http://hparchive.com/Journals/HPJ-1990-06.pdf) to the PDF - I highly recommend reading it.

The early reviews of IDEs as a concept weren't great, though. In 1995, Computer Week in Germany commented that:

> ...the use of an IDE was not well received by developers since it would fence in their creativity.
<cite>Computerwoche, Germany, 1995</cite>

### Native IDEs enter the scene

Around the same time HP was releasing Softbench, we had native IDEs emerging: Turbo Pascal in 1983, and Apple's Macintosh Programmer's Workshop in 1986. Borland Delphi was released in 1995, and was really the first that focused on Rapid Application Development (RAD) as a concept. Fun fact, Delphi is [still around today](https://www.embarcadero.com/products/delphi), courtesy of Embarcadero.

### The World Wide Web expansion

With the launch of the World Wide Web, and its subsequent explosion of growth, IDEs started becoming more graphical and having a more modern look and feel. The first HTML WYSIWYG editor, WebMagic, was built by Silicon Graphics and released in January 1995 (in less than 90 days!). I recommend reading the series of blog posts that its creator, John McCrea, wrote about concerning the history of WebMagic which really begins [here](https://therealmccrea.com/2014/12/26/webmagic-the-untold-and-rather-improbable-story-behind-the-first-wysiwyg-html-editor/), and follow the next few posts afterwards.

FrontPage soon followed in October 1995 after Microsoft acquired it from Vermeer, and then Macromedia's Dreamweaver broke on to the scene in 1997, after they [acquired Backstage](https://adobe.fandom.com/wiki/Macromedia_Backstage) (different "Backstage" product) from iBand in 1996). Dreamweaver _completely_ changed the game in many respects, as Macromedia had a history of their products getting community-sourced tools, plugins, scripts, etc.

Microsoft FrontPage 2000 saw the first inclusion of plugins and integrations in early 1999 to make web management easier via FrontPage Server Extensions. NetBeans was released in 2000 for Java. IntelliJ and Eclipse followed in 2001, along with Visual Studio, which offered enhanced functionality and more sophisticated features like intelligent code completion, refactoring tools, and improved version control integration. We saw a noticeable increase in support for multiple languages and frameworks, making these IDEs more versatile.


### A long journey

We've come a long way from basic text editors to feature-rich IDEs offering code completion, debugging, and version control integration. Introducing IDEs with features like code completion, debugging, and version control revolutionized DevEx. Today, lightweight IDEs like Visual Studio Code and cloud-based solutions offer even greater flexibility and accessibility. Today, cloud-based IDEs provide accessible development environments from anywhere. 

===

Cover image by <a href="https://www.freepik.com/free-vector/gradient-devops-illustration_25225463.htm#fromView=search&page=1&position=0&uuid=e7cf3a2c-d15d-4897-be71-0548abdac62f">freepik</a>