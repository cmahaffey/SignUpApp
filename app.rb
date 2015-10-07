require 'sinatra/activerecord'
require './models/subscriber'
require 'sinatra'

Bundler.require

def subscriberParams
  @subscriberParams= @subscriberParams||JSON.parse(request.body.read)
end

get '/' do
  erb :signup
end

post '/api/subscribers' do
  Subscriber.create(params[:subscriber] || subscriberParams)
  redirect '/'
end

get '/api/subscribers' do
  content_type :json
  @subscribers= Subscriber.all
  @subscribers.to_json
end

delete '/api/subscribers/:id' do
  Subscriber.destroy(params[:id])
end
