class Api::SessionsController < ApplicationController
  def create
    user = User.authenticate_with_credentials(params[:email], params[:password])
    # If the user exists AND the password entered is correct.
    if user
      session[:user_id] = user.id
      render json: { message: 'Logged in successfully.' }
    else
      render json: { errors: ['Invalid email or password'] }, status: :unauthorized
    end
  end

  def destroy
    session[:user_id] = nil
    render json: { message: 'You are now logged out' }, status: :ok
  end
end
