class Api::SessionsController < ApplicationController
  # GET /api/current_user
  def current
    if session[:user_id]
      user = User.find_by(id: session[:user_id])
      render json: { 
        user: {
          id: user.id,
          name: user.name,
          is_owner: user.is_owner
        }
      }
    else
      render json: { user: nil }
    end
  end
    
  # POST /api/sessions
  def create
    user = User.authenticate_with_credentials(params[:email], params[:password])
    # If the user exists AND the password entered is correct.
    if user
      session[:user_id] = user.id
      render json: { message: 'Logged in successfully.', name: user.name, is_owner: user.is_owner, id: user.id }
    else
      render json: { errors: ['Invalid email or password'] }, status: :unauthorized
    end
  end

  # DELETE /api/sessions/:id
  def destroy
    session[:user_id] = nil
    render json: { message: 'You are now logged out' }, status: :ok
  end
end
