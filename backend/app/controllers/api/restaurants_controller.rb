class Api::RestaurantsController < ApplicationController
  before_action :set_restaurant, only: %i[show update destroy]
  before_action :authenticate_user!, only: %i[create update destroy]

  # GET /api/restaurants
  def index
    @restaurants = Restaurant.all
    render json: @restaurants
  end

  # GET /api/restaurants/:id
  def show
    render json: @restaurant
  end

  # POST /api/restaurants
  def create
    if current_user.is_owner
      @restaurant = current_user.restaurants.new(restaurant_params)
      if @restaurant.save
        render json: @restaurant, status: :created
      else
        render json: @restaurant.errors, status: :unprocessable_entity
      end
    else
      render json: { error: 'You must be a restaurant owner to create a restaurant' }, status: :unauthorized
    end
  end

  # PATCH/PUT /api/restaurants/:id
  def update
    if @restaurant.update(restaurant_params)
      render json: @restaurant
    else
      render json: @restaurant.errors, status: :unprocessable_entity
    end
  end

  # DELETE /api/restaurants/:id
  def destroy
    @restaurant.destroy
    head :no_content
  end

  private

  def set_restaurant
    @restaurant = Restaurant.find(params[:id])
  end

  def restaurant_params
    params.require(:restaurant).permit(:name, :description, :location, :category_id, :logo)
  end
end
