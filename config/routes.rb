Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'api/auth'

  namespace :api do
    resources :users, only: :update do
      resources :cars
      resources :documents 
      resources :document_types
    end
    resources :documents do
      resources :document_pages
    end
  end
end
