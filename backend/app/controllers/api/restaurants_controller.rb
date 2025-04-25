class Api::RestaurantsController < ApplicationController
  def index
    render json: { message: "MunchMatch backend is working!" }
  end
end
