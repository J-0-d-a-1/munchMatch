class Api::FavoritesController < ApplicationController
  include Rails.application.routes.url_helpers

  # GET api/favorites
  def index
    if !current_user
      render json: { message: 'You need to login/signup to favorites' }, status: :unauthorized
    else
      favorites = current_user.favorites.includes(:restaurant)
      favorite_restaurants = favorites.map { |favorite| restaurant_with_logo_url(favorite.restaurant)}
      render json: favorite_restaurants
    end
  end

  # POST api/favorites
  def create
    favorite = current_user.favorites.build(restaurant_id: params[:restaurant_id])

    if favorite.save
      render json: { message: 'Restaurant added to favorites.' }, status: :created
    else
      render json: { errors: favorite.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # DELETE api/favorites/:restaurant_id
  def destroy
    favorite = current_user.favorites.find_by(restaurant_id: params[:restaurant_id])

    if favorite
      favorite.destroy
      render json: { message: 'Removed from favorites.' }
    else
      render json: { error: 'Favorite not found.' }, status: :not_found
    end
  end

  private

  def restaurant_with_logo_url(restaurant)
    restaurant_data = restaurant.as_json
    restaurant_data[:logo_url] = url_for(restaurant.logo) if restaurant.logo.attached?
    restaurant_data
  end
end
