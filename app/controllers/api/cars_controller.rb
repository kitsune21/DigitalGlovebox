class Api::CarsController < ApplicationController
def index
  render json: Car.all 
end

def create
  @car = Car.new(car_params)
  if @car.save
    render json: car
  else
    render json: { errors: @car.errors }, status: :unprocessable_entity
  end
end

def update
  @car = Car.find(params[:id])
  if @car.update(car_params)
    render json: @car
  else
    render json { errors: @car.errors }, status: :unprocessable_entity
  end
end

def destroy
  Car.find(params[:id]).destroy
  render json: { message: 'Car deleted' }
end

private

  def car_params
    params.require(:car).permit(:year, :make, :model, :mileage, :vin, :color, :license_plate, :user_id)
  end
end