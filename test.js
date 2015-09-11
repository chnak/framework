var $data = require("jaydata");
$data.Entity.extend("Todo", {
    Id: { type: String, key: true, computed: true },
    Task: { type: String, required: true, maxLength: 200 },
    DueDate: { type: Date },
    Completed: { type: Boolean },
    Person: { type: "Person", required: true, inverseProperty: "Todos"}
});

$data.Entity.extend("Person", {
    Id: { type: String, key: true, computed: true },
    Name: { type: String, required: true, maxLength: 200 },
    Todos: { type: Array, elementType: Todo, inverseProperty: "Person" }
});

$data.EntityContext.extend("TodoDatabase", {
    Todos: { type: $data.EntitySet, elementType: Todo },
    People: { type: $data.EntitySet, elementType: Person }
});

var todoDB = new TodoDatabase({ 
    provider: 'mongoDB' , databaseName: 'MyTodoDatabase' 
});

todoDB.onReady(function() {
    //Work with todoDB now
	console.log(1111111111);
	
	var tasks = todoDB.Todos.addMany([
		{ Task: 'Step0: Get this this list'},
		{ Task: 'Step1: Define your data model'},
		{ Task: 'Step2: Initialize data storage'}
	]);
	todoDB.saveChanges(function() {
		tasks.forEach( function(todo) { console.log(todo.Id) });
	});
});