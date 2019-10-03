class Api::DocumentTypesController < ApplicationController
  def index
    render json: DocumentType.all
  end
  def create
    @documentType = DocumentType.new(documentType_params)
    if @documentType.save
      render json: @documentType
    else
      render json: { errors: @documentType.errors }, status: :unprocessable_entity
    end
  end

  def update
    @documentType = DocumentType.find(params[:id])
    if @documentType.update(documentType_params)
      render json: @documentType
    else
      render json: { errors: @documentType.errors }, status: :unprocessable_entity
    end
  end

  def destroy
    DocumentType.find(params[:id]).destroy
    render json: { message: 'Document type deleted'}
  end

  private
    def documentType_params
      # { documentType: {title: '', body: ''} }
    params.require(:documentType).permit(:name)
  end
end
