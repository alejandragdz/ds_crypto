Rails.application.routes.draw do
  root 'home#index'
  resources :investments
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check
  get '/home/error_page',    to: 'home#error_page',    as: 'error_page'
  get '/home/download_json', to: 'home#download_json', as: 'download_json', defaults: { format: :json }
  get '/home/download_csv', to: 'home#download_csv', as: 'download_csv'
  
  # Defines the root path route ("/")
  # root "posts#index"
end
