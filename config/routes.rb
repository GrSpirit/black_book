Rails.application.routes.draw do
  root  'sessions#new'

  # Users
  resources :users, only: [:show, :edit, :update]

  # Sessions
  get 		'/login', 	to: 'sessions#new'
  post 		'/login', 	to: 'sessions#create'
  delete	'/logout',	to: 'sessions#destroy'
end
