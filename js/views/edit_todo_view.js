Todos.EditTodoView = Ember.TextField.extend({
  change: function () {
    if (Ember.isEmpty(this.get('value'))) {
      this.sendAction('text-cleared');
    }
  },

  didInsertElement: function () {
    this.$().focus();
  }
});

Ember.Handlebars.helper('edit-todo', Todos.EditTodoView);
