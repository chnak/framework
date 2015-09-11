require('odata-server');

$data.Entity.extend("Todo", {
    Id: { type: "id", key: true, computed: true },
    Task: { type: String, required: true, maxLength: 200 },
    DueDate: { type: Date },
    Completed: { type: Boolean }
});

$data.EntityContext.extend("TodoDatabase", {
    Todos: { type: $data.EntitySet, elementType: Todo }
});

$data.createODataServer(TodoDatabase, '/todo', 52999, 'localhost');