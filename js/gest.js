window.onload= init;

// The contact manager as a global variable
let cm; 
let first = 0;
let numberOfItemsByPages = 5
let numberOfItems = numberOfItemsByPages;
let once = true;
let keepFisrt;


// Create a searching bar

const searching = () =>{

	//transform characters to uppercase or lowercase to compare with them
	let filter = document.getElementById('searchBar').value.toUpperCase();

	let mytable = document.getElementById('mytable');

	let tr = mytable.getElementsByTagName('tr');


	for(var i=0; i<tr.length; i++){
		//Here we choose the second column (name) for the search
		let td = tr[i].getElementsByTagName('td')[1];
		if(td){

			if (filter && once) {
			keepFisrt = first;
			first = 0;
			numberOfItems = 100;
			cm.displayContactsAsATable("contacts");
			once = false;
			}
			if (!filter) {
			first = keepFisrt;
			numberOfItems = numberOfItemsByPages;
			cm.displayContactsAsATable("contacts");
			once = true;
			}

			let textValue = td.textContent || td.innerHTML;
			if (textValue.toUpperCase().indexOf(filter) > -1) {
				tr[i].style.display = "";
			}else{
				tr[i].style.display = "none";
			}
		}
	}
}


function init() { 
	// create an instance of the contact manager
	cm = new ContactManager();
	
  	cm.addTestData();
  	cm.printContactsToConsole();

	  // Display contacts in a table
	  // Pass the id of the HTML element that will contain the table
	  cm.displayContactsAsATable("contacts");
}

// Create function to navigate between pages

function nextPage(){
	numberOfItems = numberOfItemsByPages;
	once = true;
	cm.next()
	cm.displayContactsAsATable("contacts");
}

function prevPage(){
	numberOfItems = numberOfItemsByPages;
	once = true;
	cm.prev()
	cm.displayContactsAsATable("contacts");
}


function formSubmitted() {
	// Get the values from input fields
	numberOfItems = numberOfItemsByPages;
	once = true;

	let picture = document.querySelector("#picture");
	let name = document.querySelector("#name");
  	let available = document.querySelector("#available");
  	let mainActor = document.querySelector("#actor");
  	let director = document.querySelector("#director");
  	let year = document.querySelector("#year");
	let newContact = new Contact(picture.value, name.value, available.value, mainActor.value, director.value, year.value);
	cm.add(newContact);
	
	// Empty the input fields
	picture.value = "";
	name.value = "";
	available.value = "";
	mainActor.value = "";
	director.value = "";
	year.value = "";
	
	// refresh the html table
	cm.displayContactsAsATable("contacts");
	
	// do not let your browser submit the form using HTTP
	return false;
}


function sorted() {
	document.getElementById("name").innerHTML=("Name &#9650");
}


function deleteRaw(index) {
	cm.delete(index);
  	cm.displayContactsAsATable("contacts");
}


function emptyList() {
	numberOfItems = numberOfItemsByPages;
	once = true;
	cm.empty();
  	cm.displayContactsAsATable("contacts");
}

function loadList() {
	numberOfItems = numberOfItemsByPages;
	once = true;
	cm.load();
  	cm.displayContactsAsATable("contacts");
}

function sortName(){

	cm.sort();
  	cm.displayContactsAsATable("contacts");
	document.getElementById("nameId").innerHTML=("Name &#9650");
	document.getElementById("platformId").innerHTML=("Available on");
	document.getElementById("actorId").innerHTML=("Main actor");
	document.getElementById("directorId").innerHTML=("Director");
	document.getElementById("yearId").innerHTML=("Year");
	console.log("sorted")
}

function sortPlatform(){

	cm.sortP();
  	cm.displayContactsAsATable("contacts");
	document.getElementById("nameId").innerHTML=("Name");
	document.getElementById("platformId").innerHTML=("Available on &#9650");
	document.getElementById("actorId").innerHTML=("Main actor");
	document.getElementById("directorId").innerHTML=("Director");
	document.getElementById("yearId").innerHTML=("Year");
	console.log("sorted")
}

