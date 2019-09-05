<p align="center">

</p>

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)


# Table of content

- [Overview](#overview)
- [Infrastructure](#infrastructure)
  * [Technical infrastructure](#technical-infrastructure)
  * [Functional infrastructure](#functional-infrastructure)
- [Build](#build)
- [Project](#project)
  * [Contributing](#contributing)
  * [Authors](#authors)
  * [Licence](#licence)


# Overview

JSoagger Services is a spring boot based ready to deploy and cloud integrated backend. It integrates out of the box business modules.

[![Overview](https://img.shields.io/badge/start%20with-why%3F-brightgreen.svg?style=flat)](http://www.ted.com/talks/simon_sinek_how_great_leaders_inspire_action) &nbsp; Begin a new Java project is time wasting. You must integrate libraries and deal with persistence model, integration, delivery, team and a lot of other boilersplate tasks before prototyping the idea.

# Infrastructure
## Technical infrastructure

  * Ready to deploy spring boot based server
    - Hibernate, JPA persistence
    - REST services
    - Spring batch loaders
  * A business manager (UI)
  * A Spring shell server manager

## Functional infrastructure

   * Security management
   * Documents structure management
   * Elements structure management
   * Lifecycle management
   * Folder management
   * Search management
   * Loaders and exporter
   * Dynamic Type extension
   * Dynamic attributes extension	
   
   
<p align="center">
	<a href="#"><img src="https://github.com/rmvonji/jsoagger-screenshots/blob/master/Emagin-Platform-Business%20Modules.jpg" height="580"></a>
</p>

## Directories
```
CoreUI-React#v2.0.0
├── public/      (static files)
│   ├── assets/    (assets)
│   ├── favicon.ico  
│   └── index.html (html temlpate)
│
├── src/             (project root)
│   ├── containers/  (container source)
│   ├── scss/        (scss/css source)
│   ├── views/       (views source)
│   ├── App.js
│   ├── App.test.js
│   ├── index.js
│   ├── _nav.js      (sidebar config)
│   └── routes.js    (routes config)
│
└── package.json
```
# Build

```shell
> git clone https://github.com/Nexitia/jsoagger-services

> mvn clean install
```
## Usage
`npm i` - to install dependencies

## Scripts 
`npm start` for developing (it runs webpack-dev-server)  
`npm run build` to run a dev build  


# Project

## Contributing  
[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/dwyl/esta/issues)

Please read [CONTRIBUTING.md] for details on our code of conduct, and the process for submitting pull requests to us.

## Authors
* **rmvonji** - *Initial work* - [JSoagger ](https://github.com/Nexitia/)
* **Contact** - *yvonjisoa@nexitia.com* 

## Licence
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

This project is licensed under Apache Licence V2.
