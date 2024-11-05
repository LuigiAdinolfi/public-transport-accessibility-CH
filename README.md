# Open data for public transport in Switzerland: Access for all and inclusive design for people with disabilities

![Version](https://img.shields.io/badge/version-0.1.0-blue.svg?cacheSeconds=2592000)

## Description
This project is part of a bachelor thesis in computer science at the Fachhochschule Nordwestschweiz (FHNW). 
The aim of this website is to display Swiss public transport stops in an accessible and inclusive way. 
This will enable people with disabilities to plan their journeys independently. The website is based on the open data of the Swiss Federal Railways (SBB) and is designed to be accessible to people with disabilities and to comply with the Web Content Accessibility Guidelines (WCAG) 2.2.


## Requirements

To run this application, you will need to have Node.js installed in your environment.

### Node
- #### Installing Node on Windows

  Simply go to the [official Node.js website](https://nodejs.org/) and download the installer.
  Also make sure you have `git` available in your PATH, `npm` might need it (you can find git [here](https://git-scm.com/)).

- #### Installing Node on Linux

  You can easily install Node.js and npm with apt install, just run the following commands.

      $ sudo apt install nodejs
      $ sudo apt install npm

- #### Other Operating Systems
  You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).

If the installation was successful, you should be able to run the following command.

    $ node --version
    v20.15.1

## Setup

Clone the repository into a folder of your choice.
```sh
git clone https://gitlab.fhnw.ch/iit-projektschiene/fs24/24fs_iit38-public-transport-in-switzerland_access-for-all-and-inclusive-design-for-people-with-disabilities.git
```

Execute the following commands in your project directory.

### 1. Install dependencies

```sh
npm install
```

### 2. Generates an optimised production build

```sh
npm run build
```

### 3. Start the application

```sh
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.


## Team

Luigi Adinolfi<br>
Raveena Ramany


## Supervisors
Prof. Dr. Arzu Çöltekin<br>
Manuel Riedi<br>
Alain Zanchetta

## Client
SKI+ (Systemaufgaben Kundeninformation / SBB Infrastruktur, im Auftrag des BAV)
