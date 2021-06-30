# Miserere Mei - The Precarious Trails to the Library of Preachers v0.8
A retro, Hungarian adventure game. Written, programmed by Dr. Porkoláb Ádám. The game can be further developed with the author's permission but the sotfware may not be sold.

## History of the game

The idea of a program called „Miserere Mei - The Precarious Trails to the Library of Preachers” grew out of an interesting thought experiment: is it possible to use modern tools to create a type of game, namely a text-based adventure game, once popular in the early days of computing that's enhanced with some of the features of video games published in the new millennium? "Miserere Mei" is an adventure game written in Java that I developed between September 2020 and late October 2020. 

I developed the software as a thesis project fo the software developer NQR course organized by OKTÁV PLC.

The game is set in the postapocalyptic world of the 2050's, in the Land of Desolation. The player controls a mercenary called Cantus Planus who gets a task from an old priest, Gregorio. According to the brief the soldier has to escort five youngsters: Altus, Tenor, Bassus and the Superia sisters to the Library of Preachers so that the librarians can record for posterity the music living in them and through them.  

We follow their mission through a wild desert full of dangers, while Falsetto, the evil and ruthless warlord, learns about their task and wants to foil their plan. So the goal of the player is to lead the main characters safely to the Library of Preachers. 

The game also build on the player taking risks: they can take the easier route if they want to, but they also have the choice to take greater risks and reap grater rewards.

The game's stlye is influenced by the tradition of classic flipbooks and text-based adventure games of the early 90's. This means that there is a safe route and that the player has to engage in fights and the player's choices have a cruical role in the gameplay.

The game can be completed in about half an hour if the player takes the appropriate route, however, the planned side quests and secondary locations have not been added yet.  

## Main specifiations of the game

The software is currently on version 0.8.  

The structure of the project is currently two parts. 

One is a Java backend application based on a Spring, and the other is a Typescript-based application based on Angular. Attached to the backend part of the project, there is another run-config.png which shows the settings needed to start the backend in the IntelliJ Idea Community.

## Spring Backend
I have assembled a basic Spring project with https://start.spring.io/. In this project I added some classes:

•	hu/porkolab/misere/config/DevWebConfig.java - This is a setup file, which controls the resources of this project. 

•	hu/porkolab/misere/data/model/Place.java - This is a simple class that is included in the example.

•	hu/porkolab/misere/resource/MiserereResource.java - This is the REST endpoint itself, this gets the incoming requests. 

•	hu/porkolab/misere/service/PlaceService.java - This is a model of the game engine for the place changing ("walking").

•	hu/porkolab/misere/service/impl/PlaceServiceImpl.java - This is the implementation of the former service.

•	hu/porkolab/misere/service/FightService.java - This is a model of the game engine for the fight system.

•	hu/porkolab/misere/service/impl/FightServiceImpl.java - This is the implementation of the former service.

•	hu/porkolab/misere/MiserereBackendApplication.java - This is the entry point of the application.

### The remaining tasks are:

• Actual implementation and correction of the fighting system, possibly the use of the former combat system as an external addiction and its possible expansion

• Finish and implement the remaining scenes and story of the game.

## Angular frontend

The using frontend is required to install the NPM package manager: https://www.npmjs.com/get-npm

After this, it is advisable to install Visual Studio Code: https://code.visualstudio.com/

Opening the project library in Code, at the Terminal Menuplate, installation of addictions for the project is the first step: "NPM install"

After this, you can start the project with Angular CLI: NG Serve in the browser to open the application at the following address. http://localhost:4200

I created the following items:

•	src/app/components/place/place.component.* - The location "selector" interface.

•	src/app/entities/place.ts - The data of the places store here.

•	src/app/services/place.service.ts - A service that retrieves the location data from the backend. 

•	proxy.conf.json - A proxy file for easier summoning to the backend. 

The project is launched when the backend is running, then a "GameBeginning" location appears in the browser, displaying the properties of the site from the server. 

By clicking Furtherlocation1 or clicking Furtherlocation2,3,4, the "name" of the site calls the server and asks for the newer location.

### The remaining tasks are:
• Develop further design and layouts.

• In the event of a fight for each location, invocation, and handling of the fighting system. 

I'm waiting for ideas and opinions on adam <at]porkolab.digital e-mail address. 
