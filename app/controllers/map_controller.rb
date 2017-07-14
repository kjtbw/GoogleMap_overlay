class MapController < ApplicationController
  def index
  end
  
  def point
    point = eval File.read("test_data.rb") # point = Data.where("date is ?", 2017-04-01).all
    render :json => point
  end
end
