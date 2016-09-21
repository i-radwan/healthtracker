var app = app || {};
app.ItemView = Backbone.View.extend({
	tagName: 'li',

	template: _.template($('#item-template').html()),
	events: {
		'click .destroy': 'clear'
	},
	initialize: function () {
		this.listenTo(this.model, 'destroy', this.remove);
	},
	render: function (local) {
		var attr = this.model.attributes;
		attr.local = local;
		this.$el.html(this.template(attr));
	},
	clear: function () {
		this.model.destroy();
	}
});
app.SearchItemView = app.ItemView.extend({
	initialize: function (options) {
		app.ItemView.prototype.initialize.call(this);
		this.vent = options.vent;
	},
	events: {
		'click .add': 'add'
	},
	add: function () {
		this.vent.trigger("addItemFromSearchItemsToSavedItems", this.model);
	},
	render: function () {
		app.ItemView.prototype.render.call(this, false);
		return this;
	},
});
app.SavedItemView = app.ItemView.extend({
	render: function () {
		app.ItemView.prototype.render.call(this, true);
		return this;
	}
});
