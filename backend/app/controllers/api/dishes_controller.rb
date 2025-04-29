class Api::DishesController < ApplicationController
  before_action :set_dish, only: %i[show update destroy]
  # before_action :authenticate_user!, only: %i[create update destroy]
  before_action :require_owner, only: %i[create update destroy] # restrict this actions to owners only

  # GET /api/dishes
  def index
    @dishes = Dish.all
    render json: @dishes
  end

  # GET /api/dishes/:id
  def show
    render json: @dish
  end

  # POST /api/restaurants/${restaurantId}/dishes
  def create
    @restaurant = current_user.restaurants.find(params[:restaurant_id])
    @dish = @restaurant.dishes.new(dish_params.except(:price_in_cents)) # Make sure price_in_cents isn't in permitted params

    @dish.price_in_cents = (params[:dish][:price].to_f * 100).to_i if params[:dish][:price].present?

    if @dish.save
      render json: @dish, status: :created
    else
      render json: @dish.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /api/dishes/:id
  def update
    if @dish.update(dish_params)
      render json: @dish, status: :ok
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

  def set_dish
    @dish = Dish.find(params[:id])
  end

  def dish_params
    params.require(:dish).permit(:name, :description, :restaurant_id, :photo)
  end

  def require_owner
    return if current_user.is_owner

    render json: { error: 'You must be a restaurant owner to perform this action' }, status: :unauthorized
  end
end
