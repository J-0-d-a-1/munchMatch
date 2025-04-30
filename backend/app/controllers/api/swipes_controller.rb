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
    return render json: { error: 'Unauthorized: User must be logged in to swipe' }, status: :unauthorized unless @user

    Rails.logger.debug "Incoming swipe params: #{params.inspect}"

    @swipe = Swipe.find_or_initialize_by(user: @user, dish: @dish)

    # set up swipes to 0 before increment
    @swipe.right_swipes ||= 0
    @swipe.left_swipes ||= 0

    # transfer swipes history if exist
    @swipe.right_swipes += params[:right_swipes].to_i
    @swipe.left_swipes += params[:left_swipes].to_i

    if @swipe.save
      render json: @swipe, status: :created
    else
      render json: { error: 'Unable to save swipe record' }, status: :unprocessable_entity
    end
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
    @dish = Dish.find_by(id: params[:dish_id])

    return if @dish

    render json: { error: 'Dish not found' }, status: :not_found
  end

  def set_user
    @user = current_user
  end
end
