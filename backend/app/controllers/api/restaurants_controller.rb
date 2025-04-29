class Api::RestaurantsController < ApplicationController
  before_action :set_restaurant, only: %i[update destroy]
  before_action :require_owner, only: %i[show index create update destroy] # restrict this actions to owners only
  include Rails.application.routes.url_helpers

  # GET /api/restaurants
  def index
    @restaurants = current_user.restaurants
    render json: @restaurants.map { |restaurant| restaurant_with_logo_url(restaurant) }
  end

  # GET /api/restaurants/:id
  def show
    render json: restaurant_with_logo_url(@restaurant)
  end

  # POST /api/restaurants
  def create
    @restaurant = current_user.restaurants.new(restaurant_params)
    if @restaurant.save
      render json: restaurant_with_logo_url(@restaurant),
             status: :created
    else
      render json: { errors: @restaurant.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /api/restaurants/:id
  def update
    if @restaurant.update(restaurant_params)
      render json: restaurant_with_logo_url(@restaurant),
             status: :ok
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

  def restaurant_with_logo_url(restaurant)
    restaurant_data = restaurant.as_json
    restaurant_data[:logo_url] = url_for(restaurant.logo) if restaurant.logo.attached?
    restaurant_data
  end

  def require_owner
    return if current_user.is_owner

    render json: { error: 'You must be a restaurant owner to perform this action' }, status: :unauthorized
  end
end
