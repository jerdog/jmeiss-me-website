+++
title = 'From Text Editors to Cloud-based IDEs - a DevEx journey'
date = 2024-06-10T06:49:35-05:00
draft = false
hero = '/images/posts/textEditors-cloudIDEs.jpg' # location of images should be in /images/posts/
tags = [ "devex", "developer experience", "software development", "devops", "cloud", "ide"]
toc = true
summary = ""
[author]
    name = "Jeremy Meiss"
    image = "/images/author/jeremy-meiss.jpg"
+++

Remember the days of text-based editors like [Vim](https://en.wikipedia.org/wiki/Vim_(text_editor)) and [Emacs](https://en.wikipedia.org/wiki/Emacs)? It’s a far cry from today’s sophisticated IDEs with features like code completion and debugging tools, and “developer experience” is one of the biggest reasons why. Here’s a brief and wholly incomplete timeline to illustrate this:

### Text only editors

Before the 1990s, you primarily had text-based editors for writing code, like [Vi](https://en.wikipedia.org/wiki/Vi_(text_editor)), which evidently is supposed to be called “SIX.”

![USER FRIENDLY by Illiad](https://www.oreilly.com/api/v2/epubs/9781492078791/files/assets/lvv8_0101.png)

Who knew? It was created in 1976 (originally as ex) and included in the first BSD Linux release.

Then we had Emacs in 1985, Vim in 1991, and my personal favorite, [Nano](https://en.wikipedia.org/wiki/GNU_nano). And only partially because I can exit it without throwing out the computer and buying a new one like I do with Vim. Saving the planet, one less computer thrown away because of Vim at a time.

### The cutting edge: HP Softbench?

One of the first IDEs with a plugin concept was [HP Softbench](https://en.wikipedia.org/wiki/Softbench), released in 1989. HP Softbench was one of the first plugin IDEs, shipped with its own library, and was extensively discussed in the June 1990 edition of the HP Journal.

![HP Softbench in `Library as a Service` mode](/images/posts/hp-softbench-manuals.jpg)

It’s a fascinating read as HP lays out its software architecture and development vision, including automated testing, distributed computing, integrated and interchangeable tools, and more. [Here is the link](http://hparchive.com/Journals/HPJ-1990-06.pdf) to the PDF—I highly recommend reading it.

The early reviews of IDEs as a concept weren’t great, though. In 1995, Computer Week in Germany commented that:

> ...the use of an IDE was not well received by developers since it would fence in their creativity.
<cite>Computerwoche, Germany, 1995</cite>

### Native IDEs enter the scene

Around the same time HP was releasing Softbench, native IDEs were emerging: [Turbo Pascal](https://en.wikipedia.org/wiki/Turbo_Pascal) in 1983 and Apple’s [Macintosh Programmer’s Workshop](https://en.wikipedia.org/wiki/Macintosh_Programmer%27s_Workshop) in 1986. [Borland Delphi](https://en.wikipedia.org/wiki/Delphi_(software)) was released in 1995 and was really the first to focus on Rapid Application Development (RAD) as a concept. Fun fact: Delphi is [still around today](https://www.embarcadero.com/products/delphi), courtesy of Embarcadero.

### The World Wide Web expansion

With the launch of the World Wide Web and its subsequent explosion of growth, IDEs started becoming more graphical and having a more modern look and feel. The first HTML WYSIWYG editor, [WebMagic](https://wiki.preterhuman.net/WebMagic), was built by Silicon Graphics and released in January 1995 (in less than 90 days!). I recommend reading the series of blog posts that its creator, John McCrea, wrote about the history of WebMagic, which really begins [here](https://therealmccrea.com/2014/12/26/webmagic-the-untold-and-rather-improbable-story-behind-the-first-wysiwyg-html-editor/), and following the next few posts afterward.

[FrontPage](https://en.wikipedia.org/wiki/Microsoft_FrontPage) soon followed in October 1995 after Microsoft acquired it from Vermeer. Then Macromedia’s [Dreamweaver](https://macromedia.fandom.com/wiki/Macromedia_Dreamweaver) broke onto the scene in 1997, after they [acquired Backstage](https://adobe.fandom.com/wiki/Macromedia_Backstage) (a different “Backstage” product) from iBand in 1996). Dreamweaver completely changed the game in many respects, as Macromedia had a history of their products getting community-sourced tools, plugins, scripts, etc.

Microsoft FrontPage 2000 saw the first inclusion of plugins and integrations in early 1999 to make web management easier via FrontPage Server Extensions. [NetBeans](https://en.wikipedia.org/wiki/NetBeans) was released in 2000 for Java. [IntelliJ IDEA](https://en.wikipedia.org/wiki/IntelliJ_IDEA) and [Eclipse](https://en.wikipedia.org/wiki/Eclipse_(software)) followed in 2001, along with [Visual Studio](https://en.wikipedia.org/wiki/Visual_Studio), which offered enhanced functionality and more sophisticated features like intelligent code completion, refactoring tools, and improved version control integration. We saw a noticeable increase in support for multiple languages and frameworks, making these IDEs more versatile.

### Lightweight, extensible, and now Cloud-based

In the late 2000s, [Sublime Text](https://en.wikipedia.org/wiki/Sublime_Text) entered the scene, followed later by [Atom](https://en.wikipedia.org/wiki/Atom_(text_editor)) and [VS Code](https://en.wikipedia.org/wiki/Visual_Studio_Code). All of these focused on speed, user-friendly interfaces, extensible plugin ecosystems, and more. They catered to a range of developers by being less resource-intensive and more customizable.

Then, we had the rise of the cloud and the arrival of cloud-based IDEs. The first cloud-based IDE was [PHPanywhere](https://techcrunch.com/2009/07/25/code-in-your-browser-with-phpanywhere/) (eventually becoming CodeAnywhere) in 2009, followed by [Cloud9](https://en.wikipedia.org/wiki/Cloud9_IDE) in 2010 (before AWS bought it in 2016), [Glitch](https://glitch.com/) (2018), [GitPod](https://www.gitpod.io/) (2019), [GitHub Codespaces](https://github.com/features/codespaces) (2020), and Google’s [Project IDX](https://developers.google.com/idx) (2024).

Yes, I know I’m probably missing quite a few others.

These cloud-based IDEs all share the same idea: they offer fully configured development environments in the cloud that are accessible from anywhere and anyone, reducing the need for complex local setups.

## Developer Experience can drive innovation

Who, in 1976, could have imagined that a developer could have a fully configured development environment in the “cloud”? As technology evolved, the need for more robust and integrated development environments grew, and options emerged for developers to choose the best tool for the job. Or what they want to use since Vim and Emacs still have avid followings.

We went from the feeling that IDEs aren't well received, (see above quote from _Computerwoche_) to features like these being essential for developer experience:

- Code completion
- Syntax highlighting
- Debugging
- VCS integration (no more FTPing files around)
- Multi-language support
- Framework integration
- Pair programming

As should be the case, DevEx strategies have evolved to meet contemporary development challenges and opportunities. The journey reflects a relentless pursuit of efficiency, usability, and developer productivity, from basic, manually configured environments to sophisticated, cloud-based, and automated setups.

In the highly competitive landscape of modern software development, DevEx is the critical differentiator that makes a company and its products and services stand out. A positive DevEx translates into the ability to attract top talent, helps companies increase team performance and product quality, has more engaged and productive development teams, and enhances a brand’s reputation, directly impacting the bottom line. I’ll talk about these in more detail in a coming post.

Where will we find ourselves in the next few years, especially with “AI”-driven features being the new thing and added to IDEs?
