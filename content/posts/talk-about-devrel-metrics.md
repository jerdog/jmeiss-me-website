+++
title = "Let's Talk About Devrel Metrics"
date = 2024-05-24T10:06:42-05:00
draft = false
hero = "/images/posts/devrel-metrics.jpg" # location of images should be in /images/posts/
tags = [ "devrel", "metrics", "series" ]
toc = true
summary = "Crunching numbers is hard. And OKRs suck. So that means we can forget about DevRel metrics, right? Well, chat about that now."
[author]
    name = "Jeremy Meiss"
    image = "/images/author/jeremy-meiss.jpg"
+++

_**Author's Note:** What follows is Part 6 of a (now) 6 Part (and probably a 7th part to come) series on Developer Relations, and how we can move it forward into the years to come. It is not meant as a definitive roadmap, but more as a kickstart down the road of conversation. Please comment as you see fit, and be part of what Developer Relations can become._

---

<table width="50%" border="1">
    <tr>
        <th>Moving Developer Relations Forward (6 Part Series):</th>
    </tr>
    <tr>
        <td>
            <li><a href="/posts/moving-devrel-forward">Moving Developer Relations Forward</a></li>
            <li><a href="/posts/the-foundations-of-devrel">The foundations of Developer Relations</a></li>
            <li><a href="/posts/asking-the-right-questions-for-devrel-impact">Asking the right questions for DevRel impact</a></li>
            <li><a href="/posts/devrel-and-the-customer-journey">Developer Relations and the customer journey</a></li>
            <li><a href="/posts/positioning-devrel-as-a-resource">Positioning DevRel as a resource within your company</a></li>
            <li><strong><em>So let's talk about DevRel Metrics (this post)</em></strong></li>
        </td>
    </tr>
</table>

---

## On DevRel Metrics

One of the consistent things I have heard (and have even said over the years) is, "Metrics are terrible for DevRel", or "Anything we could track with DevRel is all anecdotal, and doesn't really tell anything meaningful." It's even come up recently in conversations and responses after I started my "Moving DevRel Forward" series. So I figured this would be a good next post to follow up with.

