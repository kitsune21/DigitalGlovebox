class Api::DocumentPagesController < ApplicationController
  before_action :set_document

  def index 
    render json: @documents.document_pages.all.order("id ASC")
  end

def create 
  @document_page = @documents.document_page(document_page_params)
  if @document_page.save
    render json: @document_page
  else
    render json: { errors: @document_page.errors }, status: :unprocessable_entity

  end
end

    def update
      @documents_page = @documents.document_page.find(params[:id])
      if @documents.document_page(document_page_params)
        render json: @documents.document_page
      else
        render json: { errors: @document_page.errors }, status: :unprocessable_entity
      end
    end

    def destroy
      @documents.document_pages.find(params[:id]).destroy
      render json: { message: 'Document Page deleted'}
    end

  private
    def document_page_params
      params.require(:documents_page).permit(:front_img, :back_img, :document_id)
    end

    def set_document
      @documents = Document.find(params[:document_id])
    end
  end
  