function sortActor(){
	numberOfItems = numberOfItemsByPages;
	once = true;

	cm.sortA();
  	cm.displayContactsAsATable("contacts");
	document.getElementById("nameId").innerHTML=("Name");
	document.getElementById("platformId").innerHTML=("Available on");
	document.getElementById("actorId").innerHTML=("Main actor &#9650");
	document.getElementById("directorId").innerHTML=("Director");
	document.getElementById("yearId").innerHTML=("Year");
	console.log("sorted")
}

function sortDirector(){
	numberOfItems = numberOfItemsByPages;
	once = true;

	cm.sortD();
  	cm.displayContactsAsATable("contacts");
	document.getElementById("nameId").innerHTML=("Name");
	document.getElementById("platformId").innerHTML=("Available on");
	document.getElementById("actorId").innerHTML=("Main actor");
	document.getElementById("directorId").innerHTML=("Director &#9650");
	document.getElementById("yearId").innerHTML=("Year");
	console.log("sorted")
}

function sortYear(){
	numberOfItems = numberOfItemsByPages;
	once = true;

	cm.sortY();
  	cm.displayContactsAsATable("contacts");
	document.getElementById("nameId").innerHTML=("Name");
	document.getElementById("platformId").innerHTML=("Available on");
	document.getElementById("actorId").innerHTML=("Main actor");
	document.getElementById("directorId").innerHTML=("Director");
	document.getElementById("yearId").innerHTML=("Year &#9650");
	console.log("sorted")
}


class Contact {
	constructor(picture, name, available, mainActor, director, year) {
		this.picture = picture;
		this.name = name;
		this.available = available;
		this.mainActor = mainActor;
		this.director = director;
		this.year = year;
	}
}

class ContactManager {
	constructor() {
		// when we build the contact manager, it
		// has an empty list of contacts
		this.listOfContacts = [];
	}
	
	addTestData() {
		var c1 = new Contact("https://media.senscritique.com/media/000012235164/source_big/Apocalypse_Now.jpg", "Apocalypse Now", "FILMOTV", "Marlon Brando	", "Francis Ford Coppola", "1979");
  		var c2 = new Contact("https://media.senscritique.com/media/000012223508/source_big/Eternal_Sunshine_of_the_Spotless_Mind.jpg", "Eternal Sunshine", "Netflix", "Jim Carrey", "Michel Gondry", "2004");
  		var c3 = new Contact("https://media.senscritique.com/media/000019975169/source_big/Forrest_Gump.jpg", "Forrest Gump", "Netflix", "Tom Hanks", "Robert Zemeckis", "1994");
  		var c4 = new Contact("https://media.senscritique.com/media/000012334489/source_big/Gladiator.jpg", "Gladiator", "Netflix", "Russell Crowe", "Ridley Scott", "2000");

  		var c5 = new Contact("https://fr.web.img6.acsta.net/pictures/19/12/09/09/26/0965861.jpg", "Hero", "Netflix", "Sivakarthikeyan", "Siva", "2019");
  		var c6 = new Contact("https://media.senscritique.com/media/000004710747/source_big/Inception.jpg", "Inception", "YouTube", "Leonardo DiCaprio", "Christopher Nolan", "2010");
  		var c7 = new Contact("https://media.senscritique.com/media/000018762465/source_big/Interstellar.jpg", "Interstellar", "YouTube", "Matthew McConaughey", "Christopher Nolan", "2014");
  		var c8 = new Contact("https://media.senscritique.com/media/000007087660/source_big/Le_Seigneur_des_Anneaux_Le_Retour_du_roi.jpg", "Le Seigneur des Anneaux", "Amazon", "Elijah Wood", "Peter Jackson", "2003");


  		
  		var c9 = new Contact("https://media.senscritique.com/media/000012539796/source_big/Le_Voyage_de_Chihiro.jpg", "Le Voyage de Chihiro", "Netflix", "Rumi Hiiragi", "Hayao Miyazaki", "2002");
  		var c10 = new Contact("https://media.senscritique.com/media/000020033620/source_big/Matrix.jpg", "Matrix", "YouTube", "Keanu Reeves", "Lilly Wachowski", "1999");

  		var c11 = new Contact("https://media.senscritique.com/media/000015162373/source_big/Old_Boy.jpg", "Old Boy", "Amazon", "Choi Min-Sik", "Park Chan-Wook", "2004"); 		
  		var c12 = new Contact("https://media.senscritique.com/media/000020028877/source_big/Princesse_Mononoke.jpg", "Princesse Mononoké", "Netflix", "Cédric Dumond", "Hayao Miyazaki", "1993"); 		
  		var c13 = new Contact("https://media.senscritique.com/media/000018762557/source_big/The_Dark_Knight_Le_Chevalier_noir.jpg", "The Dark Knight", "YouTube", "Christian Bale", "Christopher Nolan", "2008");
		
		this.add(c1);
		this.add(c2);
		this.add(c3);
		this.add(c4);
		this.add(c5);
		this.add(c6);
		this.add(c7);
		this.add(c8);
		this.add(c9);
		this.add(c10);
		this.add(c11);
		this.add(c12);
		this.add(c13);


		document.getElementById('prev').style.visibility = 'hidden';
		
		// Let's sort the list of contacts by Name
	}


