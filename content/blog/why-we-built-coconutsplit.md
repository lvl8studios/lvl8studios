---
title: "Why we built CoconutSplit"
excerpt: "We built CoconutSplit because getting our friends to download another expense app was a hassle. Our friends already used Telegram."
author: "Jensen Huang"
date: 2026-10-03
tags: ["CoconutSplit", "Product", "Telegram", "Startup"]
image: /coconutsplit.png
---

# Why we built CoconutSplit

We built CoconutSplit because we wanted an expense splitter on Telegram.

Tricount and Splitwise could do what we needed, but we didn't like having to convince our friends to download them. Getting everyone onto another app was a hassle, especially when all we wanted to do was split some expenses.

Nearly everyone we knew in Singapore used Telegram. We already had group chats with the people we were splitting expenses with, so it made sense to build something we could use there.

## The first version was awkward

Our first attempt was a Telegram bot that worked much like a `CLI`{A command-line interface. You type commands to tell a program what to do.}. You typed commands into the chat to create a group, add an expense, or edit one:

- `/create_group`
- `/add_expense [expense amount] person1 person2 person3`
- `/edit_expense [expense_number] person1 new_expense_amount person2 new_expense_amount2`

To be frank, it was somewhat unusable. Even adding an expense meant remembering what to type and where each person's name belonged. Editing one was worse. Looking at that last command now, I wouldn't want to use it either.

I doubt it would have gained much traction if we'd released it like that.

There was good work in that version, though. We put a lot of care into the `schema`{How the app organises and connects information about groups, expenses, and payments.} and the `debt-resolving algorithm`{The steps the app follows to work out who owes whom and how much.}. Almost three years later, the schema in today's CoconutSplit is still quite similar to the original one. A lot of those early decisions held up.

## Adding a screen inside Telegram

After some feedback and brainstorming, we decided to give the bot a `UI`{The screens, buttons, and forms you use to interact with an app.} through a `web app`{An app you use through a browser without installing it.}.

Telegram has a feature called `Mini Apps`{Web apps that open inside Telegram and can receive information from it, such as who opened the app.}. These let us show forms and buttons inside Telegram, with information such as the user's name and ID already available to the app.

People could enter an amount and select who was splitting it through a form. That was much easier than typing a long command into the chat, and they still didn't have to download anything.

This became the first version of CoconutSplit we shared with friends and family. We've changed the screens quite a bit since then.

Here's what CoconutSplit looks like today:

![The current CoconutSplit group overview showing totals, outstanding debts, and settlements](/blog/coconutsplit-ledger.jpeg "The group overview today")
![The current CoconutSplit form for adding an expense](/blog/coconutsplit-add-expense.jpeg "Adding an expense")
![CoconutSplit Insights showing personal balances and group spending over time](/blog/coconutsplit-insights.jpeg "Group spending and insights")

## How it spread

When someone used CoconutSplit to split expenses with their friends, those friends had to interact with the bot too. It concerned their money, so they had a reason to pay attention to it and see how it worked.

Some of those people found it useful enough to add to their own group chats. Then another group of people would use it, and some of them would do the same.

## Nearly 10,000 users

Slowly, we watched the user count climb to 50, then 100, then 500. Now we're close to 10,000.

I'll write about CoconutSplit's architecture and my homelab in a separate post.
