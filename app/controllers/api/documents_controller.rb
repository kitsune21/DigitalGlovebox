class Api::DocumentsController < ApplicationController
  before_action :set_user

  def index
    render json: @user.documents.all.order("document_type_id ASC")
  end

  def create
    @document = @user.documents.new(document_params)
    if @document.save
      render json: @document
    else
      render json: {errors: @document_errors}, status: :unprocessable_entry
    end
  end

def update
  @document = @user.documents.find(params[:id])
  if @document.update(document_params)
    render json: @document
  else
    render json: {errors: @document_errors}, status: :unprocessable_entry
  end
end

def destroy
  Document.find(params[:id]).destroy
  render json: {message: 'post deleted'}
end


  private

  def set_user
    @user = User.find(params[:user_id])
  end

  def document_params
    params.require(:document).permit(:name)
  end
end
