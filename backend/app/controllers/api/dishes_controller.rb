class Api::DishesController < ApplicationController
  before_action :set_dish, only: %i[show update destroy]
  before_action :require_owner, only: %i[update destroy] # restrict this actions to owners only
  before_action :require_restaurant_owner_for_create, only: [:create]
  before_action :set_restaurant, only: %i[index create]
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
    @dishes = Dish.all.with_attached_photo
    render json: @dishes.map { |dish| dish_with_photo_url(dish) }
  end

  # GET /api/dishes/filterby/:category_id
  # Show all dishes of the category from all restaurants
  def category
    @dishes = Dish.joins(:restaurant).where(restaurants: { category_id: params[:category_id] }).with_attached_photo
    render json: @dishes.map { |dish| dish_with_photo_url(dish) }
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

  def set_restaurant
    @restaurant = Restaurant.find_by(id: params[:restaurant_id])
  end

  # rubocop:disable Style/GuardClause
  def require_owner
    unless current_user && @dish&.restaurant&.user_id == current_user.id
      render json: { error: 'You are not the owner of this restaurant or dish not found.' }, status: :not_found
    end
  end

  def require_restaurant_owner_for_create
    unless current_user && Restaurant.exists?(id: params[:restaurant_id], user_id: current_user.id)
      render json: { error: 'You are not the owner of this restaurant.' }, status: :forbidden
    end
  end
  # rubocop:enable Style/GuardClause

  def set_dish
    @dish = Dish.find(params[:id])
  end

  def dish_params
    params.require(:dish).permit(:name, :description, :restaurant_id, :photo, :price_in_cents)
  end

  def dish_with_photo_url(dish)
    dish_data = dish.as_json
    dish_data[:photo_url] = url_for(dish.photo) if dish.photo.attached?
    dish_data
  end
end
