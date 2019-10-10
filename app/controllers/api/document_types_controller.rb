class Api::DocumentTypesController < ApplicationController
  before_action :set_user

  def index
    render json: @user.document_types.all
  end

  def create
    @documentType = @user.document_types.new(documentType_params)
    if @documentType.save
      render json: @documentType
    else
      render json: { errors: @documentType.errors }, status: :unprocessable_entity
    end
  end

  def update
    @documentType = @user.document_types.find(params[:id])
    if @documentType.update(documentType_params)
      render json: @documentType
    else
      render json: { errors: @documentType.errors }, status: :unprocessable_entity
    end
  end

  def destroy
    @user.document_types.find(params[:id]).destroy
    render json: { message: 'Document type deleted'}
  end

  private

  def set_user
    @user = User.find(params[:user_id])
  end
    def documentType_params
    params.require(:document_type).permit(:name)
  end
end
