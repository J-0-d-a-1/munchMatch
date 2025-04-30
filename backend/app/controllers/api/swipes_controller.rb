class Api::SwipesController < ApplicationController
  before_action :set_dish, only: %i[create update]
  before_action :set_user, only: %i[create update]

  def index
    @swipes = Swipe.includes(:dish).where(user_id: current_user.id).order(created_at: :desc)

    render json: @swipes, include: { dish: { only: %i[id name photo_url restaurant_id description] } }
  end
end
