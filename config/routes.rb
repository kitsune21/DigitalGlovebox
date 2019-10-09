Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'api/auth'
  
  namespace :api do
    resources :users do
      resources :cars
    end
    resources :documents do
      resources :document_pages
    end
    resources :document_types
  end

end