	next(){
		if (first < this.listOfContacts.length - numberOfItems) {
			first = first + numberOfItems;
			document.getElementById('prev').style.visibility = 'visible';
		} 
		if (first >= this.listOfContacts.length - numberOfItems){
			document.getElementById('next').style.visibility = 'hidden';
		}

	}

	prev(){
		if (first >= numberOfItems) {
			first = first - numberOfItems;
			document.getElementById('next').style.visibility = 'visible';
		}
		if (first < numberOfItems) {
			document.getElementById('prev').style.visibility = 'hidden';
		}
	}


	// Will erase all contacts
	empty() {
		this.listOfContacts = [];
		document.getElementById('next').style.visibility = 'hidden';
		document.getElementById('prev').style.visibility = 'hidden';
	}
	
	add(contact) {
		this.listOfContacts.push(contact);
	}

	delete(index) {
		this.listOfContacts.splice(index,1);
	}
	
	remove(contact) {
		for(let i = 0; i < this.listOfContacts.length; i++) { 
			var c = this.listOfContacts[i];

			if(c.available === contact.available) {
				// remove the contact at index i
				this.listOfContacts.splice(i, i);
				// stop/exit the loop
				break;
			}
		}
	}
	
	sortN() {

		this.listOfContacts.sort(ContactManager.compareByName);
	}
	sortP() {

		this.listOfContacts.sort(ContactManager.compareByPlatform);
	}
	sortA() {

		this.listOfContacts.sort(ContactManager.compareByActor);
	}
	sortD() {

		this.listOfContacts.sort(ContactManager.compareByDirector);
	}
	sortY() {

		this.listOfContacts.sort(ContactManager.compareByYear);
	}

	sort() {
		// As our array contains objects, we need to pass as argument
		// a method that can compare two contacts.
		// we use for that a class method, similar to the distance(p1, p2)
		// method we saw in the ES6 Point class in module 4
		// We always call such methods using the name of the class followed
		// by the dot operator
		this.listOfContacts.sort(ContactManager.compareByName);
	}
	
	// class method for comparing two contacts by name
	static compareByName(c1, c2) {
		// JavaScript has builtin capabilities for comparing strings
		// in alphabetical order
		if (c1.name.toLowerCase() < c2.name.toLowerCase())
     		return -1;
		
    	if (c1.name.toLowerCase() > c2.name.toLowerCase())
     		return 1;
  
    	return 0;
	}

