Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  namespace :api do
    resources :users, only: %i[show create]
    resources :sessions, only: %i[create destroy current] do
      collection do
        get :current
      end
    end
    resources :categories, only: %i[index show]
    resources :restaurants do
      resources :dishes, only: %i[create index]
    end
    resources :dishes, only: %i[show update destroy]
    get '/dishes', to: 'dishes#all'
    resources :favorites, only: %i[index create]
    delete '/favorites/:restaurant_id', to: 'favorites#destroy'
    resources :swipes, only: %i[index create]
  end
end