![DevRel Metrics? I don't think they exist](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/oac12tujrgcr3ymr11pg.gif)

Let's face it: OKRs suck. I don't think anyone disagrees with that sentiment. But they (or whatever form your company does goals, objectives, initiatives, etc.) are essential in helping you understand what is expected of you, and what success means. How else are you going to understand, achieve, communicate, and show the value of the work you and your team does?

## 🎶 The Times They Are A-Changin' 🎶

Gone are the days, with rare exception in companies (usually early stage) where budget doesn't matter or you're small enough that everybody knows what everybody and their pet is doing at any given time, when you can just tell your manager and above, _"Trust me. Things are going well and DevRel is kicking it and our community is growing!"_ Gone are the days where a company hires a Cult of Personality as the defining characteristic of their DevRel team. Gone are the days when DevRel just flies all over the world and everyone in the company just accepts that they're _"doing DevRel things"_, or _"it's for the community!" The times they (truly) are a-changin'. _(thank you, Bob Dylan and Keb Mo, whose version is below)_

{{< youtube TbupB7AFdLM >}}

But is that such a bad thing? If you're not changing, you're dying. Some would argue that DevRel is dying because it has "a lack of useful outcomes", and as a result it must change. And now. And I would posit that the reason it's dying is because the discipline (and many who practice it) has been so resistant to change, and to metrics.

I'm one of the Admins for the DevRel Collective, a community _"of DevRel professionals, Community Managers, and others to share resources, learn best practices, support one another, and be amongst our peers"_, and the subject of metrics and KPIs is never without discussion, opinions, and even mind-blowing ideas. There's even a channel devoted to it.  

So what do we do?

## Metrics as the measuring stick

Growing up, did you ever measure yourself on the wall to figure out how much you’d grown over the last week or year? You could easily visualise where you were, and where you are, even if it was a miniscule difference. It meant something! And maybe you even had a line above that which represented where you wanted to be, or a parent or sibling whose height you wanted to match or even beat.

DevRel as a discipline is [basically 30 years old](https://jmeiss.me/posts/devrel-and-the-customer-journey/#:~:text=much%20of%20a%20history%20lesson%2C%20), and yet there’s such a general resistance about measuring DevRel, either as a general discipline, or the individual program in the company. Why is that?

I think there are a couple reasons why:

1. Data and statistics and figuring out how to pull and display metrics is hard, and not everyone has that skillset.

2. “If I put down a specific number to achieve, then I’m going to be held to it and my boss and/or the executives don’t know that this stuff is hard and could change.”

To borrow from my earlier statement, if you're not measuring your DevRel program, how do you know where you were, where you are, and be able to plan where you're going to go?

Let’s start with the second one first.

### Accountability in DevRel

Let’s face it. For a long time, DevRel has existed as this “thing” that companies know they want, but often don’t know why they want it. This usually comes from their VCs, who heard about it either from some company they were at previously which had the function and it seemed to work and was really “cool”, or they heard about it from a VC-colleague with the same experience. This has allowed many DevRel teams to become quite large while also existing in this nebulous “we kinda have an idea of the love we have from developers, and we’re seeing growth, so that’s all you need to know there, Board Member!” All while flying all over the world, doing really whatever the hell they wanted to. And it worked.

Until it didn’t.

Over the past few years, the DevRel profession (as a whole) and many DevRel teams have come under the microscope (oddly enough just like every other team in a company), largely brought on by a combination of the following factors:

* the COVID pandemic-influenced economic downturn, requiring heightened calls for efficiencies across the Business
* DevRel no longer traveling and having to pivot and do things online, which was usually the realm of marketing teams (social media, SEO, Demand Gen, etc.) who all had _real_ metrics they reported on
* a general tech bubble burst that had been in the works before COVID

All of a sudden, these teams started to face those dreaded questions previously mentioned (“What is it you do here?” and “What’s the ROI of that thing?”) and, for a lot of those teams and practitioners, largely yielded a predictable response:

![devrel temper tantrum](https://media.giphy.com/media/Wvo6vaUsQa3Di/giphy.gif)

But, why should we in DevRel be any different? Why should we be treated special from any other department in a company? The answer, of course, is that we shouldn’t. We have to be accountable to the Business for how we run our programs and what we spend our time and money on. That’s going to build trust with our leadership and the departments we interact with, and that’s essential if you want to try a new thing or do something collaborative with another department.

We’ll explore what this could look like a bit later. For now, let’s tackle the data excuse.

### Crunching numbers is hard

To start diving into metrics, you generally need a familiarity with spreadsheets and probably how to access an API. Throw in a potential need to write some queries against your company’s main database or utilize different tools to visualize them. And that’s not counting the cognitive load for many people when dealing with statistics. It’s a skillset all its own, which makes it difficult for those who don’t have that skill set to dive into - so they don’t.

And that’s all valid. But it’s also something that can be overcome. There are plenty of ways to do that:

* Work with your company’s Data or Marketing Ops teams to help understand and work with the data
* Access communities, resources, and even SaaS tools which help aggregate the data into something consumable
  - [SavannahHQ](https://www.savannahhq.com/)
  - [Common Room](https://commonroom.io)
  - [CHAOSS](https://chaoss.community/)
  - _[Effective Data Storytelling](https://www.effectivedatastorytelling.com/)_ by Brent Dykes
  - [How To Find The Data To Prove Your ROI](https://www.feverbee.com/community-data-mastery-how-to-find-the-data-to-prove-your-roi/?mc_cid=f99c4f4d82), Richard Millington & Feverbee

![your data sucks](https://cdn.someecards.com/someecards/usercards/MjAxMy1lZjI5ZGYxZTUxMGI4NzNm.png)

The data about your Community and DevRel program has got to tell a story, and that story needs to be easy to follow and draw parallels to the activities you are doing to show the impact.  

> _"In a world full of data, storytelling is an art."_ - attributed to [Brent Dykes](https://www.effectivedatastorytelling.com/)

At the same time, the data you are pulling will not stay static throughout the maturity of the DevRel program. It needs to evolve, and so you'll need to constantly stretch and exercise this skill.

## So how do we measure to show impact?

> “Define what you want to measure for success, THEN measure the things which indicate that.” Morgan Ramsey, Pluralsight at Monktoberfest 2023

The first step in figuring out what to measure is to ask a couple of questions of yourself, your team, your management,  your department, and even other departments you interact with:

- What outcome are we trying to achieve?
- What problem are we trying to solve?
- What result are we driving to, and what would let us know we were successful?
- What are the business' goals?

The answers to those questions will give you the framework for identifying the metrics, KPIs, etc. that you should be using.

{% embed https://twitter.com/jonobacon/status/1363177613498458114 %}

Let's take this scenario as an example: Your company has put an emphasis on "land and expand" activities to drive growth within customers using your company's product. In the course of the conversations about how your team can help contribute (note: there are _many_ ways and opportunities for a DevRel team to provide value here), you find out that the Sales Team wants to drive awareness of the product to new teams within existing customers, and they're looking for ways to do so. Here are some activities, and metrics, that you could start doing and begin to track:

| Activity | Possible metric(s) |
| --- | --- |
| Perform workshops onsite at existing customer | # of workshops performed, # of attendees at workshops, % of increase in new users |
| Give a talk or webinar about X feature which drives increased usage and/or customer retention | # of webinar attendees, # of new users, % increase of feature usage |

Now you may want to set a specific number, if you have a baseline already of what the number of existing users are, or usage of X feature, etc., or you may want to use that activity to set the baseline to the improve against. Either way, these are real numbers and you can (and should) be tying your activities and accomplishments to them, while also making sure other areas of the company know about your efforts and what you did. Then rinse and repeat, continuously learning and improving and iterating.

Another scenario: you feel that your team really needs to be out meeting with developers and being where they're at. This could be meetups, conference speaking or sponsoring (or both), etc. You likely will need to show ROI to get approval, or may have to in the future so it's best to start now. You first will want to identify the current goals across the company that you could tie this activity to, and then put some metrics in place to show success.

| Goals | Possible metrics |
| --- | --- |
| Product wants feedback on X feature | # of specific feedback received |
| Sales wants to land X new SMB deals | # of direct contacts made and passed on |
| Marketing wants X new use cases | # of users interested in providing use case |
| People team wants to grow pool of candidates for roles | # of recruiter contacts made, # of candidates that fit roles |

You might notice that all of these would qualify as a DRQL (DevRel Qualified Lead) that I [talked about earlier](https://dev.to/jerdog/devrel-and-the-customer-journey-4gjc#:~:text=A%20quick%20note%20on%20DevRel%20Qualified%20Leads). This is a real example of how you can prove the value of your activities. It's important though to make sure that you follow up directly with the specific team so that they know what you did and what next step needs to be taken to move forward with it.

{% embed https://twitter.com/jonobacon/status/976186666988769280 %}

## It's not all fuzzy metrics

Metrics for DevRel are not all fuzzy, or qualitative. You can get some really good quantitative metrics if you aren't afraid to start interacting with other business units, and to start asking yourself the difficult questions ("What does success look like?", "What is the ROI?", etc.) before someone else does.

---

If your company, or even your DevRel team, is in need of some help around these things, let’s chat.

You can find me at:
* [LinkedIn](https://www.linkedin.com/in/jeremymeiss/)
* [Twitter](https://twitter.com/IAmJerdog)
* [Mastodon](https://hachyderm.io/@jerdog)

---

<table width="50%" border="1">
    <tr>
        <th>Moving Developer Relations Forward (6 Part Series):</th>
    </tr>
    <tr>
        <td>
            <li><a href="/posts/moving-devrel-forward">Moving Developer Relations Forward</a></li>
            <li><a href="/posts/the-foundations-of-devrel">The foundations of Developer Relations</a></li>
            <li><a href="/posts/asking-the-right-questions-for-devrel-impact">Asking the right questions for DevRel impact</a></li>
            <li><a href="/posts/devrel-and-the-customer-journey">Developer Relations and the customer journey</a></li>
            <li><a href="/posts/positioning-devrel-as-a-resource">Positioning DevRel as a resource within your company</a></li>
            <li><strong><em>So let's talk about DevRel Metrics (this post)</em></strong></li>
        </td>
    </tr>
</table>

---

Cover photo by <a href="https://unsplash.com/@firmbee?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Firmbee.com</a> on <a href="https://unsplash.com/photos/person-holding-white-samsung-galaxy-tab-jrh5lAq-mIs?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
    