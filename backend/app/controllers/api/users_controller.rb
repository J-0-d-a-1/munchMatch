class Api::UsersController < ApplicationController
  # GET /api/users/:id
  def show
    user = User.find_by(id: params[:id])
    if user
      render json: user, except: [:password_digest], status: :ok
    else
      render json: { error: 'User not found' }, status: :not_found
    end
  end

  # POST /api/users
  def create
    user = User.new(user_params)
    if user.save
      session[:user_id] = user.id
      render json: { message: 'User created successfully.' }, status: :created
    else
      render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def user_params
    params.require(:user).permit(
      :name,
      :email,
      :password,
      :password_confirmation,
      :is_owner
    )
  end
end
