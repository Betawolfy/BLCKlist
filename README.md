## Or Blacklist v2 and Warns v2



> [!WARNING]  
> This document is here to explain to you and the community what is my project.
> Only a few percent of the base is created, now this needs to be created.

Blacklist and warns are the most hated thing in the Regiment community.
In order to avoid regiment Owners and their staffs to work and suffer from these tasks, let me introduce you to **BLCKlist** and **WRNs**.

--- 
## BLCKlist
### Or "Community Blacklist System"
this Is the first community blacklist system of the ponytown community. the purpose of It Is simple: to have a clear and unique blacklist database, for any regiment. Since it will be for the "community", this will work with a ==submit system.==
#### - Process of submission:
- The staff from a server submit the blacklist through the bot or directly in the support server.
- The proofs and other things that has been gave are analysed by a trusted team.
- if the proofs given are enough: the person will be added to the blacklist.
- if not: we'll let and help the people who submitted to have more proofs.

#### - How to submit?
There will be two ways of submitting someone:
- Either by using the General blacklist bot (soon), or by using your custom made bot for your regiment.
[!alt-image]

> Exemple of the command to execute.
-  Or you can go on the discord server (soon) and submit it manualy.
#### - How will it work (technically speaking)?

> [!IMPORTANT]  
> We will enter here in some very nerdy/coding things. I'll try my best to explain to you. 
> (this will also help me to know what i need to do)

Since APLEbot can make custom bot for regiments (note that a public, free for everyone bot will be available to assess the blacklist), we'll need a special repo restructuration. 
Our repo looks like this: 

