class Api::RestaurantsController < ApplicationController
  before_action :set_restaurant, only: %i[show update destroy]
  # before_action :authenticate_with, only: %i[create update destroy] # make sure user is logged in
  before_action :require_owner, only: %i[create update destroy] # restrict this actions to owners only

  # GET /api/restaurants
  def index
    @restaurants = current_user.restaurants
    render json: @restaurants, except: %i[created_at updated_at]
  end

  # GET /api/restaurants/:id
  def show
    render json: @restaurant
  end

  # POST /api/restaurants
  def create
    @restaurant = current_user.restaurants.new(restaurant_params)
    if @restaurant.save
      render json: @restaurant, status: :created
    else
      render json: { errors: @restaurant.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /api/restaurants/:id
  def update
    if @restaurant.update(restaurant_params)
      render json: @restaurant, status: :ok
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
  rescue ActiveRecord::RecordNotFound
    render json: { error: 'Restaurant not found' }, status: :not_found
  end

  def restaurant_params
    params.require(:restaurant).permit(:name, :description, :location, :category_id, :logo)
  end

  def require_owner
    return if current_user.is_owner

    render json: { error: 'You must be a restaurant owner to perform this action' }, status: :unauthorized
  end
end
