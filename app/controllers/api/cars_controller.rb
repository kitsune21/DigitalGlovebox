class Api::CarsController < ApplicationController
  before_action :set_user

def index
  render json: @user.cars 
end

def create
  @car = @user.cars.new(car_params)
  if @car.save
    render json: @car
  else
    render json: { errors: @car.errors }, status: :unprocessable_entity
  end
end

def update
  @car = @usesr.cars.find(params[:id])
  if @car.update(car_params)
    render json: @car
  else
    render json: { errors: @car.errors }, status: :unprocessable_entity
  end
end

def destroy
  Car.find(params[:id]).destroy
  render json: { message: 'Car deleted' }
end

private

  def set_user
    @user = User.find(params[:user_id])
  end

  def car_params
    params.require(:car).permit(:year, :make, :model, :mileage, :vin, :color, :license_plate, :user_id)
  end
end