	static compareByPlatform(c1, c2) {
		// JavaScript has builtin capabilities for comparing strings
		// in alphabetical order
		if (c1.available.toLowerCase() < c2.available.toLowerCase())
     		return -1;
		
    	if (c1.available.toLowerCase() > c2.available.toLowerCase())
     		return 1;
  
    	return 0;
	}

	static compareByActor(c1, c2) {
		// JavaScript has builtin capabilities for comparing strings
		// in alphabetical order
		if (c1.mainActor.toLowerCase() < c2.mainActor.toLowerCase())
     		return -1;
		
    	if (c1.mainActor.toLowerCase() > c2.mainActor.toLowerCase())
     		return 1;
  
    	return 0;
	}

	static compareByDirector(c1, c2) {
		// JavaScript has builtin capabilities for comparing strings
		// in alphabetical order
		if (c1.director.toLowerCase() < c2.director.toLowerCase())
     		return -1;
		
    	if (c1.director.toLowerCase() > c2.director.toLowerCase())
     		return 1;
  
    	return 0;
	}

	static compareByYear(c1, c2) {
		// JavaScript has builtin capabilities for comparing strings
		// in alphabetical order
		if (c1.year.toLowerCase() < c2.year.toLowerCase())
     		return -1;
		
    	if (c1.year.toLowerCase() > c2.year.toLowerCase())
     		return 1;
  
    	return 0;
	}
	
	printContactsToConsole() {
		this.listOfContacts.forEach(function(c) {
			console.log(c.name);
		});
	}
	
	load() {
		if(localStorage.contacts !== undefined) {
			// the array of contacts is savec in JSON, let's convert
			// it back to a reak JavaScript object.
			var aaa = JSON.parse(localStorage.contacts);
			this.listOfContacts = aaa;
			this.sort();

			if(numberOfItems <= this.listOfContacts.length){
			document.getElementById('next').style.visibility = 'visible';
			}

			if(first >= numberOfItems){
			document.getElementById('prev').style.visibility = 'visible';
			}


		}
	}
	
	save() {
		numberOfItems = numberOfItemsByPages;
		once = true;
		// We can only save strings in local Storage. So, let's convert
		// ou array of contacts to JSON
		localStorage.contacts = JSON.stringify(this.listOfContacts);
			this.sort();
	} 
	
  	displayContactsAsATable(idOfContainer) {
		// empty the container that contains the results
    	let container = document.querySelector("#" + idOfContainer);
    	container.innerHTML = "";

		
		if(this.listOfContacts.length === 0) {
			// stop the execution of this method
			return;
		}
  
    	// creates and populate the table with users
    	var table = document.createElement("table");
    	table.id = 'mytable'
    	table.class = 'table-striped'
    	table.style = 'overflow-x:auto;'
        var row = table.insertRow();

    	row.innerHTML = "<thead class='header_fixed'>" + "<th>Image</th>"
							+ "<th id=nameId onclick=sortName();> Name</th>"
							+ "<th id='platformId' onclick=sortPlatform();> Available on </th>"
							+ "<th id=actorId onclick=sortActor();> Main actor </th>"
							+ "<th id=directorId onclick=sortDirector();> Director </th>"
							+ "<th id=yearId onclick=sortYear();> Year </th>"  + "</thead>"

    	// iterate on the array of users
    	this.listOfContacts.forEach(function(currentContact, index) {
        	// creates a row
        	var row = table.insertRow();
        	
        	if (index < numberOfItems+first && index >= first) {

			row.innerHTML = "<td><img class='pic' src='" + currentContact.picture + "' width=100></td>"
							+ "<td>" + currentContact.name + "</td>"
							+ "<td>" + currentContact.available + "</td>"
							+ "<td>" + currentContact.mainActor + "</td>"
							+ "<td>" + currentContact.director + "</td>"
							+ "<td>" + currentContact.year + "</td>"
							+ "<td><button onclick=deleteRaw('" + index + "');><img src='img/delete.png'></button></td>"
			}
     	});
  
     	// adds the table to the div
     	container.appendChild(table);

  	}
}