Rails.application.routes.draw do
  get 'map/point' => 'map#point'
  get 'map' => 'map#index'
  root to: 'map#index'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
