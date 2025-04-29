class Api::DishesController < ApplicationController
  before_action :require_owner, only: %i[index create update destroy]
  before_action :set_dish, only: %i[show update destroy]
  include Rails.application.routes.url_helpers

  # GET /api/restaurants/:restaurant_id/dishes
  # show dishes of a specific restaurant
  def index
    dishes = @restaurant.dishes
    render json: dishes.map { |dish| dish_with_photo_url(dish) }
  end

  # GET /api/dishes
  # Show all dishes from all restaurants
  def all
    @dishes = Dish.all
    render json: dish_with_photo_url(@dishes)
  end

  # GET /api/dishes/:id
  # Show one dish by its id
  def show
    render json: dish_with_photo_url(@dish)
  end

  # POST /api/restaurants/${restaurantId}/dishes
  def create
    @dish = @restaurant.dishes.new(dish_params.except(:price_in_cents)) # hold price to format it first

    @dish.price_in_cents = (params[:dish][:price].to_f * 100).to_i if params[:dish][:price].present?

    if @dish.save
      render json: dish_with_photo_url(@dish), status: :created
    else
      render json: @dish.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /api/dishes/:id
  def update
    if @dish.update(dish_params)
      render json: dish_with_photo_url(@dish), status: :ok
    else
      render json: @dish.errors, status: :unprocessable_entity
    end
  end

  # DELETE /api/dishes/:id
  def destroy
    @dish.destroy
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

  def set_dish
    @dish = Dish.find(params[:id])
  end

  def dish_params
    params.require(:dish).permit(:name, :description, :restaurant_id, :photo)
  end

  def dish_with_photo_url(dish)
    dish_data = dish.as_json
    dish_data[:photo_url] = url_for(dish.photo) if dish.photo.attached?
    dish_data
  end
end
