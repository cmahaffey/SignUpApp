console.log('here')


app = {} || app

$.ajaxSetup({
  headers:{
    "accept": "application/json"
  }
});
app.Subscriber=Backbone.Model.extend({});

app.SubscriberCollection=Backbone.Collection.extend({
  model: app.Subscriber,
  url: '/api/subscribers'
});

app.SubscriberView=Backbone.View.extend({
  initialize: function(){
    this.listenTo(this.collection, 'add', this.render)
  },
  tagName: 'div',
  className: 'subscriber',
  template: _.template( $('#subscriber-template').html() ),
  render: function(){
    console.log('view render');
    this.$el.empty();
    var  html = this.template(this.model.toJSON());
    console.log(html);
    var $html = $(html);
    this.$el.append($html);
  },
  events: {
    'click button.remove': 'removePerson'
  },
  removePerson: function (){
    this.model.destroy();
    this.$el.remove();
  }
});

app.SubscriberListView=Backbone.View.extend({
  initialize: function(){
    this.listenTo(this.collection, 'add', this.render);//remove () for better rendering
  },
  render: function(){
    this.$el.empty();
    var subscriberList = this.collection.models;
    var $view;
    for (var i=0; i<subscriberList.length; i++){
       $view = new app.SubscriberView({model:subscriberList[i]});
       $view.render();
       this.$el.append($view.$el)
    }
  }
});



app.subscribers= new app.SubscriberCollection({});
app.subscriberPainter= new app.SubscriberListView({
  collection: app.subscribers,
  el: $('#all-subscribers')
});

app.subscribers.fetch();

$('.create-subscriber').on('submit', function(e){
  e.preventDefault();
  mailCheck=/.+@\w+[\.\w].\w+\.\w+/i
  email=$('.email-input').val()
  console.log(email.match(mailCheck));
  if (email.match(mailCheck)){
    $('.email-input').css({'border':'green 2px solid'});

    e.preventDefault();
    var data=$(this).serializeJSON();
    // console.log(data.subscriber);
    app.subscribers.create(data.subscriber);
  }else{
    $('.email-input').css({'border':'red 2px solid'});
    $('.warning').css({'color':'rgba(255,0,0,1.0)'});
    $('.email-input').val()=''
  }

});
