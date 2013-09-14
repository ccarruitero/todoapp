Todos.TodosController = Ember.ArrayController.extend({
  actions: {
    createTodo: function () {
      // Get the todo title set by the "New Todo" text field
      var title = this.get('newTitle');
      if (!title.trim()) { return; }

      // Create the new Todo model
      this.store.createRecord('todo', {
        title: title,
        isCompleted: false
      });

      // Clear the "New Todo" text field
      this.set('newTitle', '');

      // Save the new model
      //todo.save();
    },

    clearCompleted: function () {
      var completed = this.filterProperty('isCompleted', true);
      completed.invoke('deleteRecord');
      completed.invoke('save');
    }
  },

  remaining: function () {
    return this.filterProperty('isCompleted', false).get('length');
  }.property('@each.isCompleted'),

  inflection: function () {
    var remaining = this.get('remaining');
		var plural = remaining === 1 ? 'item' : 'items';
		return '%@ left'.fmt(remaining, plural);
  }.property('remaining'),

  hasCompleted: function () {
    return this.get('completed') > 0;
  }.property('completed'),

  completed: function () {
    return this.filterProperty('isCompleted', true).get('length');
  }.property('@each.isCompleted'),
  
  allAreDone: function (key, value) {
    if (value !== undefined) {
      this.setEach('isCompleted', value);
      return value;
    } else {
      return !!this.get('length') &&
      this.everyProperty('isCompleted', true);
    }
  }.property('@each.isCompleted')
});
