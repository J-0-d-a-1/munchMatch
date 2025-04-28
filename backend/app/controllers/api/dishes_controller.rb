class Api::DishesController < ApplicationController
  before_action :set_dish, only: %i[show update destroy]
  before_action :authenticate_user!, only: %i[create update destroy]
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

  # POST /api/dishes
  def create
    @dish = current_user.dishes.new(dish_params)
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
    params.require(:dish).permit(:name, :description, :price_in_cents, :restaurant_id, :photo)
  end

  def require_owner
    render json: { error: 'You must be a restaurant owner to perform this action' }, status: :unauthorized 
    unless current_user.is_owner
  end
end