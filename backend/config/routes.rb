Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  namespace :api do
    resources :categories, only: %i[index show]
    resources :restaurants
    resources :dishes
    resources :favorites, only: %i[index create]
    delete '/favorites/:restaurant_id', to: 'favorites#destroy'
    resources :swipes, only: %i[index create]
  end
end
