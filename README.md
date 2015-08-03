
DM4 Polymer Webclient
=====================

A rewrite of the DeepaMehta 4 Webclient based on Web Components and Google's Polymer.

DeepaMehta 4 is a platform for collaboration and knowledge management.  
<https://github.com/jri/deepamehta>


Requirements
------------

* Google Chrome
* Maven
* Node.js / npm
* Bower


Build
-----

1. `git clone https://github.com/jri/dm4-webclient-polymer`
2. `cd dm4-webclient-polymer/src/main/resources/web`
3. `bower install`
4. `cd ../../../..`
5. `mvn clean package`


Install
-------

* Add the `dm4-webclient-polymer/target` directory to DeepaMehta's `pom.xml` and restart DeepaMehta.


Use
---

* Use Chrome to launch the Polymer Webclient:  
  <http://localhost:8080/de.deepamehta.webclient-polymer/>
* In another tab/window launch the classic DeepaMehta Webclient and login.  
  The session created is valid for the Polymer Webclient as well.


Version History
---------------

**0.2** -- Aug 3, 2015

* Show related topics, reveal related topics
* Hide topics
* Topicmap panel: type icons, association colors
* Technical: REST client and context menu components
* Compatible with DeepaMehta 4.6

**0.1** -- Jul 4, 2015

* Create topics, edit topics, move topics
* Inline editing
* Switch topimaps, move topicmaps
* Touch compatible
* Technical: asynchronous server communication
* Compatible with DeepaMehta 4.6


------------
Jörg Richter  
Aug 3, 2015
