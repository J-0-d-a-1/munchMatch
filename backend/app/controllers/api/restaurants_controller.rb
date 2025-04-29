class Api::RestaurantsController < ApplicationController
  before_action :require_owner, only: %i[create update destroy]
  include Rails.application.routes.url_helpers

  # GET /api/restaurants
  def index
    @restaurants = current_user.restaurants
    render json: @restaurants.as_json(except: %i[created_at updated_at])
  end

  # GET /api/restaurants/:id
  def show
    render json: @restaurant.as_json(except: %i[created_at updated_at]).merge({
                                                                                logo_url: @restaurant.logo&.attached? ? url_for(@restaurant.logo) : nil
                                                                              })
  end

  # POST /api/restaurants
  def create
    @restaurant = current_user.restaurants.new(restaurant_params)
    if @restaurant.save
      render json: @restaurant.as_json(except: %i[created_at updated_at]).merge({ logo_url: @restaurant.logo&.attached? ? url_for(@restaurant.logo) : nil }),
             status: :created
    else
      render json: { errors: @restaurant.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /api/restaurants/:id
  def update
    if @restaurant.update(restaurant_params)
      render json: @restaurant.as_json(except: %i[created_at updated_at]).merge({ logo_url: @restaurant.logo&.attached? ? url_for(@restaurant.logo) : nil }),
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

  # rubocop:disable Style/GuardClause, Style/IfUnlessModifier
  def require_owner
    @restaurant = current_user.restaurants.find_by(id: params[:restaurant_id])
    unless @restaurant
      render json: { error: 'Restaurant not found or you are not the owner' }, status: :not_found
    end
  end
  # rubocop:enable Style/GuardClause, Style/IfUnlessModifier

  def restaurant_params
    params.require(:restaurant).permit(:name, :description, :location, :category_id, :logo)
  end
end