![!alt-image](https://i.imgur.com/QvuAogI.png)
>so this file contain the source code of 3 bot from 3 different regiment.
>Currently, every rep_Bot has a copy of the ``Blacklist.json`` file.

In order to create BLCKlist, we actually need to create another repo **ONLY** For blacklist. 
Because if we make a Blacklist file for each bot, it will become a mess to handle for me.. I'll have to add new blacklisted on every list, and it's time consuming!!

So the new repo can look like this:

![[Base_repoWblist.png]]
>in this order, The Repo_regi_bot still have 3 bots, and Repo_Blacklist contains 3 blacklist stored in `.txt` file.

this organisation allows every bot to parce every ``Blacklist.json`` when someone is searching for a blacklist.
I encounter another problem.. A **organisation** problem.. Scrambling all blacklist will just make me you confused. 
So i'll do what you think: sort all blacklist per regiments! 
![[Base_repoWblistWregi_folder.png]]
> This order is better for organize. All regiment now have their own sub folder to store their blacklists.

>[!NOTE]
>All blacklist will also be stored in 2 other places:
>- A database (Mongo.db).
>- A personal USB key of mine (backups will be do every 7 days).

This will fix the problem and actually allows me to create another useful feature: to know in **how much** regi someone is blacklisted.

 ![[Pasted image 20240306141150.png]]
> this shows the actual presentation of the bot, but it can be improved even more by giving more information (scroll down for more information.)

#### - What data will you store?
In order for me to store blacklist in the most efficient way, i'll keep the following data:

```json
[
    {
        "Main_username": "theonlyfuezinexistance",
        "Main_displayName": "Fezzy",
        "Main_id": "479554004817281026",
        "Alt_username": "fezzyAlt",
        "Alt_displayName": "Fezzy's fan",
        "Alt_id": "479554004817245245",

        "blacklist_reason": "TT/TD irrespect, toxic, etc...",
        "proof": "https://rentry.co/LetsTalkAboutFezzy",
        "blacklist_date": "2021-07-03",

        "Submitter_id": "432116536866766849",
        "Submitter_username": "betawolfy",
        "Submitter_regiment": "NER - Normal Exemple Regiment",
        "Submitter_date": "2021-07-01"
    }
]
```

Now, a little explaination:
- every blacklist can contain at most 5 alt/other accounts.
- Only the following things can be search: 
> `Main_username`, `Main_id`, `Alt_username`, `Alt_id`, `proof`. 

- if needed, these things can be search by the trusted team:
> `blacklist_date`, `Submitter_date`.

>[!NOTE]
> - All data including `Submitter` will **Never** be public, for their own safety, unless they expressly request it.
> - A blacklist can only be deleted if the person requesting this is part of the regiment that issued the blacklist.

---
## WRNs
### Or The new system of warn

This just a regular warn system, but with a opened database.
That means that you can read other servers warns.

#### How to give a warn?
you'll have to you your custom bot for this:
`/warn-submit user_id:@user reason:ReasonOfWarn comment:MessageForTheMember (provide context and explainations.)`
![[Pasted image 20240306210253.png]]

If the Warn has been successfully been sent, there will be this message: 

>⚠️ - The user theonlyfuezinexistance has been warned for the following reason: ReasonOfWarn. Added context: MessageForTheMember (provide context and explainations.)

The user also receive a DM containing the Reason and the comment/context.

#### How to see someone's warn? 
you'll have to execute the following command:
`/warn-list used_id:@user`

And you'll got the warn list!
![[Pasted image 20240306211706.png]]

>[!NOTE]
>you **can't** remove warn by yourself. only the dev can. if you gave an warning by accident, pls tell me immidiately and i'll remove it!
#### What data will you store?
Simple! here is an exemple of the data will collect!

```json
"user_ID": {
    "count": 0-10,
    "reasons": [
      "reasonOfWarn1"
    ],
    "dates": [
      "2024-03-02T09:45:35.892Z"
    ]
  }
```

We'll only collect the ID of the person who got the warn, we'll also count the number of warn the user get, and also the reason of the warn and the date of the warn.

If the user is warned multiple time, it will look like this:

```json
"user_ID": {
    "count": 0-10,
    "reasons": [
      "reasonOfWarn1"
      "reasonOfWarn2"
    ],
    "dates": [
      "2024-03-02T09:45:35.892Z"
      "2024-03-05T10:12:54.145Z"
    ]
  }
```

>The line of the warn = the date on the same line
>exemple:

```json
"reasons": [
      "reasonOfWarn1" <- this_warn was been given at
      "reasonOfWarn2"
    ],
    "dates": [
      "2024-03-02T09:45:35.892Z" <- this_date!
      "2024-03-05T10:12:54.145Z"
    ]
  }
```

---
## Roadmap:
This roadmap allows you to keep track of the developpement of the project.

- [ ] Creating the Principal bot: BLCKlist
> In progress
- [ ] Create and fill the database
- [ ] Open the bot in closed beta (in 2-3 regis)

> [!NOTE] Developper note:
> The project is WIP.
> I just began.

---
## Credit:
You can find here everything i used to make this project real.
#### Database:
- [mongo.db](https://www.mongodb.com/)
#### Developpement: 
- [Visual Code Studio](https://code.visualstudio.com/)
#### Tools used to made this document:
- [Obsidian](https://obsidian.md/)
- [GitHub](https://github.com/)
---
## Support

>[!IMPORTANT]
>this is a non-profit project. I pay for the machines that run the bots out of my own savings. I don't plan to open any donation. 

This project will be created by myself, with the (emotionnal) support of people/regiment that will give me their trust!

If you're one of them, **THANK YOU SO MUCH!** 

### (Emotionnal) supporter:

None for the moment.

---
## Licence:
I wanted to protect my work. so here is the licence that protect this project and what it means.

>[!Note] Licence
>BLCKlist and WRNs © 2024 by [betawolfy_](https://betawolfy.xyz/) is licensed under [Attribution-NonCommercial-ShareAlike 4.0 International](http://creativecommons.org/licenses/by-nc-sa/4.0/?ref=chooser-v1)


>[!IMPORTANT]
>that means:
>- if you want to use my work, Credit must be given to me, the creator.
>- Only noncommercial use of my work is permitted. (you can't use my project for lucrative purpose.)
>- If you edit my work, you must share it under the same licence.
