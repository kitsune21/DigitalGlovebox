class Api::DocumentsController < ApplicationController
  def index
    render json: Document.all
  end

  def create
    @document = Document.new(document_params)
    if @document.save
      render json: @document
    else
      render json: {errors: @document_errors}, status: :unprocessable_entry
  end

def update
  @document = Document.find(params[:id])
  if @document.update(document_params)
    render json: @document
  else
    render json: {errors: @document_errors}, status: :unprocessable_entry
end

def destroy
  Document.find(params[:id]).destroy
  render json: {message: 'post deleted'}
end


  private

  def document_params
    params.require(:document).permit(:user_id, :document_id, :name)
  end
end
