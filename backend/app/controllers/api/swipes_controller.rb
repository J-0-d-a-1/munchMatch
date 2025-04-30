class Api::SwipesController < ApplicationController
  before_action :set_dish, only: %i[create update]
  before_action :set_user, only: %i[create update]

  # GET /swipes
  def index
    if @user
      @swipes = Swipe.includes(:dish).where(user_id: @user.id).order(created_at: :desc)

      render json: @swipes, include: { dish: { only: %i[id name photo_url restaurant_id description] } }
    else
      render json: { error: 'You not logged in' }, status: :unauthorized
    end
  end

  # POST api/swipes
  def create
    return unless @user

    @swipe = Swipe.find_by(user: @user, dish: @dish)

    # increment swipes if exist
    if @swipe
      # checking direction
      if params[:direction] == 'right'
        @swipe.increment(:right_swipes)
      elsif params[:direction] == 'left'
        @swipe.increment(:left_swipes)
      end
    else
      # create new swipe if not exist
      @swipe = Swipe.new(user: @user, dish: @dish)

      if params[:direction] == 'right'
        @swipe.right_swipes = 1
      elsif params[:direction] == 'left'
        @swipe.left_swipes = 1
      end
    end

    if @swipe.save
      render json: @swipe, status: :created
    else
      render json: { error: 'Unable to save swipe record' }, status: :unprocessable_entity
    end

    render json: { error: 'Unauthorized: User must be logged in to swipe' }, status: :unauthorized
  end

  # PATCH /api/swipes/:id handleing undo swipe
  def update
    if @user
      @swipe = Swipe.find_by(user: @user, dish: @dish)

      if @swipe
        # Update swipe count from params
        @swipe.update(right_swipes: params[:right_swipes]) if params[:right_swipes]

        @swipe.update(left_swipes: params[:left_swipes]) if params[:left_swipes]

        render json: @swipe, status: :ok
      else
        render json: { error: 'Swipe record not found' }, status: :not_found
      end
    else
      render json: { error: 'Unauthoraized: User must be logged in to update swipe' }, status: :unauthorized
    end
  end

  private

  def set_dish
    @dish = Dish.find(params[:dish_id])
    render json: { error: 'Dish not found' }, status: :not_found unless @dish
  end

  def set_user
    @user = current_user
  end
end
