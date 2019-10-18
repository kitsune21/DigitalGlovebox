class Api::DocumentPagesController < ApplicationController
  before_action :set_document

  def index 
    render json: @documents.document_pages.all.order("id ASC")
  end

  def create 
    @document_page = @documents.document_pages.new()
    
    file = params[:file]
    if file
      begin
        ext = File.extname(file.tempfile)
        cloud_image = Cloudinary::Uploader.upload(file, public_id: file.original_filename, secure: true)
        @document_page.front_img = cloud_image['secure_url']
        if @document_page.save
          render json: @document_page
        else
          render json: { errors: @document_page.errors }, status: :unprocessable_entity
        end
      rescue => e
        render json: { errors: e }, status: 422
      end
    end

  end

  def update
    @documents_page = @documents.document_pages.find(params[:id])

    file = params[:file]
    
    if file
      begin
        ext = File.extname(file.tempfile)
        cloud_image = Cloudinary::Uploader.upload(file, public_id: file.original_filename, secure: true)
        @documents_page.front_img = cloud_image['secure_url']
        
      rescue => e
        render json: { errors: e }, status: 422
      end
    end
    if @documents_page.save
      render json: @document_page
    else
      render json: { errors: @document_page.errors }, status: :unprocessable_entity
    end
  end

  def destroy
    @documents.document_pages.find(params[:id]).destroy
    render json: { message: 'Document Page deleted'}
  end

  private
    def set_document
      @documents = Document.find(params[:document_id])
    end 

    # def document_page_params
    #   params.require(:document_page).permit(:file)
    # end
  end
  

