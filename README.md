# SEAE1
Software Engineering Summative Assignment 1

**Project Proposal**
The application I will be developing is a simple, web based application designed to solve an incredibly common issue we have in the railway for all levels of staff – terminology.  Throughout my years in the business, especially when starting, I have discovered the vast amount of acronyms, standards and regulations we need to utilise and reference in our BAU (Business as usual) operations. 

It is incredibly common that in each meeting with our stakeholders that there is a shared confusion and misunderstanding when industry specific vernacular is used. Unfortunately, there is no method of quickly confirming the language or efficently searching for standards. Having to search across our infrastructure is a lengthy process which can still result in an incorrect meaning later turning into misunderstanding with projects. This halters project progress and workflow by creating confusion through misunderstandings. 

This project introduces a portal that can be ran in the browser that provides instant access to the abundance of knowledge we have in our network. 

Lets move onto the requirements of the solution: 

I expect to develop a clean, intuitive web page that works like a command palette for rail knowledge. You open it, start typing, and within seconds you’re viewing a clear, concise explanation of the term you need. There’s no need for a login as there’s no sensitive information - just a search bar and immediate results. I want it to feel like a natural extension of how we already work online: fast, straightforward, and reliable. Since this is a project, I’m building myself, I’m keeping the scope realistic and the costs low. The first version will be a static web app built with basic HTML, CSS, and JavaScript - just a simple file that anyone can open in a browser or host internally. This keeps the project manageable while still delivering clear, practical value with the option for our staff to add their own entries keep the database up to date. 

For the initial release, I’m focusing on a few core features that address the most common needs. You’ll be able to search a curated list of rail terms and acronyms—things like ETCS, PWAY, or RGS—and see results update as you type. You’ll also be able to filter entries by category (Signalling, Permanent Way, Regulations, etc.) with a single click. Selecting a term will display its full definition, typical usage, and relevant context in a clean, readable layout. Behind the scenes a python script will handle the data. The web app in-browser (front end) will access the data to fuel the application. Finally, I’m including a “I’m feeling lucky” button, like Google has - partly for discovery, and partly because I think it adds a bit of personality to the tool whilst educating the user. The interface will be fully adaptive, so it works just as well on a phone or tablet as it does on a desktop—useful for quick checks on-site or during meetings away from your desk. 

**Technology Stack**

See Image1

**Technical Documentaion**

See RAC Technical Doc

**User Guide**

See RAC User Guide

**Evalutation**

I built the Rail Acronym Center to solve a specific problem railway professionals face every day. When you're working with complex technical terms and countless acronyms you need quick reliable information. This tool provides exactly that.

The application lets you type any railway term and immediately see its full definition common usage and category. It works like a command palette you might use in software development but designed specifically for rail industry terminology.

## How It Works Technically

The application uses a simple approach that makes it easy to deploy and maintain. There are just four files total. The HTML file creates the basic webpage structure. The CSS file makes everything look clean and professional. The JavaScript file handles all the interactive features. And the CSV file stores all the railway terms and definitions.

This simplicity means the application runs entirely in your web browser. No servers are needed. No databases to manage. Once loaded it works completely offline which is perfect for railway depots and field locations.

## What I'm Pleased With

The application delivers on its core promise. It provides instant access to railway terminology without complexity. Users can start searching immediately with no setup or training required.

The data management approach turned out particularly well. Railway teams can update their terminology database using simple spreadsheet software they already know. Changes appear immediately when they refresh their browser.

The interface works seamlessly across devices. Whether someone is using a desktop computer in an office or a mobile phone on a worksite they get the same clean functional experience.

## A Personal Reflection

During development I became deeply focused on creating a tool that truly worked well for its intended users. I thought carefully about how railway professionals actually work and what would make their lives easier.

In that focus I recognize I could have been more disciplined about documenting the development process itself. While the final application is solid and reliable my GitHub commit history doesn't tell the full story of how we got here. The repository shows the destination but not the journey with all its iterations and refinements.

## What I Learned

This project reminded me that sometimes the simplest solutions are the most effective. The Rail Acronym Center doesn't use fancy technology or complex systems. It uses straightforward web technologies to solve a real problem elegantly.

I also learned that maintaining development discipline matters even on solo projects. Good tools deserve good development practices from start to finish.

## Looking Forward

The Rail Acronym Center stands as a useful practical tool. It demonstrates that with clear thinking about user needs you can create effective solutions without unnecessary complexity. For railway teams it provides immediate value with minimal technical overhead.

For me it represents both a successful technical implementation and a learning experience about balancing product focus with process discipline.
